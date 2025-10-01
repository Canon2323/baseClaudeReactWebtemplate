// Tipos base para operações de banco
export interface DatabaseRecord {
  id: string;
  created_at?: string;
  updated_at?: string;
  [key: string]: any;
}

export interface QueryOptions {
  select?: string[];
  where?: Record<string, any>;
  orderBy?: { column: string; ascending?: boolean }[];
  limit?: number;
  offset?: number;
}

export interface InsertData {
  [key: string]: any;
}

export interface UpdateData {
  [key: string]: any;
}

export interface UpsertData extends InsertData {
  id?: string;
}

export interface DatabaseResponse<T = any> {
  data: T | null;
  error: DatabaseError | null;
  count?: number;
}

export interface DatabaseError {
  code: string;
  message: string;
  details?: any;
  hint?: string;
}

export interface TransactionContext {
  id: string;
  isActive: boolean;
}

export interface RealtimeSubscription {
  id: string;
  table: string;
  unsubscribe: () => void;
}

export interface RealtimeEvent<T = any> {
  eventType: "INSERT" | "UPDATE" | "DELETE";
  new?: T;
  old?: T;
  table: string;
  schema: string;
  commit_timestamp: string;
}

export type RealtimeCallback<T = any> = (event: RealtimeEvent<T>) => void;

// Interface principal do provider (DIP)
export interface IDatabaseProvider {
  // Conexão e configuração
  isConnected(): Promise<boolean>;
  getHealth(): Promise<{ status: "healthy" | "unhealthy"; details?: any }>;

  // CRUD Operations (Single Responsibility)
  // Create
  insert<T extends DatabaseRecord>(
    table: string,
    data: InsertData | InsertData[],
  ): Promise<DatabaseResponse<T[]>>;

  // Read
  select<T extends DatabaseRecord>(
    table: string,
    options?: QueryOptions,
  ): Promise<DatabaseResponse<T[]>>;

  selectOne<T extends DatabaseRecord>(
    table: string,
    id: string,
  ): Promise<DatabaseResponse<T>>;

  selectBy<T extends DatabaseRecord>(
    table: string,
    field: string,
    value: any,
    options?: Omit<QueryOptions, "where">,
  ): Promise<DatabaseResponse<T[]>>;

  // Update
  update<T extends DatabaseRecord>(
    table: string,
    id: string,
    data: UpdateData,
  ): Promise<DatabaseResponse<T>>;

  updateBy<T extends DatabaseRecord>(
    table: string,
    field: string,
    value: any,
    data: UpdateData,
  ): Promise<DatabaseResponse<T[]>>;

  // Delete
  delete<T extends DatabaseRecord>(
    table: string,
    id: string,
  ): Promise<DatabaseResponse<T>>;

  deleteBy<T extends DatabaseRecord>(
    table: string,
    field: string,
    value: any,
  ): Promise<DatabaseResponse<T[]>>;

  // Upsert
  upsert<T extends DatabaseRecord>(
    table: string,
    data: UpsertData | UpsertData[],
    conflictColumns?: string[],
  ): Promise<DatabaseResponse<T[]>>;

  // Raw Queries (para casos complexos)
  query<T = any>(sql: string, params?: any[]): Promise<DatabaseResponse<T[]>>;

  // Transações (ACID)
  transaction<T>(
    callback: (ctx: TransactionContext) => Promise<T>,
  ): Promise<DatabaseResponse<T>>;

  // Realtime (Observer Pattern)
  subscribe<T = any>(
    table: string,
    callback: RealtimeCallback<T>,
    options?: { event?: "INSERT" | "UPDATE" | "DELETE" | "*" },
  ): Promise<RealtimeSubscription>;

  unsubscribe(subscriptionId: string): Promise<void>;

  // Utilidades
  count(
    table: string,
    options?: Pick<QueryOptions, "where">,
  ): Promise<DatabaseResponse<number>>;
  exists(table: string, id: string): Promise<DatabaseResponse<boolean>>;

  // Storage (se aplicável)
  uploadFile?(
    bucket: string,
    path: string,
    file: File | Buffer,
  ): Promise<DatabaseResponse<{ path: string; url: string }>>;
  downloadFile?(
    bucket: string,
    path: string,
  ): Promise<DatabaseResponse<{ data: Blob; url: string }>>;
  deleteFile?(bucket: string, path: string): Promise<DatabaseResponse<void>>;

  // Inicialização e cleanup
  initialize(): Promise<void>;
  cleanup(): Promise<void>;
}

// Tipos para Strategy Pattern
export type DatabaseProviderType =
  | "supabase"
  | "planetscale"
  | "prisma"
  | "mongodb";

export interface DatabaseProviderConfig {
  type: DatabaseProviderType;
  options: Record<string, any>;
}

// Tipos específicos para Supabase
export interface SupabaseConfig {
  url: string;
  anonKey: string;
  serviceRoleKey?: string;
}

// Tipos específicos para PlanetScale
export interface PlanetScaleConfig {
  host: string;
  username: string;
  password: string;
  database: string;
}

// Tipos específicos para Prisma
export interface PrismaConfig {
  databaseUrl: string;
}

// Tipos específicos para MongoDB
export interface MongoDBConfig {
  connectionString: string;
  database: string;
}
