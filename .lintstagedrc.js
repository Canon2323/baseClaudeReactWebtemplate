module.exports = {
  // TypeScript and JavaScript files
  '**/*.{js,jsx,ts,tsx}': [
    'eslint --fix --max-warnings=0',
    'prettier --write',
  ],

  // JSON files
  '**/*.json': [
    'prettier --write',
  ],

  // Markdown files
  '**/*.md': [
    'prettier --write',
  ],

  // CSS and styling files
  '**/*.{css,scss,sass}': [
    'prettier --write',
  ],

  // Type check for TypeScript files (critical - blocks commit on errors)
  '**/*.{ts,tsx}': () => {
    const { detectPackageManager, getCommands } = require('./scripts/detect-package-manager');
    const packageManager = detectPackageManager();
    const commands = getCommands(packageManager);

    return [
      `${commands.run} type-check`,
      `${commands.run} lint`
    ];
  },

  // Test related files should run specific tests
  '**/*.{test,spec}.{ts,tsx}': () => {
    const { detectPackageManager, getCommands } = require('./scripts/detect-package-manager');
    const packageManager = detectPackageManager();
    const commands = getCommands(packageManager);

    return `${commands.run} test -- --findRelatedTests --passWithNoTests`;
  }
};