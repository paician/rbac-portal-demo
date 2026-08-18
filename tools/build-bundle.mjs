import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const sources = [
  'data/roles.js',
  'data/profiles.js',
  'data/people.js',
  'data/audit-events.js',
  'data/resources.js',
  'data/grants.js',
  'data/navigation.js',
  'data/base-settings.js',
  'adapters/portal-adapter.js',
  'data/i18n.js',
  'app.js',
];

function toBundleSource(source, relativePath) {
  let code = source.replace(/^\s*import\s+[^;]+;\s*$/gm, '');
  code = code.replace(/\bexport\s+(?=(const|let|var|function|class)\b)/g, '');
  code = code.replace(/^\s*export\s*\{[^}]*\};?\s*$/gm, '');
  return `\n// ---- ${relativePath} ----\n${code.trim()}\n`;
}

const body = sources
  .map((relativePath) => toBundleSource(fs.readFileSync(path.join(root, relativePath), 'utf8'), relativePath))
  .join('\n');

const bundle = `/*\n * Generated compatibility bundle for FIN-SSC RBAC Demo.\n * Source of truth remains app.js, adapters/, and data/.\n * Regenerate with: node tools/build-bundle.mjs\n * This classic-script bundle intentionally supports direct file:// preview in Chrome/Edge.\n */\n(function () {\n'use strict';\n${body}\n})();\n`;

fs.writeFileSync(path.join(root, 'app.bundle.js'), bundle, 'utf8');
console.log('Generated app.bundle.js');
