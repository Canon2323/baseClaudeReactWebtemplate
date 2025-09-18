#!/usr/bin/env node

/**
 * Detecta o gerenciador de pacotes preferido
 * Prioridade: pnpm > yarn > npm
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function hasCommand(command) {
  try {
    execSync(`${command} --version`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function detectPackageManager() {
  // Verifica se há lock files existentes
  const lockFiles = {
    'pnpm-lock.yaml': 'pnpm',
    'yarn.lock': 'yarn',
    'package-lock.json': 'npm'
  };

  for (const [file, manager] of Object.entries(lockFiles)) {
    if (fs.existsSync(path.join(process.cwd(), file))) {
      if (hasCommand(manager)) {
        return manager;
      }
    }
  }

  // Se não há lock files, verifica disponibilidade por prioridade
  if (hasCommand('pnpm')) return 'pnpm';
  if (hasCommand('yarn')) return 'yarn';
  if (hasCommand('npm')) return 'npm';

  throw new Error('Nenhum gerenciador de pacotes encontrado!');
}

function getCommands(manager) {
  const commands = {
    pnpm: {
      install: 'pnpm install',
      run: 'pnpm',
      add: 'pnpm add',
      addDev: 'pnpm add -D',
      remove: 'pnpm remove',
      exec: 'pnpm exec'
    },
    yarn: {
      install: 'yarn install',
      run: 'yarn',
      add: 'yarn add',
      addDev: 'yarn add -D',
      remove: 'yarn remove',
      exec: 'yarn'
    },
    npm: {
      install: 'npm install',
      run: 'npm run',
      add: 'npm install',
      addDev: 'npm install -D',
      remove: 'npm uninstall',
      exec: 'npx'
    }
  };

  return commands[manager];
}

if (require.main === module) {
  try {
    const manager = detectPackageManager();
    const commands = getCommands(manager);

    console.log(`📦 Gerenciador detectado: ${manager}`);
    console.log(`🔧 Comandos disponíveis:`);
    console.log(`   Instalar: ${commands.install}`);
    console.log(`   Executar: ${commands.run} <script>`);
    console.log(`   Adicionar: ${commands.add} <package>`);
    console.log(`   Remover: ${commands.remove} <package>`);
  } catch (error) {
    console.error('❌', error.message);
    process.exit(1);
  }
}

module.exports = { detectPackageManager, getCommands };