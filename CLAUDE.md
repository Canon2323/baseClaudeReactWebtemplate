# Template de Projeto - InstruÃ§Ãµes para Claude Code

## CONTEXTO
Template para projetos Next.js com Claude Code
- Stack: Next.js 14, TypeScript, Supabase, shadcn/ui
- Desenvolvimento assistido por IA com Claude Code
- Idioma: PortuguÃªs BR

## PRINCÃPIOS FUNDAMENTAIS

### SOLID - ObrigatÃ³rio em toda implementaÃ§Ã£o
- **S**ingle Responsibility: Uma classe/funÃ§Ã£o = uma responsabilidade
- **O**pen/Closed: Aberto para extensÃ£o, fechado para modificaÃ§Ã£o  
- **L**iskov Substitution: Subtipos devem ser substituÃ­veis
- **I**nterface Segregation: Interfaces especÃ­ficas > interfaces gerais
- **D**ependency Inversion: Depender de abstraÃ§Ãµes, nÃ£o de concretos

### DRY e ReutilizaÃ§Ã£o
- SEMPRE buscar cÃ³digo existente antes de criar novo
- Verificar services, hooks e utils existentes
- Estender funcionalidade existente ao invÃ©s de duplicar

## PERGUNTAS OBRIGATÃ“RIAS ANTES DE IMPLEMENTAR

### 1. Descoberta de Contexto
- Qual problema de negÃ³cio estamos resolvendo?
- Quais regras de negÃ³cio especÃ­ficas se aplicam?
- Existe soluÃ§Ã£o similar jÃ¡ implementada? Onde?

### 2. AnÃ¡lise de CÃ³digo Existente
- Quais services/classes jÃ¡ lidam com este domÃ­nio?
- Existem hooks/utils que posso reutilizar?
- Quais padrÃµes estÃ£o sendo usados nesta Ã¡rea do cÃ³digo?

### 3. Escopo e Limites
- O que estÃ¡ DENTRO do escopo desta tarefa?
- O que estÃ¡ FORA e deve ser ignorado agora? (YAGNI)
- Quais sÃ£o os critÃ©rios de aceitaÃ§Ã£o?

### 4. Arquitetura e IntegraÃ§Ã£o
- Quais arquivos/classes/mÃ©todos serÃ£o modificados?
- Como isso se integra com o sistema existente?
- Quais testes precisam ser atualizados/criados?

### 5. ValidaÃ§Ã£o de Approach
- Minha soluÃ§Ã£o segue os princÃ­pios SOLID?
- Estou reutilizando cÃ³digo existente adequadamente?
- Existe uma forma mais simples de resolver?

## REGRAS CRÃTICAS - NUNCA VIOLAR

### Ferramentas Claude Code
**LEITURA/BUSCA**: Usar ferramentas apropriadas
- Utilizar Read, Grep, Glob para anÃ¡lise de cÃ³digo
- Documentar referÃªncias encontradas
- Evitar busca manual desnecessÃ¡ria

**ESCRITA**: Editor padrÃ£o apenas
- Usar Write/Edit para modificaÃ§Ãµes
- MultiEdit para mÃºltiplas alteraÃ§Ãµes
- NotebookEdit para Jupyter notebooks

**VALIDAÃ‡ÃƒO**: Testes automatizados
- Sempre anexar evidÃªncias quando possÃ­vel
- Usar Bash para executar comandos de teste

### Banco de Dados
**ARQUIVO ÃšNICO**: database/setup.sql
- Adicionar mudanÃ§as antes do COMMIT
- Executar comandos de reset conforme necessÃ¡rio
- PROIBIDO: criar mÃºltiplos arquivos de migraÃ§Ã£o

### Supabase SDK Only
**PERMITIDO**: 
- @supabase/supabase-js
- @supabase/ssr

**PROIBIDO**:
- pg, Prisma, Knex, Drizzle
- JWT manual (jose, jsonwebtoken)
- REST direto ao PostgREST
- ConexÃµes diretas ao banco

