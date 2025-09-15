#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up Next.js SOLID Boilerplate...\n');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function step(message) {
  console.log(`\n${colors.bold}${colors.blue}📋 ${message}${colors.reset}`);
}

function success(message) {
  console.log(`${colors.green}✅ ${message}${colors.reset}`);
}

function error(message) {
  console.log(`${colors.red}❌ ${message}${colors.reset}`);
}

function executeCommand(command, description) {
  try {
    step(description);
    execSync(command, { stdio: 'inherit' });
    success(`${description} completed`);
    return true;
  } catch (err) {
    error(`Failed: ${description}`);
    console.error(err.message);
    return false;
  }
}

function createFileIfNotExists(filePath, content) {
  if (!fs.existsSync(filePath)) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, content);
    success(`Created ${filePath}`);
  } else {
    log(`${filePath} already exists, skipping...`, 'yellow');
  }
}

// Check Node.js version
function checkNodeVersion() {
  step('Checking Node.js version');
  const nodeVersion = process.version;
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
  
  if (majorVersion < 18) {
    error('Node.js version 18 or higher is required');
    process.exit(1);
  }
  success(`Node.js ${nodeVersion} is compatible`);
}

// Create directory structure
function createDirectoryStructure() {
  step('Creating SOLID directory structure');
  
  const directories = [
    'src/app',
    'src/components/ui',
    'src/components/forms',
    'src/components/layout',
    'src/components/features',
    'src/components/providers',
    'src/lib/services',
    'src/lib/hooks',
    'src/lib/utils',
    'src/lib/validations',
    'src/types',
    'src/config',
    'tools/mcp-setup',
    'tools/generators',
    'tools/validators',
    'docs',
    'tests/__mocks__',
    'tests/components',
    'tests/lib',
    'public/images',
    'public/icons'
  ];

  directories.forEach(dir => {
    const dirPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });
  
  success('Directory structure created');
}

// Create essential configuration files
function createConfigFiles() {
  step('Creating configuration files');

  // Next.js config
  const nextConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  images: {
    domains: [],
  },
  async redirects() {
    return [];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
`;

  // Tailwind config
  const tailwindConfig = `import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
`;

  // TypeScript config
  const tsConfig = `{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/types/*": ["./src/types/*"],
      "@/config/*": ["./src/config/*"],
      "@/hooks/*": ["./src/lib/hooks/*"],
      "@/utils/*": ["./src/lib/utils/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
`;

  // PostCSS config
  const postcssConfig = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`;

  // Components.json for shadcn/ui
  const componentsConfig = `{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
`;

  // Environment example
  const envExample = `# Database
DATABASE_URL="your_database_url_here"

# Authentication
NEXTAUTH_SECRET="your_nextauth_secret_here"
NEXTAUTH_URL="http://localhost:3000"

# API Keys
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Optional: Supabase
NEXT_PUBLIC_SUPABASE_URL="your_supabase_url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_anon_key"

# Optional: Stripe
STRIPE_SECRET_KEY="your_stripe_secret_key"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your_stripe_publishable_key"
`;

  // Create files
  createFileIfNotExists('next.config.mjs', nextConfig);
  createFileIfNotExists('tailwind.config.ts', tailwindConfig);
  createFileIfNotExists('tsconfig.json', tsConfig);
  createFileIfNotExists('postcss.config.js', postcssConfig);
  createFileIfNotExists('components.json', componentsConfig);
  createFileIfNotExists('.env.example', envExample);
}

// Main setup function
async function main() {
  try {
    log('🎯 Next.js SOLID Boilerplate Setup', 'bold');
    log('===================================\n', 'blue');

    checkNodeVersion();
    
    // Install dependencies
    if (!executeCommand('npm install', 'Installing dependencies')) {
      process.exit(1);
    }

    createDirectoryStructure();
    createConfigFiles();

    // Initialize shadcn/ui
    executeCommand('npx shadcn-ui@latest init --yes', 'Initializing shadcn/ui');
    
    // Install essential shadcn/ui components  
    executeCommand('npx shadcn-ui@latest add button card', 'Installing essential UI components');

    success('\n🎉 Setup completed successfully!');
    log('\nNext steps:', 'bold');
    log('1. Copy .env.example to .env.local and fill in your values', 'blue');
    log('2. Run "npm run dev" to start development server', 'blue');
    log('3. Run "npm run setup:mcp" to setup MCP servers', 'blue');
    log('\n📚 Check the docs/ folder for more information', 'yellow');

  } catch (error) {
    error('Setup failed');
    console.error(error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };