# Git Hooks - Controle de Qualidade

Este projeto utiliza **Husky** e **lint-staged** para garantir qualidade do código antes de cada commit.

## 🚀 Configuração Inicial

```bash
# Instalar dependências e configurar hooks
npm install
npm run setup:hooks
```

## 🔍 Verificações Automáticas

### Pre-commit Hook
Executado automaticamente antes de cada commit:

- **ESLint**: Verifica e corrige problemas de código
- **Prettier**: Formata código automaticamente
- **TypeScript**: Verifica tipos (bloqueia commit se houver erros)
- **Testes**: Executa testes relacionados aos arquivos alterados

### Commit Message Hook
Valida formato das mensagens de commit seguindo [Conventional Commits](https://www.conventionalcommits.org/):

```
tipo(escopo): descrição

feat: adiciona autenticação de usuário
fix(api): corrige timeout na requisição
docs: atualiza README com instruções
style: formata código sem mudanças lógicas
refactor: reorganiza estrutura de pastas
test: adiciona testes para serviço de storage
chore: atualiza dependências
```

## ⚙️ Configuração

### Arquivos de Configuração

- `.husky/pre-commit`: Hook executado antes do commit
- `.husky/commit-msg`: Validação de mensagens de commit
- `.lintstagedrc.js`: Configuração do lint-staged
- `.commitlintrc.js`: Regras para mensagens de commit

### Customização

#### Modificar verificações do pre-commit:
```javascript
// .lintstagedrc.js
module.exports = {
  '**/*.{ts,tsx}': [
    'eslint --fix --max-warnings=0',
    'prettier --write',
    () => 'npm run type-check'
  ]
}
```

#### Ajustar regras de commit:
```javascript
// .commitlintrc.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 100]
  }
}
```

## 🚫 Bypass de Hooks (Uso Emergencial)

```bash
# Pular verificações (não recomendado)
git commit --no-verify -m "fix: correção emergencial"

# Pular apenas pre-commit
git commit --no-verify -m "feat: nova funcionalidade"
```

## 🎯 Benefícios

- **Qualidade Consistente**: Código sempre formatado e sem erros
- **Prevenção de Bugs**: TypeScript e testes executados automaticamente
- **Histórico Limpo**: Commits com mensagens padronizadas
- **Colaboração**: Mesmo padrão para toda a equipe
- **CI/CD Ready**: Builds mais estáveis em produção

## 🔧 Troubleshooting

### Hook não executando:
```bash
# Reinstalar hooks
rm -rf .husky/_
npm run setup:hooks
```

### Erro de permissão (Unix/macOS):
```bash
chmod +x .husky/pre-commit
chmod +x .husky/commit-msg
```

### Erro de TypeScript bloqueando commit:
```bash
# Verificar erros
npm run type-check

# Corrigir e tentar commit novamente
git add .
git commit -m "fix: corrige erros de tipagem"
```