**REGRAS**:
- RLS sempre ON
- Service role apenas em Edge Functions

## ESTRUTURA E ORGANIZAÃ‡ÃƒO

### ARQUITETURA: Vertical Slice + Stores por DomÃ­nio

### Estrutura Recomendada
```
src/
â”œâ”€â”€ app/                    # Next.js App Router
â”œâ”€â”€ components/            # Componentes globais
â”‚   â””â”€â”€ ui/               # shadcn/ui components
â”œâ”€â”€ features/              # DomÃ­nios especÃ­ficos (Vertical Slice)
â”‚   â”œâ”€â”€ [feature-name]/    # Ex: users, products, orders
â”‚   â”‚   â”œâ”€â”€ components/    # UI especÃ­fica do domÃ­nio
â”‚   â”‚   â”œâ”€â”€ stores/        # Estado especÃ­fico do domÃ­nio
â”‚   â”‚   â”œâ”€â”€ hooks/         # Hooks especÃ­ficos
â”‚   â”‚   â”œâ”€â”€ services/      # LÃ³gica de negÃ³cio
â”‚   â”‚   â””â”€â”€ types/         # Types especÃ­ficos
â”œâ”€â”€ shared/               # Cross-cutting concerns
â”‚   â”œâ”€â”€ stores/           # Auth, UI, Session
â”‚   â”œâ”€â”€ components/ui/    # Design system
â”‚   â”œâ”€â”€ hooks/            # Hooks globais
â”‚   â”œâ”€â”€ services/         # Infraestrutura
â”‚   â””â”€â”€ utils/            # UtilitÃ¡rios
â””â”€â”€ tests/               # E2E com Gherkin/Playwright
```

### Stores por DomÃ­nio (Arquitetura Alvo)
```typescript
// EVITAR: Store monolÃ­tico
profile-store.ts  // Faz TUDO (auth, profile, UI, permissions)

// PREFERIR: Stores segregados por responsabilidade
shared/stores/
â”œâ”€â”€ auth.store.ts         # SÃ³ autenticaÃ§Ã£o
â”œâ”€â”€ ui.store.ts           # SÃ³ estado UI
â””â”€â”€ session.store.ts      # SÃ³ sessÃ£o

features/[domain]/stores/
â”œâ”€â”€ [domain].store.ts     # Estado principal do domÃ­nio
â”œâ”€â”€ [domain]-form.store.ts # FormulÃ¡rios especÃ­ficos
â””â”€â”€ [domain]-list.store.ts # Listagem/filtros
```

### PrincÃ­pios de OrganizaÃ§Ã£o SOLID

**Services** (Single Responsibility)
```typescript
// BOM: Uma responsabilidade clara
class UserAuthService {
  async authenticate(email: string): Promise<User>
}

class UserProfileService {
  async updateProfile(id: string, data: Profile): Promise<void>
}

// RUIM: MÃºltiplas responsabilidades
class UserService {
  async authenticate()
  async updateProfile()
  async sendEmail()
}
```

**Interfaces** (Interface Segregation)
```typescript
// BOM: Interfaces especÃ­ficas
interface Readable { read(): Data }
interface Writable { write(data: Data): void }

// RUIM: Interface gorda
interface Repository {
  read(); write(); delete(); update(); 
  backup(); restore(); validate();
}
```

**DependÃªncias** (Dependency Inversion)
```typescript
// BOM: Depende de abstraÃ§Ã£o
constructor(private auth: IAuthService)

// RUIM: Depende de implementaÃ§Ã£o concreta
constructor(private auth: SupabaseAuthService)
```

## FLUXO DE TRABALHO

### 1. DESCOBERTA (com usuÃ¡rio)
- Fazer todas as perguntas obrigatÃ³rias
- Confirmar escopo e regras de negÃ³cio
- Identificar cÃ³digo existente para reutilizar

