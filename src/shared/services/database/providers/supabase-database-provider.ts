import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type {
  IDatabaseProvider,
  DatabaseRecord,
  QueryOptions,
  InsertData,
  UpdateData,
  UpsertData,
  DatabaseResponse,
  DatabaseError,
  TransactionContext,
  RealtimeSubscription,
  RealtimeEvent,
  RealtimeCallback
} from '@/shared/types/database'
import { getEnv } from '@/config/env'

export class SupabaseDatabaseProvider implements IDatabaseProvider {
  private client: SupabaseClient
  private adminClient?: SupabaseClient
  private subscriptions: Map<string, any> = new Map()
  private transactionCounter = 0

  constructor() {
    const env = getEnv()

    // Client principal (com auth context)
    this.client = createClient(
      env.NEXT_PUBLIC_SUPABASE_URL!,
      env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // Admin client (para operações privilegiadas)
    if (env.SUPABASE_SERVICE_ROLE_KEY) {
      this.adminClient = createClient(
        env.NEXT_PUBLIC_SUPABASE_URL!,
        env.SUPABASE_SERVICE_ROLE_KEY,
        {
          auth: {
            autoRefreshToken: false,
            persistSession: false,
          },
        }
      )
    }
  }

  // Conexão e health check
  async isConnected(): Promise<boolean> {
    try {
      const { error } = await this.client.from('_health_check').select('*').limit(1)
      return !error
    } catch {
      return false
    }
  }

  async getHealth(): Promise<{ status: 'healthy' | 'unhealthy'; details?: any }> {
    try {
      const startTime = Date.now()
      const { error } = await this.client.from('_health_check').select('*').limit(1)
      const responseTime = Date.now() - startTime

      if (error && error.code !== 'PGRST116') { // Table not found é ok para health check
        return {
          status: 'unhealthy',
          details: { error: error.message, responseTime }
        }
      }

      return {
        status: 'healthy',
        details: { responseTime }
      }
    } catch (error) {
      return {
        status: 'unhealthy',
        details: { error: (error as Error).message }
      }
    }
  }

  // CRUD Operations (Single Responsibility)

  // Create
  async insert<T extends DatabaseRecord>(
    table: string,
    data: InsertData | InsertData[]
  ): Promise<DatabaseResponse<T[]>> {
    try {
      const { data: result, error, count } = await this.client
        .from(table)
        .insert(data)
        .select()

      return {
        data: result as T[],
        error: error ? this.mapSupabaseError(error) : null,
        count
      }
    } catch (error) {
      return {
        data: null,
        error: this.mapSupabaseError(error),
        count: 0
      }
    }
  }

  // Read
  async select<T extends DatabaseRecord>(
    table: string,
    options: QueryOptions = {}
  ): Promise<DatabaseResponse<T[]>> {
    try {
      let query = this.client.from(table).select(
        options.select ? options.select.join(',') : '*',
        { count: 'exact' }
      )

      // Where conditions
      if (options.where) {
        Object.entries(options.where).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            query = query.in(key, value)
          } else if (value === null) {
            query = query.is(key, null)
          } else {
            query = query.eq(key, value)
          }
        })
      }

      // Order by
      if (options.orderBy) {
        options.orderBy.forEach(({ column, ascending = true }) => {
          query = query.order(column, { ascending })
        })
      }

      // Pagination
      if (options.limit) {
        query = query.limit(options.limit)
      }
      if (options.offset) {
        query = query.range(options.offset, (options.offset + (options.limit || 1000)) - 1)
      }

      const { data, error, count } = await query

