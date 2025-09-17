# 🛡️ RBAC (Role-Based Access Control)

Sistema completo de controle de acesso baseado em roles, inspirado no [Next.js SaaS Starter](https://github.com/nextjs/saas-starter) e aprimorado com princípios SOLID.

## 🎯 Visão Geral

O sistema RBAC fornece:
- **Controle granular** de permissões por recurso/ação
- **Roles hierárquicos** (super_admin > admin > owner > member > viewer)
- **Multi-tenant** com suporte a organizações
- **Integração nativa** com Supabase RLS
- **JWT Claims automáticos** para performance
- **Arquitetura SOLID** extensível

## 📁 Estrutura de Arquivos

```
src/shared/
├── types/rbac.ts                           # Interfaces TypeScript
├── services/rbac/
│   ├── rbac-factory.ts                     # Factory + Manager patterns
│   └── providers/
│       └── supabase-rbac-provider.ts       # Implementação Supabase
├── hooks/use-rbac.ts                       # React hooks
└── components/
    ├── rbac/rbac-guard.tsx                 # Componentes de proteção
    └── providers/rbac-provider.tsx         # Provider de inicialização

database/
└── rbac-schema.sql                         # Schema completo do banco
```

## 🗄️ Database Schema

### Tabelas Principais

- **`roles`** - Definição de roles do sistema
- **`permissions`** - Permissões granulares (resource.action)
- **`role_permissions`** - Associação roles ↔ permissions
- **`user_roles`** - Atribuição de roles aos usuários

### RLS (Row Level Security)

Todas as tabelas têm RLS habilitado com políticas que:
- Permitem leitura para usuários autenticados
- Restringem escrita apenas para admins
- Verificam automaticamente via `auth.uid()`

### Helper Functions

```sql
-- Verificar se usuário tem permissão
SELECT user_has_permission('user-id', 'users.create');

-- Listar roles do usuário
SELECT * FROM get_user_roles('user-id');

-- Listar permissões do usuário
SELECT * FROM get_user_permissions('user-id');
```

## 🔧 Configuração Inicial

### 1. Aplicar Schema no Banco

```bash
# Executar o schema no Supabase
psql -h localhost -p 54322 -U postgres -d postgres -f database/rbac-schema.sql
```

### 2. Configurar Provider no App

```tsx
// app/layout.tsx
import { RBACProvider } from '@/shared/components/providers/rbac-provider'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <RBACProvider>
          {children}
        </RBACProvider>
      </body>
    </html>
  )
}
```

### 3. Variáveis de Ambiente

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 🚀 Como Usar

### 1. Hooks para Lógica

```tsx
import { useRBAC, useIsAdmin, useCanAccessResource } from '@/shared/hooks/use-rbac'

function MyComponent() {
  const { hasPermission, hasRole, userRoles } = useRBAC()
  const isAdmin = useIsAdmin()
  const { canRead, canWrite, canDelete } = useCanAccessResource('users')

  if (hasPermission('users.create')) {
    // Usuário pode criar usuários
  }

  if (hasRole('admin')) {
    // Usuário é admin
  }

  return (
    <div>
      {canWrite && <EditButton />}
      {canDelete && <DeleteButton />}
    </div>
  )
}
```

### 2. Componentes de Proteção

```tsx
import { RBACGuard, AdminGuard, PermissionGate } from '@/shared/components/rbac/rbac-guard'

function AdminPage() {
  return (
    <div>
      {/* Proteção por permissão */}
      <RBACGuard permissions={['users.create']}>
        <CreateUserButton />
      </RBACGuard>

      {/* Proteção por role */}
      <AdminGuard fallback={<div>Acesso negado</div>}>
        <AdminPanel />
      </AdminGuard>

      {/* Proteção por recurso/ação */}
      <RBACGuard resource="billing" action="read">
        <BillingSection />
      </RBACGuard>

      {/* Multiple permissions (ANY) */}
      <RBACGuard
        permissions={['users.read', 'users.update']}
        requireAllPermissions={false}
      >
        <UsersList />
      </RBACGuard>

      {/* Render prop pattern */}
      <RBACGuard
        permissions={['billing.update']}
        render={(hasAccess, loading) => (
          loading ? <Spinner /> :
          hasAccess ? <BillingForm /> : <UpgradePrompt />
        )}
      />
    </div>
  )
}
```

### 3. HOC para Páginas Inteiras

```tsx
import { withRBACGuard } from '@/shared/components/rbac/rbac-guard'

const AdminPage = withRBACGuard(
  () => <div>Admin Content</div>,
  {
    roles: ['admin', 'super_admin'],
    fallback: <div>Acesso negado</div>
  }
)
```

### 4. Gerenciamento Programático

```tsx
import { getRBACProvider } from '@/shared/services/rbac/rbac-factory'

async function assignRole() {
  const rbac = getRBACProvider()

  // Atribuir role ao usuário
  await rbac.assignRoleToUser('user-id', 'role-id', {
    organizationId: 'org-id',
    expiresAt: new Date('2024-12-31')
  })

  // Verificar permissão
  const hasPermission = await rbac.userHasPermission(
    'user-id',
    'users.create'
  )
}
```

## 🏢 Multi-tenant (Organizações)

O sistema suporta múltiplas organizações:

```tsx
// Hook com contexto de organização
const { hasPermission } = useRBAC('org-123')

// Guard com organização
<RBACGuard
  permissions={['users.read']}
  organizationId="org-123"
>
  <UsersList />
</RBACGuard>

// Verificação programática
await rbac.userHasPermission('user-id', 'users.create', 'org-123')
```

## 🔑 Roles e Permissions Padrão

### Roles Hierárquicos

```typescript
DEFAULT_ROLES = {
  SUPER_ADMIN: 'super_admin',  // Acesso total ao sistema
  ADMIN: 'admin',              // Administrador da organização
  OWNER: 'owner',              // Dono da organização
  MEMBER: 'member',            // Membro com acesso limitado
  VIEWER: 'viewer'             // Apenas leitura
}
```

### Permissions por Recurso

```typescript
DEFAULT_PERMISSIONS = {
  // Usuários
  USERS_CREATE: 'users.create',
  USERS_READ: 'users.read',
  USERS_UPDATE: 'users.update',
  USERS_DELETE: 'users.delete',
  USERS_INVITE: 'users.invite',

  // Organização
  ORGANIZATION_READ: 'organization.read',
  ORGANIZATION_UPDATE: 'organization.update',
  ORGANIZATION_DELETE: 'organization.delete',
  ORGANIZATION_BILLING: 'organization.billing',

  // Conteúdo
  CONTENT_CREATE: 'content.create',
  CONTENT_READ: 'content.read',
  CONTENT_UPDATE: 'content.update',
  CONTENT_DELETE: 'content.delete',
  CONTENT_PUBLISH: 'content.publish',

  // Billing
  BILLING_READ: 'billing.read',
  BILLING_UPDATE: 'billing.update',
  BILLING_CANCEL: 'billing.cancel',

  // Analytics
  ANALYTICS_READ: 'analytics.read',
  REPORTS_EXPORT: 'reports.export',

  // Sistema
  SYSTEM_LOGS: 'system.logs',
  SYSTEM_SETTINGS: 'system.settings'
}
```

## 🔄 JWT Claims Automáticos

O sistema adiciona automaticamente ao JWT:

```json
{
  "user_roles": ["admin", "member"],
  "user_permissions": ["users.read", "users.create", "content.read"]
}
```

Isso permite verificações rápidas no frontend sem consultas extras ao banco.

## 🧪 Patterns de Uso Avançado

### 1. Conditional Rendering

```tsx
function ConditionalContent() {
  const { hasPermission } = useRBAC()

  return (
    <div>
      {hasPermission('content.create') && <CreateButton />}
      {hasPermission('content.publish') && <PublishButton />}
      {hasPermission('analytics.read') && <AnalyticsWidget />}
    </div>
  )
}
```

### 2. Form Field Protection

```tsx
function UserForm() {
  const { canAccess } = useRBAC()

  return (
    <form>
      <input name="name" />
      <input name="email" />

      {canAccess('users', 'update') && (
        <select name="role">
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>
      )}
    </form>
  )
}
```

### 3. Dynamic Menu

```tsx
function Navigation() {
  const { hasPermission } = useRBAC()

  const menuItems = [
    { label: 'Dashboard', path: '/', permission: null },
    { label: 'Users', path: '/users', permission: 'users.read' },
    { label: 'Analytics', path: '/analytics', permission: 'analytics.read' },
    { label: 'Settings', path: '/settings', permission: 'organization.update' }
  ]

  return (
    <nav>
      {menuItems
        .filter(item => !item.permission || hasPermission(item.permission))
        .map(item => (
          <Link key={item.path} href={item.path}>
            {item.label}
          </Link>
        ))
      }
    </nav>
  )
}
```

## 🚨 Error Handling

```tsx
import { RBACErrorBoundary } from '@/shared/components/providers/rbac-provider'

function App() {
  return (
    <RBACProvider>
      <RBACErrorBoundary
        fallback={<div>Erro ao carregar permissões</div>}
      >
        <MyApp />
      </RBACErrorBoundary>
    </RBACProvider>
  )
}
```

## 🔧 Extensibilidade

### Adicionando Novo Provider

```typescript
// 1. Criar novo provider
class CustomRBACProvider implements IRBACProvider {
  // Implementar interface...
}

// 2. Registrar no factory
RBACProviderFactory.registerProvider('custom', async () => {
  return new CustomRBACProvider()
})

// 3. Usar
<RBACProvider config={{ provider: 'custom' }}>
  <App />
</RBACProvider>
```

### Permissions Customizadas

```typescript
// Adicionar ao database
INSERT INTO permissions (name, description, resource, action) VALUES
('reports.advanced', 'Access advanced reports', 'reports', 'advanced');

// Usar no código
const { hasPermission } = useRBAC()
if (hasPermission('reports.advanced')) {
  // Mostrar relatórios avançados
}
```

## 📊 Performance

### Otimizações Implementadas

- **JWT Claims** - Permissões no token (sem consultas extras)
- **Indexes** - Consultas otimizadas no banco
- **Caching** - Hook com cache automático
- **RLS** - Segurança no nível do banco
- **Batch queries** - Múltiplas consultas em paralelo

### Monitoramento

```tsx
function PerformanceMonitor() {
  const { loading } = useRBAC()

  useEffect(() => {
    if (loading) {
      console.time('RBAC Load')
    } else {
      console.timeEnd('RBAC Load')
    }
  }, [loading])
}
```

## 🛡️ Segurança

### Princípios Implementados

- **Defense in Depth** - RLS + Application + UI
- **Principle of Least Privilege** - Permissions mínimas necessárias
- **Zero Trust** - Verificação em cada ponto
- **Audit Trail** - Logs de todas as operações

### Checklist de Segurança

- ✅ RLS habilitado em todas as tabelas
- ✅ Service role key protegida (server-side only)
- ✅ JWT claims validados no backend
- ✅ Permissions verificadas no frontend E backend
- ✅ Audit logs de mudanças de roles
- ✅ Expiração automática de roles

## 🔄 Migração e Versionamento

### Adicionando Nova Permission

```sql
-- 1. Adicionar permission
INSERT INTO permissions (name, description, resource, action)
VALUES ('new.permission', 'Description', 'resource', 'action');

-- 2. Atribuir a roles existentes
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r, permissions p
WHERE r.name = 'admin' AND p.name = 'new.permission';
```

### Backup de Configurações

```sql
-- Export roles e permissions
COPY (SELECT * FROM roles) TO 'roles_backup.csv' WITH CSV HEADER;
COPY (SELECT * FROM permissions) TO 'permissions_backup.csv' WITH CSV HEADER;
COPY (SELECT * FROM role_permissions) TO 'role_permissions_backup.csv' WITH CSV HEADER;
```

## 📚 Referências

- [Next.js SaaS Starter](https://github.com/nextjs/saas-starter) - Inspiração base
- [Supabase RLS](https://supabase.com/docs/guides/auth/row-level-security) - Row Level Security
- [RBAC Patterns](https://auth0.com/docs/manage-users/access-control/rbac) - Padrões de RBAC

## 🤝 Contribuição

Para adicionar novas funcionalidades:

1. Seguir princípios SOLID
2. Manter compatibilidade com interface `IRBACProvider`
3. Adicionar testes para novos providers
4. Documentar mudanças no schema
5. Atualizar esta documentação