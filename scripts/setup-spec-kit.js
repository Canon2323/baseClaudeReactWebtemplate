#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  magenta: '\x1b[35m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function step(message) {
  console.log(`\n${colors.bold}${colors.blue}🔧 ${message}${colors.reset}`);
}

function success(message) {
  console.log(`${colors.green}✅ ${message}${colors.reset}`);
}

function error(message) {
  console.log(`${colors.red}❌ ${message}${colors.reset}`);
}

function warning(message) {
  console.log(`${colors.yellow}⚠️  ${message}${colors.reset}`);
}

function info(message) {
  console.log(`${colors.magenta}ℹ️  ${message}${colors.reset}`);
}

function checkPrerequisites() {
  step('Checking prerequisites for GitHub Spec Kit');

  try {
    // Check Python 3.11+
    const pythonVersion = execSync('python --version', { encoding: 'utf8' });
    const versionMatch = pythonVersion.match(/Python (\d+)\.(\d+)/);

    if (versionMatch) {
      const major = parseInt(versionMatch[1]);
      const minor = parseInt(versionMatch[2]);

      if (major >= 3 && minor >= 11) {
        success(`Python ${major}.${minor} found (required: 3.11+)`);
      } else {
        error(`Python ${major}.${minor} found, but 3.11+ is required`);
        return false;
      }
    } else {
      error('Could not detect Python version');
      return false;
    }

    // Check uv
    try {
      execSync('uv --version', { stdio: 'pipe' });
      success('uv package manager found');
    } catch {
      warning('uv not found. Installing uv...');
      try {
        execSync('pip install uv', { stdio: 'inherit' });
        success('uv installed successfully');
      } catch (err) {
        error(`Failed to install uv: ${err.message}`);
        return false;
      }
    }

    return true;
  } catch (err) {
    error(`Prerequisites check failed: ${err.message}`);
    log('\n📋 Required:', 'yellow');
    log('1. Python 3.11+ installed and in PATH', 'yellow');
    log('2. pip package manager', 'yellow');
    log('\n🔧 Install Python: https://python.org/downloads/', 'blue');
    return false;
  }
}

function initializeSpecKit() {
  step('Initializing GitHub Spec Kit in project');

  try {
    // Check if already initialized
    const specsDir = path.join(process.cwd(), 'specs');
    if (fs.existsSync(specsDir)) {
      warning('Specs directory already exists. Skipping initialization.');
      return true;
    }

    // Initialize spec-kit in current directory
    info('Running: uvx --from git+https://github.com/github/spec-kit.git specify init .');
    execSync('uvx --from git+https://github.com/github/spec-kit.git specify init .', {
      stdio: 'inherit',
      cwd: process.cwd()
    });

    success('GitHub Spec Kit initialized successfully');
    return true;
  } catch (err) {
    error(`Failed to initialize Spec Kit: ${err.message}`);
    return false;
  }
}

