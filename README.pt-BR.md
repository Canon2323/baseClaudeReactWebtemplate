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

🌐 **Português** | [English](README.md)

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
- **Arquitetura SOLID** com princípios rigorosos
- **Supabase** para auth & database (local)
- **Sistema RBAC** com permissões granulares
- **Integração de Pagamentos** (Stripe, Paddle, LemonSqueezy)
- **Git hooks** (Husky + lint-staged) para qualidade de código

### 🏗️ Princípios SOLID

- **S**ingle Responsibility - Uma classe/função = uma responsabilidade
- **O**pen/Closed - Aberto para extensão, fechado para modificação
- **L**iskov Substitution - Subtipos devem ser substituíveis
- **I**nterface Segregation - Interfaces específicas > interfaces gerais
- **D**ependency Inversion - Depender de abstrações, não de concretos

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

## 📦 Scripts

```bash
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

## 🛡️ Middleware

O arquivo `src/middleware.ts` gerencia:
- Proteção de rotas e autenticação
- Modificações de request/response
- Redirects e rewrites
- Controle de acesso para rotas protegidas

Localizado em: `src/middleware.ts` (mesmo nível que `src/app/`)

## 🗄️ Configuração Supabase

**Supabase local** é instalado e configurado automaticamente.

Para alterar chaves: editar `scripts/setup-all.js` linhas 127-129.

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

MIT

---

**Desenvolvido com princípios SOLID e boas práticas de engenharia de software.**