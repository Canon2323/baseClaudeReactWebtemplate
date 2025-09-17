Este projeto é um template inicial para criação de aplicações web modernas usando React em conjunto com o Claude Code.
Ele oferece uma configuração rápida e limpa, permitindo que você foque em desenvolver funcionalidades em vez de perder tempo com configurações iniciais.

Recursos

⚡ Início rápido: configuração mínima para colocar sua aplicação no ar rapidamente.

🛠 Integração com Claude Code: pronto para experimentar as capacidades de desenvolvimento assistido por IA.

🎨 Boas práticas com React: projeto estruturado, com componentes reutilizáveis e organização clara.

🚀 Extensível: facilmente adaptável para pequenos protótipos ou projetos maiores.

Casos de uso

Iniciar novos projetos em React sem se preocupar com setup inicial.

Criar protótipos que aproveitam o Claude Code para desenvolvimento assistido por IA.

Aprender a integrar o Claude em um ambiente moderno com React.

# 🚀 Next.js SOLID Boilerplate

Template moderno Next.js com arquitetura SOLID, TypeScript, Tailwind CSS e organização Vertical Slice.

<<<<<<< HEAD
🌐 **Português** | [English](README.md)
=======
🌐 **Português** | [English](./README.md)
>>>>>>> 2df8104fb7354b97e10463f72958422cc8983e64

## ⚡ Quick Start

```bash
# Clone e configure automaticamente
git clone <this-repo> my-app
cd my-app
npm run setup

# Iniciar desenvolvimento (tudo configurado automaticamente)
npm run dev
```

## ✨ Features

- **Next.js 14+** com App Router
- **TypeScript** + **Tailwind CSS** + **shadcn/ui**
<<<<<<< HEAD
- **Arquitetura SOLID** com princípios rigorosos
- **Supabase** para auth & database (local)
- **Sistema RBAC** com permissões granulares
- **Integração de Pagamentos** (Stripe, Paddle, LemonSqueezy)
=======
- **Arquitetura SOLID** com Vertical Slice
- **Supabase** para auth & database (local)
>>>>>>> 2df8104fb7354b97e10463f72958422cc8983e64
- **Git hooks** (Husky + lint-staged) para qualidade de código

### 🏗️ Princípios SOLID

- **S**ingle Responsibility - Uma classe/função = uma responsabilidade
- **O**pen/Closed - Aberto para extensão, fechado para modificação
- **L**iskov Substitution - Subtipos devem ser substituíveis
- **I**nterface Segregation - Interfaces específicas > interfaces gerais
- **D**ependency Inversion - Depender de abstrações, não de concretos

<<<<<<< HEAD
### 🔌 11 MCP Servers (Integração Claude Code)

1. **shadcn/ui MCP** - Instalar/gerenciar componentes UI
2. **Playwright MCP** - Automação de browser & testes
3. **Figma MCP** - Integração design-to-code
4. **Apify MCP** - Web scraping & extração de dados
5. **Browser Automation MCP** - Controle adicional de browser
6. **Gemini MCP** - Integração com modelo AI do Google
7. **Context7 MCP** - Busca de documentação em tempo real
8. **Stripe MCP** - Integração de processamento de pagamentos
9. **Supabase MCP** - Operações de banco Supabase local
10. **Filesystem MCP** - Operações de sistema de arquivos
11. **Serena MCP** - Toolkit de agente AI para codificação

**Nota**: Operações Git/GitHub usam **ferramentas CLI** padrão (GitHub CLI + Git) para melhor performance.

### 🪝 Hooks de Qualidade de Código

Verificações automáticas de qualidade em operações Git:
- **Pre-commit**: Auto-formatação, lint e verificação de tipos antes dos commits
- **Pre-push**: Validação final antes de enviar ao remoto
- **Commit-msg**: Valida formato de mensagem de commit (opcional)

### 🛡️ Segurança & Controle de Acesso

- **Sistema RBAC** - Controle de acesso baseado em roles com Supabase RLS
- **Multi-tenant** - Permissões baseadas em organização
- **JWT Claims** - Injeção automática de roles/permissões
- **VibeKit** - Isolamento de sandbox para agentes AI

### 💳 Funcionalidades SaaS (Integração Next.js SaaS Starter)

