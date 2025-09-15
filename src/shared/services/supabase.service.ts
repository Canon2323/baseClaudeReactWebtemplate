import { createClient } from '@supabase/supabase-js'

// Supabase service following Dependency Inversion
// Depends on environment configuration, not hard-coded values
export interface ISupabaseConfig {
  url: string
  anonKey: string
  serviceRoleKey?: string
}

export interface ISupabaseService {
  getClient(): ReturnType<typeof createClient>
  getServiceClient(): ReturnType<typeof createClient>
}

// Single Responsibility - only handles Supabase client creation
export class SupabaseService implements ISupabaseService {
  private client: ReturnType<typeof createClient> | null = null
  private serviceClient: ReturnType<typeof createClient> | null = null

  constructor(private config: ISupabaseConfig) {}

  getClient(): ReturnType<typeof createClient> {
    if (!this.client) {
      this.client = createClient(this.config.url, this.config.anonKey, {
        auth: {
          autoRefreshToken: true,
          persistSession: true,
        },
      })
    }
    return this.client
  }

  getServiceClient(): ReturnType<typeof createClient> {
    if (!this.config.serviceRoleKey) {
      throw new Error('Service role key not configured')
    }

    if (!this.serviceClient) {
      this.serviceClient = createClient(this.config.url, this.config.serviceRoleKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      })
    }
    return this.serviceClient
  }
}

// Factory function for easy instantiation
export const createSupabaseService = (config: ISupabaseConfig): ISupabaseService => {
  return new SupabaseService(config)
}