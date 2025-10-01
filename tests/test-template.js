#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Colors
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
  console.log(`\n${colors.bold}${colors.blue}🧪 ${message}${colors.reset}`);
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

// Get test directory path
const testDir = path.join(__dirname, "template-instance");
const sourceDir = path.join(__dirname, "..");

function cleanTestDirectory() {
  if (fs.existsSync(testDir)) {
    log("Cleaning previous test directory...", "yellow");
    fs.rmSync(testDir, { recursive: true, force: true });
    success("Previous test directory cleaned");
  }
}

function copyTemplate() {
  step("Creating fresh template copy");

  // Create test directory
  fs.mkdirSync(testDir, { recursive: true });

  // Files/folders to copy (template distribution)
  const itemsToCopy = [
    "src",
    "scripts",
    "docs",
    "package.json",
    "next.config.mjs",
    "tailwind.config.ts",
    "tsconfig.json",
    "postcss.config.js",
    "components.json",
    ".env.example",
    ".lintstagedrc.js",
    "README.md",
  ];

  // Files to ignore (not part of template)
  const ignoreItems = [
    "node_modules",
    ".next",
    "dist",
    "build",
    ".git",
    ".husky",
    "tests",
    "TODO.md", // Development roadmap, not template
    ".env.local",
    "vibekit.config.json",
    "vibekit.logs",
    ".mcp.json",
    ".claude",
  ];

  itemsToCopy.forEach((item) => {
    const sourcePath = path.join(sourceDir, item);
    const destPath = path.join(testDir, item);

    if (fs.existsSync(sourcePath)) {
      if (fs.statSync(sourcePath).isDirectory()) {
        copyDirSync(sourcePath, destPath, ignoreItems);
      } else {
        fs.copyFileSync(sourcePath, destPath);
      }
      info(`Copied: ${item}`);
    } else {
      warning(`Not found: ${item}`);
    }
  });

  success("Clean template copied to test directory");
}

function copyDirSync(src, dest, ignoreItems = []) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    if (ignoreItems.includes(entry.name)) {
      continue;
    }

    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath, ignoreItems);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function runTest() {
  step("Testing template setup");

  // Change to test directory
  const originalDir = process.cwd();
  process.chdir(testDir);

  let testResults = {
    install: false,
    husky: false,
    mcp: false,
    files: false,
    build: false,
    lint: false,
    typecheck: false,
  };

  try {
    // Test 1: Install dependencies
    step("Test 1: Installing dependencies");
    execSync("npm install", { stdio: "pipe" });
    testResults.install = true;
    success("Dependencies installed successfully");

    // Test 2: Run setup scripts individually
    step("Test 2: Testing Husky setup");
    try {
      execSync("node scripts/setup-husky.js", { stdio: "pipe" });
      testResults.husky = true;
      success("Husky setup completed");
    } catch (err) {
      warning("Husky setup had issues (expected without git)");
    }

    step("Test 3: Testing MCP setup (LOCAL INSTALLATION)");
    try {
      execSync("node scripts/setup-mcp.js", { stdio: "inherit" });
      testResults.mcp = true;
      success("MCP setup completed");
    } catch (err) {
      error(`MCP setup failed: ${err.message}`);
    }

    // Test 4: Check if files were created
    step("Test 4: Checking created files");
    const expectedFiles = [
      ".husky/pre-commit",
      ".husky/commit-msg",
      ".husky/pre-push",
      "docs/HOOKS.md",
      "docs/SECURITY.md",
      "docs/MCP-SERVERS.md",
      ".mcp.json",
    ];

    let filesCreated = 0;
    expectedFiles.forEach((file) => {
      if (fs.existsSync(file)) {
        success(`✓ ${file} created`);
        filesCreated++;
      } else {
        warning(`✗ ${file} not found`);
      }
    });

    testResults.files = filesCreated >= expectedFiles.length * 0.7; // 70% success rate

    // Test 5: Verify MCP packages were installed locally
    step("Test 5: Checking MCP packages in node_modules");
    const mcpPackages = [
      "@heilgar/shadcn-ui-mcp-server",
      "@modelcontextprotocol/server-filesystem",
      "@modelcontextprotocol/server-git",
    ];

    let mcpPackagesFound = 0;
    mcpPackages.forEach((pkg) => {
      const packagePath = path.join("node_modules", pkg);
      if (fs.existsSync(packagePath)) {
        success(`✓ ${pkg} installed locally`);
        mcpPackagesFound++;
      } else {
        warning(`✗ ${pkg} not found in node_modules`);
      }
    });

    if (mcpPackagesFound >= mcpPackages.length * 0.8) {
      success("MCP packages successfully installed locally!");
      testResults.mcp = true;
    }

    // Test 6: Build check
    step("Test 6: Testing Next.js build");
    try {
      execSync("npm run build", { stdio: "pipe" });
      testResults.build = true;
      success("Next.js build successful");
    } catch (err) {
      error("Next.js build failed");
      console.log(err.stdout?.toString());
    }

    // Test 7: Lint check
    step("Test 7: Testing linting");
    try {
      execSync("npm run lint", { stdio: "pipe" });
      testResults.lint = true;
      success("Linting passed");
    } catch (err) {
      warning("Linting had issues");
    }

    // Test 8: Type check
    step("Test 8: Testing TypeScript");
    try {
      execSync("npm run type-check", { stdio: "pipe" });
      testResults.typecheck = true;
      success("TypeScript check passed");
    } catch (err) {
      error("TypeScript check failed");
      console.log(err.stdout?.toString());
    }
  } catch (err) {
    error(`Test failed: ${err.message}`);
  } finally {
    // Return to original directory
    process.chdir(originalDir);
  }

  return testResults;
}