- **Processamento de Pagamentos** - Suporte a Stripe, Paddle, LemonSqueezy
- **Gestão de Assinaturas** - Fluxos completos de billing
- **Portal do Cliente** - Gestão self-service de billing
- **Webhook Handling** - Processamento automático de eventos de pagamento

### 📋 Desenvolvimento Orientado por Especificações

- **GitHub Spec Kit** - Metodologia de desenvolvimento specification-first
- **Interações AI estruturadas** com Claude Code
- **Documentação viva** que evolui com o código
=======
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
>>>>>>> 2df8104fb7354b97e10463f72958422cc8983e64

## 📦 Scripts

```bash
<<<<<<< HEAD
npm run setup         # Configuração completa
npm run setup:spec-kit # Configurar Desenvolvimento Orientado por Specs
npm run dev          # Desenvolvimento
npm run build        # Build de produção
npm run lint:fix     # Corrigir linting
npm run format       # Formatar código
```

## 📁 Estrutura

```
src/
├── app/           # Páginas Next.js App Router
├── components/    # Componentes UI (shadcn/ui)
├── lib/           # Utilitários e helpers
├── hooks/         # Hooks React customizados
├── types/         # Definições TypeScript
├── config/        # Arquivos de configuração
├── shared/        # Código compartilhado (SOLID)
│   ├── types/     # Interfaces e tipos
│   ├── services/  # Camada de serviços
│   ├── hooks/     # Hooks especializados
│   └── components/ # Componentes reutilizáveis
└── middleware.ts  # Proteção de rotas & middleware de auth

specs/             # 📋 Desenvolvimento Orientado por Specs
├── requirements.md # Especificações do produto
├── plan.md        # Plano de implementação técnica
└── tasks/         # Divisão de tarefas acionáveis

docs/             # 📚 Documentação
├── MCP-SERVERS.md # Guia de configuração MCP
├── SPEC-DRIVEN-DEVELOPMENT.md # Uso do Spec Kit
├── RBAC.md       # Guia do sistema de controle de acesso
└── HOOKS.md      # Documentação dos git hooks
```

