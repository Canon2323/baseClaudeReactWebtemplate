# 🚀 Next.js SOLID Boilerplate

Clean, minimal Next.js template with SOLID architecture, TypeScript, Tailwind CSS, and Supabase.

## ⚡ Quick Start

```bash
# Clone and setup everything automatically
git clone <this-repo> my-app
cd my-app
npm run setup

# Start developing (everything configured automatically)
npm run dev
```

## ✨ Features

- **Next.js 14+** with App Router
- **TypeScript** + **Tailwind CSS** + **shadcn/ui**
- **SOLID Architecture** principles
- **Supabase** for auth & database (local)
- **Git hooks** (Husky + lint-staged) for code quality

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
npm run setup         # Complete setup
npm run dev          # Development
npm run build        # Production build
npm run lint:fix     # Fix linting
npm run format       # Format code
```

## 📁 Structure

```
src/
├── app/           # Next.js App Router pages
├── components/    # UI components (shadcn/ui)
├── lib/           # Utilities and helpers
├── hooks/         # Custom React hooks
├── types/         # TypeScript definitions
├── config/        # Configuration files
└── middleware.ts  # Route protection & auth middleware
```

## 🛡️ Middleware

The `src/middleware.ts` file handles:
- Route protection and authentication
- Request/response modifications
- Redirects and rewrites
- Access control for protected routes

Located at: `src/middleware.ts` (same level as `src/app/`)

## 🗄️ Supabase Configuration

**Local Supabase** is automatically installed and configured.

To change keys: edit `scripts/setup-all.js` lines 127-129.

### Access Local Supabase
- **Database**: http://127.0.0.1:54321  
- **Dashboard**: http://127.0.0.1:54323

## 📚 Docs

- [MCP Servers](docs/MCP-SERVERS.md)
- [Git Hooks](docs/HOOKS.md)  
- [Middleware](docs/MIDDLEWARE.md)

## 📄 License

MIT