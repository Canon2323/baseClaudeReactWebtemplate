# 🪝 Git Hooks with Husky

This project uses **Husky** and **lint-staged** to enforce code quality standards through Git hooks.

## 🔧 Configured Hooks

### Pre-commit Hook
Runs before each commit:
- **ESLint**: Fixes code issues automatically
- **Prettier**: Formats code consistently
- **Type Check**: Ensures TypeScript compatibility
- **Lint-staged**: Only processes staged files for performance

### Commit Message Hook
Validates commit message format:
- Enforces conventional commit format
- Helps maintain consistent commit history
- Integrates with automated changelog generation

### Pre-push Hook
Runs before pushing to remote:
- **Type Check**: Final TypeScript validation
- **Tests**: Ensures all tests pass (when available)
- **Build Check**: Verifies project builds successfully

## 📝 Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or fixing tests
- `build`: Build system changes
- `ci`: CI configuration changes
- `chore`: Other changes

### Examples
```bash
# Good commit messages
git commit -m "feat(auth): add OAuth login functionality"
git commit -m "fix(ui): resolve button alignment issue"
git commit -m "docs(readme): update installation instructions"

# With body and footer
git commit -m "feat(api): add user profile endpoints

- Add GET /api/user/profile
- Add PUT /api/user/profile  
- Add validation middleware

Closes #123"
```

## 🚀 Usage

### Automatic Execution
Hooks run automatically when you use Git commands:
```bash
git add .
git commit -m "feat: add new feature"  # Pre-commit hook runs
git push origin main                   # Pre-push hook runs
```

### Manual Execution
You can run the same checks manually:
```bash
# Run lint-staged (same as pre-commit)
npm run pre-commit

# Run type checking
npm run type-check

# Format all files
npm run format

# Lint all files
npm run lint:fix
```

### Bypassing Hooks
In emergencies, you can bypass hooks (not recommended):
```bash
git commit --no-verify -m "emergency fix"
git push --no-verify
```

## ⚙️ Configuration Files

### .lintstagedrc.js
Controls what runs on staged files:
- ESLint with auto-fix
- Prettier formatting
- TypeScript type checking

### .husky/ Directory
Contains the Git hook scripts:
- `pre-commit`: Quality checks
- `commit-msg`: Message validation  
- `pre-push`: Final validation

### commitlint.config.js
Commit message validation rules

## 🛠 Customization

### Modify Pre-commit Checks
Edit `.lintstagedrc.js`:
```javascript
module.exports = {
  '**/*.{js,jsx,ts,tsx}': [
    'eslint --fix',
    'prettier --write',
    // Add your custom commands here
  ],
};
```

### Add New Hooks
Create new hook files in `.husky/`:
```bash
npx husky add .husky/post-commit "echo 'Commit completed!'"
```

### Disable Specific Hooks
Remove or rename hook files in `.husky/`

## 🔍 Troubleshooting

### Hook Not Running
1. Ensure Husky is installed: `npm run prepare`
2. Check hook file permissions: `chmod +x .husky/pre-commit`
3. Verify Git repository is initialized

### Slow Hook Execution
- Lint-staged only processes staged files for speed
- Consider reducing scope of type checking
- Use `--no-verify` for emergency commits only

### Hook Failures
Common issues and solutions:
- **ESLint errors**: Fix code issues or update rules
- **Prettier conflicts**: Run `npm run format`
- **Type errors**: Fix TypeScript issues
- **Permission errors**: Check file permissions

## 📚 Resources

- [Husky Documentation](https://typicode.github.io/husky/)
- [lint-staged Documentation](https://github.com/okonet/lint-staged)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Commitlint](https://commitlint.js.org/)

---

**🪝 Hooks help maintain consistent code quality across all commits!**