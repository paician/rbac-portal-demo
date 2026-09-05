import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

class MemoryStorage {
  constructor() { this.map = new Map(); }
  getItem(key) { return this.map.has(key) ? this.map.get(key) : null; }
  setItem(key, value) { this.map.set(key, String(value)); }
  removeItem(key) { this.map.delete(key); }
  clear() { this.map.clear(); }
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = relativePath => fs.readFileSync(path.join(root, relativePath), 'utf8');

globalThis.localStorage = new MemoryStorage();
globalThis.location = { search: '?role=admin' };
globalThis.window = globalThis;
Object.defineProperty(globalThis, 'navigator', { value: { languages: ['zh-TW'], language: 'zh-TW' }, configurable: true });

const adapter = await import('../adapters/portal-adapter.js');
const { createTranslator, resolveLocale, localeUrl, LOCALE_STORAGE_KEY } = await import('../data/i18n.js');
const navigation = await import('../data/navigation.js');
const setSearch = value => { globalThis.location.search = value; };

const index = read('index.html');
const packageJson = read('package.json');
const tablerCss = read('vendor/tabler/1.4.0/tabler.min.css');
const tablerLicense = read('vendor/tabler/1.4.0/LICENSE');
const tokenCss = read('styles/fin-tokens.css');
const shellCss = read('styles/r3-shell.css');
const appSource = read('app.js');
const adapterSource = read('adapters/portal-adapter.js');
const navigationSource = read('data/navigation.js');
const i18nSource = read('data/i18n.js');
const bundle = read('app.bundle.js');

// 1-4. Pinned, local Tabler foundation with attribution and no runtime CDN/latest dependency.
assert.match(tablerCss.slice(0, 200), /Tabler v1\.4\.0/);
assert.match(tablerLicense, /MIT License/);
assert.ok(index.includes('./vendor/tabler/1.4.0/tabler.min.css'));
assert.ok(!index.includes('@latest'));
assert.ok(!packageJson.includes('@latest'));
assert.ok(!fs.existsSync(path.join(root, 'vendor/tabler/1.4.0/tabler.min.js')));

const stylesheetOrder = [
  './vendor/tabler/1.4.0/tabler.min.css',
  './styles/fin-tokens.css',
  './styles.css',
  './styles/r3-shell.css'
].map(item => index.indexOf(item));
assert.ok(stylesheetOrder.every(position => position >= 0));
assert.deepEqual(stylesheetOrder, [...stylesheetOrder].sort((a, b) => a - b));
for (const primitive of ['container-xl', 'card fin-surface-card', 'badge', 'nav nav-pills', 'btn', 'row g-3', 'd-flex']) {
  assert.ok(index.includes(primitive) || appSource.includes(primitive), `Missing adopted Tabler primitive ${primitive}`);
}

// 5-6. FIN semantic tokens and R3 shell layers.
for (const token of ['--fin-bg', '--fin-surface', '--fin-surface-muted', '--fin-text', '--fin-text-muted', '--fin-border', '--fin-brand', '--fin-brand-strong', '--fin-accent', '--fin-success', '--fin-warning', '--fin-danger', '--fin-info', '--fin-radius-sm', '--fin-radius-md', '--fin-radius-lg', '--fin-shadow-sm', '--fin-shadow-md', '--fin-sidebar-width', '--fin-content-max']) {
  assert.ok(tokenCss.includes(token), `Missing semantic token ${token}`);
}
for (const selector of ['.surface-control', '.surface-switcher.nav', '.surface-heading', '.reserved-capabilities', '.admin-overview-grid', '@media (max-width: 780px)']) {
  assert.ok(shellCss.includes(selector), `Missing R3 shell selector ${selector}`);
}

// 7-12. UX-only surface normalization and legacy compatibility.
assert.ok(navigation.SURFACES.workspace);
assert.ok(navigation.SURFACES.admin);
assert.ok(navigationSource.includes('WORKSPACE_NAVIGATION'));
assert.ok(navigationSource.includes('ADMIN_CONSOLE_NAVIGATION'));

for (const role of ['employee', 'finance', 'manager']) {
  setSearch(`?role=${role}`);
  let context = adapter.getPortalContext();
  assert.equal(context.surface, 'workspace');
  assert.equal(context.page, 'home');

  setSearch(`?role=${role}&surface=admin`);
  context = adapter.getPortalContext();
  assert.equal(context.surface, 'workspace');
  assert.equal(context.page, 'home');
  assert.equal(context.canSwitchSurface, false);
  assert.equal(context.navigation.some(item => item.surface === 'admin'), false);
}

setSearch('?role=admin');
let context = adapter.getPortalContext();
assert.equal(context.surface, 'workspace');
assert.equal(context.page, 'home');
assert.equal(context.canSwitchSurface, true);

setSearch('?role=admin&surface=workspace');
context = adapter.getPortalContext();
assert.equal(context.surface, 'workspace');
assert.equal(context.page, 'home');

setSearch('?role=admin&surface=workspace&viewAs=finance');
context = adapter.getPortalContext();
assert.equal(context.surface, 'workspace');
assert.equal(context.loginRole.key, 'admin');
assert.equal(context.effectiveRole.key, 'finance');
assert.equal(context.canSwitchSurface, false);
assert.equal(context.navigation.some(item => item.surface === 'admin'), false);
assert.equal(context.canViewRuntimeWarning, true);

setSearch('?role=admin&surface=admin');
context = adapter.getPortalContext();
assert.equal(context.surface, 'admin');
assert.equal(context.page, 'admin-overview');
assert.equal(context.effectiveRole.key, 'admin');
assert.equal(adapter.queryPeople({ page: 1, pageSize: 10 }).total, 3200);
assert.ok(adapter.queryAudit({ page: 1, pageSize: 10 }).total > 0);

setSearch('?role=admin&surface=admin&viewAs=finance');
context = adapter.getPortalContext();
assert.equal(context.surface, 'workspace');
assert.equal(context.page, 'home');
assert.equal(context.loginRole.key, 'admin');
assert.equal(context.effectiveRole.key, 'finance');
assert.equal(context.canPreviewRoles, true);
assert.equal(context.canSwitchSurface, false);
assert.equal(context.navigation.some(item => item.surface === 'admin'), false);

for (const page of ['resource-settings', 'people-overview', 'audit']) {
  setSearch(`?role=admin&page=${page}`);
  context = adapter.getPortalContext();
  assert.equal(context.surface, 'admin');
  assert.equal(context.page, page);
}

setSearch('?role=employee&page=audit');
context = adapter.getPortalContext();
assert.equal(context.surface, 'workspace');
assert.equal(context.page, 'home');

// 13-16. Reserved positions are static, disabled, and have no navigation/action binding.
for (const key of ['ticket', 'workflow', 'ai']) assert.ok(appSource.includes(`key: '${key}'`));
const reservedRenderer = appSource.slice(appSource.indexOf('function renderReservedCapabilities'), appSource.indexOf('function renderAdminOverview'));
assert.ok(reservedRenderer.includes('disabled aria-disabled="true"'));
assert.ok(!reservedRenderer.includes('onclick'));
assert.ok(!reservedRenderer.includes('data-page'));

// 17-18. Prototype identification and all new locale keys.
const newLocaleKeys = [
  'locale.label', 'shell.brandSubtitle', 'prototype.environmentAria', 'prototype.staticMarker', 'prototype.syntheticMarker',
  'sidebar.collapse', 'sidebar.expand', 'sidebar.open', 'sidebar.close', 'role.previewAria',
  'surface.switcherLabel', 'surface.eyebrow', 'surface.workspace', 'surface.admin', 'surface.workspaceDescription',
  'surface.adminDescription', 'surface.adminBadge', 'nav.workspaceGroup', 'nav.adminGroup', 'nav.adminOverview',
  'role.endPreview', 'role.endPreviewAccessible',
  'reserved.eyebrow', 'reserved.title', 'reserved.description', 'reserved.badge', 'reserved.ticket',
  'reserved.ticketDescription', 'reserved.workflow', 'reserved.workflowDescription', 'reserved.ai', 'reserved.aiDescription',
  'settings.heroBadge', 'settings.create.syntheticBadge', 'settings.resource.syntheticCustom', 'settings.future.reserved',
  'people.heroBadge', 'people.departmentFilterAria', 'people.viewModeAria', 'audit.heroBadge', 'audit.typeFilterAria', 'workbench.syntheticBadge',
  'adminOverview.eyebrow', 'adminOverview.title', 'adminOverview.description', 'adminOverview.badge',
  'adminOverview.resourcesTitle', 'adminOverview.resourcesDescription', 'adminOverview.peopleTitle',
  'adminOverview.peopleDescription', 'adminOverview.auditTitle', 'adminOverview.auditDescription',
  'adminOverview.runtimeTitle', 'adminOverview.runtimeDescription', 'adminOverview.open', 'adminOverview.synthetic'
];
for (const locale of ['zh-TW', 'zh-CN', 'en-US']) {
  const { t } = createTranslator(locale);
  for (const key of newLocaleKeys) assert.notEqual(t(key), key, `${locale} missing ${key}`);
}
for (const key of newLocaleKeys) assert.equal(i18nSource.split(`'${key}'`).length - 1, 3, `${key} must be explicit in all three locales`);
assert.match(createTranslator('en-US').t('prototype.syntheticMarker'), /Synthetic Data.*Non-production/);
assert.ok(index.includes('prototypeMarker'));
assert.ok(index.includes('syntheticMarker'));

// R3 i18n polish: visible selector, persistence priority, state preservation, and translated page chrome.
assert.ok(index.includes('id="localeSwitcher"'));
for (const [value, label] of [['zh-TW', '繁體中文'], ['zh-CN', '简体中文'], ['en-US', 'English']]) {
  assert.ok(index.includes(`<option value="${value}">${label}</option>`));
}
assert.ok(shellCss.includes('.locale-control'));
assert.ok(shellCss.includes('.locale-switcher'));
assert.equal(LOCALE_STORAGE_KEY, 'portal_lang');
const preservedUrl = new URL(localeUrl('https://prototype.invalid/?role=admin&surface=workspace&viewAs=finance&page=people-overview&permissionState=refresh&principal=person-0001&tab=resources&mode=create', 'en-US'));
for (const [key, value] of [['role','admin'],['surface','workspace'],['viewAs','finance'],['page','people-overview'],['permissionState','refresh'],['principal','person-0001'],['tab','resources'],['mode','create']]) assert.equal(preservedUrl.searchParams.get(key), value);
assert.equal(preservedUrl.searchParams.get('lang'), 'en-US');
localStorage.clear();
setSearch('?role=admin');
localStorage.setItem(LOCALE_STORAGE_KEY, 'en-US');
assert.equal(resolveLocale(), 'en-US');
setSearch('?role=admin&lang=zh-CN');
assert.equal(resolveLocale(), 'zh-CN');
localStorage.clear();
setSearch('?role=admin');
Object.defineProperty(globalThis, 'navigator', { value: { languages: ['en-US'], language: 'en-US' }, configurable: true });
assert.equal(resolveLocale(), 'en-US');
Object.defineProperty(globalThis, 'navigator', { value: { languages: ['fr-FR'], language: 'fr-FR' }, configurable: true });
assert.equal(resolveLocale(), 'zh-TW');
Object.defineProperty(globalThis, 'navigator', { value: { languages: ['zh-TW'], language: 'zh-TW' }, configurable: true });
assert.ok(appSource.includes('localStorage.setItem(LOCALE_STORAGE_KEY,selected)'));
assert.ok(appSource.includes('location.assign(localeUrl(location.href,selected))'));
assert.ok(appSource.includes("locale==='zh-TW'?'zh-Hant-TW':locale==='zh-CN'?'zh-Hans-CN':'en-US'"));
for (const hardCoded of ['aria-label="主選單"', 'Base Authoring Plane</span>', 'Synthetic Identity</span>', 'aria-label="Department"', 'aria-label="People view mode"', 'Audit Trail</span>', 'aria-label="Event type"']) assert.ok(!index.includes(hardCoded));
for (const hardCoded of ['>Global · Synthetic</span>', '>Synthetic custom</small>', '>Reserved</span>', '>Synthetic Dry-run</span>']) assert.ok(!appSource.includes(hardCoded));

// R1/R4 repair: preview isolation with a semantically separate, responsive exit action.
assert.ok(appSource.includes("t('role.endPreview')"));
assert.ok(appSource.includes("t('role.endPreviewAccessible')"));
assert.ok(index.includes('id="previewExit"'));
assert.ok(index.includes('data-preview-exit="true"'));
const roleRenderer = appSource.slice(appSource.indexOf('function renderRoleSwitcher'), appSource.indexOf('function renderWelcome'));
assert.ok(roleRenderer.includes("filter(r=>r.key!=='admin')"));
assert.ok(!roleRenderer.includes('data-preview-exit'));
for (const [locale, shortLabel, accessiblePattern] of [
  ['zh-TW', '結束預覽', /返回管理員/],
  ['zh-CN', '结束预览', /返回管理员/],
  ['en-US', 'End preview', /return to Administrator/]
]) {
  const { t } = createTranslator(locale);
  assert.equal(t('role.endPreview'), shortLabel);
  assert.match(t('role.endPreviewAccessible'), accessiblePattern);
}
assert.match(shellCss, /\.preview-controls\s*\{[\s\S]*?flex-wrap:\s*wrap;/);
const previewExitRule = shellCss.match(/\.preview-exit-button\.btn\s*\{([^}]*)\}/)?.[1] || '';
assert.ok(previewExitRule);
assert.ok(!/width:\s*\d+px/.test(previewExitRule));
assert.ok(!/(overflow:\s*hidden|text-overflow|white-space:\s*nowrap)/.test(previewExitRule));
assert.ok(index.includes('class="sidebar-collapse r3-sidebar-boundary-control"'));
assert.ok(index.includes('aria-controls="sidebar"'));
assert.ok(shellCss.includes('.sidebar-collapse.r3-sidebar-boundary-control'));
assert.ok(shellCss.includes('.sidebar-collapse.r3-sidebar-boundary-control:hover'));
assert.ok(shellCss.includes('.sidebar-collapse.r3-sidebar-boundary-control:focus-visible'));
assert.match(shellCss, /@media \(min-width: 781px\)[\s\S]*?\.sidebar\s*\{\s*overflow:\s*visible;/);
assert.match(shellCss, /\.sidebar-collapse\.r3-sidebar-boundary-control\s*\{[\s\S]*?z-index:\s*120;[\s\S]*?right:\s*-20px;/);
assert.ok(appSource.includes("btn.setAttribute('aria-expanded'"));
const mobileShellRules = shellCss.slice(shellCss.indexOf('@media (max-width: 780px)'));
assert.match(mobileShellRules, /\.sidebar-collapse\.r3-sidebar-boundary-control\s*\{\s*display:\s*none;/);
assert.match(mobileShellRules, /\.preview-controls\s*\{[\s\S]*?display:\s*grid\s*!important;[\s\S]*?grid-template-columns:\s*minmax\(0, 1fr\);/);
assert.match(mobileShellRules, /\.preview-exit-button\.btn\s*\{\s*width:\s*100%;/);

const localeResolver = i18nSource.slice(i18nSource.indexOf('export function resolveLocale'), i18nSource.indexOf('export function createTranslator'));
assert.ok(localeResolver.indexOf("get('lang')") < localeResolver.indexOf('LOCALE_STORAGE_KEY'));
assert.ok(localeResolver.indexOf('LOCALE_STORAGE_KEY') < localeResolver.indexOf('navigator.languages'));
assert.ok(localeResolver.indexOf('navigator.language') < localeResolver.indexOf("'zh-TW'"));

// 19. Existing adapter seam remains the only application data/context boundary.
assert.ok(appSource.includes("from './adapters/portal-adapter.js'"));
assert.ok(appSource.includes("from './data/i18n.js'"));
assert.ok(!appSource.includes("from './data/grants.js'"));
assert.ok(!appSource.includes("from './data/resources.js'"));
assert.ok(adapterSource.includes('UX-only surface state. Not a production authorization or routing contract.'));
assert.ok(adapterSource.includes('NAVIGATION_BY_ROLE'));

// Preservation smoke checks: permission freshness and admin-only runtime warning.
setSearch('?role=finance&permissionState=refresh');
context = adapter.getPortalContext();
assert.equal(context.permissionFreshnessState, 'refresh');
assert.equal(context.canViewRuntimeWarning, false);
setSearch('?role=finance&permissionState=reauth');
assert.equal(adapter.getPortalContext().permissionFreshnessState, 'reauth');
setSearch('?role=admin&surface=admin');
assert.equal(adapter.getPortalContext().canViewRuntimeWarning, true);

// 20. The direct-file compatibility bundle is generated from current source markers.
assert.match(bundle, /Generated compatibility bundle for FIN-SSC RBAC Demo/);
assert.ok(bundle.includes('RESERVED_WORKSPACE_CAPABILITIES'));
assert.ok(bundle.includes('UX-only surface state. Not a production authorization or routing contract.'));

// 21. R3 validation may extend, but never replace or weaken, the existing Workbench contract.
const workbench = spawnSync(process.execPath, [path.join(root, 'tools/validate-workbench.mjs')], { cwd: root, encoding: 'utf8' });
assert.equal(workbench.status, 0, workbench.stderr || workbench.stdout);
assert.match(workbench.stdout, /Principal Permission Workbench validation PASS/);

console.log('R3-SUX-01 structural validation PASS');
