# Template de Projeto - Instruções para Claude Code

## CONTEXTO
Template para projetos Next.js com Claude Code
- Stack: Next.js 14, TypeScript, Supabase, shadcn/ui
- Desenvolvimento assistido por IA com Claude Code
- Idioma: Português BR

## PRINCÍPIOS FUNDAMENTAIS

### SOLID - Obrigatório em toda implementação
- **S**ingle Responsibility: Uma classe/função = uma responsabilidade
- **O**pen/Closed: Aberto para extensão, fechado para modificação
- **L**iskov Substitution: Subtipos devem ser substituíveis
- **I**nterface Segregation: Interfaces específicas > interfaces gerais
- **D**ependency Inversion: Depender de abstrações, não de concretos

### DRY e Reutilização
- SEMPRE buscar código existente antes de criar novo
- Verificar services, hooks e utils existentes
- Estender funcionalidade existente ao invés de duplicar

## PERGUNTAS OBRIGATÓRIAS ANTES DE IMPLEMENTAR

### 1. Descoberta de Contexto
- Qual problema de negócio estamos resolvendo?
- Quais regras de negócio específicas se aplicam?
- Existe solução similar já implementada? Onde?

### 2. Análise de Código Existente
- Quais services/classes já lidam com este domínio?
- Existem hooks/utils que posso reutilizar?
- Quais padrões estão sendo usados nesta área do código?

### 3. Escopo e Limites
- O que está DENTRO do escopo desta tarefa?
- O que está FORA e deve ser ignorado agora? (YAGNI)
- Quais são os critérios de aceitação?

### 4. Arquitetura e Integração
- Quais arquivos/classes/métodos serão modificados?
- Como isso se integra com o sistema existente?
- Quais testes precisam ser atualizados/criados?

### 5. Validação de Approach
- Minha solução segue os princípios SOLID?
- Estou reutilizando código existente adequadamente?
- Existe uma forma mais simples de resolver?

## REGRAS CRÍTICAS - NUNCA VIOLAR

### Ferramentas Claude Code
**LEITURA/BUSCA**: Usar ferramentas apropriadas
- Utilizar Read, Grep, Glob para análise de código
- Documentar referências encontradas
- Evitar busca manual desnecessária

**ESCRITA**: Editor padrão apenas
- Usar Write/Edit para modificações
- MultiEdit para múltiplas alterações
- NotebookEdit para Jupyter notebooks

**VALIDAÇÃO**: Testes automatizados
- Sempre anexar evidências quando possível
- Usar Bash para executar comandos de teste

### Banco de Dados
**ARQUIVO ÚNICO**: database/setup.sql
- Adicionar mudanças antes do COMMIT
- Executar comandos de reset conforme necessário
- PROIBIDO: criar múltiplos arquivos de migração

### Supabase SDK Only
**PERMITIDO**:
- @supabase/supabase-js
- @supabase/ssr

**PROIBIDO**:
- pg, Prisma, Knex, Drizzle
- JWT manual (jose, jsonwebtoken)
- REST direto ao PostgREST
- Conexões diretas ao banco

**REGRAS**:
- RLS sempre ON
- Service role apenas em Edge Functions

## ESTRUTURA E ORGANIZAÇÃO

### ARQUITETURA: Vertical Slice + Stores por Domínio

### Estrutura Recomendada
```
src/
├── app/                    # Next.js App Router
├── components/            # Componentes globais
│   └── ui/               # shadcn/ui components
├── features/              # Domínios específicos (Vertical Slice)
│   ├── [feature-name]/    # Ex: users, products, orders
│   │   ├── components/    # UI específica do domínio
│   │   ├── stores/        # Estado específico do domínio
│   │   ├── hooks/         # Hooks específicos
│   │   ├── services/      # Lógica de negócio
│   │   └── types/         # Types específicos
├── shared/               # Cross-cutting concerns
│   ├── stores/           # Auth, UI, Session
│   ├── components/ui/    # Design system
│   ├── hooks/            # Hooks globais
│   ├── services/         # Infraestrutura
│   └── utils/            # Utilitários
└── tests/               # E2E com Gherkin/Playwright
```

