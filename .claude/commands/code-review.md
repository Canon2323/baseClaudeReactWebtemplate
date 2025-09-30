# Code Review Checklist - Template

Execute esta revisão COMPLETA após qualquer implementação de código.

## PREPARAÇÃO PARA REVIEW

### 1. Contexto da Mudança

- [ ] Entendo o problema que esta mudança resolve?
- [ ] Conheço o escopo e limitações (YAGNI)?
- [ ] Li o código ANTES da mudança para comparar?

### 2. Agentes Utilizados

- [ ] **code-reviewer** foi chamado para esta análise?
- [ ] **Ferramentas MCP** foram usadas para leitura de código?
- [ ] Outros agentes relevantes foram consultados?
- [ ] **EVIDENCE** de cada agente está documentado?

## ANÁLISE SOLID RIGOROSA

### S - Single Responsibility

- [ ] Cada classe/função tem UMA responsabilidade clara?
- [ ] Mudanças não misturaram concerns diferentes?
- [ ] Services não fazem autenticação + business logic + UI?
- [ ] Components não fazem data fetching + rendering + validation?

**Red flags:**

```typescript
// RUIM: Classe fazendo múltiplas coisas
class UserService {
  authenticate() {} // Auth
  validateData() {} // Validation
  sendEmail() {} // Communication
  updateProfile() {} // Business logic
}
```

### O - Open/Closed

- [ ] Código permite extensão sem modificação?
- [ ] Novas features não quebram funcionalidade existente?
- [ ] Interfaces/contratos foram respeitados?

### L - Liskov Substitution

- [ ] Implementações são substituíveis sem quebrar o sistema?
- [ ] Subclasses não removem funcionalidade esperada?
- [ ] Contracts/tipos são consistentes?

### I - Interface Segregation

- [ ] Interfaces são pequenas e focadas?
- [ ] Não há métodos não utilizados sendo implementados?
- [ ] Dependências são mínimas e específicas?

### D - Dependency Inversion

- [ ] Código depende de abstrações (interfaces/hooks)?
- [ ] Não há imports diretos de implementações concretas?
- [ ] Dependencies são injetadas, não hard-coded?

## QUALIDADE DE CÓDIGO

### TypeScript

- [ ] Tipos explícitos (sem 'any')?
- [ ] Interfaces bem definidas?
- [ ] Strict mode respeitado?
- [ ] Generics usados adequadamente?

### Legibilidade

- [ ] Nomes de variáveis/funções são descritivos?
- [ ] Lógica complexa está comentada (SEM EMOJIS)?
- [ ] Funções são pequenas e focadas?
- [ ] Código é auto-explicativo?

### Performance

- [ ] Não há loops desnecessários?
- [ ] Queries/calls são otimizados?
- [ ] Memory leaks evitados?
- [ ] Re-renders desnecessários evitados (React)?

## ARQUITETURA E ESTRUTURA

### Organização de Arquivos

- [ ] Arquivos estão na estrutura correta?
- [ ] Foco do domínio respeitado?
- [ ] Imports seguem hierarquia (features não importam entre si)?
- [ ] Shared/core usado adequadamente?

### Reutilização (DRY)

- [ ] Código existente foi REALMENTE verificado?
- [ ] Não há duplicação de lógica?
- [ ] Services/hooks/utils existentes foram reutilizados?
- [ ] Padrões estabelecidos foram seguidos?

### Stores e Estado

- [ ] Stores têm responsabilidades específicas?
- [ ] Estado não está duplicado entre stores?
- [ ] Mutations são simples e diretas?
- [ ] Side effects estão controlados?

## BANCO DE DADOS (se aplicável)

### SDK Usage

- [ ] Apenas SDKs oficiais utilizados?
- [ ] Não há drivers diretos desnecessários?
- [ ] Autenticação via frameworks oficiais?
- [ ] APIs oficiais priorizadas?

### Segurança

- [ ] Políticas de acesso implementadas?
- [ ] Roles e permissões corretas?
- [ ] Validação de dados no backend?
- [ ] Não há vazamento de dados sensíveis?

### Schema

- [ ] Mudanças de schema documentadas?
- [ ] Migrations organizadas adequadamente?
- [ ] Foreign keys e constraints respeitados?

## TESTES E VALIDAÇÃO

### Cobertura

- [ ] Testes unitários para services críticos?
- [ ] E2E scenarios Gherkin atualizados?
- [ ] Edge cases contemplados?
- [ ] Error handling testado?

### Evidências Visuais

- [ ] Screenshots/vídeos de browsermcp anexados?
- [ ] Fluxos críticos testados visualmente?
- [ ] Responsividade verificada?
- [ ] Acessibilidade básica (WCAG 2.1)?

## BUSINESS RULES & COMPLIANCE

### Domain Rules

- [ ] Business rules properly implemented?
- [ ] Domain constraints respected?
- [ ] Required workflows maintained?
- [ ] Mandatory data collection implemented?

### Audit & Compliance

- [ ] **Legal/compliance advisors** consulted when needed?
- [ ] Compliance validated for critical changes?
- [ ] Audit logs maintained?

## COMMUNICATION & DOCUMENTATION

### Code Cleanliness - NEVER use in:

- [ ] Source code verified (zero emojis)?
- [ ] Clean comments (zero emojis)?
- [ ] Professional commits/PRs (zero emojis)?
- [ ] Technical documentation clean?

### Documentation

- [ ] README updated if necessary?
- [ ] API changes documented?
- [ ] Breaking changes identified?

## DEBUGGING & MAINTAINABILITY

### Problem Analysis

- [ ] Debugging done through code READING?
- [ ] NEVER used console.log/prints?
- [ ] Execution flow mapped?
- [ ] Root cause correctly identified?

### Structured Logging

- [ ] Appropriate logs for production?
- [ ] No forgotten console.log statements?
- [ ] Error tracking implemented?

## FINAL APPROVAL

### Code Review Checklist

- [ ] ALL SOLID principles verified?
- [ ] Architecture and structure respected?
- [ ] Technical quality approved?
- [ ] Tests and evidence complete?
- [ ] Legal compliance validated (if applicable)?
- [ ] Zero emojis in technical files?
- [ ] **Relevant agents consulted and documented?**

### Final Decision

- [ ] **APPROVED** - Code ready for merge
- [ ] **APPROVED WITH RESERVATIONS** - Minor adjustments needed
- [ ] **REJECTED** - Refactoring required

---

**IMPORTANT**: This review should be executed by code-reviewer agent ALWAYS after significant implementation. Any SOLID violation or architectural issue must be fixed before merge.

**USAGE**: Execute `/code-review` after implementing features to ensure quality and compliance.
