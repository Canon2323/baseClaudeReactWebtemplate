/**
 * Global type definitions used throughout the application
 */

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
  status: "success" | "error";
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

export interface FeatureFlag {
  name: string;
  enabled: boolean;
  description?: string;
}

/**
 * Utility types
 */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type ValueOf<T> = T[keyof T];

/**
 * Environment types
 */
export type Environment = "development" | "production" | "test";

/**
 * Theme types
 */
export type Theme = "light" | "dark" | "system";

/**
 * Common component props
 */
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface WithLoading {
  isLoading?: boolean;
}

export interface WithError {
  error?: string | null;
}

/**
 * Form types
 */
export interface FormFieldError {
  message: string;
  type: string;
}

export interface FormState<T = any> {
  data: T;
  errors: Record<string, FormFieldError>;
  isSubmitting: boolean;
  isValid: boolean;
}