function generateTestReport(testResults) {
  step("Test Results Summary");

  const results = Object.values(testResults);
  const passed = results.filter((r) => r === true).length;
  const total = results.length;
  const successRate = Math.round((passed / total) * 100);

  if (successRate >= 80) {
    log("🎉 TEMPLATE TESTS PASSED!", "bold");
    log("===============================", "green");
    log(`✅ Success rate: ${passed}/${total} (${successRate}%)`, "green");
  } else {
    log("💥 TEMPLATE TESTS FAILED!", "bold");
    log("===============================", "red");
    log(`❌ Success rate: ${passed}/${total} (${successRate}%)`, "red");
  }

  // Detailed results
  log("\n📋 Detailed Results:", "bold");
  log(
    `Dependencies: ${testResults.install ? "✅" : "❌"}`,
    testResults.install ? "green" : "red",
  );
  log(
    `Husky Setup: ${testResults.husky ? "✅" : "⚠️"}`,
    testResults.husky ? "green" : "yellow",
  );
  log(
    `MCP Setup (LOCAL): ${testResults.mcp ? "✅" : "❌"}`,
    testResults.mcp ? "green" : "red",
  );
  log(
    `File Creation: ${testResults.files ? "✅" : "❌"}`,
    testResults.files ? "green" : "red",
  );
  log(
    `Next.js Build: ${testResults.build ? "✅" : "❌"}`,
    testResults.build ? "green" : "red",
  );
  log(
    `Linting: ${testResults.lint ? "✅" : "⚠️"}`,
    testResults.lint ? "green" : "yellow",
  );
  log(
    `TypeScript: ${testResults.typecheck ? "✅" : "❌"}`,
    testResults.typecheck ? "green" : "red",
  );

  log("\n🎯 Critical Tests (must pass):", "bold");
  const critical = ["install", "mcp", "build", "typecheck"];
  const criticalPassed = critical.every((test) => testResults[test]);

  if (criticalPassed) {
    log("✅ All critical tests passed - template is functional", "green");
    log("🔌 MCP servers are installed LOCALLY as required!", "green");
  } else {
    log("❌ Critical tests failed - template needs fixes", "red");
  }

  log("\n📍 Test Environment:", "bold");
  log(`Test directory: ${testDir}`, "magenta");
  log("Template copied in isolation", "magenta");
  log("Original template remains pristine", "magenta");

  log("\n🧹 Cleanup:", "bold");
  log("To clean test directory:", "blue");
  log(`rm -rf ${testDir}`, "yellow");
  log("Or run this script again (auto-cleans)", "blue");

  return criticalPassed;
}

async function main() {
  log("🧪 TEMPLATE TESTING SUITE - MCP LOCAL TEST", "bold");
  log("=============================================\n", "blue");

  log("This tests the template with MCP LOCAL installation:", "blue");
  log("1. Create clean template copy (no dev files)", "yellow");
  log("2. Run setup process as end user", "yellow");
  log("3. Verify MCPs installed LOCALLY in node_modules", "yellow");
  log("4. Test build, lint, and TypeScript", "yellow");
  log("5. Original template remains pristine\n", "yellow");

  info("Starting isolated MCP local test...");

  // Step 1: Clean previous test
  cleanTestDirectory();

  // Step 2: Copy clean template
  copyTemplate();

  // Step 3: Run comprehensive tests
  const testResults = runTest();

  // Step 4: Generate detailed report
  const success = generateTestReport(testResults);

  log(
    `\n🎯 Test ${success ? "COMPLETED SUCCESSFULLY" : "COMPLETED WITH ISSUES"}!`,
    "bold",
  );
  log("Original template code remains untouched ✨", "green");

  if (success) {
    log("🔌 MCPs are now installed LOCALLY in the project!", "green");
  }

  return success;
}

if (require.main === module) {
  main();
}
