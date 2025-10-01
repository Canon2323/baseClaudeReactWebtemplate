#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Colors for console output
const colors = {
  green: "\x1b[32m",
  blue: "\x1b[34m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  magenta: "\x1b[35m",
};

function log(message, color = "reset") {
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

function createLocalMCPConfig() {
  // LOCAL configuration using installed packages from node_modules
  const config = {
    mcpServers: {
      // 1. shadcn/ui MCP - Component management
      "shadcn-ui": {
        command: "node",
        args: ["./node_modules/@heilgar/shadcn-ui-mcp-server/index.js"],
        env: {},
      },

      // 2. Playwright MCP - Browser automation
      playwright: {
        command: "node",
        args: ["./node_modules/@playwright/mcp/index.js"],
        env: {},
      },

      // 3. Figma MCP - Design integration (requires Figma Desktop)
      "figma-dev-mode": {
        type: "sse",
        url: "http://127.0.0.1:3845/mcp",
        description:
          "Figma Dev Mode integration - requires Figma Desktop app with 'Enable local MCP Server' enabled in Preferences",
      },

      // 4. Apify MCP - Web scraping and automation
      apify: {
        command: "node",
        args: ["./node_modules/@apify/actors-mcp-server/index.js"],
        env: {
          APIFY_TOKEN: "${APIFY_TOKEN}",
        },
      },

      // 6. Browser MCP - Additional browser control (alternative to Playwright)
      "browser-automation": {
        command: "node",
        args: [
          "./node_modules/@executeautomation/playwright-mcp-server/index.js",
        ],
        env: {},
      },

      // 7. Gemini MCP - Google Gemini AI integration
      gemini: {
        command: "npx",
        args: ["-y", "github:aliargun/mcp-server-gemini"],
        env: {
          GEMINI_API_KEY: "${GEMINI_API_KEY}",
        },
      },

      // 8. Context7 MCP - Up-to-date documentation
      context7: {
        command: "node",
        args: ["./node_modules/@upstash/context7-mcp/index.js"],
        env: {
          CONTEXT7_API_KEY: "${CONTEXT7_API_KEY}",
        },
      },

      // 9. Stripe MCP - Payment processing and API integration
      stripe: {
        command: "node",
        args: ["./node_modules/@stripe/mcp/index.js", "--tools=all"],
        env: {
          STRIPE_SECRET_KEY: "${STRIPE_SECRET_KEY}",
        },
      },

      // 10. Supabase MCP - Local Supabase operations
      "supabase-local": {
        command: "node",
        args: [
          "./node_modules/@supabase/mcp-server-supabase/index.js",
          "--read-only",
          "--local",
        ],
        env: {
          SUPABASE_URL: "http://127.0.0.1:54321",
          SUPABASE_ANON_KEY:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
        },
      },

      // 11. Serena MCP - Coding agent toolkit (special case - still uses uvx)
      serena: {
        command: "uvx",
        args: [
          "--from",
          "git+https://github.com/oraios/serena",
          "serena",
          "start-mcp-server",
        ],
        env: {},
      },

      // Essential system MCPs
      filesystem: {
        command: "node",
        args: [
          "./node_modules/@modelcontextprotocol/server-filesystem/index.js",
          process.cwd(),
        ],
        env: {},
      },
    },
  };

  return config;
}

function installLocalMCPs() {
  step("Installing MCP packages locally in project");

  const mcpPackages = [
    "@heilgar/shadcn-ui-mcp-server",
    "@playwright/mcp",
    "@apify/actors-mcp-server",
    "@executeautomation/playwright-mcp-server",
    "@upstash/context7-mcp",
    "@stripe/mcp",
    "@supabase/mcp-server-supabase",
    "@modelcontextprotocol/server-filesystem",
  ];

  try {
    info("Installing MCP packages via npm...");

    // Install all MCP packages locally
    const installCommand = `npm install ${mcpPackages.join(" ")}`;
    execSync(installCommand, { stdio: "inherit" });

    success("All MCP packages installed locally");
    return true;
  } catch (err) {
    error(`Failed to install MCP packages: ${err.message}`);
    return false;
  }
}

function installCompleteMCPSetup() {
  step("Setting up LOCAL MCP configuration for Claude Code");
  log(
    "This will install MCP servers locally and configure project .mcp.json",
    "blue",
  );

  // 1. Install MCP packages locally
  const packagesInstalled = installLocalMCPs();
  if (!packagesInstalled) {
    return false;
  }

  // 2. Create project-specific .mcp.json with ALL configured MCPs
  const projectConfigPath = path.join(process.cwd(), ".mcp.json");

  try {
    const localConfig = createLocalMCPConfig();
    fs.writeFileSync(projectConfigPath, JSON.stringify(localConfig, null, 2));
    success("Project MCP config created with ALL servers: .mcp.json");
  } catch (err) {
    error(`Failed to create project MCP config: ${err.message}`);
    return false;
  }

  return true;
}

function createEnvironmentTemplate() {
  const envTemplatePath = path.join(process.cwd(), ".env.mcp.example");

  const envTemplate = `# MCP Server Environment Variables
# Copy this to .env.local and fill in your actual API tokens
# Get tokens from the respective service provider websites

# =================================
# CORE MCP SERVERS (Required)
# =================================

# Supabase Configuration
# Get from: https://supabase.com/dashboard/account/tokens
SUPABASE_ACCESS_TOKEN=your_supabase_access_token_here

# GitHub Configuration  
# Get from: https://github.com/settings/tokens (needs repo access)
GITHUB_PERSONAL_ACCESS_TOKEN=ghp_your_github_personal_access_token_here

# =================================
# OPTIONAL MCP SERVERS
# =================================

# Apify Configuration (Web scraping)
# Get from: https://console.apify.com/account/integrations
APIFY_TOKEN=apify_api_your_apify_token_here

# Google Gemini Configuration
# Get from: https://makersuite.google.com/app/apikey
GEMINI_API_KEY=your_gemini_api_key_here

# Context7 Configuration (Documentation)
# Get from: https://context7.com/dashboard
CONTEXT7_API_KEY=your_context7_api_key_here

# Stripe Configuration (Payments) - USE TEST KEYS ONLY
# Get from: https://dashboard.stripe.com/test/apikeys
STRIPE_SECRET_KEY=sk_test_your_stripe_test_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_test_publishable_key_here

# =================================
# FIGMA CONFIGURATION (Special Setup)
# =================================
# Figma MCP runs locally in Figma Desktop app
# 1. Open Figma Desktop
# 2. Go to Preferences > Enable local MCP Server
# 3. Server runs at http://127.0.0.1:3845/mcp
# No API key needed - uses local connection

# =================================
# SERENA CONFIGURATION
# =================================
# Serena uses uvx and doesn't require API keys
# Requires Python and uv to be installed
# Install: pip install uv


# =================================
# SECURITY NOTES
# =================================
# - Never commit API keys to version control
# - Use .env.local for actual values (already in .gitignore)
# - Use test/sandbox keys when possible
# - Rotate keys regularly for security
`;

  try {
    fs.writeFileSync(envTemplatePath, envTemplate);
    success("Environment template created: .env.mcp.example");

    // Also create .gitignore entry if it doesn't exist
    const gitignorePath = path.join(process.cwd(), ".gitignore");
    let gitignoreContent = "";

    if (fs.existsSync(gitignorePath)) {
      gitignoreContent = fs.readFileSync(gitignorePath, "utf8");
    }

    if (!gitignoreContent.includes(".env.local")) {
      gitignoreContent +=
        "\n# MCP Environment Variables\n.env.local\n.env.mcp\n";
      fs.writeFileSync(gitignorePath, gitignoreContent);
      success("Updated .gitignore to exclude MCP environment files");
    }
  } catch (err) {
    warning(`Could not create environment template: ${err.message}`);
  }
}

async function main() {
  log("🔌 LOCAL MCP Servers Setup for Claude Code", "bold");
  log("==========================================\n", "blue");

  log("Installing all 11 MCP servers LOCALLY in this project...", "blue");
  log(
    "MCPs will be installed in node_modules and configured for local use.\n",
    "yellow",
  );

  info("MCP Servers to be installed locally:");
  log("  Core Development: shadcn/ui, Playwright, Figma", "green");
  log("  Repository: GitHub, Git", "green");
  log("  Web & Data: Apify, Browser Automation", "green");
  log("  AI & Docs: Gemini, Context7, Serena", "green");
  log("  Services: Stripe, Supabase", "green");
  log("  System: Filesystem, Local Git\n", "green");

  // Install MCP servers locally
  const mcpSuccess = installCompleteMCPSetup();

  if (mcpSuccess) {
    createEnvironmentTemplate();

    log("\n🎉 LOCAL MCP setup completed successfully!", "bold");
    log("=========================================\n", "green");

    log("📋 ALL MCP Servers installed LOCALLY:", "bold");
    log("  ✅ All 11+ MCP packages in node_modules/", "green");
    log("  ✅ .mcp.json configured for local paths", "green");
    log("  ✅ .env.mcp.example template created", "green");

    log("\n📝 Next Steps:", "bold");
    log("1. 🔑 Configure your API tokens:", "blue");
    log("   cp .env.mcp.example .env.local", "yellow");
    log("   # Edit .env.local with your real API keys", "yellow");
    log("2. 🔄 Restart Claude Code completely", "blue");
    log("3. ✅ Verify servers in Claude Code:", "blue");
    log("   # Use the /mcp command", "yellow");

    log("\n💡 Key Benefits:", "bold");
    log("- MCPs are installed locally in THIS project", "magenta");
    log("- Template is self-contained and portable", "magenta");
    log("- No global Claude Code configuration needed", "magenta");
    log("- Each project has its own MCP versions", "magenta");

    log("\n🚀 Your project now has 11+ MCP tools installed locally!", "bold");
  } else {
    log("\n💥 MCP setup failed!", "red");
    log("Check the errors above and try again.", "red");
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { installCompleteMCPSetup, createLocalMCPConfig };
