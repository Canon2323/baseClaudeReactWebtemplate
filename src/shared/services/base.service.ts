// Base interfaces for all services following SOLID principles

// Interface Segregation - base CRUD operations
export interface IRepository<T, CreateInput, UpdateInput, FilterInput> {
  findById(id: string): Promise<T | null>;
  findMany(
    filter: FilterInput,
  ): Promise<{ items: T[]; total: number; hasMore: boolean }>;
  create(input: CreateInput): Promise<T>;
  update(id: string, input: UpdateInput): Promise<T>;
  delete(id: string): Promise<void>;
}

// Single Responsibility - only validation
export interface IValidator<CreateInput, UpdateInput> {
  validateCreateInput(input: CreateInput): Promise<void>;
  validateUpdateInput(input: UpdateInput): Promise<void>;
}

// Base service implementing common patterns
export abstract class BaseService<T, CreateInput, UpdateInput, FilterInput> {
  constructor(
    protected repository: IRepository<T, CreateInput, UpdateInput, FilterInput>,
    protected validator: IValidator<CreateInput, UpdateInput>,
  ) {}

  async getById(id: string): Promise<T | null> {
    if (!id) throw new Error("ID is required");
    return this.repository.findById(id);
  }

  async getMany(
    filter: FilterInput,
  ): Promise<{ items: T[]; total: number; hasMore: boolean }> {
    return this.repository.findMany(filter);
  }

  async create(input: CreateInput): Promise<T> {
    await this.validator.validateCreateInput(input);
    return this.repository.create(input);
  }

  async update(id: string, input: UpdateInput): Promise<T> {
    if (!id) throw new Error("ID is required");

    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new Error("Resource not found");
    }

    await this.validator.validateUpdateInput(input);
    return this.repository.update(id, input);
  }

  async delete(id: string): Promise<void> {
    if (!id) throw new Error("ID is required");

    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new Error("Resource not found");
    }

    await this.repository.delete(id);
  }
}
