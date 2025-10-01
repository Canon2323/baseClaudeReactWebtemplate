// Payment types inspired by Next.js SaaS Starter
// Repository: https://github.com/nextjs/saas-starter
// Adapted with SOLID principles for our template

export interface Price {
  id: string;
  productId: string;
  active: boolean;
  currency: string;
  unitAmount: number;
  interval?: "month" | "year";
  intervalCount?: number;
  trialPeriodDays?: number;
  metadata?: Record<string, string>;
}

export interface Product {
  id: string;
  active: boolean;
  name: string;
  description?: string;
  image?: string;
  metadata?: Record<string, string>;
}

export interface Subscription {
  id: string;
  userId: string;
  status:
    | "active"
    | "canceled"
    | "incomplete"
    | "incomplete_expired"
    | "past_due"
    | "trialing"
    | "unpaid";
  priceId: string;
  customerId: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  cancelAt?: Date;
  canceledAt?: Date;
  trialStart?: Date;
  trialEnd?: Date;
  metadata?: Record<string, string>;
}

export interface Customer {
  id: string;
  stripeCustomerId: string;
  email: string;
  name?: string;
  phone?: string;
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
  };
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status:
    | "requires_payment_method"
    | "requires_confirmation"
    | "requires_action"
    | "processing"
    | "requires_capture"
    | "canceled"
    | "succeeded";
  clientSecret: string;
  customerId?: string;
  metadata?: Record<string, string>;
}

export interface CheckoutSession {
  id: string;
  url: string;
  customerId?: string;
  subscriptionId?: string;
  mode: "payment" | "subscription" | "setup";
  status: "open" | "complete" | "expired";
}

export interface WebhookEvent {
  id: string;
  type: string;
  data: any;
  created: Date;
  processed: boolean;
}

// Main payment provider interface (DIP)
export interface IPaymentProvider {
  // Products and Prices
  getProducts(): Promise<Product[]>;
  getProduct(productId: string): Promise<Product | null>;
  getPrices(productId?: string): Promise<Price[]>;
  getPrice(priceId: string): Promise<Price | null>;

  // Customers
  createCustomer(
    data: Omit<Customer, "id" | "stripeCustomerId">,
  ): Promise<Customer>;
  getCustomer(customerId: string): Promise<Customer | null>;
  updateCustomer(
    customerId: string,
    data: Partial<Customer>,
  ): Promise<Customer>;

  // Subscriptions
  createSubscription(
    customerId: string,
    priceId: string,
    options?: CreateSubscriptionOptions,
  ): Promise<Subscription>;
  getSubscription(subscriptionId: string): Promise<Subscription | null>;
  updateSubscription(
    subscriptionId: string,
    data: Partial<Subscription>,
  ): Promise<Subscription>;
  cancelSubscription(
    subscriptionId: string,
    cancelAtPeriodEnd?: boolean,
  ): Promise<Subscription>;
  getCustomerSubscriptions(customerId: string): Promise<Subscription[]>;

  // Checkout
  createCheckoutSession(
    options: CreateCheckoutSessionOptions,
  ): Promise<CheckoutSession>;
  getCheckoutSession(sessionId: string): Promise<CheckoutSession | null>;

  // Payment Intents
  createPaymentIntent(
    options: CreatePaymentIntentOptions,
  ): Promise<PaymentIntent>;
  confirmPaymentIntent(paymentIntentId: string): Promise<PaymentIntent>;
  getPaymentIntent(paymentIntentId: string): Promise<PaymentIntent | null>;

  // Webhooks
  verifyWebhookSignature(payload: string, signature: string): boolean;
  processWebhookEvent(event: any): Promise<WebhookEvent>;

  // Customer Portal
  createCustomerPortalSession(
    customerId: string,
    returnUrl: string,
  ): Promise<{ url: string }>;

  // Initialization
  initialize(): Promise<void>;
  cleanup(): Promise<void>;
}

// Configuration options
export interface CreateSubscriptionOptions {
  trialPeriodDays?: number;
  metadata?: Record<string, string>;
  paymentBehavior?:
    | "default_incomplete"
    | "pending_if_incomplete"
    | "error_if_incomplete";
}

export interface CreateCheckoutSessionOptions {
  mode: "payment" | "subscription" | "setup";
  lineItems: Array<{
    priceId: string;
    quantity?: number;
  }>;
  customerId?: string;
  customerEmail?: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
  allowPromotionCodes?: boolean;
  billingAddressCollection?: "auto" | "required";
  trialPeriodDays?: number;
}

export interface CreatePaymentIntentOptions {
  amount: number;
  currency: string;
  customerId?: string;
  metadata?: Record<string, string>;
  automaticPaymentMethods?: {
    enabled: boolean;
  };
}

// Strategy Pattern for different payment providers
export type PaymentProviderType = "stripe" | "paddle" | "lemonsqueezy";

export interface PaymentProviderConfig {
  type: PaymentProviderType;
  options: Record<string, any>;
}

// Error types
export interface PaymentError {
  code: string;
  message: string;
  type:
    | "api_error"
    | "card_error"
    | "idempotency_error"
    | "invalid_request_error"
    | "rate_limit_error";
  details?: any;
}

// Response wrapper
export interface PaymentResponse<T = any> {
  data: T | null;
  error: PaymentError | null;
}

// Webhook event types
export type StripeWebhookEvent =
  | "customer.subscription.created"
  | "customer.subscription.updated"
  | "customer.subscription.deleted"
  | "invoice.payment_succeeded"
  | "invoice.payment_failed"
  | "checkout.session.completed"
  | "customer.created"
  | "customer.updated"
  | "customer.deleted";

// Subscription status helpers
export const ACTIVE_SUBSCRIPTION_STATUSES: Subscription["status"][] = [
  "active",
  "trialing",
];
export const INACTIVE_SUBSCRIPTION_STATUSES: Subscription["status"][] = [
  "canceled",
  "incomplete",
  "incomplete_expired",
  "past_due",
  "unpaid",
];

// Utility functions
export const isSubscriptionActive = (subscription: Subscription): boolean => {
  return ACTIVE_SUBSCRIPTION_STATUSES.includes(subscription.status);
};

export const isSubscriptionCanceled = (subscription: Subscription): boolean => {
  return subscription.status === "canceled" || subscription.cancelAtPeriodEnd;
};