### 2. INVESTIGAÃ‡ÃƒO 
- Buscar implementaÃ§Ãµes similares
- Analisar padrÃµes usados na Ã¡rea
- Mapear dependÃªncias e integraÃ§Ãµes
- LER E COMPREENDER o cÃ³digo existente completamente

### 3. PLANEJAMENTO
- Desenhar soluÃ§Ã£o seguindo SOLID
- Identificar classes/mÃ©todos a criar/modificar
- Planejar reutilizaÃ§Ã£o de cÃ³digo existente

### 4. VALIDAÃ‡ÃƒO PRÃ‰-IMPLEMENTAÃ‡ÃƒO
- Revisar com usuÃ¡rio antes de codificar
- Confirmar approach e arquitetura
- Ajustar baseado em feedback

### 5. IMPLEMENTAÃ‡ÃƒO
- Seguir princÃ­pios SOLID rigorosamente
- Reutilizar cÃ³digo existente ao mÃ¡ximo
- Manter responsabilidade Ãºnica por classe/mÃ©todo

### 6. TESTES E EVIDÃŠNCIAS
- Testes unitÃ¡rios para cada service
- E2E com Playwright + Gherkin (pasta tests/)
- Screenshots/evidÃªncias quando aplicÃ¡vel
- BDD scenarios para validaÃ§Ã£o de regras de negÃ³cio

### 7. APROVAÃ‡ÃƒO
- Code review focado em SOLID
- Verificar reutilizaÃ§Ã£o adequada
- Aguardar aprovaÃ§Ã£o do usuÃ¡rio

## CHECKLIST DE CONFORMIDADE

**Arquitetura**
- [ ] PrincÃ­pios SOLID aplicados
- [ ] Responsabilidade Ãºnica por classe
- [ ] CÃ³digo existente reutilizado
- [ ] Sem duplicaÃ§Ã£o (DRY)

**InvestigaÃ§Ã£o**
- [ ] Ferramentas apropriadas utilizadas
- [ ] PadrÃµes existentes identificados
- [ ] DependÃªncias mapeadas

**Qualidade**
- [ ] TypeScript strict mode
- [ ] Interfaces segregadas
- [ ] InversÃ£o de dependÃªncias
- [ ] Testes unitÃ¡rios
- [ ] Testes E2E atualizados

**Conformidade**
- [ ] Regras de negÃ³cio respeitadas
- [ ] RLS ativo (quando aplicÃ¡vel)
- [ ] Dados reais (sem mocks)
- [ ] shadcn/ui para UI

## TEMPLATE DE RESPOSTA

### DESCOBERTA
**Perguntas ao usuÃ¡rio**:
1. [Contexto de negÃ³cio]
2. [CÃ³digo existente relacionado]
3. [Escopo e limites]

### INVESTIGAÃ‡ÃƒO
**CÃ³digo existente encontrado**:
- Services: [referÃªncias]
- Hooks: [referÃªncias]
- Utils: [referÃªncias]

**PadrÃµes identificados**:
- [PadrÃ£o]: usado em [arquivo]

**Fluxo de execuÃ§Ã£o mapeado** (para bugs/problemas):
1. [Passo 1]: [componente/arquivo:linha]
2. [Passo 2]: [service/hook:mÃ©todo]
3. [Passo 3]: [transformaÃ§Ã£o de dados]
4. [Resultado]: [esperado vs atual]

### PROPOSTA DE IMPLEMENTAÃ‡ÃƒO

**Arquitetura SOLID**:
```typescript
// Estrutura proposta
interface INewService { }
class NewService implements INewService {
  constructor(private dependency: IDependency) {}
  // Single responsibility
}
```

**ReutilizaÃ§Ã£o**:
- Estendendo: [classe/mÃ©todo existente]
- Compondo: [services existentes]

**Novos arquivos necessÃ¡rios**:
- [ ] path/to/new-service.ts (justificativa)

**ModificaÃ§Ãµes em existentes**:
- [ ] path/to/existing.ts: [mudanÃ§a especÃ­fica]

