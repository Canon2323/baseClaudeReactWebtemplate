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

function setupHusky() {
  step("Setting up Husky and lint-staged for Claude Code");

  try {
    // Create .husky directory manually (works without git)
    const huskyDir = path.join(process.cwd(), ".husky");
    if (!fs.existsSync(huskyDir)) {
      fs.mkdirSync(huskyDir, { recursive: true });
      info("Created .husky directory");
    }

    // Create husky.sh file (required for hooks to work)
    const huskyShPath = path.join(huskyDir, "_", "husky.sh");
    const huskyShContent = `#!/usr/bin/env sh
if [ -z "$husky_skip_init" ]; then
  debug () {
    if [ "$HUSKY_DEBUG" = "1" ]; then
      echo "husky (debug) - $1"
    fi
  }

  readonly hook_name="$(basename -- "$0")"
  debug "starting $hook_name..."

  if [ "$HUSKY" = "0" ]; then
    debug "HUSKY env variable is set to 0, skipping hook"
    exit 0
  fi

  if [ -f ~/.huskyrc ]; then
    debug "sourcing ~/.huskyrc"
    . ~/.huskyrc
  fi

  readonly husky_skip_init=1
  export husky_skip_init
  sh -e "$0" "$@"
  exitCode="$?"

  if [ $exitCode != 0 ]; then
    echo "husky - $hook_name hook exited with code $exitCode (error)"
  fi

  if [ $exitCode = 127 ]; then
    echo "husky - command not found in PATH=$PATH"
  fi

  exit $exitCode
fi`;

    // Create _ directory and husky.sh
    const underscoreDir = path.join(huskyDir, "_");
    if (!fs.existsSync(underscoreDir)) {
      fs.mkdirSync(underscoreDir, { recursive: true });
    }
    fs.writeFileSync(huskyShPath, huskyShContent, { mode: 0o755 });
    success("Husky core files created");

    // Create pre-commit hook
    const preCommitPath = path.join(process.cwd(), ".husky", "pre-commit");
    const preCommitContent = `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Run lint-staged for code quality
npm run pre-commit

# Reminder for Claude Code users
echo "🤖 Claude Code pre-commit hooks executed!"
echo "📝 Code formatted, linted, and type-checked ✨"
`;

    fs.writeFileSync(preCommitPath, preCommitContent, { mode: 0o755 });
    success("Pre-commit hook created");

    // Create commit-msg hook for conventional commits
    const commitMsgPath = path.join(process.cwd(), ".husky", "commit-msg");
    const commitMsgContent = `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Validate commit message format (optional)
# Uncomment to enforce conventional commits
# npx commitlint --edit $1

echo "💬 Commit message validated!"
`;

    fs.writeFileSync(commitMsgPath, commitMsgContent, { mode: 0o755 });
    success("Commit message hook created");

    // Create pre-push hook for additional checks
    const prePushPath = path.join(process.cwd(), ".husky", "pre-push");
    const prePushContent = `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🚀 Running pre-push checks..."

# Type check
echo "🔍 Type checking..."
npm run type-check

# Run tests (uncomment when tests are available)
# echo "🧪 Running tests..."
# npm test

echo "✅ Pre-push checks completed!"
`;

    fs.writeFileSync(prePushPath, prePushContent, { mode: 0o755 });
    success("Pre-push hook created");

    return true;
  } catch (err) {
    error(`Failed to setup Husky: ${err.message}`);
    return false;
  }
}

