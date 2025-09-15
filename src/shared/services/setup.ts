// Service setup and initialization
// This file configures all services following Dependency Inversion

import { 
  registerSingleton,
  SERVICE_KEYS,
  createSupabaseService,
  createValidationService,
  type ISupabaseConfig 
} from './index'

// Setup services with proper dependency injection
export const setupServices = () => {
  // Supabase configuration from environment
  const supabaseConfig: ISupabaseConfig = {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  }

  // Validate required environment variables
  if (!supabaseConfig.url || !supabaseConfig.anonKey) {
    throw new Error('Missing required Supabase environment variables')
  }

  // Register services as singletons
  registerSingleton(SERVICE_KEYS.SUPABASE, () => createSupabaseService(supabaseConfig))
  registerSingleton(SERVICE_KEYS.VALIDATION, () => createValidationService())

  console.log('✅ Services initialized successfully')
}

// Call this during app initialization
export const initializeServices = () => {
  try {
    setupServices()
  } catch (error) {
    console.error('❌ Failed to initialize services:', error)
    throw error
  }
}