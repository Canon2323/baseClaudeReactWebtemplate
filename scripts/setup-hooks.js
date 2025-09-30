#!/usr/bin/env node

/**
 * Setup Git Hooks with Husky
 * Configures pre-commit and commit-msg hooks for code quality
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { detectPackageManager, getCommands } = require('./detect-package-manager');

console.log('🔧 Setting up Git hooks...');

try {
  // Reset any existing husky configuration
  try {
    execSync('git config --unset core.hookspath', { stdio: 'ignore' });
    console.log('🧹 Cleared existing hook configuration');
  } catch {
    // No existing config, continue
  }
  // Detect package manager
  const packageManager = detectPackageManager();
  console.log(`📦 Using ${packageManager} package manager`);

  // Setup git hooks directory
  const gitHooksDir = path.join(process.cwd(), '.git', 'hooks');
  const templateHooksDir = path.join(process.cwd(), '.husky');

  if (!fs.existsSync(gitHooksDir)) {
    fs.mkdirSync(gitHooksDir, { recursive: true });
  }

  // Copy hooks from template to git hooks
  const hooks = ['pre-commit', 'commit-msg'];

  for (const hook of hooks) {
    const sourcePath = path.join(templateHooksDir, hook);
    const targetPath = path.join(gitHooksDir, hook);

    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, targetPath);

      // Make executable (Unix/Mac)
      try {
        fs.chmodSync(targetPath, '755');
      } catch (error) {
        // Windows doesn't need chmod, ignore error
      }

      console.log(`✅ Installed ${hook} hook`);
    } else {
      console.log(`⚠️ Template hook not found: ${hook}`);
    }
  }

  console.log('✅ Git hooks configured successfully!');
  console.log('');
  console.log('🔍 Quality gates enabled:');
  console.log('  • ESLint with auto-fix');
  console.log('  • Prettier formatting');
  console.log('  • TypeScript type checking');
  console.log('  • Conventional commit messages');
  console.log('  • Test execution for related files');
  console.log('');
  console.log('📝 Commit message format: type(scope): description');
  console.log('   Examples:');
  console.log('   • feat: add user authentication');
  console.log('   • fix(api): resolve timeout issue');
  console.log('   • docs: update README installation steps');

} catch (error) {
  console.error('❌ Failed to setup hooks:', error.message);
  process.exit(1);
}