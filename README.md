This project is a starter template for building modern web applications using React together with Claude Code.
It provides a quick and clean setup, so you can focus on writing features instead of boilerplate configuration.

Features

⚡ Quick start: minimal configuration to get your app running fast.

<<<<<<< HEAD
🛠 Claude Code integration: ready-to-use setup for experimenting with Claude's coding capabilities.
=======
🛠 Claude Code integration: ready-to-use setup for experimenting with Claude’s coding capabilities.
>>>>>>> 2df8104fb7354b97e10463f72958422cc8983e64

🎨 React best practices: structured project with reusable components and clear organization.

🚀 Extensible: easily adaptable for small prototypes or larger projects.

Use cases

Kickstarting new React projects without wasting time on setup.

Prototyping apps that leverage Claude Code for AI-assisted development.

Learning how to integrate Claude into a modern React environment.

# 🚀 Next.js SOLID Boilerplate

Modern Next.js template with SOLID architecture, TypeScript, Tailwind CSS and Vertical Slice organization.

🌐 **English** | [Português](./README.pt-BR.md)

## ⚡ Quick Start

```bash
# Clone and setup automatically
git clone <this-repo> my-app
cd my-app
npm run setup

# Start development (everything configured automatically)
npm run dev
```

## ✨ Features

- **Next.js 14+** with App Router
- **TypeScript** + **Tailwind CSS** + **shadcn/ui**
- **SOLID Architecture** with Vertical Slice
- **Supabase** for auth & database (local)
- **RBAC System** with granular permissions
- **Payment Integration** (Stripe, Paddle, LemonSqueezy)
- **Git hooks** (Husky + lint-staged) for code quality

### 🏗️ SOLID Principles

- **S**ingle Responsibility - One class/function = one responsibility
- **O**pen/Closed - Open for extension, closed for modification
- **L**iskov Substitution - Subtypes must be substitutable
- **I**nterface Segregation - Specific interfaces > general interfaces
- **D**ependency Inversion - Depend on abstractions, not concretes

### 🔌 11 MCP Servers (Claude Code Integration)
1. **shadcn/ui MCP** - Install/manage UI components
2. **Playwright MCP** - Browser automation & testing
3. **Figma MCP** - Design-to-code integration
4. **Apify MCP** - Web scraping & data extraction
5. **Browser Automation MCP** - Additional browser control
6. **Gemini MCP** - Google AI model integration
7. **Context7 MCP** - Real-time documentation search
8. **Stripe MCP** - Payment processing integration
9. **Supabase MCP** - Local Supabase database operations
10. **Filesystem MCP** - File system operations
11. **Serena MCP** - AI coding agent toolkit

**Note**: Git/GitHub operations use standard **CLI tools** (GitHub CLI + Git) for better performance.

### 🪝 Code Quality Hooks
Automatic code quality checks on Git operations:
- **Pre-commit**: Auto-format, lint, and type-check before commits
- **Pre-push**: Final validation before pushing to remote
- **Commit-msg**: Validates commit message format (optional)

### 🛡️ Security & Access Control
- **RBAC System** - Role-based access control with Supabase RLS
- **Multi-tenant** - Organization-based permissions
- **JWT Claims** - Automatic role/permission injection
- **VibeKit** - AI agent sandbox isolation

### 💳 SaaS Features (Next.js SaaS Starter Integration)
- **Payment Processing** - Stripe, Paddle, LemonSqueezy support
- **Subscription Management** - Complete billing workflows
- **Customer Portal** - Self-service billing management
- **Webhook Handling** - Automated payment event processing

### 📋 Spec-Driven Development
- **GitHub Spec Kit** - Specification-first development methodology
- **Structured AI interactions** with Claude Code
- **Living documentation** that evolves with code

## 📦 Scripts

```bash
npm run setup              # Complete setup
<<<<<<< HEAD
npm run setup:spec-kit     # Setup Spec-Driven Development
=======
>>>>>>> 2df8104fb7354b97e10463f72958422cc8983e64
npm run dev                # Development server
npm run build              # Production build
npm run lint:fix           # Fix linting issues
npm run format             # Format code
npm run generate:feature   # Generate new feature
```

## 📁 Project Structure

