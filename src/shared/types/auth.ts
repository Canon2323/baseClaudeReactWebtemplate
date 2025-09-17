export interface User {
  id: string
  email: string
  name?: string
  avatar?: string
  role?: string
  metadata?: Record<string, any>
}

export interface AuthSession {
  user: User
  token: string
  expiresAt?: Date
  refreshToken?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  email: string
  password: string
  name?: string
  metadata?: Record<string, any>
}

export interface ResetPasswordData {
  email: string
}

export interface AuthError {
  code: string
  message: string
  details?: any
}

export interface AuthState {
  user: User | null
  session: AuthSession | null
  isLoading: boolean
  isAuthenticated: boolean
  error: AuthError | null
}

// Interface principal do provider (DIP)
export interface IAuthProvider {
  // Estado
  getState(): AuthState

  // Autenticação
  login(credentials: LoginCredentials): Promise<AuthSession>
  register(credentials: RegisterCredentials): Promise<AuthSession>
  logout(): Promise<void>

  // Sessão
  getCurrentUser(): Promise<User | null>
  getCurrentSession(): Promise<AuthSession | null>
  refreshSession(): Promise<AuthSession | null>

  // Recuperação de senha
  resetPassword(data: ResetPasswordData): Promise<void>
  updatePassword(newPassword: string): Promise<void>

  // Listeners (Observer Pattern)
  onAuthStateChange(callback: (state: AuthState) => void): () => void

  // Inicialização
  initialize(): Promise<void>
  cleanup(): Promise<void>
}

// Tipos para Strategy Pattern
export type AuthProviderType = 'supabase' | 'clerk' | 'auth0' | 'nextauth'

export interface AuthProviderConfig {
  type: AuthProviderType
  options: Record<string, any>
}