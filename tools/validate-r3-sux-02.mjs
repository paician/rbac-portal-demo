import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = relativePath => fs.readFileSync(path.join(root, relativePath), 'utf8');

const index = read('index.html');
const appSource = read('app.js');
const adapterSource = read('adapters/portal-adapter.js');
const i18nSource = read('data/i18n.js');
const packageJson = read('package.json');
const tokenCss = read('styles/fin-tokens.css');
const componentCss = read('styles/fin-components.css');
const shellCss = read('styles/r3-shell.css');
const compatibilityCss = read('styles.css');
const tablerCss = read('vendor/tabler/1.4.0/tabler.min.css');

// 1-5. Dedicated semantic layer, ordered between compatibility and surface shell.
assert.ok(fs.existsSync(path.join(root, 'styles/fin-components.css')));
const stylesheetOrder = [
  './vendor/tabler/1.4.0/tabler.min.css',
  './styles/fin-tokens.css',
  './styles.css',
  './styles/fin-components.css',
  './styles/r3-shell.css'
].map(item => index.indexOf(item));
assert.ok(stylesheetOrder.every(position => position >= 0));
assert.deepEqual(stylesheetOrder, [...stylesheetOrder].sort((a, b) => a - b));
assert.match(tablerCss.slice(0, 200), /Tabler v1\.4\.0/);
assert.ok(!index.includes('@latest'));
assert.ok(!packageJson.includes('@latest'));
assert.doesNotMatch(index, /<(?:link|script)[^>]+(?:href|src)=["']https?:\/\//i);
assert.ok(!fs.existsSync(path.join(root, 'vendor/tabler/1.4.0/tabler.min.js')));

// 6. Common buttons retain Tabler primitives and FIN-owned semantic variants.
for (const selector of ['.fin-btn.btn', '.fin-btn-primary.btn', '.fin-btn-secondary.btn', '.fin-btn-quiet.btn', '.fin-btn-danger.btn']) {
  assert.ok(componentCss.includes(selector), `Missing button component ${selector}`);
}
assert.ok(index.includes('btn fin-btn'));
assert.ok(appSource.includes('btn fin-btn fin-btn-primary'));
assert.ok(appSource.includes('btn fin-btn fin-btn-secondary'));
assert.match(componentCss, /\.fin-btn\.btn:focus-visible/);
assert.match(componentCss, /\.fin-btn\.btn:disabled/);
assert.match(componentCss, /white-space:\s*normal/);

// 7. Badge presentation is shared while role, environment, runtime, control, and reserved semantics stay distinct.
for (const selector of ['.fin-badge.badge', '.fin-badge-role', '.fin-badge-environment', '.fin-badge-runtime', '.fin-badge-control', '.fin-badge-reserved']) {
  assert.ok(componentCss.includes(selector), `Missing badge component ${selector}`);
}
for (const semanticClass of ['fin-badge-role', 'fin-badge-environment', 'fin-badge-runtime', 'fin-badge-control', 'fin-badge-reserved']) {
  assert.ok(index.includes(semanticClass) || appSource.includes(semanticClass), `Unused badge semantic ${semanticClass}`);
}

// 8. Shared card shell is adopted without replacing bespoke hero or workbench structure.
for (const selector of ['.fin-card.card', '.fin-card-compact.card', '.fin-card-flush.card', '.fin-mobile-card.card']) {
  assert.ok(componentCss.includes(selector), `Missing card component ${selector}`);
}
assert.ok(index.includes('card fin-surface-card fin-card'));
assert.ok(appSource.includes('card fin-card fin-mobile-card'));
assert.ok(appSource.includes('panel workbench-panel'));
assert.ok(!shellCss.includes('.fin-surface-card.card'), 'Shared card presentation must live outside the surface shell');

// 9. Generic forms use Tabler primitives plus FIN semantic wrappers; validation behavior stays in source.
assert.ok(index.includes('form-control fin-form-control'));
assert.ok(index.includes('form-select fin-form-control'));
assert.ok(appSource.includes('form-control fin-form-control'));
assert.ok(appSource.includes('form-select fin-form-control'));
assert.ok(index.includes('input-group fin-search-control'));
for (const behavior of ['createResourceError', 'saveResourceSettings', 'saveBaseSettings', 'data-grant-field']) {
  assert.ok(appSource.includes(behavior), `Missing preserved form behavior ${behavior}`);
}

// 10. Resource Settings tabs adopt nav-tabs without changing their local state contract.
assert.ok(index.includes('settings-tabs nav nav-tabs fin-tabs'));
assert.ok(appSource.includes('settings-tab nav-link fin-tab'));
assert.ok(appSource.includes("activeSettingsTab=b.dataset.tab;renderSettings()"));
assert.ok(appSource.includes("new URLSearchParams(location.search).get('tab')"));

// 11. People and Audit share pagination presentation while keeping bounded page logic.
assert.equal(index.split('pagination fin-pagination').length - 1, 2);
assert.ok(componentCss.includes('.fin-pagination.pagination'));
assert.ok(appSource.includes('peopleState.page=Math.max(1,peopleState.page-1)'));
assert.ok(appSource.includes('auditState.page=Math.max(1,auditState.page-1)'));
assert.ok(adapterSource.includes('Math.max(1, Math.min(totalPages, Number(page) || 1))'));

// 12. Generic table presentation is shared; table structures and responsive wrappers remain present.
assert.ok(componentCss.includes('.fin-table.table'));
assert.ok(componentCss.includes('.fin-table-wrap'));
assert.ok(index.includes('table table-vcenter fin-table'));
assert.ok(appSource.includes('table table-vcenter fin-table'));
assert.ok(compatibilityCss.includes('.table-wrap'));

// 13-14. Workbench/Matrix semantics and all mobile-specific presentations remain protected.
for (const marker of [
  'state.locked', 'data-matrix-action', 'previewPrincipalPermissionChanges', 'function effectiveTable',
  '.principal-workbench', '.resource-matrix-table', '.mobile-resource-matrix', '.mobile-effective-list'
]) {
  assert.ok(appSource.includes(marker) || compatibilityCss.includes(marker), `Missing protected marker ${marker}`);
}
for (const mobileView of ['mobileResourceList', 'mobilePeopleList', 'mobileAuditList', 'mobile-resource-matrix']) {
  assert.ok(index.includes(mobileView) || appSource.includes(mobileView), `Missing mobile view ${mobileView}`);
}
assert.ok(compatibilityCss.includes('@media(max-width:780px)'));
assert.ok(componentCss.includes('@media (max-width: 780px)'));

// 15-16. Locale resolution and three-locale dictionaries are unchanged.
const localeResolver = i18nSource.slice(i18nSource.indexOf('export function resolveLocale'), i18nSource.indexOf('export function createTranslator'));
assert.ok(localeResolver.indexOf("get('lang')") < localeResolver.indexOf('LOCALE_STORAGE_KEY'));
assert.ok(localeResolver.indexOf('LOCALE_STORAGE_KEY') < localeResolver.indexOf('navigator.languages'));
assert.ok(localeResolver.indexOf('navigator.language') < localeResolver.indexOf("'zh-TW'"));
for (const locale of ["'zh-TW':ZH_TW", "'zh-CN':ZH_CN", "'en-US':EN"]) assert.ok(i18nSource.includes(locale));
for (const value of ['zh-TW', 'zh-CN', 'en-US']) assert.ok(index.includes(`<option value="${value}">`));

// 17. Adapter remains the UI context/query/mutation seam.
assert.ok(appSource.includes("from './adapters/portal-adapter.js'"));
assert.ok(!appSource.includes("from './data/grants.js'"));
assert.ok(!appSource.includes("from './data/resources.js'"));
assert.ok(adapterSource.includes('UX-only surface state. Not a production authorization or routing contract.'));

// 18. Runtime Warning behavior and stacking contract are preserved; only visual primitives are additive.
for (const behavior of ['setupRuntimeWarning', "root.addEventListener('mouseenter',open)", "toggle.addEventListener('focus',open)", "if(e.key==='Escape')forceClose()"] ) {
  assert.ok(appSource.includes(behavior), `Missing Runtime Warning behavior ${behavior}`);
}
assert.ok(index.includes('id="runtimeWarningToggle" class="runtime-warning-toggle"'));
assert.ok(compatibilityCss.includes('.runtime-sidebar .runtime-warning-panel{position:fixed;z-index:140'));
assert.ok(shellCss.includes('.sidebar-collapse.r3-sidebar-boundary-control'));

// 19-27. Motion tokens and accepted interaction feedback survive component consolidation.
for (const token of [
  '--fin-motion-fast: 160ms ease',
  '--fin-motion-base: 180ms ease',
  '--fin-motion-slow: 220ms ease'
]) {
  assert.ok(tokenCss.includes(token), `Missing FIN motion token ${token}`);
}
assert.match(componentCss, /\.fin-btn\.btn\s*\{[\s\S]*?transition:[\s\S]*?var\(--fin-motion-base\)[\s\S]*?filter var\(--fin-motion-base\)/);
assert.doesNotMatch(
  [componentCss, shellCss, compatibilityCss].join('\n'),
  /transition\s*:\s*all(?:\s|;|,)/i,
  'Blanket transition: all is not allowed'
);

const quietButtonRule = componentCss.match(/\.fin-btn-quiet\.btn\s*\{([^}]*)\}/);
assert.ok(quietButtonRule, 'Missing quiet button semantic rule');
assert.doesNotMatch(quietButtonRule[1], /(?:background|transform)\s*:/, 'Quiet button must not override product-specific hover/active motion');
assert.match(compatibilityCss, /\.nav-item\s*\{[^}]*transition:\s*\.18s ease/);
assert.match(compatibilityCss, /\.nav-item:hover\s*\{[^}]*background:[^}]*transform:\s*translateX\(2px\)/);
assert.match(compatibilityCss, /\.role-button\s*\{[^}]*transition:\s*\.18s ease/);
assert.match(compatibilityCss, /\.role-button:hover\s*\{[^}]*background:/);
assert.match(compatibilityCss, /\.role-button\.active\s*\{[^}]*background:/);
assert.match(componentCss, /\.fin-btn-primary\.btn:hover:not\([^}]+\)\s*\{[^}]*transform:\s*translateY\(-1px\)[^}]*filter:\s*brightness\(1\.04\)/);
assert.match(compatibilityCss, /\.launch-button:hover\s*\{[^}]*transform:\s*translateY\(-1px\)[^}]*filter:\s*brightness\(1\.04\)/);
assert.match(compatibilityCss, /\.toast\s*\{[^}]*opacity:\s*0[^}]*transform:\s*translateY\(12px\)[^}]*transition:\s*\.22s ease/);
assert.match(compatibilityCss, /\.toast\.show\s*\{[^}]*opacity:\s*1[^}]*transform:\s*translateY\(0\)/);
assert.match(compatibilityCss, /\.switch span:after\s*\{[^}]*transition:\s*\.18s/);
assert.match(compatibilityCss, /\.switch input:checked\+span:after\s*\{[^}]*transform:\s*translateX\(18px\)/);
assert.match(compatibilityCss, /\.sidebar\s*\{[^}]*transform:\s*translateX\(-104%\)[^}]*transition:\s*transform \.22s ease/);
assert.match(compatibilityCss, /\.mobile-nav-open \.sidebar\s*\{[^}]*transform:\s*translateX\(0\)/);
for (const selector of ['.locale-control', '.surface-button.btn', '.preview-exit-button.btn', '.sidebar-collapse.r3-sidebar-boundary-control']) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  assert.match(shellCss, new RegExp(`${escaped}\\s*\\{[^}]*transition:[^}]*var\\(--fin-motion-`), `Missing shell motion for ${selector}`);
}

// 28-29. Existing validators must independently pass; R3-SUX-02 only extends them.
for (const [validator, passText] of [
  ['tools/validate-r3-sux-01.mjs', /R3-SUX-01 structural validation PASS/],
  ['tools/validate-workbench.mjs', /Principal Permission Workbench validation PASS/]
]) {
  const result = spawnSync(process.execPath, [path.join(root, validator)], { cwd: root, encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.match(result.stdout, passText);
}

console.log('R3-SUX-02 component consolidation validation PASS');
