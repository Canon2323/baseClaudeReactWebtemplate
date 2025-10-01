# 🔌 MCP Servers Configuration Guide

This project includes **11+ MCP (Model Context Protocol) servers** installed locally that extend Claude Code with powerful external tools and integrations.

## 🔧 **Como Funciona o Sistema MCP**

### **Arquitetura Local**

- **MCPs instalados localmente** no `node_modules/` do projeto
- **Configuração autocontida** via `.mcp.json`
- **Zero dependência global** - cada projeto tem suas versões
- **Segurança VibeKit** com tokens isolados

### **Script Principal**

```bash
npm run setup:mcp  # Instala tudo automaticamente
```

O script `scripts/setup-mcp.js`:

1. Instala pacotes MCP no `node_modules/`
2. Cria `.mcp.json` com paths locais
3. Gera `.env.mcp.example` com templates
4. Configura `.gitignore` para segurança

## 📋 Configured MCP Servers

### **Core Development**

1. **shadcn/ui MCP** (`@heilgar/shadcn-ui-mcp-server`)
   - Instalação e gerenciamento de componentes
   - Comandos: "Add button component", "Install card from shadcn"

2. **Playwright MCP** (`@playwright/mcp`)
   - Automação de browser e testes
   - Comandos: "Test login form", "Take screenshot"

3. **Figma MCP** (via Figma Desktop app)
   - Design-to-code integration
   - Conexão local: `http://127.0.0.1:3845/mcp`

### **Repository & Version Control**

4. **GitHub MCP** (via uvx)
   - Operações de repositório, issues, PRs
   - Comandos: "Create issue", "Check PR status"

5. **Git Local MCP**
   - Operações locais de repositório
   - Comandos: commit, branch, status

### **Web & Data**

6. **Apify MCP** (`@apify/actors-mcp-server`)
   - Web scraping e extração de dados
   - Comandos: "Scrape website data"

7. **Browser Automation MCP** (`@executeautomation/playwright-mcp-server`)
   - Controle adicional de browser
   - Alternativa ao Playwright padrão

### **AI & Documentation**

8. **Gemini MCP** (via npx)
   - Integração com Google Gemini AI
   - Comandos: "Ask Gemini about..."

9. **Context7 MCP** (`@upstash/context7-mcp`)
   - Busca em documentação atualizada
   - Comandos: "Search latest docs for..."

10. **Serena MCP** (via uvx)
    - Toolkit de agente de coding
    - Comandos avançados de programação

### **Services Integration**

11. **Stripe MCP** (`@stripe/mcp`)
    - Processamento de pagamentos e webhooks
    - Comandos: "Create payment intent", "List customers"

12. **Supabase MCP** (`@supabase/mcp-server-supabase`)
    - Operações de banco de dados
    - Modo read-only para segurança

### **System Tools**

- **Filesystem MCP** (`@modelcontextprotocol/server-filesystem`)
  - Operações de arquivo locais
- **Local Git Operations**
  - Git específico do projeto

## 🚀 **Guia Passo a Passo Completo**

### **1. Instalar MCPs Localmente**

```bash
npm run setup:mcp
```

**O que acontece:**

- Instala 11+ pacotes MCP em `node_modules/`
- Cria `.mcp.json` com configuração local
- Gera `.env.mcp.example` com templates de API keys
- Atualiza `.gitignore` para segurança

### **2. Configurar API Tokens**

```bash
cp .env.mcp.example .env.local
# Editar .env.local com suas chaves reais
```

**Tokens Essenciais:**

- `SUPABASE_ACCESS_TOKEN` - Para operações de banco
- `GITHUB_PERSONAL_ACCESS_TOKEN` - Para repositório

**Tokens Opcionais:**

- `APIFY_TOKEN` - Web scraping
- `GEMINI_API_KEY` - AI integration
- `CONTEXT7_API_KEY` - Documentação
- `STRIPE_SECRET_KEY` - Pagamentos (use TEST keys)

### **3. Restart Claude Code**

⚠️ **IMPORTANTE:** Restart completo do Claude Code para carregar MCPs

### **4. Verificar MCPs Ativos**

```bash
# No Claude Code, use o comando:
/mcp
```

### **5. Casos Especiais**

**Figma MCP:**

1. Abrir Figma Desktop
2. Preferences → Enable local MCP Server
3. Server ativo em `http://127.0.0.1:3845/mcp`

**Serena MCP:**

```bash
pip install uv  # Requer Python + uv
```

