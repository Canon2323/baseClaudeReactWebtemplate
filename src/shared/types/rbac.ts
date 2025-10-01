// RBAC types inspired by Next.js SaaS Starter
// Repository: https://github.com/nextjs/saas-starter
// Enhanced with SOLID principles for our template

export interface Role {
  id: string;
  name: string;
  description?: string;
  isSystem: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Permission {
  id: string;
  name: string;
  description?: string;
  resource: string;
  action: string;
  createdAt: Date;
}

export interface UserRole {
  id: string;
  userId: string;
  roleId: string;
  organizationId?: string;
  assignedBy?: string;
  assignedAt: Date;
  expiresAt?: Date;
  isActive: boolean;
}

export interface RolePermission {
  roleId: string;
  permissionId: string;
  createdAt: Date;
}

// RBAC Provider Interface (Dependency Inversion Principle)
export interface IRBACProvider {
  // Roles
  getRoles(): Promise<Role[]>;
  getRole(roleId: string): Promise<Role | null>;
  createRole(data: Omit<Role, "id" | "createdAt" | "updatedAt">): Promise<Role>;
  updateRole(roleId: string, data: Partial<Role>): Promise<Role>;
  deleteRole(roleId: string): Promise<void>;

  // Permissions
  getPermissions(): Promise<Permission[]>;
  getPermission(permissionId: string): Promise<Permission | null>;
  createPermission(
    data: Omit<Permission, "id" | "createdAt">,
  ): Promise<Permission>;
  updatePermission(
    permissionId: string,
    data: Partial<Permission>,
  ): Promise<Permission>;
  deletePermission(permissionId: string): Promise<void>;

  // Role Permissions
  getRolePermissions(roleId: string): Promise<Permission[]>;
  assignPermissionToRole(roleId: string, permissionId: string): Promise<void>;
  removePermissionFromRole(roleId: string, permissionId: string): Promise<void>;

  // User Roles
  getUserRoles(userId: string, organizationId?: string): Promise<Role[]>;
  getUserPermissions(
    userId: string,
    organizationId?: string,
  ): Promise<Permission[]>;
  assignRoleToUser(
    userId: string,
    roleId: string,
    options?: AssignRoleOptions,
  ): Promise<UserRole>;
  removeRoleFromUser(
    userId: string,
    roleId: string,
    organizationId?: string,
  ): Promise<void>;

  // Permission Checking
  userHasPermission(
    userId: string,
    permissionName: string,
    organizationId?: string,
  ): Promise<boolean>;
  userHasRole(
    userId: string,
    roleName: string,
    organizationId?: string,
  ): Promise<boolean>;

  // Multi-tenant support
  getUsersByRole(roleName: string, organizationId?: string): Promise<string[]>;
  getOrganizationUsers(organizationId: string): Promise<UserRole[]>;

  // Initialization
  initialize(): Promise<void>;
  cleanup(): Promise<void>;
}

// Configuration options
export interface AssignRoleOptions {
  organizationId?: string;
  assignedBy?: string;
  expiresAt?: Date;
  isActive?: boolean;
}

export interface RBACProviderConfig {
  type: RBACProviderType;
  options: Record<string, any>;
}

// Provider types for Factory Pattern
export type RBACProviderType = "supabase" | "database";

// JWT Claims interface (for integration with auth providers)
export interface RBACClaims {
  user_roles: string[];
  user_permissions: string[];
}

// Response types
export interface RBACResponse<T = any> {
  data: T | null;
  error: RBACError | null;
}

export interface RBACError {
  code: string;
  message: string;
  details?: any;
}

// Pre-defined roles and permissions (from database schema)
export const DEFAULT_ROLES = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  OWNER: "owner",
  MEMBER: "member",
  VIEWER: "viewer",
} as const;

export const DEFAULT_PERMISSIONS = {
  // Users
  USERS_CREATE: "users.create",
  USERS_READ: "users.read",
  USERS_UPDATE: "users.update",
  USERS_DELETE: "users.delete",
  USERS_INVITE: "users.invite",

  // Organization
  ORGANIZATION_READ: "organization.read",
  ORGANIZATION_UPDATE: "organization.update",
  ORGANIZATION_DELETE: "organization.delete",
  ORGANIZATION_BILLING: "organization.billing",

  // Content
  CONTENT_CREATE: "content.create",
  CONTENT_READ: "content.read",
  CONTENT_UPDATE: "content.update",
  CONTENT_DELETE: "content.delete",
  CONTENT_PUBLISH: "content.publish",

  // Billing
  BILLING_READ: "billing.read",
  BILLING_UPDATE: "billing.update",
  BILLING_CANCEL: "billing.cancel",

  // Analytics
  ANALYTICS_READ: "analytics.read",
  REPORTS_EXPORT: "reports.export",

  // System
  SYSTEM_LOGS: "system.logs",
  SYSTEM_SETTINGS: "system.settings",
} as const;

// Utility types
export type DefaultRole = (typeof DEFAULT_ROLES)[keyof typeof DEFAULT_ROLES];
export type DefaultPermission =
  (typeof DEFAULT_PERMISSIONS)[keyof typeof DEFAULT_PERMISSIONS];

// Helper functions
export const isSystemRole = (roleName: string): boolean => {
  return Object.values(DEFAULT_ROLES).includes(roleName as DefaultRole);
};

export const hasRequiredPermissions = (
  userPermissions: string[],
  requiredPermissions: string[],
): boolean => {
  return requiredPermissions.every((permission) =>
    userPermissions.includes(permission),
  );
};

export const canAccessResource = (
  userPermissions: string[],
  resource: string,
  action: string,
): boolean => {
  const permissionName = `${resource}.${action}`;
  return userPermissions.includes(permissionName);
};

// Resource-action mapping for type safety
export interface ResourceAction {
  resource: string;
  action:
    | "create"
    | "read"
    | "update"
    | "delete"
    | "invite"
    | "publish"
    | "billing"
    | "export";
}

// Multi-tenant organization support
export interface Organization {
  id: string;
  name: string;
  ownerId: string;
  settings?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

// RBAC Context for React components
export interface RBACContext {
  userRoles: Role[];
  userPermissions: Permission[];
  hasPermission: (permission: string) => boolean;
  hasRole: (role: string) => boolean;
  canAccess: (resource: string, action: string) => boolean;
  loading: boolean;
  organizationId?: string;
}

// Hook return type for useRBAC
export interface UseRBACReturn extends RBACContext {
  refetch: () => Promise<void>;
  error: RBACError | null;
}