### Stores por Domínio (Arquitetura Alvo)
```typescript
// EVITAR: Store monolítico
profile-store.ts  // Faz TUDO (auth, profile, UI, permissions)

// PREFERIR: Stores segregados por responsabilidade
shared/stores/
├── auth.store.ts         # Só autenticação
├── ui.store.ts           # Só estado UI
└── session.store.ts      # Só sessão

features/[domain]/stores/
├── [domain].store.ts     # Estado principal do domínio
├── [domain]-form.store.ts # Formulários específicos
└── [domain]-list.store.ts # Listagem/filtros
```

### Princípios de Organização SOLID

**Services** (Single Responsibility)
```typescript
// BOM: Uma responsabilidade clara
class UserAuthService {
  async authenticate(email: string): Promise<User>
}

class UserProfileService {
  async updateProfile(id: string, data: Profile): Promise<void>
}

// RUIM: Múltiplas responsabilidades
class UserService {
  async authenticate()
  async updateProfile()
  async sendEmail()
}
```

**Interfaces** (Interface Segregation)
```typescript
// BOM: Interfaces específicas
interface Readable { read(): Data }
interface Writable { write(data: Data): void }

// RUIM: Interface gorda
interface Repository {
  read(); write(); delete(); update();
  backup(); restore(); validate();
}
```

**Dependências** (Dependency Inversion)
```typescript
// BOM: Depende de abstração
constructor(private auth: IAuthService)

// RUIM: Depende de implementação concreta
constructor(private auth: SupabaseAuthService)
```

## FLUXO DE TRABALHO

### 1. DESCOBERTA (com usuário)
- Fazer todas as perguntas obrigatórias
- Confirmar escopo e regras de negócio
- Identificar código existente para reutilizar

### 2. INVESTIGAÇÃO
- Buscar implementações similares
- Analisar padrões usados na área
- Mapear dependências e integrações
- LER E COMPREENDER o código existente completamente

### 3. PLANEJAMENTO
- Desenhar solução seguindo SOLID
- Identificar classes/métodos a criar/modificar
- Planejar reutilização de código existente

### 4. VALIDAÇÃO PRÉ-IMPLEMENTAÇÃO
- Revisar com usuário antes de codificar
- Confirmar approach e arquitetura
- Ajustar baseado em feedback

### 5. IMPLEMENTAÇÃO
- Seguir princípios SOLID rigorosamente
- Reutilizar código existente ao máximo
- Manter responsabilidade única por classe/método

### 6. TESTES E EVIDÊNCIAS
- Testes unitários para cada service
- E2E com Playwright + Gherkin (pasta tests/)
- Screenshots/evidências quando aplicável
- BDD scenarios para validação de regras de negócio

### 7. APROVAÇÃO
- Code review focado em SOLID
- Verificar reutilização adequada
- Aguardar aprovação do usuário

## CHECKLIST DE CONFORMIDADE

**Arquitetura**
- [ ] Princípios SOLID aplicados
- [ ] Responsabilidade única por classe
- [ ] Código existente reutilizado
- [ ] Sem duplicação (DRY)

**Investigação**
- [ ] Ferramentas apropriadas utilizadas
- [ ] Padrões existentes identificados
- [ ] Dependências mapeadas

**Qualidade**
- [ ] TypeScript strict mode
- [ ] Interfaces segregadas
- [ ] Inversão de dependências
- [ ] Testes unitários
- [ ] Testes E2E atualizados

**Conformidade**
- [ ] Regras de negócio respeitadas
- [ ] RLS ativo (quando aplicável)
- [ ] Dados reais (sem mocks)
- [ ] shadcn/ui para UI

## TEMPLATE DE RESPOSTA

### DESCOBERTA
**Perguntas ao usuário**:
1. [Contexto de negócio]
2. [Código existente relacionado]
3. [Escopo e limites]

### INVESTIGAÇÃO
**Código existente encontrado**:
- Services: [referências]
- Hooks: [referências]
- Utils: [referências]