## 🔑 Required API Keys

### Essential (Core functionality)

- **Supabase Access Token**: Database operations
- **GitHub Personal Access Token**: Repository integration

### Optional (Enhanced features)

- **Apify Token**: Web scraping capabilities
- **Gemini API Key**: AI model integration
- **Context7 API Key**: Documentation search
- **Stripe Keys**: Payment processing (use TEST keys)

## 🛠 Special Setup Requirements

### Figma MCP

1. Install Figma Desktop app
2. Go to Preferences → Enable local MCP Server
3. Server runs automatically at http://127.0.0.1:3845/mcp

### Serena MCP

Requires Python and uv:

```bash
pip install uv
```

## 💡 **Vantagens da Abordagem Local**

### **✅ Autocontido**

- MCPs instalados no `node_modules/` do projeto
- Configuração `.mcp.json` específica do projeto
- Template funcionará em qualquer ambiente

### **✅ Controle de Versão**

- Cada projeto tem suas próprias versões de MCP
- `package.json` trava versões específicas
- Atualizações controladas por projeto

### **✅ Portabilidade**

- Zero dependência de configuração global
- Clone → `npm install` → `npm run setup:mcp` → Funciona
- Funciona em qualquer máquina/CI/Docker

### **✅ Isolamento**

- Sem conflitos entre projetos diferentes
- Ambientes de desenvolvimento isolados
- Tokens específicos por projeto

### **✅ Segurança VibeKit**

- Tokens em `.env.local` (nunca commitados)
- Modo read-only quando possível
- Rotação de tokens por projeto
- Documentação de segurança completa

## 🔍 Troubleshooting

### MCP Server Not Showing

1. Restart Claude Code completely
2. Check API keys in .env.local
3. Use `/mcp` command to verify status

### Figma MCP Connection Issues

1. Ensure Figma Desktop is running
2. Check "Enable local MCP Server" is ON in Figma Preferences
3. Try http://127.0.0.1:3845/sse if /mcp doesn't work

### Permission Errors

- GitHub: Token needs `repo` scope
- Supabase: Use read-only mode for safety
- Stripe: Always use test keys in development

## 📚 **Exemplos de Uso Prático**

### **shadcn/ui MCP**

```
"Add a button component to my project"
"Install the card component from shadcn"
"Update all shadcn components to latest"
```

### **Playwright MCP**

```
"Test the login form on localhost:3000"
"Take a screenshot of the homepage"
"Check if the navigation works correctly"
```

### **GitHub MCP**

```
"Create a new issue for the bug we found"
"Check the status of PR #123"
"List recent commits in main branch"
```

### **Supabase MCP**

```
"Show me the users table structure"
"Count how many active users we have"
"Check the latest created records"
```

### **Stripe MCP**

```
"List recent payments in test mode"
"Create a test payment intent for $10"
"Show payment status for customer X"
```

### **Apify MCP**

```
"Scrape pricing data from competitor site"
"Extract contact information from this page"
"Monitor changes on target website"
```

## 🔒 Security Best Practices

1. **Never commit API keys** - Use .env.local only
2. **Use read-only tokens** when possible
3. **Rotate keys regularly** for security
4. **Use test environments** for development
5. **Review MCP permissions** before granting access

## 🆘 Getting Help

- Check Claude Code documentation: https://docs.anthropic.com/claude-code
- MCP Protocol docs: https://modelcontextprotocol.io/
- Individual MCP server documentation linked in config

---

## 🎯 **Resumo Executivo**

**✅ Sistema MCP LOCAL implementado e funcional**

- **11+ servidores MCP** instalados automaticamente
- **Configuração autocontida** no projeto
- **Segurança VibeKit** com tokens isolados
- **Zero dependência global** de Claude Code

**🚀 Para ativar:**

```bash
npm run setup:mcp          # Instalar MCPs
cp .env.mcp.example .env.local  # Configurar tokens
# Restart Claude Code
/mcp                        # Verificar status
```

**💪 Funcionalidades:**

- Desenvolvimento com shadcn/ui e Playwright
- Operações GitHub e Git locais
- Web scraping com Apify
- AI integration com Gemini
- Database operations com Supabase
- Payment processing com Stripe
- E muito mais...

**🔒 Segurança:**

- Tokens nunca commitados
- Modo read-only padrão
- Documentação completa de best practices

**All 11+ MCP servers are installed locally and ready to enhance your development workflow with Claude Code!** 🚀
