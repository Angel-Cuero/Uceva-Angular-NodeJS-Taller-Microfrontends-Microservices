#!/usr/bin/env node
/**
 * Abre en el navegador la documentacion generada por Compodoc
 * (./documentation/index.html) usando el visor por defecto del sistema.
 *
 * Se usa despues de `compodoc -p tsconfig.doc.json`, ya que el flag --open
 * de Compodoc unicamente funciona junto con --serve (que deja un servidor
 * corriendo, algo no deseado al generar la doc de 6 proyectos a la vez).
 *
 * Uso:  node scripts/open-docs.js
 */
const { execFileSync } = require('node:child_process');
const { existsSync } = require('node:fs');
const path = require('node:path');

const indexPath = path.resolve(process.cwd(), 'documentation', 'index.html');

if (!existsSync(indexPath)) {
  console.error(`No se encontro la documentacion en: ${indexPath}`);
  console.error('Genera la documentacion primero, por ejemplo con "npm run compodoc".');
  process.exit(1);
}

const opener = process.platform === 'win32'
  ? { command: 'cmd', args: ['/c', 'start', '', indexPath] }
  : process.platform === 'darwin'
    ? { command: 'open', args: [indexPath] }
    : { command: 'xdg-open', args: [indexPath] };

try {
  execFileSync(opener.command, opener.args, { stdio: 'ignore' });
  console.log(`Documentacion abierta: ${indexPath}`);
} catch (error) {
  console.error(`No se pudo abrir la documentacion automaticamente: ${error.message}`);
}
