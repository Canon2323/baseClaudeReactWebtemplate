import { z } from 'zod'

// Base validation service using Zod
// Single Responsibility - only handles validation logic
export interface IValidationService {
  validate<T>(schema: z.ZodSchema<T>, data: unknown): Promise<T>
  validateSync<T>(schema: z.ZodSchema<T>, data: unknown): T
}

export class ValidationService implements IValidationService {
  async validate<T>(schema: z.ZodSchema<T>, data: unknown): Promise<T> {
    try {
      return await schema.parseAsync(data)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map(err => `${err.path.join('.')}: ${err.message}`)
        throw new ValidationError(errorMessages.join(', '))
      }
      throw error
    }
  }

  validateSync<T>(schema: z.ZodSchema<T>, data: unknown): T {
    try {
      return schema.parse(data)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map(err => `${err.path.join('.')}: ${err.message}`)
        throw new ValidationError(errorMessages.join(', '))
      }
      throw error
    }
  }
}

// Custom error class for validation errors
export class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

// Common validation schemas
export const commonSchemas = {
  id: z.string().uuid('Invalid ID format'),
  email: z.string().email('Invalid email format'),
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  pagination: z.object({
    limit: z.number().min(1).max(100).optional().default(20),
    offset: z.number().min(0).optional().default(0),
  }),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
}

// Factory function
export const createValidationService = (): IValidationService => {
  return new ValidationService()
}