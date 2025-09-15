module.exports = {
  // TypeScript and JavaScript files
  '**/*.{js,jsx,ts,tsx}': [
    'eslint --fix',
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
  
  // Type check for TypeScript files (without fixing)
  '**/*.{ts,tsx}': () => 'npm run type-check',
};