# Gerenciadores de Pacotes

Este template suporta **pnpm**, **yarn** e **npm** como gerenciadores de pacotes. **pnpm** é recomendado por ser mais rápido e seguro.

## 🚀 Instalação Rápida

### pnpm (Recomendado)
```bash
# Instalar pnpm globalmente
npm install -g pnpm

# Instalar dependências
pnpm install

# Executar projeto
pnpm dev
```

### Yarn
```bash
# Instalar yarn globalmente
npm install -g yarn

# Instalar dependências
yarn install

# Executar projeto
yarn dev
```

### npm (Fallback)
```bash
# Instalar dependências
npm install

# Executar projeto
npm run dev
```

## 🔧 Detecção Automática

O projeto detecta automaticamente qual gerenciador usar baseado em:

1. **Lock files existentes**: `pnpm-lock.yaml` > `yarn.lock` > `package-lock.json`
2. **Disponibilidade**: pnpm > yarn > npm
3. **Scripts automáticos** adaptam-se ao gerenciador detectado

## 📦 Scripts Principais

Todos os scripts funcionam com qualquer gerenciador:

```bash
# Desenvolvimento
[pnpm|yarn|npm run] dev

# Build
[pnpm|yarn|npm run] build

# Testes
[pnpm|yarn|npm run] test

# Lint
[pnpm|yarn|npm run] lint

# Setup hooks
[pnpm|yarn|npm run] setup:hooks

# Type check
[pnpm|yarn|npm run] type-check
```

## ⚡ Por que pnpm?

### Vantagens do pnpm:
- **🔒 Segurança**: Menos vulnerabilidades que npm
- **⚡ Performance**: 2x mais rápido que npm/yarn
- **💾 Espaço**: Deduplica dependências globalmente
- **🔧 Compatibilidade**: 100% compatível com npm
- **📦 Workspaces**: Suporte nativo a monorepos

### Comparação de Performance:
```bash
# Instalação inicial (projeto limpo)
npm install     # ~45s
yarn install    # ~35s
pnpm install    # ~20s

# Instalação com cache
npm install     # ~15s
yarn install    # ~10s
pnpm install    # ~5s
```

## 🔄 Migração Entre Gerenciadores

### De npm para pnpm:
```bash
# Remover npm artifacts
rm package-lock.json
rm -rf node_modules

# Instalar com pnpm
pnpm install
```

### De yarn para pnpm:
```bash
# Remover yarn artifacts
rm yarn.lock
rm -rf node_modules

# Instalar com pnpm
pnpm install
```

### De pnpm para yarn:
```bash
# Remover pnpm artifacts
rm pnpm-lock.yaml
rm -rf node_modules

# Instalar com yarn
yarn install
```

## ⚙️ Configurações

### .npmrc (pnpm/npm)
```ini
engine-strict=true
save-exact=true
auto-install-peers=true
dedupe-peer-dependents=true
```

### pnpm-workspace.yaml
```yaml
packages:
  - '.'

prefer-workspace-packages: true
auto-install-peers: true
```

## 🚨 Problemas de Segurança

### npm Issues Recentes:
- Vulnerabilidades em dependências core
- Supply chain attacks
- Malicious packages

### pnpm Security:
- ✅ Isolated dependency trees
- ✅ Strict package verification
- ✅ Content addressing
- ✅ Symlink-based architecture

## 🔍 Verificar Gerenciador Atual

```bash
# Script incluído no projeto
node scripts/detect-package-manager.js

# Saída exemplo:
# 📦 Gerenciador detectado: pnpm
# 🔧 Comandos disponíveis:
#    Instalar: pnpm install
#    Executar: pnpm <script>
#    Adicionar: pnpm add <package>
```

## 🛠️ Troubleshooting

### Cache Corrompido:
```bash
# pnpm
pnpm store prune

# yarn
yarn cache clean

# npm
npm cache clean --force
```

### Dependências Conflitantes:
```bash
# pnpm (mais rigoroso, detecta conflitos)
pnpm install --shamefully-hoist

# yarn
yarn install --flat

# npm
npm install --legacy-peer-deps
```

### Lock File Desatualizado:
```bash
# Regenerar lock file
rm [pnpm-lock.yaml|yarn.lock|package-lock.json]
[pnpm|yarn|npm] install
```