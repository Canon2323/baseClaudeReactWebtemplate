module.exports = {
  // TypeScript and JavaScript files - apenas formatação por enquanto
  "**/*.{js,jsx,ts,tsx}": ["prettier --write"],

  // JSON files
  "**/*.json": ["prettier --write"],

  // Markdown files
  "**/*.md": ["prettier --write"],

  // CSS and styling files
  "**/*.{css,scss,sass}": ["prettier --write"],
};