function createSpecKitDocs() {
  step('Creating Spec Kit documentation and examples');

  const specKitGuide = `# 📋 Spec-Driven Development with GitHub Spec Kit

## 🎯 Metodologia

O **Spec-Driven Development** inverte o processo tradicional:
- **Antes**: Código → Documentação
- **Agora**: Especificação → Código

## 🚀 Comandos Principais

### **1. Especificar (/specify)**
\`\`\`
/specify Build a user authentication system with email/password and social login
\`\`\`

**Gera:** \`specs/requirements.md\` com:
- Visão do produto
- Funcionalidades core
- User stories
- Critérios de sucesso

### **2. Planejar (/plan)**
\`\`\`
/plan Use Next.js 14, Supabase Auth, shadcn/ui components
\`\`\`

**Gera:** \`specs/plan.md\` com:
- Decisões arquiteturais
- Stack tecnológica
- Estrutura de componentes
- Modelos de dados

### **3. Tarefas (/tasks)**
\`\`\`
/tasks
\`\`\`

**Gera:** \`specs/tasks/\` com:
- Lista de tarefas acionáveis
- Priorização
- Dependências
- Critérios de aceitação

### **4. Implementar**
\`\`\`
implement specs/plan.md
\`\`\`

**Executa:** Implementação guiada pelas specs

## 📁 Estrutura Gerada

\`\`\`
projeto/
├── specs/
│   ├── requirements.md    # O QUE construir
│   ├── plan.md           # COMO construir
│   └── tasks/            # Tarefas específicas
│       ├── auth.md
│       ├── ui.md
│       └── database.md
└── src/                  # Código implementado
\`\`\`

## 🔄 Workflow Completo

### **Exemplo: Sistema de Blog**

1. **Especificar:**
   \`\`\`
   /specify Build a blog platform with posts, comments, and user profiles
   \`\`\`

2. **Planejar:**
   \`\`\`
   /plan Use this project's stack: Next.js 14, Supabase, shadcn/ui, TypeScript
   \`\`\`

3. **Quebrar em tarefas:**
   \`\`\`
   /tasks
   \`\`\`

4. **Implementar iterativamente:**
   \`\`\`
   implement specs/tasks/posts.md
   implement specs/tasks/comments.md
   implement specs/tasks/profiles.md
   \`\`\`

## 💡 Vantagens para nosso Template SOLID

### **Alinhamento com SOLID:**
- **Single Responsibility**: Specs focadas e específicas
- **Open/Closed**: Metodologia extensível para qualquer projeto
- **Dependency Inversion**: Specs abstratas → Implementação concreta

### **Integração com nossa stack:**
- Aproveita providers já implementados (Auth, Database, Theme)
- Usa componentes shadcn/ui existentes
- Mantém arquitetura SOLID estabelecida

### **Qualidade de código:**
- Documentação sempre atualizada
- Decisões técnicas registradas
- Context rico para AI assistants

## 🎯 Casos de Uso

### **Para features novas:**
\`\`\`
/specify Add dark mode theme switching with user preference persistence
/plan Extend existing ThemeProvider, use localStorage, add toggle component
/tasks
implement specs/plan.md
\`\`\`

### **Para refatoração:**
\`\`\`
/specify Refactor authentication to support OAuth providers
/plan Extend AuthProvider interface, add strategy pattern for OAuth
/tasks
implement specs/tasks/oauth-strategy.md
\`\`\`

### **Para debugging:**
\`\`\`
/specify Fix performance issues in user dashboard
/plan Profile rendering, optimize queries, implement pagination
/tasks
implement specs/tasks/performance-optimization.md
\`\`\`

## 🔗 Integração com Template

Este template já inclui:
- ✅ **Arquitetura SOLID** preparada para extensões
- ✅ **Providers abstratos** (Auth, Database, Theme)
- ✅ **Componentes shadcn/ui** prontos para uso
- ✅ **TypeScript** com types bem definidos

**GitHub Spec Kit potencializa tudo isso** fornecendo metodologia estruturada para evolução do projeto.

## 📚 Recursos

- [GitHub Spec Kit Repository](https://github.com/github/spec-kit)
- [Spec-Driven Development Methodology](https://github.com/github/spec-kit#readme)
- [Template SOLID Documentation](./README.md)

---

**Combine especificações estruturadas com nossa arquitetura SOLID para desenvolvimento de alta qualidade! 🚀**
`;

  const docsDir = path.join(process.cwd(), 'docs');
  const specKitDocsPath = path.join(docsDir, 'SPEC-DRIVEN-DEVELOPMENT.md');

  try {
    fs.writeFileSync(specKitDocsPath, specKitGuide);
    success('Spec Kit documentation created: docs/SPEC-DRIVEN-DEVELOPMENT.md');
  } catch (err) {
    warning(`Could not create documentation: ${err.message}`);
  }

  // Create example specs if they don't exist
  const specsDir = path.join(process.cwd(), 'specs');
  if (fs.existsSync(specsDir)) {
    const exampleSpec = `# Example Project Specification

## Product Vision
This is an example specification generated by GitHub Spec Kit.

## Core Features
- Feature 1: Description
- Feature 2: Description
- Feature 3: Description

## User Stories
- As a [user type], I want [functionality] so that [benefit]

## Success Criteria
- [Measurable outcome 1]
- [Measurable outcome 2]

## Technical Constraints
- Must integrate with existing SOLID architecture
- Must use TypeScript for type safety
- Must follow shadcn/ui design system

---

**Next step:** Use \`/plan\` command to create technical implementation plan.
`;

    const examplePath = path.join(specsDir, 'example.md');
    if (!fs.existsSync(examplePath)) {
      try {
        fs.writeFileSync(examplePath, exampleSpec);
        success('Example specification created: specs/example.md');
      } catch (err) {
        warning(`Could not create example spec: ${err.message}`);
      }
    }
  }
}

