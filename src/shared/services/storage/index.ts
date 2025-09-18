// Storage Service Public Exports
// Following clean architecture principles

// Main service and factory
export { StorageService, createStorageService } from './storage.service'

// Core types and interfaces
export type {
  IStorageService,
  StorageOptions,
  SecureStorageOptions,
  StorageItem,
  SecureStorageItem,
  StorageUsage,
  StorageEvent,
  StorageEventCallback,
  CrossTabMessage,
  CleanupStrategy,
  StorageProvider,
  StorageProviderType,
  StorageServiceDependencies
} from './storage.types'

// Encryption service and types
export { EncryptionService } from './encryption.service'
export type {
  IEncryptionService,
  EncryptedData,
  EncryptionConfig
} from './storage.types'

// Cross-tab synchronization
export { CrossTabSyncService } from './cross-tab-sync.service'

// Storage providers
export { LocalStorageProvider } from './providers/local-storage.provider'
export { SessionStorageProvider } from './providers/session-storage.provider'
export { MemoryStorageProvider } from './providers/memory.provider'

// Error classes
export { StorageError, StorageQuotaError, EncryptionError } from './storage.types'