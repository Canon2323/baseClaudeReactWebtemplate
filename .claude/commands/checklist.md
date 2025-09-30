# SOLID Compliance Checklist - Template

Execute esta análise COMPLETA antes de implementar ou revisar código.

## MANDATORY DISCOVERY

### 1. Existing Code (MCP Tools)

- [ ] Searched for similar services/hooks/utils?
- [ ] Identified existing patterns in the area?
- [ ] Mapped dependencies and integrations?
- [ ] **CODE_REF included** in analysis?

### 2. Business Context

- [ ] Do I understand the problem I'm solving?
- [ ] Identified applicable business rules?
- [ ] Confirmed scope with user (YAGNI)?

## AGENTS & MCP TOOLS

### Agent Usage Checklist

**MANDATORY**: Every response must include "Agents and Parallelism" section

#### Available Agents - Use Proactively:

- [ ] **MCP Tools**: For ALL code reading/searching, SQL, docs
- [ ] **code-reviewer**: After writing/modifying significant code
- [ ] **test-automator**: For creating unit/e2e tests
- [ ] **error-detective**: For debugging and log/error analysis
- [ ] **docs-architect**: For technical documentation
- [ ] **database-admin**: For database/schema operations
- [ ] **ui-ux-designer**: For interface designs
- [ ] **debugger**: For specialized debugging
- [ ] **domain-specific-advisor**: For domain compliance (when applicable)

#### MCP Tools - Use As Needed:

- [ ] **browsermcp**: Visual validation, screenshots
- [ ] **ui component tools**: UI component audit/creation
- [ ] **mcp-mermaid**: Flow/architecture diagrams
- [ ] **database tools**: Direct database queries
- [ ] **task-manager**: Complex task planning

### Agent Usage Validation:

- [ ] Identified ALL agents that can help?
- [ ] Used agents in PARALLEL when possible?
- [ ] Documented what each agent did?
- [ ] Included **EVIDENCE** from each agent used?

### Documentation Example:

```
**Agents and Parallelism**:
- **MCP Tools**: Analysis of existing services [CODE_REF: user.service.ts:1-50]
- **code-reviewer**: Implementation review [EVIDENCE: violations found]
- **domain-advisor**: Business rule validation [EVIDENCE: compliance OK]
- **browsermcp**: Visual testing [EVIDENCE: screenshot attached]
```

## SOLID PRINCIPLES

### S - Single Responsibility

**"One class/function = one responsibility"**

- [ ] Each class has ONLY one reason to change?
- [ ] Methods do ONE specific thing?
- [ ] Services don't mix authentication + profile + UI?
- [ ] Components don't do logic + rendering + API calls?

**COMMON VIOLATION:**

```typescript
// BAD: profile-store.ts does EVERYTHING
class ProfileStore {
  signIn(); // Auth
  loadProfile(); // Profile
  toggleSidebar(); // UI
}
```

**CORRECT:**

```typescript
// GOOD: Separated responsibilities
class AuthStore { signIn(), signOut() }
class ProfileStore { loadProfile(), updateProfile() }
class UIStore { toggleSidebar(), setTheme() }
```

### O - Open/Closed

**"Open for extension, closed for modification"**

- [ ] Can I add new functionality without changing existing code?
- [ ] Services use interfaces that allow extension?
- [ ] Components accept props for customization?

### L - Liskov Substitution

**"Subtypes must be substitutable"**

- [ ] Interface implementations are interchangeable?
- [ ] Don't break expected contracts?
- [ ] Subclasses don't remove parent class functionality?

### I - Interface Segregation

**"Specific interfaces > general interfaces"**

- [ ] Interfaces are small and focused?
- [ ] Clients don't depend on methods they don't use?
- [ ] Avoid "god interfaces" with 10+ methods?

**VIOLATION:**

```typescript
// BAD: Fat interface
interface Repository {
  read();
  write();
  delete();
  update();
  backup();
  restore();
  validate();
  sync();
}
```

**CORRECT:**

```typescript
// GOOD: Specific interfaces
interface Readable {
  read(): Data;
}
interface Writable {
  write(data: Data): void;
}
interface Validateable {
  validate(): boolean;
}
```

### D - Dependency Inversion

**"Depend on abstractions, not concretions"**

- [ ] Classes depend on interfaces, not implementations?
- [ ] Use hooks to abstract concrete services?
- [ ] Avoid direct imports of implementations?

