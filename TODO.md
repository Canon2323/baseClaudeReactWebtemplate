# 🚀 Boilerplate Web Project - Arquitetura SOLID
## Starter Template para Desenvolvimento Web Moderno

Este projeto é um **boilerplate/starter template** para desenvolvimento web com **Next.js**, **shadcn/ui** e **TypeScript**, seguindo os princípios **SOLID** para uma arquitetura robusta e de fácil manutenção.

### 🔌 MCPs como Facilitadores Externos
Os **servidores MCP** (Playwright, Figma, Supabase, etc.) são **facilitadores externos** que rodam como processos isolados. Eles **não fazem parte da arquitetura interna** do projeto, mas sim **potencializam o desenvolvimento** através de scripts de instalação e configuração.

## 🏗 Arquitetura SOLID do Boilerplate

### **S** - Single Responsibility Principle
- Cada componente/hook tem uma responsabilidade específica
- Services separados por domínio (auth, api, storage, etc.)
- Scripts de setup com responsabilidades bem definidas

### **O** - Open/Closed Principle
- Sistema extensível para novos providers/services
- Plugin architecture para funcionalidades opcionais
- Configurações modulares e extensíveis

### **L** - Liskov Substitution Principle
- Providers intercambiáveis (Auth0 ↔ Clerk, Supabase ↔ Firebase)
- Implementations específicas seguem contratos bem definidos
- Strategy Pattern para diferentes integrações

### **I** - Interface Segregation Principle
- Interfaces específicas por domínio (IAuthProvider, IStorageProvider)
- Hooks especializados sem dependências desnecessárias
- APIs granulares e focadas

### **D** - Dependency Inversion Principle
- Dependência de abstrações, não implementações
- Injeção de dependência via Context/Providers
- Factory Pattern para criação de services

## 📋 Estrutura do Projeto

### Fase 1: Arquitetura Base SOLID
- [ ] **1.1** - Setup do Next.js com Arquitetura SOLID
  - Inicializar Next.js 14+ com TypeScript
  - Configurar Tailwind CSS + shadcn/ui
  - **Estrutura de pastas baseada em SOLID**
  - ESLint + Prettier com regras arquiteturais

- [ ] **1.2** - Arquivos Base Fundamentais
  - **Core Config Files**: `middleware.ts`, `next.config.js`, `tailwind.config.ts`
  - **Environment**: `.env.example`, `src/config/env.ts`, `src/lib/constants.ts`
  - **Auth Base**: `src/lib/auth.ts`, `src/lib/session.ts`
  - **UI Base**: `src/lib/utils.ts`, `src/components/providers/theme-provider.tsx`
  - **Types**: `src/types/global.ts`, `src/types/api.ts`, `src/types/auth.ts`

- [ ] **1.3** - Core Architecture (Abstrações)
  - Definir interfaces para providers/services
  - Types e contratos bem definidos
  - Base classes e abstrações
  - Context providers setup

- [ ] **1.4** - Estrutura de Pastas SOLID
  ```
  project/
  ├── src/
  │   ├── app/                     # Next.js App Router
  │   │   ├── (auth)/              # Route groups
  │   │   ├── api/                 # API routes
  │   │   └── globals.css          # Global styles
  │   │
  │   ├── components/              # UI Components (SRP)
  │   │   ├── ui/                  # shadcn/ui base components
  │   │   ├── forms/               # Form components
  │   │   ├── layout/              # Layout components
  │   │   └── features/            # Feature-specific components
  │   │
  │   ├── lib/                     # Core Library (DIP)
  │   │   ├── providers/           # Context providers
  │   │   ├── services/            # Business logic services
  │   │   ├── hooks/               # Custom hooks
  │   │   ├── utils/               # Utility functions
  │   │   └── validations/         # Schema validations
  │   │
  │   ├── types/                   # TypeScript definitions
  │   │   ├── api.ts               # API response types
  │   │   ├── auth.ts              # Authentication types
  │   │   └── global.ts            # Global types
  │   │
  │   └── config/                  # Configuration files
  │       ├── database.ts          # DB configurations
  │       ├── auth.ts              # Auth configurations
  │       └── env.ts               # Environment variables
  │
  ├── tools/                       # Development Tools
  │   ├── mcp-setup/               # MCP installation scripts
  │   ├── generators/              # Code generators
  │   └── validators/              # Setup validators
  │
  ├── docs/                        # Documentation
  └── tests/                       # Testing suite
  ```

