// Stripe implementation inspired by Next.js SaaS Starter
// Repository: https://github.com/nextjs/saas-starter
// Enhanced with SOLID principles

import Stripe from 'stripe'
import type {
  IPaymentProvider,
  Product,
  Price,
  Customer,
  Subscription,
  PaymentIntent,
  CheckoutSession,
  WebhookEvent,
  PaymentResponse,
  PaymentError,
  CreateSubscriptionOptions,
  CreateCheckoutSessionOptions,
  CreatePaymentIntentOptions
} from '@/shared/types/payments'
import { getEnv } from '@/config/env'

export class StripePaymentProvider implements IPaymentProvider {
  private stripe: Stripe
  private webhookSecret?: string

  constructor() {
    const env = getEnv()

    if (!env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is required')
    }

    this.stripe = new Stripe(env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20',
      typescript: true
    })

    this.webhookSecret = env.STRIPE_WEBHOOK_SECRET
  }

  // Products and Prices (Single Responsibility)
  async getProducts(): Promise<Product[]> {
    try {
      const { data } = await this.stripe.products.list({
        active: true,
        expand: ['data.default_price']
      })

      return data.map(this.mapStripeProduct)
    } catch (error) {
      throw this.mapStripeError(error)
    }
  }

  async getProduct(productId: string): Promise<Product | null> {
    try {
      const product = await this.stripe.products.retrieve(productId)
      return this.mapStripeProduct(product)
    } catch (error) {
      if ((error as Stripe.StripeError).code === 'resource_missing') {
        return null
      }
      throw this.mapStripeError(error)
    }
  }

  async getPrices(productId?: string): Promise<Price[]> {
    try {
      const params: Stripe.PriceListParams = {
        active: true,
        expand: ['data.product']
      }

      if (productId) {
        params.product = productId
      }

      const { data } = await this.stripe.prices.list(params)
      return data.map(this.mapStripePrice)
    } catch (error) {
      throw this.mapStripeError(error)
    }
  }

  async getPrice(priceId: string): Promise<Price | null> {
    try {
      const price = await this.stripe.prices.retrieve(priceId)
      return this.mapStripePrice(price)
    } catch (error) {
      if ((error as Stripe.StripeError).code === 'resource_missing') {
        return null
      }
      throw this.mapStripeError(error)
    }
  }

  // Customers (Single Responsibility)
  async createCustomer(data: Omit<Customer, 'id' | 'stripeCustomerId'>): Promise<Customer> {
    try {
      const customer = await this.stripe.customers.create({
        email: data.email,
        name: data.name,
        phone: data.phone,
        address: data.address
      })

      return this.mapStripeCustomer(customer)
    } catch (error) {
      throw this.mapStripeError(error)
    }
  }

  async getCustomer(customerId: string): Promise<Customer | null> {
    try {
      const customer = await this.stripe.customers.retrieve(customerId)

      if (customer.deleted) {
        return null
      }

      return this.mapStripeCustomer(customer as Stripe.Customer)
    } catch (error) {
      if ((error as Stripe.StripeError).code === 'resource_missing') {
        return null
      }
      throw this.mapStripeError(error)
    }
  }

  async updateCustomer(customerId: string, data: Partial<Customer>): Promise<Customer> {
    try {
      const customer = await this.stripe.customers.update(customerId, {
        email: data.email,
        name: data.name,
        phone: data.phone,
        address: data.address
      })

      return this.mapStripeCustomer(customer)
    } catch (error) {
      throw this.mapStripeError(error)
    }
  }

  // Subscriptions (Single Responsibility)
  async createSubscription(
    customerId: string,
    priceId: string,
    options: CreateSubscriptionOptions = {}
  ): Promise<Subscription> {
    try {
      const subscription = await this.stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        trial_period_days: options.trialPeriodDays,
        metadata: options.metadata,
        payment_behavior: options.paymentBehavior || 'default_incomplete',
        expand: ['latest_invoice.payment_intent']
      })

      return this.mapStripeSubscription(subscription)
    } catch (error) {
      throw this.mapStripeError(error)
    }
  }

  async getSubscription(subscriptionId: string): Promise<Subscription | null> {
    try {
      const subscription = await this.stripe.subscriptions.retrieve(subscriptionId)
      return this.mapStripeSubscription(subscription)
    } catch (error) {
      if ((error as Stripe.StripeError).code === 'resource_missing') {
        return null
      }
      throw this.mapStripeError(error)
    }
  }

  async updateSubscription(subscriptionId: string, data: Partial<Subscription>): Promise<Subscription> {
    try {
      const updateData: Stripe.SubscriptionUpdateParams = {}

      if (data.priceId) {
        const subscription = await this.stripe.subscriptions.retrieve(subscriptionId)
        updateData.items = [{
          id: subscription.items.data[0].id,
          price: data.priceId
        }]
      }

      if (data.metadata) {
        updateData.metadata = data.metadata
      }

      const subscription = await this.stripe.subscriptions.update(subscriptionId, updateData)
      return this.mapStripeSubscription(subscription)
    } catch (error) {
      throw this.mapStripeError(error)
    }
  }

  async cancelSubscription(subscriptionId: string, cancelAtPeriodEnd: boolean = false): Promise<Subscription> {
    try {
      let subscription: Stripe.Subscription

      if (cancelAtPeriodEnd) {
        subscription = await this.stripe.subscriptions.update(subscriptionId, {
          cancel_at_period_end: true
        })
      } else {
        subscription = await this.stripe.subscriptions.cancel(subscriptionId)
      }

      return this.mapStripeSubscription(subscription)
    } catch (error) {
      throw this.mapStripeError(error)
    }
  }

  async getCustomerSubscriptions(customerId: string): Promise<Subscription[]> {
    try {
      const { data } = await this.stripe.subscriptions.list({
        customer: customerId,
        status: 'all'
      })

      return data.map(this.mapStripeSubscription)
    } catch (error) {
      throw this.mapStripeError(error)
    }
  }

  // Checkout (Single Responsibility)
  async createCheckoutSession(options: CreateCheckoutSessionOptions): Promise<CheckoutSession> {
    try {
      const sessionData: Stripe.Checkout.SessionCreateParams = {
        mode: options.mode,
        line_items: options.lineItems.map(item => ({
          price: item.priceId,
          quantity: item.quantity || 1
        })),
        success_url: options.successUrl,
        cancel_url: options.cancelUrl,
        metadata: options.metadata,
        allow_promotion_codes: options.allowPromotionCodes,
        billing_address_collection: options.billingAddressCollection
      }

      if (options.customerId) {
        sessionData.customer = options.customerId
      } else if (options.customerEmail) {
        sessionData.customer_email = options.customerEmail
      }

      if (options.mode === 'subscription' && options.trialPeriodDays) {
        sessionData.subscription_data = {
          trial_period_days: options.trialPeriodDays
        }
      }

      const session = await this.stripe.checkout.sessions.create(sessionData)
      return this.mapStripeCheckoutSession(session)
    } catch (error) {
      throw this.mapStripeError(error)
    }
  }

  async getCheckoutSession(sessionId: string): Promise<CheckoutSession | null> {
    try {
      const session = await this.stripe.checkout.sessions.retrieve(sessionId)
      return this.mapStripeCheckoutSession(session)
    } catch (error) {
      if ((error as Stripe.StripeError).code === 'resource_missing') {
        return null
      }
      throw this.mapStripeError(error)
    }
  }

  // Payment Intents (Single Responsibility)
  async createPaymentIntent(options: CreatePaymentIntentOptions): Promise<PaymentIntent> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: options.amount,
        currency: options.currency,
        customer: options.customerId,
        metadata: options.metadata,
        automatic_payment_methods: options.automaticPaymentMethods
      })

      return this.mapStripePaymentIntent(paymentIntent)
    } catch (error) {
      throw this.mapStripeError(error)
    }
  }

  async confirmPaymentIntent(paymentIntentId: string): Promise<PaymentIntent> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.confirm(paymentIntentId)
      return this.mapStripePaymentIntent(paymentIntent)
    } catch (error) {
      throw this.mapStripeError(error)
    }
  }

  async getPaymentIntent(paymentIntentId: string): Promise<PaymentIntent | null> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId)
      return this.mapStripePaymentIntent(paymentIntent)
    } catch (error) {
      if ((error as Stripe.StripeError).code === 'resource_missing') {
        return null
      }
      throw this.mapStripeError(error)
    }
  }

  // Webhooks (Single Responsibility)
  verifyWebhookSignature(payload: string, signature: string): boolean {
    if (!this.webhookSecret) {
      throw new Error('Webhook secret not configured')
    }

    try {
      this.stripe.webhooks.constructEvent(payload, signature, this.webhookSecret)
      return true
    } catch (error) {
      return false
    }
  }

  async processWebhookEvent(event: any): Promise<WebhookEvent> {
    try {
      // Process different event types
      const webhookEvent: WebhookEvent = {
        id: event.id,
        type: event.type,
        data: event.data,
        created: new Date(event.created * 1000),
        processed: true
      }

      // Handle specific event types (Strategy Pattern could be applied here)
      switch (event.type) {
        case 'customer.subscription.created':
        case 'customer.subscription.updated':
        case 'customer.subscription.deleted':
          // Handle subscription events
          break
        case 'invoice.payment_succeeded':
        case 'invoice.payment_failed':
          // Handle payment events
          break
        case 'checkout.session.completed':
          // Handle checkout completion
          break
      }

      return webhookEvent
    } catch (error) {
      throw this.mapStripeError(error)
    }
  }

  // Customer Portal
  async createCustomerPortalSession(customerId: string, returnUrl: string): Promise<{ url: string }> {
    try {
      const session = await this.stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: returnUrl
      })

      return { url: session.url }
    } catch (error) {
      throw this.mapStripeError(error)
    }
  }

  // Initialization and cleanup
  async initialize(): Promise<void> {
    // Verify Stripe connection
    try {
      await this.stripe.balance.retrieve()
    } catch (error) {
      throw new Error(`Failed to initialize Stripe: ${(error as Error).message}`)
    }
  }

  async cleanup(): Promise<void> {
    // Stripe client cleanup is automatic
  }

  // Mappers (Single Responsibility)
  private mapStripeProduct = (product: Stripe.Product): Product => ({
    id: product.id,
    active: product.active,
    name: product.name,
    description: product.description || undefined,
    image: product.images?.[0],
    metadata: product.metadata
  })

  private mapStripePrice = (price: Stripe.Price): Price => ({
    id: price.id,
    productId: typeof price.product === 'string' ? price.product : price.product.id,
    active: price.active,
    currency: price.currency,
    unitAmount: price.unit_amount || 0,
    interval: price.recurring?.interval as 'month' | 'year' | undefined,
    intervalCount: price.recurring?.interval_count,
    trialPeriodDays: price.recurring?.trial_period_days || undefined,
    metadata: price.metadata
  })

  private mapStripeCustomer = (customer: Stripe.Customer): Customer => ({
    id: customer.id,
    stripeCustomerId: customer.id,
    email: customer.email!,
    name: customer.name || undefined,
    phone: customer.phone || undefined,
    address: customer.address ? {
      line1: customer.address.line1 || undefined,
      line2: customer.address.line2 || undefined,
      city: customer.address.city || undefined,
      state: customer.address.state || undefined,
      postal_code: customer.address.postal_code || undefined,
      country: customer.address.country || undefined
    } : undefined
  })

  private mapStripeSubscription = (subscription: Stripe.Subscription): Subscription => ({
    id: subscription.id,
    userId: typeof subscription.customer === 'string' ? subscription.customer : subscription.customer.id,
    status: subscription.status as Subscription['status'],
    priceId: subscription.items.data[0]?.price.id || '',
    customerId: typeof subscription.customer === 'string' ? subscription.customer : subscription.customer.id,
    currentPeriodStart: new Date(subscription.current_period_start * 1000),
    currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    cancelAtPeriodEnd: subscription.cancel_at_period_end,
    cancelAt: subscription.cancel_at ? new Date(subscription.cancel_at * 1000) : undefined,
    canceledAt: subscription.canceled_at ? new Date(subscription.canceled_at * 1000) : undefined,
    trialStart: subscription.trial_start ? new Date(subscription.trial_start * 1000) : undefined,
    trialEnd: subscription.trial_end ? new Date(subscription.trial_end * 1000) : undefined,
    metadata: subscription.metadata
  })

  private mapStripePaymentIntent = (paymentIntent: Stripe.PaymentIntent): PaymentIntent => ({
    id: paymentIntent.id,
    amount: paymentIntent.amount,
    currency: paymentIntent.currency,
    status: paymentIntent.status as PaymentIntent['status'],
    clientSecret: paymentIntent.client_secret!,
    customerId: typeof paymentIntent.customer === 'string' ? paymentIntent.customer : paymentIntent.customer?.id,
    metadata: paymentIntent.metadata
  })

  private mapStripeCheckoutSession = (session: Stripe.Checkout.Session): CheckoutSession => ({
    id: session.id,
    url: session.url!,
    customerId: typeof session.customer === 'string' ? session.customer : session.customer?.id,
    subscriptionId: typeof session.subscription === 'string' ? session.subscription : session.subscription?.id,
    mode: session.mode as CheckoutSession['mode'],
    status: session.status as CheckoutSession['status']
  })

  private mapStripeError = (error: any): PaymentError => {
    const stripeError = error as Stripe.StripeError
    return {
      code: stripeError.code || 'unknown_error',
      message: stripeError.message || 'An unknown error occurred',
      type: stripeError.type as PaymentError['type'] || 'api_error',
      details: stripeError
    }
  }
}