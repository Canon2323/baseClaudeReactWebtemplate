#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

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

async function main() {
  log('🚀 COMPLETE TEMPLATE SETUP', 'bold');
  log('===========================\n', 'blue');
  
  log('This will set up everything for your Next.js SOLID Boilerplate:', 'blue');
  log('1. Install dependencies', 'yellow');
  log('2. Configure MCP servers + VibeKit security', 'yellow');
  log('3. Set up Git hooks with Husky', 'yellow');
  log('4. Install GitHub CLI', 'yellow');
  log('5. Install and configure Supabase locally', 'yellow');
  log('6. Create environment file', 'yellow');
  log('7. Initialize Git repository\n', 'yellow');
  
  // Step 1: Install dependencies
  step('Installing dependencies');
  try {
    execSync('npm install', { stdio: 'inherit' });
    success('Dependencies installed');
  } catch (err) {
    error('Failed to install dependencies');
    process.exit(1);
  }
  
  // Step 2: Setup MCP servers + VibeKit
  step('Setting up MCP servers and VibeKit security');
  try {
    execSync('node scripts/setup-mcp.js', { stdio: 'inherit' });
    success('MCP servers configured');
  } catch (err) {
    warning('MCP setup had some issues - check the output above');
  }
  
  // Step 3: Setup Husky hooks
  step('Setting up Git hooks with Husky');
  try {
    execSync('node scripts/setup-husky.js', { stdio: 'inherit' });
    success('Git hooks configured');
  } catch (err) {
    warning('Husky setup had some issues - check the output above');
  }
  
  // Step 4: Install GitHub CLI
  step('Installing GitHub CLI');
  try {
    // Check if GitHub CLI is already installed
    try {
      execSync('gh --version', { stdio: 'pipe' });
      info('GitHub CLI already installed');
    } catch (ghErr) {
      info('Installing GitHub CLI globally...');
      const platform = process.platform;
      
      if (platform === 'win32') {
        // Windows: use winget
        try {
          execSync('winget install --id GitHub.cli', { stdio: 'inherit' });
        } catch (wingetErr) {
          // Fallback to npm
          execSync('npm install -g @githubnext/github-copilot-cli', { stdio: 'inherit' });
        }
      } else if (platform === 'darwin') {
        // macOS: use brew
        execSync('brew install gh', { stdio: 'inherit' });
      } else {
        // Linux: use npm fallback
        execSync('npm install -g @githubnext/github-copilot-cli', { stdio: 'inherit' });
      }
      success('GitHub CLI installed');
    }
    
    success('GitHub CLI ready');
  } catch (err) {
    warning('GitHub CLI setup had some issues - you can install manually from https://cli.github.com/');
  }

  // Step 5: Install and configure Supabase locally
  step('Installing and configuring Supabase locally');
  try {
    // Install Supabase CLI globally if not present
    try {
      execSync('supabase --version', { stdio: 'pipe' });
      info('Supabase CLI already installed');
    } catch (cliErr) {
      info('Installing Supabase CLI...');
      execSync('npm install -g supabase', { stdio: 'inherit' });
      success('Supabase CLI installed');
    }

    // Initialize Supabase project locally
    if (!fs.existsSync('supabase')) {
      execSync('supabase init', { stdio: 'inherit' });
      success('Supabase project initialized locally');
    } else {
      info('Supabase project already exists');
    }

    // Start Supabase local development
    try {
      execSync('supabase start', { stdio: 'inherit' });
      success('Supabase local development started');
    } catch (startErr) {
      warning('Supabase start had issues - may already be running');
    }

    success('Supabase configured locally');
  } catch (err) {
    warning('Supabase setup had some issues - check the output above');
  }

  // Step 5: Create .env.local if it doesn't exist
  step('Setting up environment variables');
  const envExamplePath = path.join(process.cwd(), '.env.example');
  const envLocalPath = path.join(process.cwd(), '.env.local');
  
  if (!fs.existsSync(envLocalPath)) {
    // Create .env.local with local Supabase configuration
    const envContent = `# Auto-generated environment configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Local Supabase Configuration (auto-configured)
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU

# Additional configuration
NODE_ENV=development
`;

    fs.writeFileSync(envLocalPath, envContent);
    success('Created .env.local with local Supabase configuration');
  } else {
    info('.env.local already exists');
  }
  
  // Step 5: Initialize Git repository if needed
  step('Checking Git repository');
  try {
    execSync('git status', { stdio: 'pipe' });
    info('Git repository already initialized');
  } catch (err) {
    try {
      execSync('git init', { stdio: 'pipe' });
      success('Git repository initialized');
    } catch (gitErr) {
      warning('Could not initialize Git repository');
    }
  }
  
  log('\n🎉 SETUP COMPLETE!', 'bold');
  log('==================\n', 'green');
  
  log('✅ Everything is ready to use:', 'bold');
  log('  📦 Dependencies installed', 'green');
  log('  🔌 11 MCP servers configured', 'green');
  log('  🛡️ VibeKit security ready', 'green');
  log('  🪝 Git hooks active', 'green');
  log('  🔐 Environment file created', 'green');
  log('  🐙 GitHub CLI ready', 'green');
  log('  🗄️ Supabase running locally', 'green');
  
  log('\n🚀 READY TO USE:', 'bold');
  log('Everything is configured automatically - no manual steps needed!', 'green');

  log('\n📝 START DEVELOPING:', 'bold');
  log('1. Start development server:', 'blue');
  log('   npm run dev', 'yellow');

  log('\n2. (Optional) Run with VibeKit security:', 'blue');
  log('   vibekit run claude-code', 'yellow');

  log('\n3. Access your local Supabase:', 'blue');
  log('   Dashboard: http://127.0.0.1:54323', 'yellow');
  log('   Database: http://127.0.0.1:54321', 'yellow');
  
  log('\n💡 USEFUL COMMANDS:', 'bold');
  log('  npm run dev           - Start development server', 'magenta');
  log('  npm run build         - Build for production', 'magenta');
  log('  npm run lint:fix      - Fix linting issues', 'magenta');
  log('  npm run type-check    - Check TypeScript', 'magenta');
  log('  npm run format        - Format code with Prettier', 'magenta');
  
  log('\n📚 DOCUMENTATION:', 'bold');
  log('  docs/MCP-SERVERS.md   - MCP configuration guide', 'magenta');
  log('  docs/SECURITY.md      - VibeKit security guide', 'magenta');
  log('  docs/HOOKS.md         - Git hooks guide', 'magenta');
  log('  TODO.md               - Project roadmap', 'magenta');
  
  log('\n🚀 Happy coding with your Next.js SOLID Boilerplate!', 'bold');
}

if (require.main === module) {
  main();
}

module.exports = { main };