#### 1.5 Arquivos Base Detalhados
- [ ] **1.5.1** - Arquivos de Configuração Root
  - `middleware.ts` - Route protection, redirects, auth
  - `next.config.js` - Next.js configuration + optimizations
  - `tailwind.config.ts` - Tailwind + shadcn/ui theming
  - `components.json` - shadcn/ui configuration
  - `tsconfig.json` - TypeScript strict configuration
  - `.env.example` - Environment variables template

- [ ] **1.5.2** - Core Library Files
  - `src/lib/utils.ts` - Utility functions (cn, clsx, etc.)
  - `src/lib/constants.ts` - Global constants
  - `src/lib/validations.ts` - Zod schemas base
  - `src/lib/fonts.ts` - Font definitions
  - `src/lib/metadata.ts` - SEO metadata helpers

- [ ] **1.5.3** - Configuration Files
  - `src/config/env.ts` - Environment validation (Zod)
  - `src/config/site.ts` - Site configuration
  - `src/config/auth.ts` - Auth provider configs
  - `src/config/database.ts` - Database configurations

- [ ] **1.5.4** - Type Definitions
  - `src/types/global.ts` - Global types
  - `src/types/api.ts` - API response/request types
  - `src/types/auth.ts` - Authentication types
  - `src/types/database.ts` - Database entity types
  - `src/types/components.ts` - Component prop types

- [ ] **1.5.5** - Base Components & Providers
  - `src/components/providers/root-provider.tsx` - Main app provider
  - `src/components/providers/theme-provider.tsx` - Theme management
  - `src/components/providers/query-provider.tsx` - React Query setup
  - `src/components/ui/loading.tsx` - Loading states
  - `src/components/ui/error-boundary.tsx` - Error handling

- [ ] **1.5.6** - Essential Hooks
  - `src/hooks/use-local-storage.ts` - Local storage hook
  - `src/hooks/use-session-storage.ts` - Session storage hook
  - `src/hooks/use-debounce.ts` - Debounce hook
  - `src/hooks/use-media-query.ts` - Responsive hook
  - `src/hooks/use-mounted.ts` - Hydration safe hook

- [ ] **1.5.7** - API & Services Base
  - `src/lib/api.ts` - API client configuration
  - `src/lib/auth.ts` - Auth service abstraction
  - `src/lib/session.ts` - Session management
  - `src/lib/errors.ts` - Error handling utilities
  - `src/lib/logger.ts` - Logging utilities

- [ ] **1.5.8** - Essential Pages & Layouts
  - `src/app/layout.tsx` - Root layout
  - `src/app/loading.tsx` - Global loading UI
  - `src/app/error.tsx` - Global error UI
  - `src/app/not-found.tsx` - 404 page
  - `src/app/page.tsx` - Homepage

### Fase 2: Implementação Core da Aplicação

#### 2.1 Providers & Context (DIP)
- [ ] **2.1.1** - AuthProvider abstrato
  - Interface IAuthProvider
  - Implementações: Clerk, Auth0, NextAuth
  - Strategy Pattern para troca de providers

- [ ] **2.1.2** - DatabaseProvider abstrato
  - Interface IDatabaseProvider  
  - Implementações: Supabase, PlanetScale, Prisma
  - Factory Pattern para conexões

- [ ] **2.1.3** - ThemeProvider (OCP)
  - Sistema de temas extensível
  - shadcn/ui theme customization
  - Dark/Light mode + themes customizados

#### 2.2 Services Layer (SRP)
- [ ] **2.2.1** - AuthService
  - Login, logout, register, validate
  - Isolated from implementation details
  - Error handling e validation

- [ ] **2.2.2** - ApiService  
  - HTTP client abstraction
  - Request/Response interceptors
  - Error handling centralizado

- [ ] **2.2.3** - StorageService
  - Local storage, session storage
  - Cookie management
  - Encrypted storage options

#### 2.3 Components Architecture (SRP + OCP)
- [ ] **2.3.1** - Base UI Components (shadcn/ui)
  - Button, Input, Card, Dialog variants
  - Compound components pattern
  - Accessible e customizável

- [ ] **2.3.2** - Form Components
  - FormBuilder component
  - Validation integration
  - Error handling UI

- [ ] **2.3.3** - Layout Components
  - Header, Sidebar, Footer
  - Responsive design patterns
  - Theme-aware components

### Fase 3: Ferramentas de Desenvolvimento (MCPs)

#### 3.1 Scripts de Setup MCP (SRP)
- [ ] **3.1.1** - Script base de detecção de ambiente
  - Detectar OS (Windows/macOS/Linux)
  - Verificar dependências (Node.js, npm, etc.)
  - Validar pré-requisitos