```
src/
├── app/                # Next.js App Router
├── components/         # Global components
│   └── ui/            # shadcn/ui components
├── features/          # Business domains (Vertical Slice)
│   ├── [feature]/
│   │   ├── components/  # Domain-specific UI
│   │   ├── hooks/       # Domain hooks
│   │   ├── services/    # Business logic
│   │   ├── stores/      # Domain state
│   │   └── types/       # Domain types
├── shared/            # Cross-cutting concerns
│   ├── components/    # Shared components
│   ├── hooks/         # Global hooks
│   ├── stores/        # Global state
│   ├── services/      # Infrastructure services
│   └── utils/         # Utilities
├── config/            # Configuration
├── tests/             # E2E tests
└── middleware.ts      # Route middleware
<<<<<<< HEAD

specs/             # 📋 Spec-Driven Development
├── requirements.md # Product specifications
├── plan.md        # Technical implementation plan
└── tasks/         # Actionable task breakdown

docs/             # 📚 Documentation
├── MCP-SERVERS.md # MCP configuration guide
├── SPEC-DRIVEN-DEVELOPMENT.md # Spec Kit usage
├── RBAC.md       # Role-based access control guide
└── HOOKS.md      # Git hooks documentation
=======
>>>>>>> 2df8104fb7354b97e10463f72958422cc8983e64
```

### 🎯 Features vs Shared - When to use each?

