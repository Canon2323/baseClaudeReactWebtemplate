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

🌐 **Português** | [English](./README.md)

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
- **Arquitetura SOLID** com Vertical Slice
- **Supabase** para auth & database (local)
- **Git hooks** (Husky + lint-staged) para qualidade de código

### 🏗️ Princípios SOLID

- **S**ingle Responsibility - Uma classe/função = uma responsabilidade
- **O**pen/Closed - Aberto para extensão, fechado para modificação
- **L**iskov Substitution - Subtipos devem ser substituíveis
- **I**nterface Segregation - Interfaces específicas > interfaces gerais
- **D**ependency Inversion - Depender de abstrações, não de concretos

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

## 🛡️ Middleware

O arquivo `src/middleware.ts` gerencia:
- Proteção de rotas e autenticação
- Modificações de request/response
- Redirecionamentos e rewrites
- Controle de acesso para rotas protegidas

Localização: `src/middleware.ts` (mesmo nível de `src/app/`)

## 🗄️ Configuração Supabase

**Supabase local** é instalado e configurado automaticamente.

Para alterar chaves: edite `scripts/setup-all.js` linhas 127-129.

### Acessar Supabase Local
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

## 📚 Docs

- [MCP Servers](docs/MCP-SERVERS.md)
- [Git Hooks](docs/HOOKS.md)
- [Middleware](docs/MIDDLEWARE.md)

## 📄 License

MIT

---

**Desenvolvido com princípios SOLID e boas práticas de engenharia de software.**