**VIOLATION:**

```typescript
// BAD: Depends on concrete implementation
import { SupabaseUserService } from './supabase-service';
class Component {
  service = new SupabaseUserService();
}
```

**CORRECT:**

```typescript
// GOOD: Depends on abstraction
const service = useUserService(); // Hook abstracts implementation
```

## TECHNICAL QUALITY

### TypeScript & Types

- [ ] Strict mode enabled?
- [ ] All types defined (no `any`)?
- [ ] Interfaces segregated by responsibility?
- [ ] Domain-specific types defined?

### Reusability (DRY)

- [ ] Searched existing code BEFORE creating?
- [ ] Extending functionality instead of duplicating?
- [ ] Using existing components/services/utils?
- [ ] Eliminating logic duplication?

### File Structure

- [ ] Files in correct structure (features/ vs shared/)?
- [ ] Domain focus respected?
- [ ] Imports follow correct hierarchy?

## TESTS & EVIDENCE

### Coverage

- [ ] Unit tests for each service?
- [ ] Test scenarios updated?
- [ ] E2E tests working?

### Evidence

- [ ] Screenshots/videos with browsermcp?
- [ ] Execution flow documented?
- [ ] User validation before implementation?

## PROJECT COMPLIANCE

### Business Rules

- [ ] Domain rules respected?
- [ ] Required identifications implemented?
- [ ] Real data (no mocks)?

### Database & Backend

- [ ] Security policies active?
- [ ] Only official SDKs used?
- [ ] Schema changes properly managed?
- [ ] Service roles properly restricted?

### Design System

- [ ] UI component library used?
- [ ] Visual consistency maintained?
- [ ] Basic accessibility (WCAG 2.1)?

## DEBUGGING (IF APPLICABLE)

### Problem Analysis

- [ ] Read related code completely?
- [ ] Mapped execution flow step by step?
- [ ] **DID NOT use** console.log/prints for debugging?
- [ ] Shared flow with user for validation?

## FINAL AGENT VALIDATION

### Complete Collaboration Check

- [ ] **"Agents and Parallelism" section included** in response?
- [ ] All relevant agents identified?
- [ ] Used agents in parallel when possible for efficiency?
- [ ] Each agent has EVIDENCE documented?
- [ ] **CODE_REF** present for all code reading?

### Essential Agents by Task Type:

#### **Implementation/Code:**

- [ ] **MCP Tools** (mandatory reading)
- [ ] **code-reviewer** (after significant code)
- [ ] **test-automator** (tests)

#### **Debugging/Problems:**

- [ ] **MCP Tools** (analysis)
- [ ] **error-detective** (investigation)
- [ ] **debugger** (complex problems)

#### **UI/Interface:**

- [ ] **ui-ux-designer** (designs)
- [ ] **ui component tools** (components)
- [ ] **browsermcp** (visual validation)

#### **Database/Schema:**

- [ ] **database-admin** (operations)
- [ ] **database tools** (queries)

#### **Compliance/Legal:**

- [ ] **domain-specific-advisor** (business rules)

#### **Documentation/Planning:**

- [ ] **docs-architect** (documentation)
- [ ] **task-manager** (complex tasks)
- [ ] **mcp-mermaid** (diagrams)

### CRITICAL FAILURES:

- Response WITHOUT "Agents and Parallelism" section
- Using only 1 agent when several could help
- Not including CODE_REF when reading occurred
- Not using browsermcp for visual validation
- Skipping code-reviewer after implementation

## FINAL APPROVAL

### Complete Checklist

- [ ] All SOLID items verified?
- [ ] Existing code maximally reused?
- [ ] File structure respected?
- [ ] Tests updated?
- [ ] **"Agents and Parallelism" section documented?**
- [ ] **All relevant agents used?**
- [ ] **NEVER use emojis in code, comments or files**
- [ ] User approval obtained?

## COMMUNICATION GUIDELINES

### EMOJI USAGE

**ALLOWED only in:**

- Explanations/conversations with user
- Logs for easier tracking
- End user documentation

**PROHIBITED in:**

- Source code
- Code comments
- Technical files
- Commits/PRs
- Technical documentation

---

**IMPORTANT**: This checklist must be executed ALWAYS, even for small changes. Any SOLID violation or missing agents must be corrected before implementation.

**NEXT STEP**: Request user approval before marking task as complete.