**Features/** - Domain-specific business code:
- ✅ Components that only exist in one context (e.g., `UserProfileCard`)
- ✅ Specific business logic (e.g., `calculateOrderTotal`)
- ✅ Domain local state (e.g., `useProductFilters`)
- ✅ Domain types (e.g., `interface Product`)

**Shared/** - Reusable code across multiple domains:
- ✅ Generic components (e.g., `Button`, `Modal`, `Toast`)
- ✅ Utility hooks (e.g., `useDebounce`, `useLocalStorage`)
- ✅ Global application state (e.g., `authStore`, `themeStore`)
- ✅ Infrastructure services (e.g., `apiClient`, `logger`)
- ✅ Pure utilities (e.g., `formatCurrency`, `validateEmail`)

**Golden rule**: If used by 2+ features → `shared/`. If specific to one feature → `features/[name]/`

## 📚 Architecture Guide: Types, Hooks, and Stores

### 📝 **Types** - Data Structure Definitions

**What they are:** TypeScript interfaces and types that define data structures.

**When to use:**
- Define API data formats
- Create contracts between layers
- Ensure type safety
- Document data structures

**Example:**
```typescript
// features/users/types/user.types.ts
export interface User {
  id: string
  email: string
  name: string
}
```

**Where to place:**
- `features/[domain]/types/` - Domain-specific types
- `shared/types/` - Globally shared types

### 🪝 **Hooks** - Reusable Logic

**What they are:** Functions that encapsulate state logic and React side effects.

**When to use:**
- Share logic between components
- Manage component local state
- Execute side effects (API calls, subscriptions)
- Abstract complex UI logic

**Example:**
```typescript
// features/users/hooks/useUser.ts
export function useUser(userId: string) {
  const [user, setUser] = useState<User>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    userService.getById(userId)
      .then(setUser)
      .finally(() => setLoading(false))
  }, [userId])

  return { user, loading }
}
```

**Where to place:**
- `features/[domain]/hooks/` - Domain-specific hooks
- `shared/hooks/` - Global utility hooks

### 🗄️ **Stores** - Global State

**What they are:** Shared state containers between components using Zustand.

**When to use:**
- State that needs to be accessed by multiple components
- Data that persists between page navigations
- User data cache
- Application state (theme, language, authentication)

**Example:**
```typescript
// shared/stores/auth.store.ts
export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,

  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false })
}))
```

**Where to place:**
- `shared/stores/` - Global state (auth, theme, UI)
- `features/[domain]/stores/` - Domain-specific state

## 🎯 Quick Decision Guide

| I need to... | Use | Example |
|---------------|-----|---------|
| Define data format | **Types** | `interface Product { id: string; name: string }` |
| Fetch data in a component | **Hook** | `useProduct(id)` returns product and loading |
| Share state between pages | **Store** | Shopping cart, logged user |
| Validate data structure | **Types** + Zod | Validation schema with types |
| Temporary form state | **Hook** | `useForm()` with react-hook-form |
| API data cache | **Store** or React Query | Already loaded products list |
| Reusable UI logic | **Hook** | `useModal()`, `useDebounce()` |
| Global settings | **Store** | Theme, language, preferences |

## 🛡️ Middleware

The `src/middleware.ts` file manages:
- Route protection and authentication
- Request/response modifications
- Redirects and rewrites
- Access control for protected routes

Location: `src/middleware.ts` (same level as `src/app/`)

## 🗄️ Supabase Configuration

**Local Supabase** is automatically installed and configured.

To change keys: edit `scripts/setup-all.js` lines 127-129.

### Access Local Supabase
- **Database**: http://127.0.0.1:54321
- **Dashboard**: http://127.0.0.1:54323

## 🧪 Testing

### Unit Tests (Jest)
```bash
npm run test           # Run tests
npm run test:watch     # Watch mode
npm run test:coverage  # Coverage report
```

### E2E Tests (Playwright)
```bash
npm run test:e2e       # Run E2E tests
npm run test:e2e:ui    # Visual interface
```

## 🚀 Generating New Feature

```bash
npm run generate:feature

# Follow prompts:
# - Feature name (e.g., products)
# - Include store? (y/n)
# - Include service? (y/n)
```

This will create complete structure:
```
features/products/
├── components/
├── hooks/
├── services/
├── stores/
├── types/
└── index.ts
```

<<<<<<< HEAD
## 🚀 **Spec-Driven Development Quick Start**

```bash
# 1. Setup Spec Kit
npm run setup:spec-kit

# 2. Start specifying in Claude Code
/specify Build a user dashboard with analytics and settings

# 3. Plan implementation
/plan Use our SOLID providers (Auth, Database, Theme) + shadcn/ui

# 4. Break into tasks
/tasks

# 5. Implement
implement specs/plan.md
```

**Benefits:**
- 📋 **Structured development** with clear specifications
- 🤖 **Enhanced AI interactions** with consistent context
- 📚 **Living documentation** that evolves with code
- 🏗️ **SOLID integration** - specs leverage existing architecture

See [Spec-Driven Development Guide](docs/SPEC-DRIVEN-DEVELOPMENT.md) for detailed usage.

## 🛡️ **RBAC Quick Start**

```tsx
// 1. Wrap your app with RBAC provider
<RBACProvider>
  <App />
</RBACProvider>

// 2. Protect components with permissions
<RBACGuard permissions={['users.create']}>
  <CreateUserButton />
</RBACGuard>

// 3. Use hooks for conditional logic
const { hasPermission, hasRole } = useRBAC()
if (hasPermission('billing.read')) {
  // Show billing section
}

// 4. Admin-only components
<AdminGuard fallback={<div>Access denied</div>}>
  <AdminPanel />
</AdminGuard>
```

**Features:**
- 🎯 **Granular permissions** - Resource-based access control
- 🏢 **Multi-tenant** - Organization-scoped permissions
- ⚡ **JWT integration** - Permissions in token for performance
- 🔒 **Supabase RLS** - Database-level security
- 🎨 **React components** - Guards, hooks, and providers

See [RBAC Documentation](docs/RBAC.md) for complete guide.

=======
>>>>>>> 2df8104fb7354b97e10463f72958422cc8983e64
## 📋 Best Practices Checklist

### Before Implementation
- [ ] Check if similar code already exists
- [ ] Confirm requirements with user
- [ ] Plan following SOLID principles

### During Implementation
- [ ] One responsibility per class/function
- [ ] Use appropriate TypeScript types
- [ ] Reuse existing code
- [ ] Follow project patterns

### After Implementation
- [ ] Run linter and type-check
- [ ] Add/update tests
- [ ] Request user approval

## 📚 Docs

- [MCP Servers](docs/MCP-SERVERS.md)
<<<<<<< HEAD
- [Spec-Driven Development](docs/SPEC-DRIVEN-DEVELOPMENT.md)
- [RBAC System](docs/RBAC.md)
=======
>>>>>>> 2df8104fb7354b97e10463f72958422cc8983e64
- [Git Hooks](docs/HOOKS.md)
- [Middleware](docs/MIDDLEWARE.md)

## 🙏 **Acknowledgments**

This template integrates and adapts code from the excellent **Next.js SaaS Starter** by Vercel:
- **Repository**: [nextjs/saas-starter](https://github.com/nextjs/saas-starter)
- **Features integrated**: Stripe payments, RBAC system, activity logging
- **Adapted with**: SOLID architecture, MCP integration, Spec-Driven Development

**Special thanks to the Vercel team** for creating such a solid foundation for SaaS applications! 🚀

We've enhanced their approach with:
- ✅ **SOLID principles** implementation
- ✅ **11+ MCP servers** for enhanced development
- ✅ **Spec-Driven Development** methodology
- ✅ **Provider abstractions** for extensibility

## 📄 License

MIT

---

<<<<<<< HEAD
**Built with SOLID principles and software engineering best practices.**
=======
**Built with SOLID principles and software engineering best practices.**
>>>>>>> 2df8104fb7354b97e10463f72958422cc8983e64
