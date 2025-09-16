This project is a starter template for building modern web applications using React together with Claude Code.
It provides a quick and clean setup, so you can focus on writing features instead of boilerplate configuration.

Features

⚡ Quick start: minimal configuration to get your app running fast.

🛠 Claude Code integration: ready-to-use setup for experimenting with Claude’s coding capabilities.

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

### 🛡️ Security
- **VibeKit** - AI agent sandbox isolation

## 📦 Scripts

```bash
npm run setup              # Complete setup
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
- [Git Hooks](docs/HOOKS.md)
- [Middleware](docs/MIDDLEWARE.md)

## 📄 License

MIT

---

**Built with SOLID principles and software engineering best practices.**
