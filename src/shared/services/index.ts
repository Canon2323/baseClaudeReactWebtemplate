// Main exports for services layer
// Following clean architecture principles

// Base services and interfaces
export { BaseService } from './base.service'
export type { IRepository, IValidator } from './base.service'

// Supabase integration
export { SupabaseService, createSupabaseService } from './supabase.service'
export type { ISupabaseService, ISupabaseConfig } from './supabase.service'

// Validation
export { ValidationService, ValidationError, createValidationService, commonSchemas } from './validation.service'
export type { IValidationService } from './validation.service'

// Dependency injection
export {
  DependencyContainer,
  container,
  registerService,
  registerSingleton,
  resolveService,
  hasService,
  SERVICE_KEYS,
} from './dependency-container'
export type { IDependencyContainer } from './dependency-container'