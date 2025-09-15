# 🔌 MCP Servers Configuration Guide

This project includes **11 MCP (Model Context Protocol) servers** installed locally that extend Claude Code with powerful external tools and integrations.

## 📋 Configured MCP Servers

### Core Development
1. **shadcn/ui MCP** - Component management and installation
2. **Playwright MCP** - Browser automation and testing  
3. **Figma MCP** - Design-to-code integration (requires Figma Desktop)

### Repository & Version Control
4. **GitHub MCP** - Repository operations, issues, PRs
5. **Git MCP** - Local repository operations

### Web & Data
6. **Apify MCP** - Web scraping and data extraction
7. **Browser Automation MCP** - Additional browser control

### AI & Documentation  
8. **Gemini MCP** - Google Gemini AI integration
9. **Context7 MCP** - Up-to-date documentation search
10. **Serena MCP** - AI coding agent toolkit

### Services Integration
11. **Stripe MCP** - Payment processing and webhooks
12. **Supabase MCP** - Database operations

### System Tools
- **Filesystem MCP** - File operations
- **Local Git MCP** - Project-specific git operations

## 🚀 Quick Start

1. **Install MCP servers locally**:
   ```bash
   npm run setup:mcp
   ```

2. **Configure API tokens**:
   ```bash
   cp .env.mcp.example .env.local
   # Edit .env.local with your actual API keys
   ```

3. **Restart Claude Code completely**

4. **Verify MCP servers**:
   ```bash
   # In Claude Code, use the /mcp command
   /mcp
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

## 💡 Local Installation Benefits

- ✅ **Self-contained**: All MCPs installed in project's node_modules/
- ✅ **Version control**: Each project has its own MCP versions
- ✅ **Portable**: Template works anywhere without global config
- ✅ **Isolated**: No conflicts between different projects

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

## 📚 Usage Examples

### Using shadcn/ui MCP
- "Add a button component to my project"
- "Install the card component from shadcn"

### Using Playwright MCP
- "Test the login form on localhost:3000"
- "Take a screenshot of the homepage"

### Using GitHub MCP
- "Create a new issue for the bug we found"
- "Check the status of PR #123"

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

**All 11 MCP servers are installed locally and ready to enhance your development workflow with Claude Code!** 🚀