=======
npm run setup              # Setup completo
npm run dev                # Desenvolvimento
npm run build              # Build de produção
npm run lint:fix           # Corrigir linting
npm run format             # Formatar código
npm run generate:feature   # Gerar nova feature
```

## 📁 Estrutura de Pastas

```
src/
├── app/                # Next.js App Router
├── components/         # Componentes globais
│   └── ui/            # shadcn/ui components
├── features/          # Domínios específicos (Vertical Slice)
│   ├── [feature]/
│   │   ├── components/  # UI específica
│   │   ├── hooks/       # Hooks do domínio
│   │   ├── services/    # Lógica de negócio
│   │   ├── stores/      # Estado do domínio
│   │   └── types/       # Types específicos
├── shared/            # Cross-cutting concerns
│   ├── components/    # Componentes compartilhados
│   ├── hooks/         # Hooks globais
│   ├── stores/        # Estado global
│   ├── services/      # Serviços de infraestrutura
│   └── utils/         # Utilitários
├── config/            # Configurações
├── tests/             # Testes E2E
└── middleware.ts      # Middleware de rotas
```

### 🎯 Features vs Shared - Quando usar cada um?

**Features/** - Código específico do domínio de negócio:
- ✅ Componentes que só existem em um contexto (ex: `UserProfileCard`)
- ✅ Lógica de negócio específica (ex: `calculateOrderTotal`)
- ✅ Estado local do domínio (ex: `useProductFilters`)
- ✅ Types do domínio (ex: `interface Product`)

**Shared/** - Código reutilizável entre múltiplos domínios:
- ✅ Componentes genéricos (ex: `Button`, `Modal`, `Toast`)
- ✅ Hooks utilitários (ex: `useDebounce`, `useLocalStorage`)
- ✅ Estado global da aplicação (ex: `authStore`, `themeStore`)
- ✅ Serviços de infraestrutura (ex: `apiClient`, `logger`)
- ✅ Utilitários puros (ex: `formatCurrency`, `validateEmail`)

**Regra de ouro**: Se é usado por 2+ features → `shared/`. Se é específico de uma feature → `features/[nome]/`

## 📚 Guia de Arquitetura: Types, Hooks e Stores

### 📝 **Types** - Definição de Estruturas

**O que são:** Interfaces e tipos TypeScript que definem a estrutura dos dados.

**Quando usar:**
- Definir formato de dados da API
- Criar contratos entre camadas
- Garantir type safety
- Documentar estruturas de dados

**Exemplo:**
```typescript
// features/users/types/user.types.ts
export interface User {
  id: string
  email: string
  name: string
}
```

**Onde colocar:**
- `features/[domain]/types/` - Types específicos do domínio
- `shared/types/` - Types compartilhados globalmente

### 🪝 **Hooks** - Lógica Reutilizável

**O que são:** Funções que encapsulam lógica de estado e side effects do React.

**Quando usar:**
- Compartilhar lógica entre componentes
- Gerenciar estado local do componente
- Executar side effects (API calls, subscriptions)
- Abstrair lógica complexa de UI

**Exemplo:**
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

**Onde colocar:**
- `features/[domain]/hooks/` - Hooks específicos do domínio
- `shared/hooks/` - Hooks utilitários globais

### 🗄️ **Stores** - Estado Global

**O que são:** Containers de estado compartilhado entre componentes usando Zustand.

**Quando usar:**
- Estado que precisa ser acessado por múltiplos componentes
- Dados que persistem entre navegações de página
- Cache de dados do usuário
- Estado da aplicação (tema, idioma, autenticação)

**Exemplo:**
```typescript
// shared/stores/auth.store.ts
export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,

  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false })
}))
```

**Onde colocar:**
- `shared/stores/` - Estado global (auth, tema, UI)
- `features/[domain]/stores/` - Estado específico do domínio

## 🎯 Guia de Decisão Rápido

| Preciso de... | Use | Exemplo |
|---------------|-----|---------|
| Definir formato de dados | **Types** | `interface Product { id: string; name: string }` |
| Buscar dados em um componente | **Hook** | `useProduct(id)` retorna produto e loading |
| Compartilhar estado entre páginas | **Store** | Carrinho de compras, usuário logado |
| Validar estrutura de dados | **Types** + Zod | Schema de validação com types |
| Estado temporário do formulário | **Hook** | `useForm()` com react-hook-form |
| Cache de dados da API | **Store** ou React Query | Lista de produtos já carregados |
| Lógica reutilizável de UI | **Hook** | `useModal()`, `useDebounce()` |
| Configurações globais | **Store** | Tema, idioma, preferências |

>>>>>>> 2df8104fb7354b97e10463f72958422cc8983e64
## 🛡️ Middleware

O arquivo `src/middleware.ts` gerencia:
- Proteção de rotas e autenticação
- Modificações de request/response
<<<<<<< HEAD
- Redirects e rewrites
- Controle de acesso para rotas protegidas

Localizado em: `src/middleware.ts` (mesmo nível que `src/app/`)
=======
- Redirecionamentos e rewrites
- Controle de acesso para rotas protegidas

Localização: `src/middleware.ts` (mesmo nível de `src/app/`)
>>>>>>> 2df8104fb7354b97e10463f72958422cc8983e64

## 🗄️ Configuração Supabase

**Supabase local** é instalado e configurado automaticamente.

<<<<<<< HEAD
Para alterar chaves: editar `scripts/setup-all.js` linhas 127-129.

### Acessar Supabase Local

=======
Para alterar chaves: edite `scripts/setup-all.js` linhas 127-129.

### Acessar Supabase Local
>>>>>>> 2df8104fb7354b97e10463f72958422cc8983e64
- **Database**: http://127.0.0.1:54321
- **Dashboard**: http://127.0.0.1:54323

## 🧪 Testes

### Testes Unitários (Jest)
```bash
npm run test           # Rodar testes
npm run test:watch     # Modo watch
npm run test:coverage  # Cobertura
```

### Testes E2E (Playwright)
```bash
npm run test:e2e       # Rodar testes E2E
npm run test:e2e:ui    # Interface visual
```

## 🚀 Gerando Nova Feature

```bash
npm run generate:feature

# Seguir prompts:
# - Nome da feature (ex: products)
# - Incluir store? (s/n)
# - Incluir service? (s/n)
```

Isso criará estrutura completa:
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
## 🛡️ **Quick Start RBAC**

```tsx
// 1. Envolver app com provider RBAC
<RBACProvider>
  <App />
</RBACProvider>

// 2. Proteger componentes com permissões
<RBACGuard permissions={['users.create']}>
  <CreateUserButton />