function updatePackageJson() {
  step('Adding Spec Kit scripts to package.json');

  const packageJsonPath = path.join(process.cwd(), 'package.json');

  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // Add spec-kit related scripts
    packageJson.scripts = packageJson.scripts || {};

    const newScripts = {
      'spec:init': 'uvx --from git+https://github.com/github/spec-kit.git specify init .',
      'spec:example': 'echo "Use /specify command in Claude Code to create specifications"',
      'spec:docs': 'echo "See docs/SPEC-DRIVEN-DEVELOPMENT.md for usage guide"'
    };

    let scriptsAdded = 0;
    Object.entries(newScripts).forEach(([key, value]) => {
      if (!packageJson.scripts[key]) {
        packageJson.scripts[key] = value;
        scriptsAdded++;
      }
    });

    if (scriptsAdded > 0) {
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      success(`Added ${scriptsAdded} Spec Kit scripts to package.json`);
    } else {
      info('Spec Kit scripts already exist in package.json');
    }

  } catch (err) {
    warning(`Could not update package.json: ${err.message}`);
  }
}

async function main() {
  log('📋 GitHub Spec Kit Setup for Spec-Driven Development', 'bold');
  log('=====================================================\n', 'blue');

  log('Setting up GitHub Spec Kit for structured AI-driven development...', 'blue');
  log('This enables specification-first development with Claude Code.\n', 'yellow');

  info('What will be installed:');
  log('  📋 GitHub Spec Kit CLI tool', 'green');
  log('  📁 specs/ directory structure', 'green');
  log('  📚 Spec-Driven Development documentation', 'green');
  log('  🔧 npm scripts for common tasks', 'green');

  // Check prerequisites
  const prereqsOk = checkPrerequisites();
  if (!prereqsOk) {
    return false;
  }

  // Initialize Spec Kit
  const initOk = initializeSpecKit();
  if (!initOk) {
    return false;
  }

  // Create documentation and examples
  createSpecKitDocs();

  // Update package.json
  updatePackageJson();

  log('\n🎉 GitHub Spec Kit setup completed successfully!', 'bold');
  log('==============================================\n', 'green');

  log('📋 What was installed:', 'bold');
  log('  ✅ GitHub Spec Kit CLI tool', 'green');
  log('  ✅ specs/ directory initialized', 'green');
  log('  ✅ Documentation and examples created', 'green');
  log('  ✅ npm scripts added', 'green');

  log('\n📝 Next Steps:', 'bold');
  log('1. 📖 Read the guide:', 'blue');
  log('   cat docs/SPEC-DRIVEN-DEVELOPMENT.md', 'yellow');
  log('2. 🚀 Start specifying in Claude Code:', 'blue');
  log('   /specify Build [your feature description]', 'yellow');
  log('3. 📋 Plan implementation:', 'blue');
  log('   /plan Use this template\'s SOLID architecture', 'yellow');

  log('\n💡 Key Benefits:', 'bold');
  log('- 📋 Specification-first development', 'magenta');
  log('- 🤖 Structured AI interactions', 'magenta');
  log('- 📚 Living documentation', 'magenta');
  log('- 🏗️ Integrates with SOLID architecture', 'magenta');

  log('\n🚀 Your project now supports Spec-Driven Development!', 'bold');
}

if (require.main === module) {
  main();
}

module.exports = { checkPrerequisites, initializeSpecKit, createSpecKitDocs };