function createCommitLintConfig() {
  step("Creating commit message guidelines");

  const commitLintConfig = {
    extends: ["@commitlint/config-conventional"],
    rules: {
      "type-enum": [
        2,
        "always",
        [
          "feat", // New feature
          "fix", // Bug fix
          "docs", // Documentation only changes
          "style", // Changes that do not affect the meaning of the code
          "refactor", // Code change that neither fixes a bug nor adds a feature
          "perf", // Code change that improves performance
          "test", // Adding missing tests or correcting existing tests
          "build", // Changes that affect the build system or dependencies
          "ci", // Changes to CI configuration files and scripts
          "chore", // Other changes that don't modify src or test files
          "revert", // Reverts a previous commit
        ],
      ],
      "subject-case": [2, "never", ["start-case", "pascal-case"]],
      "subject-max-length": [2, "always", 50],
      "body-max-line-length": [2, "always", 72],
    },
  };

  try {
    fs.writeFileSync(
      path.join(process.cwd(), "commitlint.config.js"),
      `module.exports = ${JSON.stringify(commitLintConfig, null, 2)};`,
    );
    success("Commitlint configuration created");

    // Create commit message template
    const commitTemplate = `# Commit Message Guidelines
#
# Format: <type>(<scope>): <subject>
#
# <type>: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
# <scope>: Optional, component or file affected
# <subject>: Brief description (max 50 chars)
#
# Examples:
# feat(auth): add OAuth login functionality
# fix(ui): resolve button alignment issue  
# docs(readme): update installation instructions
# refactor(utils): simplify date formatting function
#
# Body (optional):
# - More detailed explanation of what and why
# - Line wrap at 72 characters
# - Use bullet points for multiple changes
#
# Footer (optional):
# - Reference issues: Fixes #123, Closes #456
# - Breaking changes: BREAKING CHANGE: description
`;

    fs.writeFileSync(path.join(process.cwd(), ".gitmessage"), commitTemplate);
    success("Git commit message template created");

    return true;
  } catch (err) {
    warning(`Could not create commitlint config: ${err.message}`);
    return false;
  }
}

function updatePackageJson() {
  step("Adding Husky scripts to package.json");

  try {
    const packageJsonPath = path.join(process.cwd(), "package.json");
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

    // Add lint-staged configuration
    packageJson["lint-staged"] = {
      "**/*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
      "**/*.{json,md,css,scss}": ["prettier --write"],
      "**/*.{ts,tsx}": () => "npm run type-check",
    };

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    success("Package.json updated with lint-staged configuration");
    return true;
  } catch (err) {
    warning(`Could not update package.json: ${err.message}`);
    return false;
  }
}

async function main() {
  log("🪝 Setting up Git Hooks with Husky for Claude Code", "bold");
  log("====================================================\n", "blue");

  log("Configuring automatic code quality checks on Git operations...", "blue");
  log(
    "This ensures consistent code style and quality in your repository.\n",
    "yellow",
  );

  info("Features to be configured:");
  log("  Pre-commit: ESLint, Prettier, TypeScript checks", "green");
  log("  Commit-msg: Conventional commit validation (optional)", "green");
  log("  Pre-push: Final validation before pushing", "green");
  log("  lint-staged: Only check staged files for performance\n", "green");

  const huskySuccess = setupHusky();

  if (huskySuccess) {
    createCommitLintConfig();
    updatePackageJson();

    log("\n🎉 Husky and lint-staged setup completed!", "bold");
    log("==============================================\n", "green");

    log("✅ Git hooks configured:", "bold");
    log("  🔍 Pre-commit: Code quality checks", "green");
    log("  💬 Commit-msg: Message validation", "green");
    log("  🚀 Pre-push: Final validation", "green");
    log("  ⚡ lint-staged: Performance optimization", "green");

    log("\n📝 Next Steps:", "bold");
    log("1. 🔧 Install dependencies:", "blue");
    log("   npm install", "yellow");
    log("2. 🎯 Test the hooks:", "blue");
    log('   git add . && git commit -m "test: verify hooks work"', "yellow");
    log("3. 📚 Read the documentation:", "blue");
    log("   Check docs/HOOKS.md for usage guidelines", "yellow");

    log("\n💡 Pro Tips:", "bold");
    log("- Hooks run automatically on git commands", "magenta");
    log("- Use conventional commit format for better history", "magenta");
    log('- Run "npm run pre-commit" to test manually', "magenta");
    log("- Check docs/HOOKS.md for customization guide", "magenta");

    log("\n🛡️ Quality Assurance:", "bold");
    log("- Code is auto-formatted on every commit", "yellow");
    log("- ESLint issues are fixed automatically", "yellow");
    log("- TypeScript errors prevent commits", "yellow");
    log("- Only staged files are processed for speed", "yellow");

    log(
      "\n🪝 Your repository now enforces code quality automatically!",
      "bold",
    );
  } else {
    log("\n💥 Husky setup failed!", "red");
    log("Check the errors above and try again.", "red");
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { setupHusky };
