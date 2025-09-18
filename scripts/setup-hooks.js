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
  // Detect package manager
  const packageManager = detectPackageManager();
  const commands = getCommands(packageManager);

  console.log(`📦 Using ${packageManager} package manager`);

  // Install Husky
  console.log('📦 Installing Husky...');
  execSync(`${commands.exec} husky install`, { stdio: 'inherit' });

  // Make sure .husky directory exists
  const huskyDir = path.join(process.cwd(), '.husky');
  if (!fs.existsSync(huskyDir)) {
    fs.mkdirSync(huskyDir, { recursive: true });
  }

  // Make pre-commit hook executable (for Unix systems)
  const preCommitPath = path.join(huskyDir, 'pre-commit');
  if (fs.existsSync(preCommitPath)) {
    try {
      fs.chmodSync(preCommitPath, '755');
    } catch (error) {
      // Windows doesn't need chmod, ignore error
    }
  }

  // Make commit-msg hook executable (for Unix systems)
  const commitMsgPath = path.join(huskyDir, 'commit-msg');
  if (fs.existsSync(commitMsgPath)) {
    try {
      fs.chmodSync(commitMsgPath, '755');
    } catch (error) {
      // Windows doesn't need chmod, ignore error
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