- [ ] **3.1.2** - Instalador shadcn MCP
  - Script: `tools/mcp-setup/install-shadcn-mcp.js`
  - Comando: `npx @heilgar/shadcn-ui-mcp-server`
  - Validação de funcionamento

- [ ] **3.1.3** - Instalador Playwright MCP
  - Script: `tools/mcp-setup/install-playwright-mcp.js`
  - Comando: `npx @playwright/mcp@latest`
  - Instalação de browsers

#### 3.2 Configuradores por IDE (Strategy Pattern)
- [ ] **3.2.1** - Claude Desktop configurator
  - Gerar `claude_desktop_config.json`
  - Detectar path correto por OS
  - Validar configuração

- [ ] **3.2.2** - Cursor configurator
  - Gerar `.cursor/mcp.json`
  - Project-level configuration
  - Auto-restart helper

- [ ] **3.2.3** - VS Code configurator
  - Gerar `.vscode/mcp.json`
  - Integration com GitHub Copilot
  - Workspace settings

#### 3.3 MCPs Avançados
- [ ] **3.3.1** - Supabase MCP Setup
  - Personal Access Token setup
  - Read-only mode configuration
  - Project scoping

- [ ] **3.3.2** - GitHub MCP Setup
  - Docker setup (recomendado)
  - Personal Access Token
  - Alternative go build method

- [ ] **3.3.3** - Figma MCP Setup
  - Dev Mode MCP Server
  - Local connection (127.0.0.1:3845)
  - Figma Desktop integration

### Fase 4: Generators & Templates (OCP)

#### 4.1 Code Generators
- [ ] **4.1.1** - Component Generator
  - Gerar component + stories + tests
  - Seguir patterns estabelecidos
  - CLI interface

- [ ] **4.1.2** - Page Generator
  - Next.js page + layout
  - Route handlers quando necessário
  - SEO metadata template

- [ ] **4.1.3** - Service Generator
  - Service class + interface
  - Tests boilerplate
  - Provider integration

#### 4.2 Project Templates
- [ ] **4.2.1** - Dashboard Template
  - Layout com sidebar
  - Charts integration
  - Data tables

- [ ] **4.2.2** - Auth Template
  - Login/Register pages
  - Protected routes setup
  - User profile management

- [ ] **4.2.3** - E-commerce Template
  - Product catalog
  - Shopping cart
  - Checkout flow

### Fase 5: Testing & Quality (Todas as fases SOLID)

#### 5.1 Testing Architecture
- [ ] **5.1.1** - Unit Tests Setup
  - Jest + Testing Library
  - Component testing patterns
  - Service layer tests

- [ ] **5.1.2** - Integration Tests
  - API route testing
  - Database integration tests
  - Provider switching tests

- [ ] **5.1.3** - E2E Tests (com Playwright MCP)
  - Critical user flows
  - Cross-browser testing
  - Performance testing

#### 5.2 Quality Assurance
- [ ] **5.2.1** - Linting & Formatting
  - ESLint rules para SOLID
  - Prettier configuration
  - Pre-commit hooks

- [ ] **5.2.2** - Type Safety
  - Strict TypeScript config
  - Type-only imports
  - Runtime type validation

- [ ] **5.2.3** - Performance Monitoring
  - Bundle analysis
  - Core Web Vitals
  - Performance budgets

### Fase 6: Documentation & Distribution

#### 6.1 Documentation
- [ ] **6.1.1** - Architecture Documentation
  - SOLID principles aplicados
  - Design patterns utilizados
  - Extension guidelines

- [ ] **6.1.2** - Development Guide
  - Setup instructions
  - Coding conventions
  - Testing guidelines

- [ ] **6.1.3** - MCP Integration Guide
  - Setup de cada MCP
  - Troubleshooting common issues
  - Best practices

#### 6.2 Distribution
- [ ] **6.2.1** - GitHub Template Setup
  - Template repository
  - Issue templates
  - Contributing guidelines

- [ ] **6.2.2** - CI/CD Pipeline
  - GitHub Actions
  - Automated testing
  - Release automation

- [ ] **6.2.3** - Package Distribution
  - NPM package (opcional)
  - CLI tool para setup
  - Version management

## 🛠 Stack Tecnológico

### Core Framework
- **Next.js 14+** - App Router, Server Actions
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling system
- **shadcn/ui** - Component library

### Architecture Patterns
- **SOLID Principles** - Clean architecture
- **Strategy Pattern** - Provider switching
- **Factory Pattern** - Service creation
- **Observer Pattern** - State management