      return {
        data: data as T[],
        error: error ? this.mapSupabaseError(error) : null,
        count
      }
    } catch (error) {
      return {
        data: null,
        error: this.mapSupabaseError(error),
        count: 0
      }
    }
  }

  async selectOne<T extends DatabaseRecord>(
    table: string,
    id: string
  ): Promise<DatabaseResponse<T>> {
    try {
      const { data, error } = await this.client
        .from(table)
        .select('*')
        .eq('id', id)
        .single()

      return {
        data: data as T,
        error: error ? this.mapSupabaseError(error) : null
      }
    } catch (error) {
      return {
        data: null,
        error: this.mapSupabaseError(error)
      }
    }
  }

  async selectBy<T extends DatabaseRecord>(
    table: string,
    field: string,
    value: any,
    options: Omit<QueryOptions, 'where'> = {}
  ): Promise<DatabaseResponse<T[]>> {
    return this.select<T>(table, {
      ...options,
      where: { [field]: value }
    })
  }

  // Update
  async update<T extends DatabaseRecord>(
    table: string,
    id: string,
    data: UpdateData
  ): Promise<DatabaseResponse<T>> {
    try {
      const { data: result, error } = await this.client
        .from(table)
        .update({
          ...data,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

      return {
        data: result as T,
        error: error ? this.mapSupabaseError(error) : null
      }
    } catch (error) {
      return {
        data: null,
        error: this.mapSupabaseError(error)
      }
    }
  }

  async updateBy<T extends DatabaseRecord>(
    table: string,
    field: string,
    value: any,
    data: UpdateData
  ): Promise<DatabaseResponse<T[]>> {
    try {
      const { data: result, error, count } = await this.client
        .from(table)
        .update({
          ...data,
          updated_at: new Date().toISOString()
        })
        .eq(field, value)
        .select()

      return {
        data: result as T[],
        error: error ? this.mapSupabaseError(error) : null,
        count
      }
    } catch (error) {
      return {
        data: null,
        error: this.mapSupabaseError(error),
        count: 0
      }
    }
  }

  // Delete
  async delete<T extends DatabaseRecord>(
    table: string,
    id: string
  ): Promise<DatabaseResponse<T>> {
    try {
      const { data, error } = await this.client
        .from(table)
        .delete()
        .eq('id', id)
        .select()
        .single()

      return {
        data: data as T,
        error: error ? this.mapSupabaseError(error) : null
      }
    } catch (error) {
      return {
        data: null,
        error: this.mapSupabaseError(error)
      }
    }
  }

  async deleteBy<T extends DatabaseRecord>(
    table: string,
    field: string,
    value: any
  ): Promise<DatabaseResponse<T[]>> {
    try {
      const { data, error, count } = await this.client
        .from(table)
        .delete()
        .eq(field, value)
        .select()

      return {
        data: data as T[],
        error: error ? this.mapSupabaseError(error) : null,
        count
      }
    } catch (error) {
      return {
        data: null,
        error: this.mapSupabaseError(error),
        count: 0
      }
    }
  }

  // Upsert
  async upsert<T extends DatabaseRecord>(
    table: string,
    data: UpsertData | UpsertData[],
    conflictColumns: string[] = ['id']
  ): Promise<DatabaseResponse<T[]>> {
    try {
      const { data: result, error, count } = await this.client
        .from(table)
        .upsert(data, {
          onConflict: conflictColumns.join(','),
          ignoreDuplicates: false
        })
        .select()

      return {
        data: result as T[],
        error: error ? this.mapSupabaseError(error) : null,
        count
      }
    } catch (error) {
      return {
        data: null,
        error: this.mapSupabaseError(error),
        count: 0
      }
    }
  }

  // Raw Queries
  async query<T = any>(sql: string, params: any[] = []): Promise<DatabaseResponse<T[]>> {
    try {
      // Supabase não tem execução direta de SQL via JS client
      // Isso seria feito via RPC (stored procedures) ou Edge Functions
      throw new Error('Raw SQL queries are not supported via Supabase client. Use RPC functions instead.')
    } catch (error) {
      return {
        data: null,
        error: this.mapSupabaseError(error)
      }
    }
  }

  // Transações (simuladas com RPC)
  async transaction<T>(
    callback: (ctx: TransactionContext) => Promise<T>
  ): Promise<DatabaseResponse<T>> {
    try {
      const transactionId = `tx_${++this.transactionCounter}_${Date.now()}`
      const context: TransactionContext = {
        id: transactionId,
        isActive: true
      }

      // Supabase não tem transações diretas no client
      // Alternativas: usar RPC functions ou aceitar que operações são independentes
      const result = await callback(context)

      return {
        data: result,
        error: null
      }
    } catch (error) {
      return {
        data: null,
        error: this.mapSupabaseError(error)
      }
    }
  }

  // Realtime (Observer Pattern)
  async subscribe<T = any>(
    table: string,
    callback: RealtimeCallback<T>,
    options: { event?: 'INSERT' | 'UPDATE' | 'DELETE' | '*' } = {}
  ): Promise<RealtimeSubscription> {
    const subscriptionId = `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const event = options.event || '*'

    const channel = this.client
      .channel(subscriptionId)
      .on('postgres_changes', {
        event,
        schema: 'public',
        table
      }, (payload) => {
        const realtimeEvent: RealtimeEvent<T> = {
          eventType: payload.eventType as any,
          new: payload.new as T,
          old: payload.old as T,
          table: payload.table,
          schema: payload.schema,
          commit_timestamp: payload.commit_timestamp
        }
        callback(realtimeEvent)
      })
      .subscribe()

    this.subscriptions.set(subscriptionId, channel)

    return {
      id: subscriptionId,
      table,
      unsubscribe: () => this.unsubscribe(subscriptionId)
    }
  }

  async unsubscribe(subscriptionId: string): Promise<void> {
    const channel = this.subscriptions.get(subscriptionId)
    if (channel) {
      await this.client.removeChannel(channel)
      this.subscriptions.delete(subscriptionId)
    }
  }

  // Utilidades
  async count(
    table: string,
    options: Pick<QueryOptions, 'where'> = {}
  ): Promise<DatabaseResponse<number>> {
    try {
      let query = this.client.from(table).select('*', { count: 'exact', head: true })

      if (options.where) {
        Object.entries(options.where).forEach(([key, value]) => {
          query = query.eq(key, value)
        })
      }

      const { count, error } = await query

      return {
        data: count || 0,
        error: error ? this.mapSupabaseError(error) : null
      }
    } catch (error) {
      return {
        data: null,
        error: this.mapSupabaseError(error)
      }
    }
  }

  async exists(table: string, id: string): Promise<DatabaseResponse<boolean>> {
    try {
      const { count, error } = await this.client
        .from(table)
        .select('id', { count: 'exact', head: true })
        .eq('id', id)

      return {
        data: (count || 0) > 0,
        error: error ? this.mapSupabaseError(error) : null
      }
    } catch (error) {
      return {
        data: null,
        error: this.mapSupabaseError(error)
      }
    }
  }

  // Storage (Supabase Storage)
  async uploadFile(
    bucket: string,
    path: string,
    file: File | Buffer
  ): Promise<DatabaseResponse<{ path: string; url: string }>> {
    try {
      const { data, error } = await this.client.storage
        .from(bucket)
        .upload(path, file)

      if (error) {
        return {
          data: null,
          error: this.mapSupabaseError(error)
        }
      }

      const { data: { publicUrl } } = this.client.storage
        .from(bucket)
        .getPublicUrl(path)

      return {
        data: {
          path: data.path,
          url: publicUrl
        },
        error: null
      }
    } catch (error) {
      return {
        data: null,
        error: this.mapSupabaseError(error)
      }
    }
  }

  async downloadFile(
    bucket: string,
    path: string
  ): Promise<DatabaseResponse<{ data: Blob; url: string }>> {
    try {
      const { data, error } = await this.client.storage
        .from(bucket)
        .download(path)

      if (error) {
        return {
          data: null,
          error: this.mapSupabaseError(error)
        }
      }

      const { data: { publicUrl } } = this.client.storage
        .from(bucket)
        .getPublicUrl(path)

      return {
        data: {
          data: data as Blob,
          url: publicUrl
        },
        error: null
      }
    } catch (error) {
      return {
        data: null,
        error: this.mapSupabaseError(error)
      }
    }
  }

  async deleteFile(bucket: string, path: string): Promise<DatabaseResponse<void>> {
    try {
      const { error } = await this.client.storage
        .from(bucket)
        .remove([path])

      return {
        data: error ? null : undefined,
        error: error ? this.mapSupabaseError(error) : null
      }
    } catch (error) {
      return {
        data: null,
        error: this.mapSupabaseError(error)
      }
    }
  }

  // Inicialização e cleanup
  async initialize(): Promise<void> {
    // Verificar conexão
    const health = await this.getHealth()
    if (health.status === 'unhealthy') {
      console.warn('Supabase connection is unhealthy:', health.details)
    }
  }

  async cleanup(): Promise<void> {
    // Limpar todas as subscriptions
    for (const [id] of this.subscriptions) {
      await this.unsubscribe(id)
    }
    this.subscriptions.clear()
  }

  // Mapper para erros (Single Responsibility)
  private mapSupabaseError(error: any): DatabaseError {
    return {
      code: error.code || error.error_code || 'unknown_error',
      message: error.message || 'An unknown database error occurred',
      details: error,
      hint: error.hint
    }
  }
}