### VALIDAÃ‡ÃƒO
- [ ] SOLID checklist completo
- [ ] CÃ³digo existente maximamente reutilizado
- [ ] Complexidade mÃ­nima (KISS)

## DEBUGGING E ANÃLISE DE PROBLEMAS

### ABORDAGEM OBRIGATÃ“RIA: Leitura de CÃ³digo
**NUNCA debuggar via prints/console.log**

#### 1. COMPREENSÃƒO DO FLUXO
- Ler completamente o cÃ³digo relacionado ao problema
- Mapear o fluxo de execuÃ§Ã£o passo a passo
- Identificar todos os pontos de entrada e saÃ­da
- Entender as transformaÃ§Ãµes de dados

#### 2. COMPARTILHAMENTO COM USUÃRIO
Sempre apresentar:
```
**FLUXO IDENTIFICADO:**
1. UsuÃ¡rio aciona [aÃ§Ã£o] em [componente]
2. Component chama [hook/service]  
3. Service executa [operaÃ§Ã£o] 
4. Dados fluem por [caminho]
5. Resultado esperado: [X]
6. Resultado atual: [Y]
7. **POSSÃVEL CAUSA:** [anÃ¡lise baseada na leitura]
```

#### 3. DEBUGGING ESTRUTURADO
**FAZER:**
- Analisar cÃ³digo estÃ¡tico primeiro
- Mapear dependÃªncias e data flow
- Validar lÃ³gica linha por linha
- Verificar tipos e interfaces
- Checar tratamento de erros

**NÃƒO FAZER:**
- Adicionar console.log/prints
- Tentar "adivinhar" o problema
- Fazer mudanÃ§as sem entender o fluxo
- Debuggar "no escuro"

## PROIBIÃ‡Ã•ES ABSOLUTAS

1. Criar cÃ³digo sem buscar existente primeiro
2. Violar princÃ­pios SOLID
3. Duplicar lÃ³gica existente
4. Criar "god classes" com mÃºltiplas responsabilidades
5. Implementar sem aprovaÃ§Ã£o do approach
6. Usar drivers diretos de banco (quando aplicÃ¡vel)
7. Pular investigaÃ§Ã£o de cÃ³digo existente
8. Marcar tarefa concluÃ­da sem teste do usuÃ¡rio
9. **Debuggar via prints/console.log**
10. **Implementar sem compreender o fluxo completo**

## METODOLOGIA DE DESENVOLVIMENTO

### ABORDAGEM ITERATIVA
- ComeÃ§ar com funcionalidade mÃ­nima viÃ¡vel
- Evitar over-engineering inicial
- Refatorar conforme necessÃ¡rio

### FOCO E DISCIPLINA
**FAZER**: 
- Perguntar ANTES de assumir
- Investigar ANTES de implementar  
- Reutilizar ANTES de criar
- Priorizar features conforme definido

**NÃƒO FAZER**:
- Assumir contexto sem confirmar
- Criar cÃ³digo desnecessÃ¡rio
- Implementar alÃ©m do escopo acordado
- Mexer em outras Ã¡reas sem aprovaÃ§Ã£o

### TESTES E QUALIDADE
- BDD scenarios na pasta tests/
- CenÃ¡rios para validaÃ§Ã£o de regras de negÃ³cio
- AutomaÃ§Ã£o com Playwright
- Sempre atualizar testes apÃ³s mudanÃ§as

## CUSTOMIZAÃ‡ÃƒO DO TEMPLATE

Este template deve ser adaptado para cada projeto especÃ­fico:

1. **DomÃ­nios**: Substitua exemplos por domÃ­nios reais do projeto
2. **Regras de NegÃ³cio**: Adapte para regulamentaÃ§Ãµes especÃ­ficas
3. **Stack**: Ajuste tecnologias conforme necessÃ¡rio
4. **Estrutura**: Modifique organizaÃ§Ã£o conforme arquitetura escolhida

---
**IMPORTANTE**: Este Ã© um template base. Customize conforme as necessidades especÃ­ficas do seu projeto.