### Development Tools (MCPs)
- **shadcn MCP** - Component management
- **Playwright MCP** - Browser automation
- **Supabase MCP** - Database operations
- **GitHub MCP** - Repository integration
- **Figma MCP** - Design integration

## 📊 Status do Projeto

- **Fase 1**: ✅ **COMPLETO** - Arquitetura Base SOLID
- **Fase 2**: 🟡 Não iniciado
- **Fase 3**: ✅ **COMPLETO** - MCPs + VibeKit Security  
- **Fase 4**: 🟡 Não iniciado
- **Fase 5**: 🟡 Não iniciado
- **Fase 6**: 🟡 Não iniciado

## 🎉 **TEMPLATE PRONTO PARA USO!**

### ✅ **Concluído:**
- **Fase 1 Completa**: Arquivos base, configurações, SOLID structure
- **Fase 3 Completa**: 11 MCP servers + VibeKit security configurados
- **Revisão e Simplificação**: Template minimalista e limpo
- **Husky + lint-staged**: Hooks de qualidade de código
- **Supabase Integration**: Configuração básica pronta

## 🎯 Objetivos do Boilerplate

### Para Desenvolvedores
1. **Setup Instantâneo** - Clone → Install → Develop
2. **Arquitetura Sólida** - Princípios SOLID aplicados
3. **Extensibilidade** - Fácil adicionar novos providers/features
4. **Type Safety** - TypeScript em todo o projeto
5. **Best Practices** - Patterns estabelecidos

### Para Teams
1. **Consistência** - Todos os projetos seguem mesmo padrão
2. **Produtividade** - MCPs aceleram desenvolvimento
3. **Qualidade** - Testes e linting integrados
4. **Escalabilidade** - Arquitetura preparada para crescimento

### 🏗️ **Estrutura Final Implementada:**

```
project/
├── src/
│   ├── app/                     # Next.js App Router ✅
│   │   ├── layout.tsx           # Root layout with providers ✅
│   │   ├── page.tsx             # Homepage with features ✅
│   │   ├── loading.tsx          # Global loading UI ✅
│   │   ├── error.tsx            # Global error UI ✅
│   │   └── globals.css          # Global styles ✅
│   │
│   ├── components/              # UI Components ✅
│   │   ├── ui/                  # shadcn/ui components ✅
│   │   └── providers/           # Context providers ✅
│   │
│   ├── lib/                     # Core Library ✅
│   │   ├── utils.ts             # Utility functions ✅
│   │   ├── fonts.ts             # Font configuration ✅
│   │   ├── metadata.ts          # SEO helpers ✅
│   │   ├── constants.ts         # App constants ✅
│   │   ├── validations.ts       # Zod schemas ✅
│   │   └── supabase.ts          # Supabase client ✅
│   │
│   ├── hooks/                   # Custom hooks ✅
│   │   ├── use-local-storage.ts # Local storage hook ✅
│   │   └── use-mounted.ts       # Hydration hook ✅
│   │
│   ├── types/                   # TypeScript definitions ✅
│   │   └── global.ts            # Global types ✅
│   │
│   └── config/                  # Configuration files ✅
│       └── env.ts               # Environment validation ✅
│
├── scripts/                     # Development Tools ✅
│   ├── setup.js                 # Project setup ✅
│   ├── setup-mcp.js            # MCP + VibeKit setup ✅
│   └── setup-husky.js          # Git hooks setup ✅
│
├── docs/                        # Documentation ✅
│   ├── MCP-SERVERS.md          # MCP configuration guide ✅
│   ├── SECURITY.md             # VibeKit security guide ✅
│   └── HOOKS.md                # Git hooks documentation ✅
│
└── Root Files/                  # Configuration ✅
    ├── package.json             # Dependencies + scripts ✅
    ├── tailwind.config.ts       # Tailwind configuration ✅
    ├── next.config.mjs          # Next.js configuration ✅
    ├── middleware.ts            # Route protection ✅
    ├── components.json          # shadcn/ui config ✅
    ├── .env.example             # Environment template ✅
    ├── .lintstagedrc.js        # Lint-staged config ✅
    └── .husky/                  # Git hooks ✅
```

### 🎯 **Como Usar o Template:**

```bash
# 1. Clone/Download o template
git clone <template-repo>

# 2. Install dependencies  
npm install

# 3. Configure MCP servers + VibeKit security
npm run setup:mcp

# 4. Copy environment file
cp .env.example .env.local
# Edit .env.local with your Supabase keys

# 5. Start developing!
npm run dev
```

---

**🎉 Template Next.js SOLID + Supabase + 11 MCPs + Security = PRONTO!**