</RBACGuard>

// 3. Usar hooks para lógica condicional
const { hasPermission, hasRole } = useRBAC()
if (hasPermission('billing.read')) {
  // Mostrar seção de billing
}

// 4. Componentes somente admin
<AdminGuard fallback={<div>Acesso negado</div>}>
  <AdminPanel />
</AdminGuard>
```

**Funcionalidades:**
- 🎯 **Permissões granulares** - Controle de acesso baseado em recursos
- 🏢 **Multi-tenant** - Permissões com escopo de organização
- ⚡ **Integração JWT** - Permissões no token para performance
- 🔒 **Supabase RLS** - Segurança no nível do banco
- 🎨 **Componentes React** - Guards, hooks e providers

Veja [Documentação RBAC](docs/RBAC.md) para guia completo.

## 🚀 **Quick Start Desenvolvimento Orientado por Specs**

```bash
# 1. Configurar Spec Kit
npm run setup:spec-kit

# 2. Iniciar especificação no Claude Code
/specify Construir dashboard de usuário com analytics e configurações

# 3. Planejar implementação
/plan Usar nossos providers SOLID (Auth, Database, Theme) + shadcn/ui

# 4. Dividir em tarefas
/tasks

# 5. Implementar
implement specs/plan.md
```

**Benefícios:**
- 📋 **Desenvolvimento estruturado** com especificações claras
- 🤖 **Interações AI aprimoradas** com contexto consistente
- 📚 **Documentação viva** que evolui com o código
- 🏗️ **Integração SOLID** - specs aproveitam arquitetura existente

Veja [Guia de Desenvolvimento Orientado por Specs](docs/SPEC-DRIVEN-DEVELOPMENT.md) para uso detalhado.

=======
>>>>>>> 2df8104fb7354b97e10463f72958422cc8983e64
## 📋 Checklist de Boas Práticas

### Antes de Implementar
- [ ] Verificar se já existe código similar
- [ ] Confirmar requisitos com o usuário
- [ ] Planejar seguindo princípios SOLID

### Durante Implementação
- [ ] Uma responsabilidade por classe/função
- [ ] Usar tipos TypeScript apropriados
- [ ] Reutilizar código existente
- [ ] Seguir padrões do projeto

### Depois de Implementar
- [ ] Rodar linter e type-check
- [ ] Adicionar/atualizar testes
- [ ] Solicitar aprovação do usuário

<<<<<<< HEAD
## 📚 Documentação

- [Servidores MCP](docs/MCP-SERVERS.md)
- [Desenvolvimento Orientado por Specs](docs/SPEC-DRIVEN-DEVELOPMENT.md)
- [Sistema RBAC](docs/RBAC.md)
- [Git Hooks](docs/HOOKS.md)
- [Middleware](docs/MIDDLEWARE.md)

## 🙏 **Agradecimentos**

Este template integra e adapta código do excelente **Next.js SaaS Starter** da Vercel:
- **Repositório**: [nextjs/saas-starter](https://github.com/nextjs/saas-starter)
- **Funcionalidades integradas**: Pagamentos Stripe, sistema RBAC, activity logging
- **Adaptado com**: Arquitetura SOLID, integração MCP, Desenvolvimento Orientado por Specs

**Agradecimentos especiais à equipe Vercel** por criar uma base tão sólida para aplicações SaaS! 🚀

Aprimoramos a abordagem deles com:
- ✅ Implementação de **princípios SOLID**
- ✅ **11+ servidores MCP** para desenvolvimento aprimorado
- ✅ Metodologia de **Desenvolvimento Orientado por Specs**
- ✅ **Abstrações de providers** para extensibilidade

## 📄 Licença
=======
## 📚 Docs

- [MCP Servers](docs/MCP-SERVERS.md)
- [Git Hooks](docs/HOOKS.md)
- [Middleware](docs/MIDDLEWARE.md)

## 📄 License
>>>>>>> 2df8104fb7354b97e10463f72958422cc8983e64

MIT

---

<<<<<<< HEAD
**Desenvolvido com princípios SOLID e boas práticas de engenharia de software.**
=======
**Desenvolvido com princípios SOLID e boas práticas de engenharia de software.**
>>>>>>> 2df8104fb7354b97e10463f72958422cc8983e64