**Padrões identificados**:
- [Padrão]: usado em [arquivo]

**Fluxo de execução mapeado** (para bugs/problemas):
1. [Passo 1]: [componente/arquivo:linha]
2. [Passo 2]: [service/hook:método]
3. [Passo 3]: [transformação de dados]
4. [Resultado]: [esperado vs atual]

### PROPOSTA DE IMPLEMENTAÇÃO

**Arquitetura SOLID**:
```typescript
// Estrutura proposta
interface INewService { }
class NewService implements INewService {
  constructor(private dependency: IDependency) {}
  // Single responsibility
}
```

**Reutilização**:
- Estendendo: [classe/método existente]
- Compondo: [services existentes]

**Novos arquivos necessários**:
- [ ] path/to/new-service.ts (justificativa)

**Modificações em existentes**:
- [ ] path/to/existing.ts: [mudança específica]

### VALIDAÇÃO
- [ ] SOLID checklist completo
- [ ] Código existente maximamente reutilizado
- [ ] Complexidade mínima (KISS)

## DEBUGGING E ANÁLISE DE PROBLEMAS

### ABORDAGEM OBRIGATÓRIA: Leitura de Código
**NUNCA debuggar via prints/console.log**

#### 1. COMPREENSÃO DO FLUXO
- Ler completamente o código relacionado ao problema
- Mapear o fluxo de execução passo a passo
- Identificar todos os pontos de entrada e saída
- Entender as transformações de dados

#### 2. COMPARTILHAMENTO COM USUÁRIO
Sempre apresentar:
```
**FLUXO IDENTIFICADO:**
1. Usuário aciona [ação] em [componente]
2. Component chama [hook/service]
3. Service executa [operação]
4. Dados fluem por [caminho]
5. Resultado esperado: [X]
6. Resultado atual: [Y]
7. **POSSÍVEL CAUSA:** [análise baseada na leitura]
```

#### 3. DEBUGGING ESTRUTURADO
**FAZER:**
- Analisar código estático primeiro
- Mapear dependências e data flow
- Validar lógica linha por linha
- Verificar tipos e interfaces
- Checar tratamento de erros

**NÃO FAZER:**
- Adicionar console.log/prints
- Tentar "adivinhar" o problema
- Fazer mudanças sem entender o fluxo
- Debuggar "no escuro"

## PROIBIÇÕES ABSOLUTAS

1. Criar código sem buscar existente primeiro
2. Violar princípios SOLID
3. Duplicar lógica existente
4. Criar "god classes" com múltiplas responsabilidades
5. Implementar sem aprovação do approach
6. Usar drivers diretos de banco (quando aplicável)
7. Pular investigação de código existente
8. Marcar tarefa concluída sem teste do usuário
9. **Debuggar via prints/console.log**
10. **Implementar sem compreender o fluxo completo**

## METODOLOGIA DE DESENVOLVIMENTO

### ABORDAGEM ITERATIVA
- Começar com funcionalidade mínima viável
- Evitar over-engineering inicial
- Refatorar conforme necessário

### FOCO E DISCIPLINA
**FAZER**:
- Perguntar ANTES de assumir
- Investigar ANTES de implementar
- Reutilizar ANTES de criar
- Priorizar features conforme definido

**NÃO FAZER**:
- Assumir contexto sem confirmar
- Criar código desnecessário
- Implementar além do escopo acordado
- Mexer em outras áreas sem aprovação

### TESTES E QUALIDADE
- BDD scenarios na pasta tests/
- Cenários para validação de regras de negócio
- Automação com Playwright
- Sempre atualizar testes após mudanças

## CUSTOMIZAÇÃO DO TEMPLATE

Este template deve ser adaptado para cada projeto específico:

1. **Domínios**: Substitua exemplos por domínios reais do projeto
2. **Regras de Negócio**: Adapte para regulamentações específicas
3. **Stack**: Ajuste tecnologias conforme necessário
4. **Estrutura**: Modifique organização conforme arquitetura escolhida

---
**IMPORTANTE**: Este é um template base. Customize conforme as necessidades específicas do seu projeto.