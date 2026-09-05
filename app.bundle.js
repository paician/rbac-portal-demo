/*
 * Generated compatibility bundle for FIN-SSC RBAC Demo.
 * Source of truth remains app.js, adapters/, and data/.
 * Regenerate with: node tools/build-bundle.mjs
 * This classic-script bundle intentionally supports direct file:// preview in Chrome/Edge.
 */
(function () {
'use strict';

// ---- data/roles.js ----
const ROLES = Object.freeze([
  { key: 'employee', labelKey: 'role.employee', icon: '○' },
  { key: 'finance', labelKey: 'role.finance', icon: '◇' },
  { key: 'manager', labelKey: 'role.manager', icon: '□' },
  { key: 'admin', labelKey: 'role.admin', icon: '◆', capabilities: ['preview_roles', 'view_comparison', 'manage_resources', 'view_people', 'view_audit', 'view_runtime_warning'] }
]);
const ROLE_BY_KEY = Object.freeze(Object.fromEntries(ROLES.map(role => [role.key, role])));


// ---- data/profiles.js ----
const SYNTHETIC_PROFILES = Object.freeze({
  employee: Object.freeze({ displayName: 'Evren', larkUserName: 'Evren', department: 'Finance SSC', brand: 'Northstar Demo', title: 'Operations Specialist' }),
  finance: Object.freeze({ displayName: 'Evren', larkUserName: 'Evren', department: 'Finance SSC', brand: 'Northstar Demo', title: 'Finance Specialist' }),
  manager: Object.freeze({ displayName: 'Evren', larkUserName: 'Evren', department: 'Finance SSC', brand: 'Northstar Demo', title: 'SSC Manager' }),
  admin: Object.freeze({ displayName: 'Evren', larkUserName: 'Evren', department: 'SSC Platform', brand: 'Northstar Demo Group', title: 'Portal Administrator' })
});


// ---- data/people.js ----
const PEOPLE_DEPARTMENTS = Object.freeze([
  'Finance SSC',
  'Accounting',
  'Treasury',
  'FP&A',
  'Tax',
  'Internal Control',
  'SSC Platform',
  'Operations'
]);
const PEOPLE_BRANDS = Object.freeze(['Northstar Demo', 'Orion Demo', 'Atlas Demo', 'Nova Demo']);
const PEOPLE_TITLES = Object.freeze([
  'Operations Specialist',
  'Finance Specialist',
  'Senior Accountant',
  'Treasury Analyst',
  'FP&A Analyst',
  'Internal Control Specialist',
  'SSC Manager',
  'Portal Administrator'
]);
// Explicit module fixtures. `manager` remains the internal compatibility key for HOD.
// Department, title, and brand are deliberately not consulted when assigning modules.
const PEOPLE_MODULE_PATTERNS = Object.freeze([
  ['employee'],
  ['employee', 'finance'],
  ['employee', 'manager'],
  ['employee', 'finance', 'manager'],
  ['employee', 'admin'],
  ['employee', 'finance', 'admin'],
  ['employee', 'manager', 'admin'],
  ['employee', 'finance']
]);

const SYNTHETIC_PEOPLE_COUNT = 3200;

function createSyntheticPeople(count = SYNTHETIC_PEOPLE_COUNT) {
  const size = Math.max(0, Math.min(10000, Number(count) || 0));
  return Array.from({ length: size }, (_, index) => {
    const fixtureBand = Math.floor(index / PEOPLE_DEPARTMENTS.length);
    const moduleKeys = PEOPLE_MODULE_PATTERNS[fixtureBand % PEOPLE_MODULE_PATTERNS.length];
    const roleKey = moduleKeys.includes('admin') ? 'admin' : moduleKeys.includes('manager') ? 'manager' : moduleKeys.includes('finance') ? 'finance' : 'employee';
    const department = PEOPLE_DEPARTMENTS[index % PEOPLE_DEPARTMENTS.length];
    const brandShape = fixtureBand % 4;
    const brands = brandShape === 0 ? [] : brandShape === 1 ? [PEOPLE_BRANDS[fixtureBand % PEOPLE_BRANDS.length]] : brandShape === 2 ? [PEOPLE_BRANDS[fixtureBand % PEOPLE_BRANDS.length], PEOPLE_BRANDS[(fixtureBand + 1) % PEOPLE_BRANDS.length]] : [PEOPLE_BRANDS[fixtureBand % PEOPLE_BRANDS.length]];
    const title = PEOPLE_TITLES[index % PEOPLE_TITLES.length];
    return Object.freeze({
      principalKey: `synthetic-${String(index + 1).padStart(4, '0')}`,
      roleKey,
      moduleKeys: Object.freeze([...moduleKeys]),
      principal: Object.freeze({
        displayName: 'Evren',
        larkUserName: 'Evren',
        department,
        brand: brands.join(', '),
        brands: Object.freeze([...brands]),
        title,
        status: index % 17 === 0 ? 'inactive' : 'active'
      })
    });
  });
}


// ---- data/audit-events.js ----
const AUDIT_TYPES = Object.freeze([
  'auth.login',
  'resource.launch',
  'people.search',
  'people.view',
  'admin.resource.update',
  'admin.grant.update',
  'identity.joiner',
  'identity.mover',
  'identity.leaver'
]);
const AUDIT_TARGETS = Object.freeze(['Portal', 'Helios', 'NetSuite', 'Sharepoint', 'Datawind', 'FDP', 'People Overview', 'Resource Settings']);
const AUDIT_SOURCES = Object.freeze(['Lark Client', 'Browser', 'Flask Adapter', 'AnyCross / JML']);

function createSyntheticAuditEvents(count = 96) {
  const now = Date.now();
  return Array.from({ length: Math.max(0, Math.min(500, Number(count) || 0)) }, (_, index) => {
    const type = AUDIT_TYPES[index % AUDIT_TYPES.length];
    const target = AUDIT_TARGETS[index % AUDIT_TARGETS.length];
    const source = AUDIT_SOURCES[index % AUDIT_SOURCES.length];
    return Object.freeze({
      eventId: `evt-${String(index + 1).padStart(4, '0')}`,
      occurredAt: new Date(now - index * 7 * 60 * 1000).toISOString(),
      actor: 'Evren',
      type,
      target,
      source,
      result: index % 17 === 0 ? 'denied' : 'success'
    });
  });
}


// ---- data/resources.js ----
const RESOURCE_CATALOG = Object.freeze([
  Object.freeze({ key: 'helios', name: 'Helios', icon: 'H', categoryKey: 'resource.helios.category', descriptionKey: 'resource.helios.description', enabled: true }),
  Object.freeze({ key: 'netsuite', name: 'NetSuite', icon: 'N', categoryKey: 'resource.netsuite.category', descriptionKey: 'resource.netsuite.description', enabled: true }),
  Object.freeze({ key: 'sharepoint', name: 'Sharepoint', icon: 'S', categoryKey: 'resource.sharepoint.category', descriptionKey: 'resource.sharepoint.description', enabled: true }),
  Object.freeze({ key: 'datawind', name: 'Datawind', icon: 'D', categoryKey: 'resource.datawind.category', descriptionKey: 'resource.datawind.description', enabled: true }),
  Object.freeze({ key: 'fdp', name: 'FDP', icon: 'F', categoryKey: 'resource.fdp.category', descriptionKey: 'resource.fdp.description', enabled: true }),
  Object.freeze({ key: 'people-access', name: '人員權限管理', icon: 'A', categoryKey: 'resource.peopleAccess.category', descriptionKey: 'resource.peopleAccess.description', enabled: true }),
  Object.freeze({ key: 'hylearning', name: 'Hylearning', icon: 'L', categoryKey: 'resource.hylearning.category', descriptionKey: 'resource.hylearning.description', enabled: true }),
  Object.freeze({ key: 'ai-chatbot', name: 'AI ChatBot', icon: 'AI', categoryKey: 'resource.aiChatbot.category', descriptionKey: 'resource.aiChatbot.description', enabled: true })
]);


// ---- data/grants.js ----
// 資源授權資料：UI 不直接讀取這份表，而是透過 adapter 取得 read model。
const ROLE_RESOURCE_GRANTS = Object.freeze([
  ['employee', 'helios'], ['employee', 'sharepoint'], ['employee', 'hylearning'], ['employee', 'ai-chatbot'],
  ['finance', 'helios'], ['finance', 'netsuite'], ['finance', 'sharepoint'], ['finance', 'datawind'], ['finance', 'fdp'], ['finance', 'hylearning'], ['finance', 'ai-chatbot'],
  ['manager', 'helios'], ['manager', 'netsuite'], ['manager', 'sharepoint'], ['manager', 'datawind'], ['manager', 'fdp'], ['manager', 'hylearning'], ['manager', 'ai-chatbot'],
  // Admin keeps Employee baseline resources plus the Portal control-plane resource;
  // it is intentionally not a Business Resource Superuser.
  ['admin', 'helios'], ['admin', 'sharepoint'], ['admin', 'people-access'], ['admin', 'hylearning'], ['admin', 'ai-chatbot']
].map(([roleKey, resourceKey]) => Object.freeze({ roleKey, resourceKey, scope: 'portal:launch' })));


// ---- data/navigation.js ----
const SURFACES = Object.freeze({
  workspace: Object.freeze({ key: 'workspace', labelKey: 'surface.workspace' }),
  admin: Object.freeze({ key: 'admin', labelKey: 'surface.admin' })
});

const WORKSPACE_NAVIGATION = Object.freeze([
  Object.freeze({ key: 'home', page: 'home', labelKey: 'nav.home', icon: '⌂', surface: 'workspace' })
]);

const ADMIN_CONSOLE_NAVIGATION = Object.freeze([
  Object.freeze({ key: 'admin-overview', page: 'admin-overview', labelKey: 'nav.adminOverview', icon: '◫', surface: 'admin' }),
  Object.freeze({ key: 'resource-settings', page: 'resource-settings', labelKey: 'nav.resourceSettings', icon: '⚙', surface: 'admin' }),
  Object.freeze({ key: 'people-overview', page: 'people-overview', labelKey: 'nav.peopleOverview', icon: '◎', surface: 'admin' }),
  Object.freeze({ key: 'audit', page: 'audit', labelKey: 'nav.audit', icon: '≋', surface: 'admin' })
]);

// Compatibility export for existing consumers. Surface-specific UI uses the two lists above.
const NAVIGATION_BY_ROLE = Object.freeze({
  employee: WORKSPACE_NAVIGATION,
  finance: WORKSPACE_NAVIGATION,
  manager: WORKSPACE_NAVIGATION,
  admin: Object.freeze([...WORKSPACE_NAVIGATION, ...ADMIN_CONSOLE_NAVIGATION])
});


// ---- data/base-settings.js ----
const DEFAULT_BASE_SETTINGS = Object.freeze({
  baseAlias: 'FIN-SSC-IAM-DEMO',
  resourceTable: 'Resource Catalog',
  roleTable: 'Role Catalog',
  assignmentTable: 'Role Assignment',
  cacheTtlSeconds: 3600
});


// ---- adapters/portal-adapter.js ----
const STORAGE_KEYS = Object.freeze({ resources: 'fin-ssc-demo:resource-overrides:v1', customResources: 'fin-ssc-demo:custom-resources:v1', grants: 'fin-ssc-demo:grants:v1', base: 'fin-ssc-demo:base-settings:v1', principalPermissions: 'fin-ssc-demo:principal-permissions:v1' });
const validRoles = new Set(ROLES.map(r => r.key));
const MODULE_KEYS = Object.freeze(['employee', 'finance', 'manager', 'admin']);
const ACTION_KEYS = Object.freeze(['discover', 'launch']);
const ADMIN_PAGES = Object.freeze(['admin-overview', 'resource-settings', 'people-overview', 'audit']);
let peopleCache = null;
let auditCache = null;

// Workbench-only synthetic rules. They exercise the UX and are not a production evaluator contract.
// `manager` is retained as an internal compatibility key and is presented as HOD by i18n.
const SYNTHETIC_MODULE_ACTIONS = Object.freeze({
  employee: Object.freeze({ helios: ['discover'], sharepoint: ['discover', 'launch'], hylearning: ['discover', 'launch'], 'ai-chatbot': ['discover', 'launch'] }),
  finance: Object.freeze({ helios: ['discover', 'launch'], netsuite: ['discover', 'launch'], sharepoint: ['discover', 'launch'], datawind: ['discover'], fdp: ['discover', 'launch'], hylearning: ['discover', 'launch'], 'ai-chatbot': ['discover', 'launch'] }),
  manager: Object.freeze({ helios: ['discover', 'launch'], netsuite: ['discover'], sharepoint: ['discover', 'launch'], datawind: ['discover', 'launch'], fdp: ['discover'], hylearning: ['discover', 'launch'], 'ai-chatbot': ['discover', 'launch'] }),
  admin: Object.freeze({ 'people-access': ['discover', 'launch'] })
});

// UX-only synthetic runtime warning. This object is not a production health schema or adapter contract.
const SYNTHETIC_RUNTIME_WARNING = Object.freeze({
  authorizationStatus: 'degraded',
  cacheState: 'last-known-good',
  cacheAgeMinutes: 8,
  maxStaleMinutes: 15,
  lastReconciliationMinutesAgo: 2
});

// UX-only permission freshness states. These are query-driven presentation fixtures, not a session or authorization schema.
const SYNTHETIC_PERMISSION_NOTICE = Object.freeze({
  refresh: Object.freeze({ state: 'refresh' }),
  reauth: Object.freeze({ state: 'reauth' })
});

function read(key, fallback) {
  try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch { return fallback; }
}
function write(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function canManagePeople() { return (runtime().loginRole.capabilities || []).includes('view_people'); }
function canManageResources() { return (runtime().loginRole.capabilities || []).includes('manage_resources'); }
function principalRecord(principalKey) { return peopleRecords().find(x => x.principalKey === principalKey) || null; }
function permissionOverrides() { const value = read(STORAGE_KEYS.principalPermissions, {}); return value && typeof value === 'object' && !Array.isArray(value) ? value : {}; }
function normalizeModules(values) {
  const requested = new Set(Array.isArray(values) ? values.filter(x => MODULE_KEYS.includes(x)) : []);
  requested.add('employee');
  return MODULE_KEYS.filter(x => requested.has(x));
}
function normalizeIndividualGrant(value, index = 0) {
  const actions = ACTION_KEYS.filter(action => Array.isArray(value?.actions) && value.actions.includes(action));
  const validity = value?.validity === 'time-bound' ? 'time-bound' : 'permanent';
  return {
    id: String(value?.id || `individual-${Date.now()}-${index}`).replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 80),
    resourceKey: String(value?.resourceKey || ''), actions, validity,
    expiresAt: validity === 'time-bound' ? String(value?.expiresAt || '') : '',
    reason: String(value?.reason || '').trim().slice(0, 300)
  };
}
function storedPrincipalConfig(record) {
  const stored = permissionOverrides()[record.principalKey];
  if (!stored || typeof stored !== 'object') return { modules: normalizeModules(record.moduleKeys), individualGrants: [] };
  return { modules: normalizeModules(stored.modules), individualGrants: Array.isArray(stored.individualGrants) ? stored.individualGrants.map(normalizeIndividualGrant) : [] };
}
function isGrantActive(grant) { return grant.validity !== 'time-bound' || (Number.isFinite(Date.parse(grant.expiresAt)) && Date.parse(grant.expiresAt) > Date.now()); }
function sourceId(source) { return `${source.type}:${source.key}`; }
function deriveAuthorization(config) {
  const actionMap = new Map();
  const resourceKeys = new Set(catalogRecords().map(resource => resource.key));
  const add = (resourceKey, action, source) => {
    if (!resourceKeys.has(resourceKey) || !ACTION_KEYS.includes(action)) return;
    const key = `${resourceKey}:${action}`;
    if (!actionMap.has(key)) actionMap.set(key, { resourceKey, action, sources: [] });
    const item = actionMap.get(key);
    if (!item.sources.some(x => sourceId(x) === sourceId(source))) item.sources.push(source);
  };
  normalizeModules(config.modules).forEach(moduleKey => Object.entries(SYNTHETIC_MODULE_ACTIONS[moduleKey] || {}).forEach(([resourceKey, actions]) => actions.forEach(action => add(resourceKey, action, { type: 'module', key: moduleKey }))));
  (config.individualGrants || []).map(normalizeIndividualGrant).filter(isGrantActive).forEach(grant => grant.actions.forEach(action => add(grant.resourceKey, action, { type: 'individual', key: grant.id })));
  const catalog = catalogRecords();
  return catalog.filter(resource => resource.enabled).map(resource => {
    const actionEntries = ACTION_KEYS.map(action => actionMap.get(`${resource.key}:${action}`)).filter(Boolean);
    if (!actionEntries.length) return null;
    const sources = [];
    actionEntries.forEach(entry => entry.sources.forEach(source => { if (!sources.some(x => sourceId(x) === sourceId(source))) sources.push(source); }));
    return Object.freeze({ resourceKey: resource.key, resource, actions: actionEntries.map(x => x.action), sources: Object.freeze(sources), actionSources: Object.freeze(Object.fromEntries(actionEntries.map(x => [x.action, Object.freeze(x.sources)]))) });
  }).filter(Boolean);
}
function authorizationActionMap(rows) {
  const out = new Map();
  rows.forEach(row => row.actions.forEach(action => out.set(`${row.resourceKey}:${action}`, { resourceKey: row.resourceKey, action, resource: row.resource, sources: row.actionSources[action] || row.sources })));
  return out;
}
function impactBetween(before, after) {
  const a = authorizationActionMap(before), b = authorizationActionMap(after);
  const added = [], removed = [], sourceChanged = [], retained = [];
  new Set([...a.keys(), ...b.keys()]).forEach(key => {
    const oldItem = a.get(key), newItem = b.get(key);
    if (!oldItem) { added.push(newItem); return; }
    if (!newItem) { removed.push(oldItem); return; }
    const beforeSources = oldItem.sources.map(sourceId).sort();
    const afterSources = newItem.sources.map(sourceId).sort();
    if (JSON.stringify(beforeSources) !== JSON.stringify(afterSources)) sourceChanged.push({ ...newItem, beforeSources: oldItem.sources, afterSources: newItem.sources });
    else retained.push(newItem);
  });
  return Object.freeze({ added: Object.freeze(added), removed: Object.freeze(removed), sourceChanged: Object.freeze(sourceChanged), retained: Object.freeze(retained) });
}
function grantRecords() {
  const stored = read(STORAGE_KEYS.grants, null);
  if (!Array.isArray(stored)) return ROLE_RESOURCE_GRANTS.map(g => ({ ...g }));
  const resourceKeys = new Set(catalogRecords().map(resource => resource.key));
  return stored.filter(g => validRoles.has(g?.roleKey) && resourceKeys.has(g?.resourceKey)).map(g => ({ roleKey: g.roleKey, resourceKey: g.resourceKey, scope: 'portal:launch' }));
}
function catalogRecords() {
  const overrides = read(STORAGE_KEYS.resources, {});
  const custom = read(STORAGE_KEYS.customResources, []);
  const customRecords = Array.isArray(custom) ? custom.filter(resource => resource && typeof resource.key === 'string').map(resource => ({
    key: resource.key, name: String(resource.name || resource.key), icon: String(resource.icon || resource.name || resource.key).slice(0, 2).toUpperCase(),
    categoryKey: '', descriptionKey: '', enabled: resource.enabled !== false,
    syntheticCustom: true, customName: String(resource.name || resource.key), customCategory: String(resource.category || ''), customDescription: String(resource.description || '')
  })) : [];
  return [...RESOURCE_CATALOG, ...customRecords].map(resource => {
    const o = overrides?.[resource.key] || {};
    return Object.freeze({ ...resource, customName: typeof o.name === 'string' ? o.name : (resource.customName || ''), customCategory: typeof o.category === 'string' ? o.category : (resource.customCategory || ''), customDescription: typeof o.description === 'string' ? o.description : (resource.customDescription || ''), enabled: typeof o.enabled === 'boolean' ? o.enabled : resource.enabled !== false });
  });
}
function runtime() {
  const params = new URLSearchParams(location.search);
  const requestedRole = params.get('role');
  const loginRoleKey = ROLE_BY_KEY[requestedRole] ? requestedRole : 'admin';
  const loginRole = ROLE_BY_KEY[loginRoleKey];
  // UX-only surface state. Not a production authorization or routing contract.
  const requestedSurface = params.get('surface');
  const requestedPage = params.get('page') || 'home';
  const requestedPreview = params.get('viewAs');
  const previewActive = loginRoleKey === 'admin' && requestedPreview !== 'admin' && Boolean(ROLE_BY_KEY[requestedPreview]);
  const legacyAdminSurface = loginRoleKey === 'admin' && !requestedSurface && ADMIN_PAGES.includes(requestedPage);
  const surface = !previewActive && loginRoleKey === 'admin' && (requestedSurface === 'admin' || legacyAdminSurface) ? 'admin' : 'workspace';
  const effectiveRoleKey = previewActive ? requestedPreview : loginRoleKey;
  const page = surface === 'admin' && ADMIN_PAGES.includes(requestedPage) ? requestedPage : surface === 'admin' ? 'admin-overview' : 'home';
  const requestedPermissionState = params.get('permissionState');
  const permissionState = requestedPermissionState === 'refresh' || requestedPermissionState === 'reauth' ? requestedPermissionState : 'current';
  return { loginRoleKey, loginRole, effectiveRoleKey, effectiveRole: ROLE_BY_KEY[effectiveRoleKey], surface, page, permissionState };
}
function normalizeSearch(value) { return String(value || '').trim().toLocaleLowerCase(); }
function peopleRecords() {
  if (!peopleCache) peopleCache = createSyntheticPeople();
  return peopleCache;
}
function auditRecords() {
  if (!auditCache) auditCache = createSyntheticAuditEvents();
  return auditCache;
}
function clampPageSize(value) { return Math.max(10, Math.min(100, Number(value) || 50)); }

function getPortalContext() {
  const r = runtime();
  const catalog = catalogRecords();
  const grants = grantRecords();
  const granted = new Set(grants.filter(g => g.roleKey === r.effectiveRoleKey).map(g => g.resourceKey));
  const caps = r.loginRole.capabilities || [];
  return Object.freeze({
    principal: SYNTHETIC_PROFILES[r.loginRoleKey], loginRole: r.loginRole, effectiveRole: r.effectiveRole, surface: r.surface, page: r.page,
    navigation: r.surface === 'admin' ? ADMIN_CONSOLE_NAVIGATION : WORKSPACE_NAVIGATION,
    legacyNavigation: NAVIGATION_BY_ROLE[r.loginRoleKey], resources: catalog.filter(x => x.enabled && granted.has(x.key)), catalog, allRoles: ROLES,
    baseSettings: Object.freeze({ ...DEFAULT_BASE_SETTINGS, ...read(STORAGE_KEYS.base, {}) }),
    canSwitchSurface: r.loginRoleKey === 'admin' && r.effectiveRoleKey === 'admin', canPreviewRoles: caps.includes('preview_roles') && r.surface === 'workspace', canViewComparison: caps.includes('view_comparison') && r.surface === 'workspace' && r.effectiveRoleKey === 'admin', canManageResources: caps.includes('manage_resources'), canViewPeople: caps.includes('view_people'), canViewAudit: caps.includes('view_audit'),
    canViewRuntimeWarning: caps.includes('view_runtime_warning'), syntheticRuntimeWarning: caps.includes('view_runtime_warning') ? SYNTHETIC_RUNTIME_WARNING : null,
    permissionFreshnessState: r.permissionState, syntheticPermissionNotice: SYNTHETIC_PERMISSION_NOTICE[r.permissionState] || null,
    hasGrant: (roleKey, resourceKey) => grants.some(g => g.roleKey === roleKey && g.resourceKey === resourceKey)
  });
}

function queryPeople({ search = '', department = '', page = 1, pageSize = 50 } = {}) {
  const r = runtime();
  if (!(r.loginRole.capabilities || []).includes('view_people')) return Object.freeze({ items: [], total: 0, page: 1, pageSize: clampPageSize(pageSize), totalPages: 1, departments: [] });
  const q = normalizeSearch(search);
  const all = peopleRecords();
  const departments = [...new Set(all.map(x => x.principal.department))].sort((a, b) => a.localeCompare(b));
  const filtered = all.filter(x => {
    if (department && x.principal.department !== department) return false;
    if (!q) return true;
    const moduleTerms = x.moduleKeys.flatMap(key => [key, key === 'manager' ? 'hod head of department' : '', ROLE_BY_KEY[key]?.labelKey]);
    return [x.principal.larkUserName, x.principal.department, ...x.principal.brands, x.principal.title, x.principal.status, ...moduleTerms].some(v => normalizeSearch(v).includes(q));
  }).sort((a, b) => a.principal.department.localeCompare(b.principal.department) || a.principalKey.localeCompare(b.principalKey));
  const size = clampPageSize(pageSize);
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / size));
  const currentPage = Math.max(1, Math.min(totalPages, Number(page) || 1));
  const start = (currentPage - 1) * size;
  const items = filtered.slice(start, start + size).map(x => {
    const config = storedPrincipalConfig(x);
    return Object.freeze({ principalKey: x.principalKey, role: ROLE_BY_KEY[x.roleKey], moduleKeys: Object.freeze(config.modules), principal: x.principal });
  });
  return Object.freeze({ items, total, page: currentPage, pageSize: size, totalPages, departments });
}

function getPrincipalPermissionWorkbench(principalKey) {
  if (!canManagePeople()) return null;
  const record = principalRecord(String(principalKey || ''));
  if (!record) return null;
  const config = storedPrincipalConfig(record);
  const effectiveAuthorization = deriveAuthorization(config);
  const activeResources = catalogRecords().filter(resource => resource.enabled).map(resource => {
    const moduleSources = [];
    config.modules.forEach(moduleKey => { if ((SYNTHETIC_MODULE_ACTIONS[moduleKey]?.[resource.key] || []).length) moduleSources.push(moduleKey); });
    return Object.freeze({ ...resource, grantedViaModules: Object.freeze(moduleSources) });
  });
  return Object.freeze({
    principalKey: record.principalKey, principal: record.principal,
    modules: Object.freeze(config.modules), moduleOptions: MODULE_KEYS,
    individualGrants: Object.freeze(config.individualGrants.map(x => Object.freeze({ ...x }))),
    activeResources: Object.freeze(activeResources), effectiveAuthorization: Object.freeze(effectiveAuthorization),
    boundary: 'synthetic-dry-run-only'
  });
}

function validateIndividualGrantDraft(principalKey, proposed, draft) {
  if (!canManagePeople() || !principalRecord(String(principalKey || ''))) return Object.freeze({ ok: false, code: 'forbidden', sourceKeys: [] });
  const modules = normalizeModules(proposed?.modules);
  const grant = normalizeIndividualGrant(draft);
  const resource = catalogRecords().find(x => x.key === grant.resourceKey && x.enabled);
  if (!resource) return Object.freeze({ ok: false, code: 'resource-required', sourceKeys: [] });
  if (!grant.actions.length) return Object.freeze({ ok: false, code: 'action-required', sourceKeys: [] });
  if (!grant.reason) return Object.freeze({ ok: false, code: 'reason-required', sourceKeys: [] });
  if (grant.validity === 'time-bound' && (!Number.isFinite(Date.parse(grant.expiresAt)) || Date.parse(grant.expiresAt) <= Date.now())) return Object.freeze({ ok: false, code: 'expiry-required', sourceKeys: [] });
  const redundantActions = grant.actions.filter(action => modules.some(moduleKey => (SYNTHETIC_MODULE_ACTIONS[moduleKey]?.[grant.resourceKey] || []).includes(action)));
  const moduleSources = modules.filter(moduleKey => (SYNTHETIC_MODULE_ACTIONS[moduleKey]?.[grant.resourceKey] || []).some(action => redundantActions.includes(action)));
  if (redundantActions.length) return Object.freeze({ ok: false, code: 'redundant-module', redundantActions: Object.freeze(redundantActions), sourceKeys: Object.freeze(moduleSources) });
  const otherGrants = (proposed?.individualGrants || []).map(normalizeIndividualGrant).filter(x => x.id !== grant.id && x.resourceKey === grant.resourceKey && isGrantActive(x));
  const coveredByIndividual = grant.actions.every(action => otherGrants.some(x => x.actions.includes(action)));
  if (coveredByIndividual) return Object.freeze({ ok: false, code: 'redundant-individual', sourceKeys: Object.freeze(otherGrants.map(x => x.id)) });
  return Object.freeze({ ok: true, code: 'ok', sourceKeys: Object.freeze([]), grant: Object.freeze(grant) });
}

function previewPrincipalPermissionChanges(principalKey, proposed) {
  if (!canManagePeople()) return null;
  const record = principalRecord(String(principalKey || ''));
  if (!record) return null;
  const beforeConfig = storedPrincipalConfig(record);
  const afterConfig = { modules: normalizeModules(proposed?.modules), individualGrants: Array.isArray(proposed?.individualGrants) ? proposed.individualGrants.map(normalizeIndividualGrant) : [] };
  const before = deriveAuthorization(beforeConfig), after = deriveAuthorization(afterConfig);
  return Object.freeze({ before: Object.freeze(before), after: Object.freeze(after), impact: impactBetween(before, after) });
}

function getPrincipalResourceAccessMatrix(principalKey, proposed) {
  if (!canManagePeople()) return null;
  const record = principalRecord(String(principalKey || ''));
  if (!record) return null;
  const stored = storedPrincipalConfig(record);
  const config = proposed ? { modules: normalizeModules(proposed.modules), individualGrants: Array.isArray(proposed.individualGrants) ? proposed.individualGrants.map(normalizeIndividualGrant) : [] } : stored;
  const grants = config.individualGrants.filter(isGrantActive);
  return Object.freeze(catalogRecords().filter(resource => resource.enabled).map(resource => {
    const matchingGrants = grants.filter(item => item.resourceKey === resource.key);
    const grant = matchingGrants.length ? { ...matchingGrants[0], actions: ACTION_KEYS.filter(action => matchingGrants.some(item => item.actions.includes(action))) } : null;
    const actions = Object.fromEntries(ACTION_KEYS.map(action => {
      const moduleSources = config.modules.filter(moduleKey => (SYNTHETIC_MODULE_ACTIONS[moduleKey]?.[resource.key] || []).includes(action));
      const individual = Boolean(grant?.actions.includes(action));
      return [action, Object.freeze({ checked: moduleSources.length > 0 || individual, locked: moduleSources.length > 0, individual, redundant: moduleSources.length > 0 && individual, moduleSources: Object.freeze(moduleSources) })];
    }));
    return Object.freeze({ resource, actions: Object.freeze(actions), individualGrant: grant ? Object.freeze({ ...grant }) : null, granted: ACTION_KEYS.some(action => actions[action].checked) });
  }));
}

function savePrincipalPermissionChanges(principalKey, proposed) {
  if (!canManagePeople()) return Object.freeze({ ok: false, code: 'forbidden' });
  const record = principalRecord(String(principalKey || ''));
  if (!record) return Object.freeze({ ok: false, code: 'not-found' });
  const modules = normalizeModules(proposed?.modules);
  const individualGrants = Array.isArray(proposed?.individualGrants) ? proposed.individualGrants.map(normalizeIndividualGrant) : [];
  for (const grant of individualGrants) {
    const validation = validateIndividualGrantDraft(record.principalKey, { modules, individualGrants }, grant);
    if (!validation.ok) return Object.freeze({ ok: false, code: validation.code, validation });
  }
  const all = permissionOverrides();
  all[record.principalKey] = { modules, individualGrants };
  write(STORAGE_KEYS.principalPermissions, all);
  return Object.freeze({ ok: true, workbench: getPrincipalPermissionWorkbench(record.principalKey) });
}

function queryAudit({ search = '', eventType = '', page = 1, pageSize = 50 } = {}) {
  const r = runtime();
  if (!(r.loginRole.capabilities || []).includes('view_audit')) return Object.freeze({ items: [], total: 0, page: 1, pageSize: clampPageSize(pageSize), totalPages: 1, eventTypes: [] });
  const q = normalizeSearch(search);
  const all = auditRecords();
  const eventTypes = [...new Set(all.map(x => x.type))].sort();
  const filtered = all.filter(x => {
    if (eventType && x.type !== eventType) return false;
    if (!q) return true;
    return [x.actor, x.type, x.target, x.source, x.result, x.eventId].some(v => normalizeSearch(v).includes(q));
  });
  const size = clampPageSize(pageSize);
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / size));
  const currentPage = Math.max(1, Math.min(totalPages, Number(page) || 1));
  const start = (currentPage - 1) * size;
  return Object.freeze({ items: filtered.slice(start, start + size), total, page: currentPage, pageSize: size, totalPages, eventTypes });
}

function saveResourceSettings(rows) {
  const out = {};
  const resourceKeys = new Set(catalogRecords().map(resource => resource.key));
  rows.forEach(row => { if (resourceKeys.has(row?.key)) out[row.key] = { name: String(row.name || '').trim(), category: String(row.category || '').trim(), description: String(row.description || '').trim(), enabled: Boolean(row.enabled) }; });
  write(STORAGE_KEYS.resources, out);
}
function createSyntheticResource(input) {
  if (!canManageResources()) return Object.freeze({ ok: false, code: 'forbidden' });
  const key = String(input?.key || '').trim().toLowerCase();
  const name = String(input?.name || '').trim().slice(0, 120);
  const category = String(input?.category || '').trim().slice(0, 120);
  const description = String(input?.description || '').trim().slice(0, 500);
  if (!/^[a-z0-9][a-z0-9-]{1,63}$/.test(key)) return Object.freeze({ ok: false, code: 'invalid-key' });
  if (!name) return Object.freeze({ ok: false, code: 'name-required' });
  if (catalogRecords().some(resource => resource.key === key)) return Object.freeze({ ok: false, code: 'duplicate-key' });
  const stored = read(STORAGE_KEYS.customResources, []);
  const rows = Array.isArray(stored) ? stored : [];
  const resource = { key, name, category, description, enabled: input?.enabled !== false, icon: name.slice(0, 2).toUpperCase() };
  write(STORAGE_KEYS.customResources, [...rows, resource]);
  return Object.freeze({ ok: true, resource: Object.freeze({ ...resource }), grantsCreated: 0 });
}
function saveRoleGrants(rows) {
  const seen = new Set(); const out = [];
  const resourceKeys = new Set(catalogRecords().map(resource => resource.key));
  rows.forEach(row => { if (!validRoles.has(row?.roleKey) || !resourceKeys.has(row?.resourceKey)) return; const k = `${row.roleKey}:${row.resourceKey}`; if (seen.has(k)) return; seen.add(k); out.push({ roleKey: row.roleKey, resourceKey: row.resourceKey, scope: 'portal:launch' }); });
  write(STORAGE_KEYS.grants, out);
}
function saveBaseSettings(settings) {
  write(STORAGE_KEYS.base, {
    baseAlias: String(settings?.baseAlias || '').trim().slice(0,120), resourceTable: String(settings?.resourceTable || '').trim().slice(0,120), roleTable: String(settings?.roleTable || '').trim().slice(0,120), assignmentTable: String(settings?.assignmentTable || '').trim().slice(0,120), cacheTtlSeconds: Math.max(60, Math.min(86400, Number(settings?.cacheTtlSeconds) || DEFAULT_BASE_SETTINGS.cacheTtlSeconds))
  });
}
function resetPrototypeSettings() { Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key)); }


// ---- data/i18n.js ----
const ZH_TW = {
  'app.title':'Finance SSC Portal｜RBAC Prototype','nav.main':'功能選單','nav.home':'首頁','nav.resourceSettings':'資源設定','nav.peopleOverview':'人員總覽','nav.audit':'Audit',
  'sidebar.synthetic':'僅限 synthetic data','sidebar.collapse':'收合側欄','sidebar.expand':'展開側欄','sidebar.open':'開啟選單','sidebar.close':'關閉選單',
  'about.button':'關於系統','about.title':'About System','about.subtitle':'Finance SSC Portal Prototype','about.body':'此網站為 FIN-SSC IAM Portal 的互動式前端原型，用於驗證角色導覽、資源目錄、管理設定與響應式 H5 體驗。','about.boundary':'Prototype 不包含真實 Lark、Base、Production URL 或憑證。正式授權必須由 Flask server-side 執行。','common.close':'關閉',
  'identity.aria':'登入身分','identity.larkName':'Lark User Name','identity.department':'所屬部門','identity.brand':'所屬品牌','identity.title':'職稱',
  'role.employee':'Employee','role.finance':'Finance','role.manager':'HOD','role.admin':'Admin','role.previewEyebrow':'Administrator preview','role.previewHelper':'此切換器僅供管理員預覽角色資源視圖；登入身分仍為管理員。','role.previewAria':'角色預覽切換','role.endPreview':'結束預覽',
  'home.eyebrow':'SSC portal','home.welcome':'歡迎回來，{name}','home.welcomeText':'以下為你目前有效存取範圍內的系統資源。','home.previewText':'目前以管理員身分預覽「{role}」的有效資源視圖。',
  'metric.systems':'可用系統','metric.systemsDetail':'Effective grants','metric.identity':'登入身分','metric.identityDetail':'Synthetic profile','metric.mode':'資料模式','metric.modeValue':'Prototype','metric.modeDetail':'Client-side UI only','metric.authorization':'授權狀態','metric.authorizationValue':'已篩選','metric.authorizationDetail':'Resource catalog',
  'catalog.eyebrow':'Authorized catalog','catalog.title':'系統資源目錄','catalog.subtitle':'已依「{role}」的有效授權篩選。','catalog.count':'{count} 項資源','catalog.system':'資源系統','catalog.category':'分類','catalog.description':'說明','catalog.access':'有效存取','catalog.action':'操作','catalog.launch':'開啟資源','catalog.launchDemo':'{resource}：此原型不會連至任何真實系統。',
  'comparison.eyebrow':'Admin only','comparison.title':'角色／資源對照表','comparison.subtitle':'僅供管理員查看原型資料模型中的有效存取範圍。','comparison.adminOnly':'管理員限定','comparison.resource':'資源系統','comparison.yes':'可存取','comparison.no':'未授與',
  'prototype.title':'Prototype boundary','prototype.body':'本頁 JavaScript 僅示範 UI；正式環境必須由 Flask server-side 依 Portal Session → Principal → Effective Grants → Resource / Scope 執行 authorization。',
  'settings.eyebrow':'Admin authoring prototype','settings.title':'資源設定','settings.subtitle':'延續 Table 範本，作為未來 Base Authoring Plane 的前端設定雛形。','settings.tab.resources':'資源目錄','settings.tab.permissions':'角色權限','settings.tab.base':'Base 基本設定','settings.tab.future':'預留擴充',
  'settings.resources.title':'資源目錄設定','settings.resources.subtitle':'管理 Portal Resource Catalog 的基本顯示資料與啟用狀態。','settings.resource.key':'Resource Key','settings.resource.name':'顯示名稱','settings.resource.category':'分類','settings.resource.description':'說明','settings.resource.enabled':'啟用',
  'settings.permissions.title':'角色可見系統權限','settings.permissions.subtitle':'設定 Role × Resource 的可見／啟動授權；Prototype 儲存於本機瀏覽器。','settings.permissions.resource':'資源系統','settings.permissions.addRole':'+ 新增角色（預留）','settings.permissions.addRoleHint':'後續可加入 Scope、Brand、Department 或自訂角色。',
  'settings.base.title':'Base 基本設定','settings.base.subtitle':'僅保存 synthetic alias 與 table name；不得在 Prototype 放入 token、credential 或真實 Base ID。','settings.base.alias':'Base App Alias','settings.base.resourceTable':'Resource Table','settings.base.roleTable':'Role Table','settings.base.assignmentTable':'Assignment Table','settings.base.cacheTtl':'Cache TTL（秒）',
  'settings.future.title':'預留擴充空間','settings.future.subtitle':'這些欄位目前不啟用，用來保留後續 IAM 治理與 Base schema 的演進位置。','settings.future.scope':'Resource Scope','settings.future.org':'Brand / Department Scope','settings.future.owner':'Owner / Validity','settings.future.approval':'Maker-Checker / Approval','settings.future.scopeText':'可再細分 launch、view、admin 等 action/scope。','settings.future.orgText':'支援品牌與部門層級的資源範圍。','settings.future.ownerText':'加入資源 Owner、生效／失效時間與 retirement metadata。','settings.future.approvalText':'管理員修改可接審批、覆核與 Audit Trail。',
  'settings.save':'儲存 Prototype 設定','settings.saved':'設定已儲存至此瀏覽器的 localStorage。','settings.reset':'重設 Demo','settings.resetConfirm':'確定要清除本機 Prototype 設定並恢復預設值嗎？','settings.resetDone':'Prototype 設定已恢復預設值。',
  'people.eyebrow':'Admin only','people.title':'人員總覽','people.subtitle':'Synthetic identity 清單；點選任一人員可進入使用者權限管理工作台。介面採查詢、篩選與分頁，不一次渲染全部成員。','people.name':'Name','people.department':'所屬部門','people.brand':'品牌','people.titleCol':'職稱','people.role':'角色','people.modules':'權限模組','people.noBrands':'未設定品牌','people.status.active':'啟用','people.status.inactive':'停用','people.searchPlaceholder':'搜尋姓名、部門、品牌、職稱、狀態或權限模組…','people.allDepartments':'所有部門','people.allMembers':'全部成員','people.groupByDepartment':'依部門分組','people.results':'共 {count} 位成員','people.page':'第 {page} / {totalPages} 頁','people.prev':'上一頁','people.next':'下一頁','people.groupCount':'本頁 {count} 位','people.unknownDepartment':'未設定部門',
  'workbench.eyebrow':'Admin only · Principal detail','workbench.title':'使用者權限管理工作台','workbench.subtitle':'編輯來源設定、預覽有效權限與儲存前影響；所有結果均為 synthetic UX dry-run。','workbench.back':'返回人員總覽','workbench.identityTitle':'身分資訊','workbench.identityHelp':'Profile 顯示資料，不是授權規則。','workbench.brandMetadata':'僅為顯示 metadata，不參與授權計算。','workbench.modulesTitle':'權限模組','workbench.modulesHelp':'Employee 為 baseline；Finance、HOD、Admin 均為指定人員的 explicit assignment。','workbench.employeeHelp':'Baseline module，固定保留。','workbench.explicitHelp':'Explicit assignment，不由部門、職稱或品牌推導。','workbench.adminHelp':'Portal Control Plane privilege；不等於 Business Resource Superuser。','workbench.individualTitle':'個別授權','workbench.individualHelp':'從所有啟用資源新增 additive ALLOW exception；不支援 DENY 或 Scope。','workbench.resource':'資源','workbench.actions':'Actions','workbench.discover':'Discover','workbench.launch':'Launch','workbench.validity':'有效期間','workbench.permanent':'永久','workbench.timeBound':'限時','workbench.timeBoundUntil':'有效至 {date}','workbench.expires':'到期日','workbench.reason':'原因','workbench.reasonPlaceholder':'輸入此特殊授權的理由','workbench.selectResource':'選擇所有 Active Resources…','workbench.addGrant':'加入異動草稿','workbench.remove':'移除','workbench.noIndividual':'目前沒有個別授權。','workbench.alreadyVia':'已由 {sources} 提供','workbench.createResource':'建立新資源','workbench.createResourcePlaceholder':'建立新資源目前為 UX 入口；請至資源設定建立 global resource。','workbench.createResourceBoundary':'Resource 是 global entity，預設 No Grants；建立 Resource 與建立 Individual Grant 是兩個不同 mutation。','workbench.effectiveTitle':'有效權限預覽','workbench.effectiveHelp':'由目前草稿中的模組與個別授權衍生；唯讀且不可直接取消。','workbench.effectiveActions':'有效 Actions','workbench.effectiveSource':'Granted Via / Source','workbench.readOnly':'唯讀 Derived View','workbench.noEffective':'目前沒有有效授權。','workbench.sourceModule':'{name} Module','workbench.sourceIndividual':'Individual Grant','workbench.impactTitle':'授權異動影響預覽','workbench.impactHelp':'與最後儲存設定比較的 synthetic dry-run。','workbench.impactAdded':'ADDED · Will Gain','workbench.impactRemoved':'REMOVED · Will Lose','workbench.impactSourceChanged':'SOURCE_CHANGED · Will Retain','workbench.before':'Before','workbench.after':'After','workbench.none':'無','workbench.noChanges':'目前沒有待儲存的授權異動。','workbench.boundary':'Source Configuration 可編輯；Effective Authorization 為 derived / read-only。','workbench.cancel':'取消並返回','workbench.save':'儲存權限異動','workbench.saved':'使用者權限已儲存至此瀏覽器的 synthetic localStorage。','workbench.error.forbidden':'只有管理員可以操作此工作台。','workbench.error.not-found':'找不到此 synthetic principal。','workbench.error.resource-required':'請選擇一個 Active Resource。','workbench.error.action-required':'請至少選擇 Discover 或 Launch。','workbench.error.reason-required':'請填寫授權原因。','workbench.error.expiry-required':'限時授權必須設定未來的到期日。','workbench.error.redundant-module':'完全重複：已由 {sources} 提供，無法儲存。','workbench.error.redundant-individual':'相同 Action 已由另一筆個別授權提供。',
  'runtime.label':'Runtime 警示','runtime.eyebrow':'Admin only · Synthetic UX','runtime.title':'Runtime 狀態','runtime.authorizationStatus':'Authorization Status','runtime.authorizationStatus.degraded':'Degraded','runtime.cacheState':'Cache State','runtime.cacheState.last-known-good':'Last-known-good','runtime.cacheAge':'Cache Age','runtime.maxStale':'Max Stale','runtime.lastReconciliation':'Last Reconciliation','runtime.minutes':'{count} min','runtime.minutesAgo':'{count} min ago','runtime.boundary':'僅供 Synthetic UX 展示；未連線任何正式 health source，亦未建立 Redis／Base／PostgreSQL health schema。','permission.refresh.title':'權限資料已有更新','permission.refresh.body':'你的有效存取範圍可能已變更；可重新整理 Synthetic 授權視圖以取得最新展示狀態。','permission.refresh.action':'更新權限','permission.reauth.title':'需要重新登入','permission.reauth.body':'目前 Session 被標記為需要重新驗證；請重新登入以取得最新的 Synthetic 權限狀態。','permission.reauth.action':'重新登入','permission.boundary':'Synthetic UX only；此提示不代表正式 Session／Authorization freshness contract。',
  'audit.eyebrow':'Admin only','audit.title':'Audit','audit.subtitle':'集中檢視登入、資源點擊、管理操作與人員生命週期事件的稽核入口。','audit.boundary':'Prototype 目前只顯示 synthetic event。正式版 Audit 必須由 Flask／後端連線與 JML 流程以不可由瀏覽器竄改的方式寫入持久化 Audit Store。','audit.searchPlaceholder':'搜尋使用者、事件、目標或來源…','audit.allTypes':'所有事件類型','audit.results':'共 {count} 筆事件','audit.page':'第 {page} / {totalPages} 頁','audit.prev':'上一頁','audit.next':'下一頁','audit.time':'時間','audit.actor':'使用者','audit.event':'事件','audit.target':'目標','audit.source':'來源','audit.result':'結果','audit.result.success':'成功','audit.result.denied':'拒絕',
  'resource.helios.category':'差旅','resource.helios.description':'報銷／差旅平台。','resource.netsuite.category':'ERP／財務','resource.netsuite.description':'Synthetic finance ERP 工作區。','resource.sharepoint.category':'文件協作','resource.sharepoint.description':'Synthetic SSC 文件與知識庫。','resource.datawind.category':'BI 分析','resource.datawind.description':'Synthetic 財務及營運分析儀表板。','resource.fdp.category':'財務資料','resource.fdp.description':'Synthetic 財務資料與報表服務。','resource.peopleAccess.category':'IAM 管理','resource.peopleAccess.description':'Synthetic 人員與權限管理工作區。','resource.hylearning.category':'學習發展','resource.hylearning.description':'Synthetic 學習資源與課程入口。','resource.aiChatbot.category':'AI 助理','resource.aiChatbot.description':'Synthetic SSC 知識問答體驗。'
};
const ZH_CN = {...ZH_TW,
  'nav.main':'功能菜单','nav.home':'首页','nav.resourceSettings':'资源设置','nav.peopleOverview':'人员总览','nav.audit':'Audit','sidebar.synthetic':'仅限 synthetic data','sidebar.collapse':'收起侧栏','sidebar.expand':'展开侧栏','sidebar.open':'打开菜单','sidebar.close':'关闭菜单','about.button':'关于系统','about.body':'此网站为 FIN-SSC IAM Portal 的交互式前端原型，用于验证角色导航、资源目录、管理设置与响应式 H5 体验。','about.boundary':'Prototype 不包含真实 Lark、Base、Production URL 或凭证。正式授权必须由 Flask server-side 执行。','common.close':'关闭','identity.aria':'登录身份','identity.department':'所属部门','identity.brand':'所属品牌','identity.title':'职称','role.employee':'普通员工','role.finance':'财务员工','role.admin':'管理员','role.previewHelper':'此切换器仅供管理员预览角色资源视图；登录身份仍为管理员。','role.endPreview':'结束预览','home.welcome':'欢迎回来，{name}','home.welcomeText':'以下为你目前有效访问范围内的系统资源。','home.previewText':'目前以管理员身份预览“{role}”的有效资源视图。','metric.systems':'可用系统','metric.identity':'登录身份','metric.mode':'数据模式','metric.authorization':'授权状态','metric.authorizationValue':'已筛选','catalog.title':'系统资源目录','catalog.subtitle':'已按“{role}”的有效授权筛选。','catalog.count':'{count} 项资源','catalog.system':'资源系统','catalog.description':'说明','catalog.access':'有效访问','catalog.action':'操作','catalog.launch':'打开资源','comparison.title':'角色／资源对照表','comparison.subtitle':'仅供管理员查看原型数据模型中的有效访问范围。','comparison.adminOnly':'管理员限定','comparison.resource':'资源系统','comparison.yes':'可访问','comparison.no':'未授予','settings.title':'资源设置','settings.subtitle':'延续 Table 模板，作为未来 Base Authoring Plane 的前端设置雏形。','settings.tab.resources':'资源目录','settings.tab.permissions':'角色权限','settings.tab.base':'Base 基本设置','settings.tab.future':'预留扩展','settings.resources.title':'资源目录设置','settings.resources.subtitle':'管理 Portal Resource Catalog 的基本显示数据与启用状态。','settings.resource.name':'显示名称','settings.resource.description':'说明','settings.resource.enabled':'启用','settings.permissions.title':'角色可见系统权限','settings.permissions.subtitle':'设置 Role × Resource 的可见／启动授权；Prototype 存储于本机浏览器。','settings.permissions.resource':'资源系统','settings.permissions.addRole':'+ 新增角色（预留）','settings.base.title':'Base 基本设置','settings.base.subtitle':'仅保存 synthetic alias 与 table name；不得在 Prototype 放入 token、credential 或真实 Base ID。','settings.future.title':'预留扩展空间','settings.future.subtitle':'这些字段目前不启用，用来保留后续 IAM 治理与 Base schema 的演进位置。','settings.save':'保存 Prototype 设置','settings.saved':'设置已保存至此浏览器的 localStorage。','settings.reset':'重置 Demo','settings.resetConfirm':'确定要清除本机 Prototype 设置并恢复默认值吗？','settings.resetDone':'Prototype 设置已恢复默认值。','people.title':'人员总览','people.subtitle':'Synthetic identity 清单，用于验证未来 Principal / Role / Organization 的管理视图；界面采用查询、筛选与分页，不一次渲染全部成员。','people.department':'所属部门','people.brand':'所属品牌','people.titleCol':'职称','people.role':'角色','people.searchPlaceholder':'搜索姓名、部门、品牌、职称或角色…','people.allDepartments':'所有部门','people.allMembers':'全部成员','people.groupByDepartment':'按部门分组','people.results':'共 {count} 位成员','people.page':'第 {page} / {totalPages} 页','people.prev':'上一页','people.next':'下一页','people.groupCount':'本页 {count} 位','people.unknownDepartment':'未设置部门','audit.title':'Audit','audit.subtitle':'集中查看登录、资源点击、管理操作与人员生命周期事件的审计入口。','audit.boundary':'Prototype 目前只显示 synthetic event。正式版 Audit 必须由 Flask／后端连接与 JML 流程以不可由浏览器篡改的方式写入持久化 Audit Store。','audit.searchPlaceholder':'搜索用户、事件、目标或来源…','audit.allTypes':'所有事件类型','audit.results':'共 {count} 条事件','audit.page':'第 {page} / {totalPages} 页','audit.prev':'上一页','audit.next':'下一页','audit.time':'时间','audit.actor':'用户','audit.event':'事件','audit.target':'目标','audit.source':'来源','audit.result':'结果','audit.result.success':'成功','audit.result.denied':'拒绝','runtime.label':'Runtime 警示','runtime.title':'Runtime 状态','runtime.boundary':'仅供 Synthetic UX 展示；未连接任何正式 health source，也未建立 Redis／Base／PostgreSQL health schema。','permission.refresh.title':'权限数据已有更新','permission.refresh.body':'你的有效访问范围可能已变更；可刷新 Synthetic 授权视图以取得最新展示状态。','permission.refresh.action':'更新权限','permission.reauth.title':'需要重新登录','permission.reauth.body':'当前 Session 被标记为需要重新验证；请重新登录以取得最新的 Synthetic 权限状态。','permission.reauth.action':'重新登录','permission.boundary':'Synthetic UX only；此提示不代表正式 Session／Authorization freshness contract。','resource.helios.description':'报销／差旅平台。','resource.netsuite.category':'ERP／财务','resource.sharepoint.category':'文档协作','resource.datawind.description':'Synthetic 财务及运营分析仪表板。','resource.fdp.category':'财务数据','resource.peopleAccess.description':'Synthetic 人员与权限管理工作区。','resource.hylearning.category':'学习发展','resource.aiChatbot.category':'AI 助手'
};
const EN = {...ZH_TW,
  'app.title':'Finance SSC Portal | RBAC Prototype','nav.main':'Navigation','nav.home':'Home','nav.resourceSettings':'Resource Settings','nav.peopleOverview':'People Overview','nav.audit':'Audit','sidebar.synthetic':'Synthetic data only','sidebar.collapse':'Collapse sidebar','sidebar.expand':'Expand sidebar','sidebar.open':'Open menu','sidebar.close':'Close menu','about.button':'About system','about.body':'This is an interactive FIN-SSC IAM Portal frontend prototype for validating role navigation, resource catalog, administration settings, and responsive H5 behavior.','about.boundary':'The prototype contains no real Lark data, Base identifiers, production URLs, or credentials. Production authorization must be enforced server-side by Flask.','common.close':'Close','identity.aria':'Signed-in identity','identity.department':'Department','identity.brand':'Brand','identity.title':'Job Title','role.employee':'Employee','role.finance':'Finance','role.manager':'Manager','role.admin':'Administrator','role.previewHelper':'This switcher lets administrators preview role-specific resources while the signed-in identity remains Administrator.','role.previewAria':'Role preview switcher','role.endPreview':'End preview','home.welcome':'Welcome back, {name}','home.welcomeText':'Below are the resources available within your current effective access.','home.previewText':'Administrator preview of the effective “{role}” resource view.','metric.systems':'Available systems','metric.identity':'Signed-in role','metric.mode':'Data mode','metric.authorization':'Authorization','metric.authorizationValue':'Filtered','catalog.title':'System Resource Catalog','catalog.subtitle':'Filtered by the effective “{role}” grants.','catalog.count':'{count} resources','catalog.system':'Resource','catalog.category':'Category','catalog.description':'Description','catalog.access':'Effective access','catalog.action':'Action','catalog.launch':'Open resource','catalog.launchDemo':'{resource}: this prototype never opens a real system.','comparison.title':'Role / Resource Matrix','comparison.subtitle':'Visible only to administrators for reviewing the prototype effective access model.','comparison.adminOnly':'Admin only','comparison.resource':'Resource','comparison.yes':'Granted','comparison.no':'Not granted','prototype.body':'JavaScript only demonstrates UI behavior. Production must enforce authorization server-side in Flask using Portal Session → Principal → Effective Grants → Resource / Scope.','settings.title':'Resource Settings','settings.subtitle':'An extension of the Table template and a frontend prototype for the future Base Authoring Plane.','settings.tab.resources':'Resource Catalog','settings.tab.permissions':'Role Permissions','settings.tab.base':'Base Settings','settings.tab.future':'Future Extension','settings.resources.title':'Resource Catalog Settings','settings.resources.subtitle':'Manage the basic display metadata and enabled state of Portal resources.','settings.resource.name':'Display Name','settings.resource.category':'Category','settings.resource.description':'Description','settings.resource.enabled':'Enabled','settings.permissions.title':'Role-visible System Permissions','settings.permissions.subtitle':'Configure the Role × Resource visibility / launch matrix. Prototype changes are stored in the browser only.','settings.permissions.resource':'Resource','settings.permissions.addRole':'+ Add Role (reserved)','settings.permissions.addRoleHint':'Future extensions may add Scope, Brand, Department, or custom roles.','settings.base.title':'Base Settings','settings.base.subtitle':'Store synthetic aliases and table names only. Do not place tokens, credentials, or real Base IDs in this prototype.','settings.base.cacheTtl':'Cache TTL (seconds)','settings.future.title':'Reserved Extension Space','settings.future.subtitle':'These options are intentionally inactive and reserve room for future IAM governance and Base schema evolution.','settings.future.scopeText':'Potentially separate launch, view, and admin actions/scopes.','settings.future.orgText':'Support brand- and department-scoped resources.','settings.future.ownerText':'Add resource owner, validity windows, and retirement metadata.','settings.future.approvalText':'Administrator changes may later require approval, review, and audit trails.','settings.save':'Save Prototype Settings','settings.saved':'Settings were saved to this browser localStorage.','settings.reset':'Reset Demo','settings.resetConfirm':'Clear local prototype settings and restore defaults?','settings.resetDone':'Prototype settings restored to defaults.','people.title':'People Overview','people.subtitle':'Synthetic identities for the future Principal / Role / Organization view. Search, filters, and pagination keep DOM rendering bounded for large directories.','people.department':'Department','people.brand':'Brand','people.titleCol':'Job Title','people.role':'Role','people.searchPlaceholder':'Search name, department, brand, title, or role…','people.allDepartments':'All departments','people.allMembers':'All members','people.groupByDepartment':'Group by department','people.results':'{count} members','people.page':'Page {page} of {totalPages}','people.prev':'Previous','people.next':'Next','people.groupCount':'{count} on this page','people.unknownDepartment':'No department','audit.title':'Audit','audit.subtitle':'A centralized view for sign-ins, resource launches, administrative changes, and identity lifecycle events.','audit.boundary':'The prototype shows synthetic events only. Production Audit must be written server-side by Flask, connected services, and JML workflows into a durable store that browser clients cannot tamper with.','audit.searchPlaceholder':'Search actor, event, target, or source…','audit.allTypes':'All event types','audit.results':'{count} events','audit.page':'Page {page} of {totalPages}','audit.prev':'Previous','audit.next':'Next','audit.time':'Time','audit.actor':'Actor','audit.event':'Event','audit.target':'Target','audit.source':'Source','audit.result':'Result','audit.result.success':'Success','audit.result.denied':'Denied','runtime.label':'Runtime Warning','runtime.eyebrow':'Admin only · Synthetic UX','runtime.title':'Runtime status','runtime.boundary':'Synthetic UX only. No live health source is connected, and no Redis/Base/PostgreSQL health schema is defined.','permission.refresh.title':'Permission data has changed','permission.refresh.body':'Your effective access may have changed. Refresh the synthetic authorization view to display the latest state.','permission.refresh.action':'Refresh access','permission.reauth.title':'Sign-in required','permission.reauth.body':'This session is marked as requiring re-authentication. Sign in again to display the latest synthetic access state.','permission.reauth.action':'Sign in again','permission.boundary':'Synthetic UX only. This notice does not define a production session or authorization freshness contract.','resource.helios.category':'Travel','resource.helios.description':'Expense reimbursement / travel platform.','resource.netsuite.category':'ERP / Finance','resource.netsuite.description':'Synthetic finance ERP workspace.','resource.sharepoint.category':'Collaboration','resource.sharepoint.description':'Synthetic SSC document and knowledge workspace.','resource.datawind.category':'BI Analytics','resource.datawind.description':'Synthetic finance and operations analytics dashboards.','resource.fdp.category':'Finance Data','resource.fdp.description':'Synthetic finance data and reporting services.','resource.peopleAccess.category':'IAM Administration','resource.peopleAccess.description':'Synthetic people and access administration workspace.','resource.hylearning.category':'Learning','resource.hylearning.description':'Synthetic learning resources and course portal.','resource.aiChatbot.category':'AI Assistant','resource.aiChatbot.description':'Synthetic SSC knowledge Q&A experience.'
};
Object.assign(ZH_CN, {
  'role.employee':'Employee','role.finance':'Finance','role.manager':'HOD','role.admin':'Admin','role.previewAria':'角色预览切换',
  'people.subtitle':'Synthetic identity 列表；点击任一人员可进入用户权限管理工作台。界面采用查询、筛选与分页，不一次渲染全部成员。','people.name':'Name','people.brand':'品牌','people.modules':'权限模块','people.noBrands':'未设置品牌','people.status.active':'启用','people.status.inactive':'停用','people.searchPlaceholder':'搜索姓名、部门、品牌、职称、状态或权限模块…',
  'workbench.eyebrow':'Admin only · Principal detail','workbench.title':'用户权限管理工作台','workbench.subtitle':'编辑来源设置、预览有效权限与保存前影响；所有结果均为 synthetic UX dry-run。','workbench.back':'返回人员总览','workbench.identityTitle':'身份信息','workbench.identityHelp':'Profile 显示数据，不是授权规则。','workbench.brandMetadata':'仅为显示 metadata，不参与授权计算。','workbench.modulesTitle':'权限模块','workbench.modulesHelp':'Employee 是 baseline；Finance、HOD、Admin 均为指定人员的 explicit assignment。','workbench.employeeHelp':'Baseline module，固定保留。','workbench.explicitHelp':'Explicit assignment，不由部门、职称或品牌推导。','workbench.adminHelp':'Portal Control Plane privilege；不等于 Business Resource Superuser。','workbench.individualTitle':'个别授权','workbench.individualHelp':'从所有启用资源新增 additive ALLOW exception；不支持 DENY 或 Scope。','workbench.resource':'资源','workbench.actions':'Actions','workbench.discover':'Discover','workbench.launch':'Launch','workbench.validity':'有效期','workbench.permanent':'永久','workbench.timeBound':'限时','workbench.timeBoundUntil':'有效至 {date}','workbench.expires':'到期日','workbench.reason':'原因','workbench.reasonPlaceholder':'输入此特殊授权的原因','workbench.selectResource':'选择所有 Active Resources…','workbench.addGrant':'加入变更草稿','workbench.remove':'移除','workbench.noIndividual':'目前没有个别授权。','workbench.alreadyVia':'已由 {sources} 提供','workbench.createResource':'创建新资源','workbench.createResourcePlaceholder':'创建新资源目前为 UX 入口；请前往资源设置创建 global resource。','workbench.createResourceBoundary':'Resource 是 global entity，默认 No Grants；创建 Resource 与创建 Individual Grant 是两个不同 mutation。','workbench.effectiveTitle':'有效权限预览','workbench.effectiveHelp':'由当前草稿中的模块与个别授权衍生；只读且不可直接取消。','workbench.effectiveActions':'有效 Actions','workbench.effectiveSource':'Granted Via / Source','workbench.readOnly':'只读 Derived View','workbench.noEffective':'目前没有有效授权。','workbench.sourceModule':'{name} Module','workbench.sourceIndividual':'Individual Grant','workbench.impactTitle':'授权变更影响预览','workbench.impactHelp':'与最后保存设置比较的 synthetic dry-run。','workbench.impactAdded':'ADDED · Will Gain','workbench.impactRemoved':'REMOVED · Will Lose','workbench.impactSourceChanged':'SOURCE_CHANGED · Will Retain','workbench.before':'Before','workbench.after':'After','workbench.none':'无','workbench.noChanges':'目前没有待保存的授权变更。','workbench.boundary':'Source Configuration 可编辑；Effective Authorization 为 derived / read-only。','workbench.cancel':'取消并返回','workbench.save':'保存权限变更','workbench.saved':'用户权限已保存到此浏览器的 synthetic localStorage。','workbench.error.forbidden':'只有管理员可以操作此工作台。','workbench.error.not-found':'找不到此 synthetic principal。','workbench.error.resource-required':'请选择一个 Active Resource。','workbench.error.action-required':'请至少选择 Discover 或 Launch。','workbench.error.reason-required':'请填写授权原因。','workbench.error.expiry-required':'限时授权必须设置未来的到期日。','workbench.error.redundant-module':'完全重复：已由 {sources} 提供，无法保存。','workbench.error.redundant-individual':'相同 Action 已由另一笔个别授权提供。'
});
Object.assign(EN, {
  'role.employee':'Employee','role.finance':'Finance','role.manager':'HOD','role.admin':'Admin',
  'people.subtitle':'Synthetic identities. Select any person to open the Principal Permission Workbench; query and pagination keep rendering bounded.','people.name':'Name','people.brand':'Brand(s)','people.modules':'Permission Modules','people.noBrands':'No brands','people.status.active':'Active','people.status.inactive':'Inactive','people.searchPlaceholder':'Search name, department, brands, title, status, or module…',
  'workbench.eyebrow':'Admin only · Principal detail','workbench.title':'Principal Permission Workbench','workbench.subtitle':'Edit source configuration, preview effective authorization, and inspect impact before saving. All results are synthetic UX dry-runs.','workbench.back':'Back to People Overview','workbench.identityTitle':'Identity / Profile','workbench.identityHelp':'Profile display data, not authorization rules.','workbench.brandMetadata':'Display metadata only; brands do not affect authorization.','workbench.modulesTitle':'Permission Modules','workbench.modulesHelp':'Employee is baseline. Finance, HOD, and Admin are explicit assignments to this principal.','workbench.employeeHelp':'Baseline module; always retained.','workbench.explicitHelp':'Explicit assignment; never inferred from department, title, or brands.','workbench.adminHelp':'Portal Control Plane privilege; not a Business Resource Superuser.','workbench.individualTitle':'Individual Grants','workbench.individualHelp':'Add additive ALLOW exceptions from all active resources. DENY and scopes are not supported.','workbench.resource':'Resource','workbench.actions':'Actions','workbench.discover':'Discover','workbench.launch':'Launch','workbench.validity':'Validity','workbench.permanent':'Permanent','workbench.timeBound':'Time-bound','workbench.timeBoundUntil':'Valid until {date}','workbench.expires':'Expires','workbench.reason':'Reason','workbench.reasonPlaceholder':'Explain why this exception is needed','workbench.selectResource':'Select from all active resources…','workbench.addGrant':'Add to change draft','workbench.remove':'Remove','workbench.noIndividual':'No individual grants.','workbench.alreadyVia':'Already granted via {sources}','workbench.createResource':'Create New Resource','workbench.createResourcePlaceholder':'Create New Resource is a UX entry for now. Create the global resource in Resource Settings.','workbench.createResourceBoundary':'A Resource is global and defaults to No Grants. Creating a Resource and an Individual Grant are separate mutations.','workbench.effectiveTitle':'Effective Authorization Preview','workbench.effectiveHelp':'Derived from the draft modules and individual grants. This view is read-only and cannot create hidden DENY semantics.','workbench.effectiveActions':'Effective Actions','workbench.effectiveSource':'Granted Via / Source','workbench.readOnly':'Read-only Derived View','workbench.noEffective':'No effective authorization.','workbench.sourceModule':'{name} Module','workbench.sourceIndividual':'Individual Grant','workbench.impactTitle':'Authorization Change Impact Preview','workbench.impactHelp':'Synthetic dry-run compared with the last saved source configuration.','workbench.impactAdded':'ADDED · Will Gain','workbench.impactRemoved':'REMOVED · Will Lose','workbench.impactSourceChanged':'SOURCE_CHANGED · Will Retain','workbench.before':'Before','workbench.after':'After','workbench.none':'None','workbench.noChanges':'No unsaved authorization changes.','workbench.boundary':'Source Configuration is editable; Effective Authorization is derived and read-only.','workbench.cancel':'Cancel and Back','workbench.save':'Save Permission Changes','workbench.saved':'Principal permissions were saved to synthetic browser localStorage.','workbench.error.forbidden':'Only administrators can use this workbench.','workbench.error.not-found':'Synthetic principal not found.','workbench.error.resource-required':'Select an active resource.','workbench.error.action-required':'Select Discover or Launch.','workbench.error.reason-required':'Enter a reason for this grant.','workbench.error.expiry-required':'A time-bound grant needs a future expiry date.','workbench.error.redundant-module':'Fully redundant: already granted via {sources}; this cannot be saved.','workbench.error.redundant-individual':'The same action is already provided by another individual grant.'
});
Object.assign(ZH_TW, {
  'workbench.matrixTitle':'資源存取矩陣','workbench.matrixHelp':'顯示所有 Active Resources。模組提供的 Action 固定鎖定；可編輯勾選只建立或移除 Individual ALLOW。','workbench.searchResource':'搜尋資源名稱、Key 或分類…','workbench.allCategories':'所有分類','workbench.allResources':'所有資源','workbench.granted':'已授權','workbench.notGranted':'未授權','workbench.matrixEmpty':'沒有符合篩選條件的資源。','workbench.lockedHelp':'此 Action 由 {sources} Module 提供；請調整 Permission Module 才能移除。','workbench.editableAllowHelp':'勾選會建立 Individual ALLOW；未勾選不代表 DENY。','workbench.removeRedundant':'移除重複個別授權','workbench.redundantTitle':'個別授權已與 Module 重複','workbench.redundantBody':'{actions} 已由 Module 提供。系統不會自動刪除，請明確移除後再儲存。','workbench.noDenyBoundary':'未勾選只表示沒有 Individual ALLOW，不代表 explicit DENY。Module 提供的 Action 只能從 Permission Modules 調整。',
  'settings.create.button':'新增資源','settings.create.title':'新增 Synthetic Global Resource','settings.create.subtitle':'建立可供所有 Principal Workbench 使用的全域 Prototype Resource。','settings.create.save':'建立資源','settings.create.return':'返回 Evren 權限工作台','settings.create.boundary':'新 Resource 預設 No Grants。建立 Resource 不會同時建立 Individual Grant。','settings.create.error.forbidden':'只有管理員可以建立資源。','settings.create.error.invalid-key':'Resource Key 必須為 2–64 位小寫英數與連字號。','settings.create.error.name-required':'請輸入 Display Name。','settings.create.error.duplicate-key':'此 Resource Key 已存在。'
});
Object.assign(ZH_CN, {
  'workbench.matrixTitle':'资源访问矩阵','workbench.matrixHelp':'显示所有 Active Resources。模块提供的 Action 固定锁定；可编辑勾选只创建或移除 Individual ALLOW。','workbench.searchResource':'搜索资源名称、Key 或分类…','workbench.allCategories':'所有分类','workbench.allResources':'所有资源','workbench.granted':'已授权','workbench.notGranted':'未授权','workbench.matrixEmpty':'没有符合筛选条件的资源。','workbench.lockedHelp':'此 Action 由 {sources} Module 提供；请调整 Permission Module 才能移除。','workbench.editableAllowHelp':'勾选会创建 Individual ALLOW；未勾选不代表 DENY。','workbench.removeRedundant':'移除重复个别授权','workbench.redundantTitle':'个别授权已与 Module 重复','workbench.redundantBody':'{actions} 已由 Module 提供。系统不会自动删除，请明确移除后再保存。','workbench.noDenyBoundary':'未勾选只表示没有 Individual ALLOW，不代表 explicit DENY。Module 提供的 Action 只能从 Permission Modules 调整。',
  'settings.create.button':'新增资源','settings.create.title':'新增 Synthetic Global Resource','settings.create.subtitle':'创建可供所有 Principal Workbench 使用的全局 Prototype Resource。','settings.create.save':'创建资源','settings.create.return':'返回 Evren 权限工作台','settings.create.boundary':'新 Resource 默认 No Grants。创建 Resource 不会同时创建 Individual Grant。','settings.create.error.forbidden':'只有管理员可以创建资源。','settings.create.error.invalid-key':'Resource Key 必须为 2–64 位小写字母、数字与连字符。','settings.create.error.name-required':'请输入 Display Name。','settings.create.error.duplicate-key':'此 Resource Key 已存在。'
});
Object.assign(EN, {
  'workbench.matrixTitle':'Resource Access Matrix','workbench.matrixHelp':'Shows every active resource. Module actions are checked and locked; editable checks only add or remove an Individual ALLOW.','workbench.searchResource':'Search resource name, key, or category…','workbench.allCategories':'All categories','workbench.allResources':'All Resources','workbench.granted':'Granted','workbench.notGranted':'Not Granted','workbench.matrixEmpty':'No resources match these filters.','workbench.lockedHelp':'This action is granted by {sources} Module. Adjust the Permission Module to remove it.','workbench.editableAllowHelp':'Checking adds an Individual ALLOW. Unchecked never means DENY.','workbench.removeRedundant':'Remove redundant individual action','workbench.redundantTitle':'Individual action is redundant with a Module','workbench.redundantBody':'{actions} is already module-provided. It was not silently deleted; remove it explicitly before saving.','workbench.noDenyBoundary':'Unchecked means no Individual ALLOW; it never means explicit DENY. Module-provided actions can only be changed through Permission Modules.',
  'settings.create.button':'Add Resource','settings.create.title':'Add Synthetic Global Resource','settings.create.subtitle':'Create a global prototype Resource available to every Principal Workbench.','settings.create.save':'Create Resource','settings.create.return':'Return to Evren Permission Workbench','settings.create.boundary':'A new Resource defaults to No Grants. Creating it does not create an Individual Grant.','settings.create.error.forbidden':'Only administrators can create resources.','settings.create.error.invalid-key':'Resource Key must be 2–64 lowercase letters, numbers, or hyphens.','settings.create.error.name-required':'Display Name is required.','settings.create.error.duplicate-key':'This Resource Key already exists.'
});
Object.assign(ZH_TW, {
  'locale.label':'語言','role.endPreviewAccessible':'結束角色預覽並返回管理員身分',
  'shell.brandSubtitle':'Access Gateway','prototype.environmentAria':'Prototype 環境標示','prototype.staticMarker':'靜態原型','prototype.syntheticMarker':'Synthetic Data · 非正式環境',
  'surface.switcherLabel':'工作介面','surface.eyebrow':'FIN-SSC UX Surface','surface.workspace':'工作區','surface.admin':'管理主控台','surface.workspaceDescription':'啟動已授權資源、確認登入身分與權限資料狀態。','surface.adminDescription':'以登入中的 Admin principal 管理 synthetic portal 設定與檢視。','surface.adminBadge':'管理控制介面 · Synthetic',
  'nav.workspaceGroup':'工作區導覽','nav.adminGroup':'管理主控台導覽','nav.adminOverview':'管理總覽',
  'reserved.eyebrow':'Future information architecture','reserved.title':'預留／未來能力','reserved.description':'僅保留後續資訊架構位置；本階段沒有建立功能或整合。','reserved.badge':'預留','reserved.ticket':'Ticket','reserved.ticketDescription':'預留服務請求入口位置。','reserved.workflow':'Workflow','reserved.workflowDescription':'預留流程協作入口位置。','reserved.ai':'AI','reserved.aiDescription':'預留 AI 輔助能力入口位置。',
  'settings.heroBadge':'Base 編輯介面 · Synthetic','settings.create.syntheticBadge':'全域 · Synthetic','settings.resource.syntheticCustom':'Synthetic 自訂','settings.future.reserved':'預留','people.heroBadge':'Synthetic 身分','people.departmentFilterAria':'依部門篩選人員','people.viewModeAria':'人員檢視模式','audit.heroBadge':'稽核軌跡','audit.typeFilterAria':'依事件類型篩選 Audit','workbench.syntheticBadge':'Synthetic 預演',
  'adminOverview.eyebrow':'Admin Console · Synthetic control plane','adminOverview.title':'管理總覽','adminOverview.description':'以既有 synthetic context 快速前往資源、人員與 Audit；此頁不定義正式管理 domain。','adminOverview.badge':'Admin principal','adminOverview.resourcesTitle':'資源設定','adminOverview.resourcesDescription':'管理既有 Resource Catalog 與 Role Grant prototype。','adminOverview.peopleTitle':'人員總覽','adminOverview.peopleDescription':'檢視 3,200 筆 synthetic identity 與權限工作台入口。','adminOverview.auditTitle':'Audit','adminOverview.auditDescription':'檢視既有 synthetic audit event 清單。','adminOverview.runtimeTitle':'Runtime 狀態','adminOverview.runtimeDescription':'沿用既有 admin-only synthetic runtime warning。','adminOverview.open':'開啟','adminOverview.synthetic':'Synthetic'
});
Object.assign(ZH_CN, {
  'locale.label':'语言','role.endPreviewAccessible':'结束角色预览并返回管理员身份',
  'shell.brandSubtitle':'Access Gateway','prototype.environmentAria':'Prototype 环境标识','prototype.staticMarker':'静态原型','prototype.syntheticMarker':'Synthetic Data · 非正式环境',
  'surface.switcherLabel':'工作界面','surface.eyebrow':'FIN-SSC UX Surface','surface.workspace':'工作区','surface.admin':'管理控制台','surface.workspaceDescription':'启动已授权资源、确认登录身份与权限数据状态。','surface.adminDescription':'以当前登录的 Admin principal 管理 synthetic portal 设置与查看。','surface.adminBadge':'管理控制界面 · Synthetic',
  'nav.workspaceGroup':'工作区导航','nav.adminGroup':'管理控制台导航','nav.adminOverview':'管理总览',
  'reserved.eyebrow':'Future information architecture','reserved.title':'预留／未来能力','reserved.description':'仅保留后续信息架构位置；本阶段没有创建功能或集成。','reserved.badge':'预留','reserved.ticket':'Ticket','reserved.ticketDescription':'预留服务请求入口位置。','reserved.workflow':'Workflow','reserved.workflowDescription':'预留流程协作入口位置。','reserved.ai':'AI','reserved.aiDescription':'预留 AI 辅助能力入口位置。',
  'settings.heroBadge':'Base 编辑界面 · Synthetic','settings.create.syntheticBadge':'全局 · Synthetic','settings.resource.syntheticCustom':'Synthetic 自定义','settings.future.reserved':'预留','people.heroBadge':'Synthetic 身份','people.departmentFilterAria':'按部门筛选人员','people.viewModeAria':'人员查看模式','audit.heroBadge':'审计轨迹','audit.typeFilterAria':'按事件类型筛选 Audit','workbench.syntheticBadge':'Synthetic 预演',
  'adminOverview.eyebrow':'Admin Console · Synthetic control plane','adminOverview.title':'管理总览','adminOverview.description':'使用既有 synthetic context 快速前往资源、人员与 Audit；此页面不定义正式管理 domain。','adminOverview.badge':'Admin principal','adminOverview.resourcesTitle':'资源设置','adminOverview.resourcesDescription':'管理既有 Resource Catalog 与 Role Grant prototype。','adminOverview.peopleTitle':'人员总览','adminOverview.peopleDescription':'查看 3,200 条 synthetic identity 与权限工作台入口。','adminOverview.auditTitle':'Audit','adminOverview.auditDescription':'查看既有 synthetic audit event 列表。','adminOverview.runtimeTitle':'Runtime 状态','adminOverview.runtimeDescription':'沿用既有 admin-only synthetic runtime warning。','adminOverview.open':'打开','adminOverview.synthetic':'Synthetic'
});
Object.assign(EN, {
  'locale.label':'Language','role.endPreviewAccessible':'End role preview and return to Administrator',
  'shell.brandSubtitle':'Access Gateway','prototype.environmentAria':'Prototype environment markers','prototype.staticMarker':'Static Prototype','prototype.syntheticMarker':'Synthetic Data · Non-production',
  'surface.switcherLabel':'Product surface','surface.eyebrow':'FIN-SSC UX Surface','surface.workspace':'Workspace','surface.admin':'Admin Console','surface.workspaceDescription':'Launch authorized resources and review identity and permission freshness context.','surface.adminDescription':'Manage and inspect the synthetic portal as the signed-in Admin principal.','surface.adminBadge':'Control plane · Synthetic',
  'nav.workspaceGroup':'Workspace navigation','nav.adminGroup':'Admin Console navigation','nav.adminOverview':'Admin Overview',
  'reserved.eyebrow':'Future information architecture','reserved.title':'Reserved / Future Capabilities','reserved.description':'Positions only; this stage creates no functionality or integration.','reserved.badge':'Reserved','reserved.ticket':'Ticket','reserved.ticketDescription':'Reserved position for a future service-request entry.','reserved.workflow':'Workflow','reserved.workflowDescription':'Reserved position for future workflow collaboration.','reserved.ai':'AI','reserved.aiDescription':'Reserved position for future AI-assisted capabilities.',
  'settings.heroBadge':'Base authoring · Synthetic','settings.create.syntheticBadge':'Global · Synthetic','settings.resource.syntheticCustom':'Synthetic custom','settings.future.reserved':'Reserved','people.heroBadge':'Synthetic identity','people.departmentFilterAria':'Filter people by department','people.viewModeAria':'People view mode','audit.heroBadge':'Audit trail','audit.typeFilterAria':'Filter Audit by event type','workbench.syntheticBadge':'Synthetic dry-run',
  'adminOverview.eyebrow':'Admin Console · Synthetic control plane','adminOverview.title':'Admin Overview','adminOverview.description':'Open existing resource, people, and audit views using synthetic context. This page defines no production admin domain.','adminOverview.badge':'Admin principal','adminOverview.resourcesTitle':'Resource Settings','adminOverview.resourcesDescription':'Manage the existing Resource Catalog and Role Grant prototype.','adminOverview.peopleTitle':'People Overview','adminOverview.peopleDescription':'Review 3,200 synthetic identities and open the permission workbench.','adminOverview.auditTitle':'Audit','adminOverview.auditDescription':'Review the existing synthetic audit event list.','adminOverview.runtimeTitle':'Runtime status','adminOverview.runtimeDescription':'Uses the existing admin-only synthetic runtime warning.','adminOverview.open':'Open','adminOverview.synthetic':'Synthetic'
});
const DICTS = {'zh-TW':ZH_TW,'zh-CN':ZH_CN,'en-US':EN};
function normalize(value){ if(!value)return null; const v=String(value).trim().replace('_','-').toLowerCase(); if(v.startsWith('zh-tw')||v.startsWith('zh-hant'))return 'zh-TW'; if(v.startsWith('zh-cn')||v.startsWith('zh-hans')||v==='zh')return 'zh-CN'; if(v.startsWith('en'))return 'en-US'; return null; }
const LOCALE_STORAGE_KEY = 'portal_lang';
function localeUrl(href, requestedLocale){ const url=new URL(href); const selected=normalize(requestedLocale); if(selected)url.searchParams.set('lang',selected); return url.href; }
function resolveLocale(){ const q=normalize(new URLSearchParams(location.search).get('lang')); if(q)return q; let stored=null; try{stored=normalize(globalThis.localStorage?.getItem(LOCALE_STORAGE_KEY));}catch{} if(stored)return stored; const injected=normalize(window.__FIN_SSC_PORTAL__?.locale||window.__FIN_SSC_PORTAL__?.larkClientLanguage); if(injected)return injected; for(const item of (navigator.languages||[])){const n=normalize(item); if(n)return n;} return normalize(navigator.language)||'zh-TW'; }
function createTranslator(locale=resolveLocale()){ const selected=DICTS[locale]?locale:'zh-TW'; const dict=DICTS[selected]; const t=(key,vars={})=>{let text=dict[key]??ZH_TW[key]??key; Object.entries(vars).forEach(([k,v])=>text=text.replaceAll(`{${k}}`,String(v))); return text;}; return Object.freeze({locale:selected,t}); }


// ---- app.js ----
let context = getPortalContext();
const { locale, t } = createTranslator();
let activeSettingsTab = new URLSearchParams(location.search).get('tab') || 'resources';
const peopleState = { search: '', department: '', mode: 'all', page: 1, pageSize: 50 };
const auditState = { search: '', eventType: '', page: 1, pageSize: 50 };
let workbenchDraft = null;
const matrixFilterState = { search: '', category: '', grant: 'all' };
const RESERVED_WORKSPACE_CAPABILITIES = Object.freeze([
  Object.freeze({ key: 'ticket', icon: 'T' }),
  Object.freeze({ key: 'workflow', icon: 'W' }),
  Object.freeze({ key: 'ai', icon: 'AI' })
]);
const $ = id => document.getElementById(id);
const esc = v => String(v).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[c]));
const roleLabel = r => t(r.labelKey);
const rName = r => r.customName || r.name;
const rCategory = r => r.customCategory || t(r.categoryKey);
const rDesc = r => r.customDescription || t(r.descriptionKey);
const set = (id, value) => { if ($(id)) $(id).textContent = value; };
const debounce = (fn, wait = 180) => { let timer; return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), wait); }; };
const moduleLabel = key => t(`role.${key}`);
const brandsText = principal => principal.brands?.length ? principal.brands.join(', ') : t('people.noBrands');

function applyLocale(){
  document.documentElement.lang = locale==='zh-TW'?'zh-Hant-TW':locale==='zh-CN'?'zh-Hans-CN':'en-US'; document.title=t('app.title');
  $('sidebar').setAttribute('aria-label',t('nav.main')); $('environmentMarkers').setAttribute('aria-label',t('prototype.environmentAria')); $('surfaceSwitcher').setAttribute('aria-label',t('surface.switcherLabel')); $('identityCard').setAttribute('aria-label',t('identity.aria')); $('roleSwitcher').setAttribute('aria-label',t('role.previewAria')); $('aboutButton').setAttribute('aria-label',t('about.button')); $('aboutButton').title=t('about.button'); $('localeSwitcher').setAttribute('aria-label',t('locale.label')); $('peopleDepartmentFilter').setAttribute('aria-label',t('people.departmentFilterAria')); $('peopleViewMode').setAttribute('aria-label',t('people.viewModeAria')); $('auditTypeFilter').setAttribute('aria-label',t('audit.typeFilterAria'));
  $('localeSwitcher').value=locale;
  const pairs={localeSwitcherLabel:'locale.label',brandSubtitle:'shell.brandSubtitle',prototypeMarker:'prototype.staticMarker',syntheticMarker:'prototype.syntheticMarker',surfaceControlLabel:'surface.switcherLabel',reservedEyebrow:'reserved.eyebrow',reservedTitle:'reserved.title',reservedDescription:'reserved.description',reservedBadge:'reserved.badge',adminOverviewEyebrow:'adminOverview.eyebrow',adminOverviewTitle:'adminOverview.title',adminOverviewDescription:'adminOverview.description',adminOverviewBadge:'adminOverview.badge',syntheticLabel:'sidebar.synthetic',labelLarkName:'identity.larkName',labelDepartment:'identity.department',labelBrand:'identity.brand',labelTitle:'identity.title',roleEyebrow:'role.previewEyebrow',roleHelper:'role.previewHelper',homeEyebrow:'home.eyebrow',catalogEyebrow:'catalog.eyebrow',catalogTitle:'catalog.title',resourceSystemHeader:'catalog.system',resourceCategoryHeader:'catalog.category',resourceDescriptionHeader:'catalog.description',resourceAccessHeader:'catalog.access',resourceActionHeader:'catalog.action',comparisonEyebrow:'comparison.eyebrow',comparisonTitle:'comparison.title',comparisonSubtitle:'comparison.subtitle',comparisonAdminChip:'comparison.adminOnly',legendYes:'comparison.yes',legendNo:'comparison.no',prototypeTitle:'prototype.title',prototypeBody:'prototype.body',settingsEyebrow:'settings.eyebrow',settingsTitle:'settings.title',settingsSubtitle:'settings.subtitle',settingsHeroBadge:'settings.heroBadge',peopleEyebrow:'people.eyebrow',peopleTitle:'people.title',peopleSubtitle:'people.subtitle',peopleHeroBadge:'people.heroBadge',auditEyebrow:'audit.eyebrow',auditTitle:'audit.title',auditSubtitle:'audit.subtitle',auditHeroBadge:'audit.heroBadge',auditBoundary:'audit.boundary',aboutSubtitle:'about.subtitle',aboutTitle:'about.title',aboutBody:'about.body',aboutBoundary:'about.boundary',aboutClose:'common.close',runtimeWarningLabel:'runtime.label',runtimeWarningEyebrow:'runtime.eyebrow',runtimeWarningTitle:'runtime.title',runtimeAuthorizationLabel:'runtime.authorizationStatus',runtimeCacheStateLabel:'runtime.cacheState',runtimeCacheAgeLabel:'runtime.cacheAge',runtimeMaxStaleLabel:'runtime.maxStale',runtimeLastReconciliationLabel:'runtime.lastReconciliation',runtimeWarningBoundary:'runtime.boundary',permissionNoticeBoundary:'permission.boundary'};
  Object.entries(pairs).forEach(([id,key])=>set(id,t(key)));
}
function renderIdentity(){ const p=context.principal; const initial=(p.displayName||'p')[0].toUpperCase(); set('identityName',p.displayName); set('identityPanelName',p.displayName); set('identityAvatar',initial); set('welcomeIcon',initial); set('identityRole',roleLabel(context.loginRole)); set('identityPanelRole',roleLabel(context.loginRole)); document.querySelectorAll('.panel-avatar').forEach(el=>{el.textContent=initial;}); set('profileName',p.larkUserName); set('profileDepartment',p.department); set('profileBrand',p.brand); set('profileTitle',p.title); }
function renderRuntimeWarning(){ const root=$('runtimeWarning'); const data=context.syntheticRuntimeWarning; if(!context.canViewRuntimeWarning||!data){root.hidden=true;return;} root.hidden=false; const auth=t(`runtime.authorizationStatus.${data.authorizationStatus}`); const cache=t(`runtime.cacheState.${data.cacheState}`); set('runtimeAuthorizationValue',auth);set('runtimeAuthorizationBadge',auth);set('runtimeCacheStateValue',cache);set('runtimeCacheAgeValue',t('runtime.minutes',{count:data.cacheAgeMinutes}));set('runtimeMaxStaleValue',t('runtime.minutes',{count:data.maxStaleMinutes}));set('runtimeLastReconciliationValue',t('runtime.minutesAgo',{count:data.lastReconciliationMinutesAgo})); }
function renderPermissionNotice(){ const root=$('permissionNotice'); const data=context.syntheticPermissionNotice; if(!data){root.hidden=true;root.className='permission-notice';return;} root.hidden=false; root.className=`permission-notice ${data.state}`; set('permissionNoticeTitle',t(`permission.${data.state}.title`)); set('permissionNoticeBody',t(`permission.${data.state}.body`)); set('permissionNoticeAction',t(`permission.${data.state}.action`)); }
function goto(page){ const u=new URL(location.href); if(context.surface==='admin')u.searchParams.set('surface','admin'); page==='home'||page==='admin-overview'?u.searchParams.delete('page'):u.searchParams.set('page',page); u.searchParams.delete('principal'); location.assign(u); }
function switchSurface(surface){ const u=new URL(location.href); u.searchParams.set('surface',surface); u.searchParams.delete('page');u.searchParams.delete('principal');u.searchParams.delete('tab');u.searchParams.delete('mode');u.searchParams.delete('returnPrincipal'); if(surface==='admin')u.searchParams.delete('viewAs'); location.assign(u); }
function renderSurfaceShell(){
  document.body.dataset.surface=context.surface;
  set('surfaceEyebrow',t('surface.eyebrow'));
  set('surfaceTitle',t(`surface.${context.surface}`));
  set('surfaceDescription',t(`surface.${context.surface}Description`));
  $('surfaceAdminBadge').hidden=context.surface!=='admin';
  set('surfaceAdminBadge',t('surface.adminBadge'));
  const control=$('surfaceControl');
  if(!context.canSwitchSurface){control.hidden=true;return;}
  control.hidden=false;
  $('surfaceSwitcher').innerHTML=['workspace','admin'].map(surface=>`<button class="surface-button btn fin-btn fin-btn-quiet ${surface===context.surface?'active':''}" type="button" data-surface="${surface}" data-short="${surface==='admin'?'A':'W'}" aria-pressed="${surface===context.surface}">${esc(t(`surface.${surface}`))}</button>`).join('');
  $('surfaceSwitcher').querySelectorAll('[data-surface]').forEach(button=>button.onclick=()=>{closeMobileNav();switchSurface(button.dataset.surface);});
}
function renderNavigation(){ const label=t(context.surface==='admin'?'nav.adminGroup':'nav.workspaceGroup'); $('sideNav').innerHTML=`<div class="side-nav-label">${esc(label)}</div>${context.navigation.map(i=>`<button class="nav-item btn fin-btn fin-btn-quiet ${i.page===context.page?'active':''}" data-page="${i.page}" title="${esc(t(i.labelKey))}"><span class="nav-icon">${esc(i.icon)}</span><span class="nav-label">${esc(t(i.labelKey))}</span></button>`).join('')}`; $('sideNav').querySelectorAll('[data-page]').forEach(b=>b.onclick=()=>{closeMobileNav();goto(b.dataset.page);}); }
function renderRoleSwitcher(){
  if(!context.canPreviewRoles||context.surface!=='workspace'){$('roleControl').hidden=true;return;}
  const previewActive=context.loginRole.key==='admin'&&context.effectiveRole.key!=='admin';
  const previewRoles=context.allRoles.filter(r=>r.key!=='admin');
  const exit=$('previewExit');
  $('roleControl').hidden=false;
  $('roleSwitcher').innerHTML=previewRoles.map(r=>`<button class="role-button btn fin-btn fin-btn-quiet ${r.key===context.effectiveRole.key?'active':''}" type="button" data-role="${r.key}">${r.icon} ${esc(roleLabel(r))}</button>`).join('');
  $('roleSwitcher').querySelectorAll('[data-role]').forEach(b=>b.onclick=()=>{ const u=new URL(location.href); u.searchParams.set('surface','workspace'); u.searchParams.set('viewAs',b.dataset.role); location.assign(u); });
  exit.hidden=!previewActive;
  exit.textContent=t('role.endPreview');
  exit.title=exit.ariaLabel=t('role.endPreviewAccessible');
  exit.onclick=()=>{const u=new URL(location.href);u.searchParams.set('surface','workspace');u.searchParams.delete('viewAs');location.assign(u);};
}
function renderWelcome(){ set('welcomeTitle',t('home.welcome',{name:context.principal.displayName})); const preview=context.loginRole.key==='admin'&&context.effectiveRole.key!=='admin'; set('welcomeText',preview?t('home.previewText',{role:roleLabel(context.effectiveRole)}):t('home.welcomeText')); set('catalogSubtitle',t('catalog.subtitle',{role:roleLabel(context.effectiveRole)})); }
function renderMetrics(){ const m=[['▦',t('metric.systems'),context.resources.length,t('metric.systemsDetail')],['◌',t('metric.identity'),roleLabel(context.loginRole),t('metric.identityDetail')],['◷',t('metric.mode'),t('metric.modeValue'),t('metric.modeDetail')],['✓',t('metric.authorization'),t('metric.authorizationValue'),t('metric.authorizationDetail')]]; $('metricGrid').innerHTML=m.map(x=>`<article class="metric-card card fin-surface-card fin-card"><div class="metric-icon">${esc(x[0])}</div><div><div class="metric-label">${esc(x[1])}</div><div class="metric-value">${esc(x[2])}</div><div class="metric-detail">${esc(x[3])}</div></div></article>`).join(''); }
function renderReservedCapabilities(){
  $('reservedCapabilityGrid').innerHTML=RESERVED_WORKSPACE_CAPABILITIES.map(item=>`<div class="col-12 col-md-4"><article class="reserved-capability-card card fin-card fin-card-compact h-100" aria-disabled="true"><div class="reserved-capability-icon">${esc(item.icon)}</div><h3>${esc(t(`reserved.${item.key}`))}</h3><p>${esc(t(`reserved.${item.key}Description`))}</p><button class="btn fin-btn fin-btn-secondary disabled" type="button" disabled aria-disabled="true">${esc(t('reserved.badge'))}</button></article></div>`).join('');
}
function renderAdminOverview(){
  if(context.surface!=='admin'||context.page!=='admin-overview')return;
  const people=queryPeople({page:1,pageSize:10}),audit=queryAudit({page:1,pageSize:10});
  const runtime=context.syntheticRuntimeWarning;
  const entries=[
    {key:'resources',icon:'R',value:context.catalog.filter(resource=>resource.enabled).length,page:'resource-settings'},
    {key:'people',icon:'P',value:people.total,page:'people-overview'},
    {key:'audit',icon:'A',value:audit.total,page:'audit'},
    {key:'runtime',icon:'!',value:runtime?t(`runtime.authorizationStatus.${runtime.authorizationStatus}`):t('adminOverview.synthetic'),page:''}
  ];
  $('adminOverviewGrid').innerHTML=entries.map(item=>`<div class="col-12 col-md-6 col-xl-3"><article class="fin-admin-entry-card card fin-card h-100 d-flex flex-column"><div class="admin-entry-icon">${esc(item.icon)}</div><h2>${esc(t(`adminOverview.${item.key}Title`))}</h2><p>${esc(t(`adminOverview.${item.key}Description`))}</p><div class="admin-entry-meta"><strong>${esc(item.value)}</strong>${item.page?`<button class="admin-entry-button btn btn-sm fin-btn fin-btn-secondary" type="button" data-admin-page="${item.page}">${esc(t('adminOverview.open'))}</button>`:`<span class="badge fin-badge fin-badge-runtime">${esc(t('adminOverview.synthetic'))}</span>`}</div></article></div>`).join('');
  $('adminOverviewGrid').querySelectorAll('[data-admin-page]').forEach(button=>button.onclick=()=>goto(button.dataset.adminPage));
}
function resMarkup(r,mobile=false){ const name=rName(r),cat=rCategory(r),desc=rDesc(r),launch=`<button class="launch-button btn fin-btn fin-btn-primary" data-resource="${esc(name)}">${esc(t('catalog.launch'))}</button>`; if(mobile)return `<article class="mobile-resource-card card fin-card fin-mobile-card"><div class="system-cell"><span class="system-icon">${esc(r.icon)}</span>${esc(name)}</div><p>${esc(desc)}</p><div class="mobile-resource-meta"><span>${esc(cat)}</span><span>${esc(roleLabel(context.effectiveRole))}</span></div>${launch}</article>`; return `<tr><td><div class="system-cell"><span class="system-icon">${esc(r.icon)}</span>${esc(name)}</div></td><td>${esc(cat)}</td><td class="resource-description">${esc(desc)}</td><td><span class="current-role-pill badge fin-badge fin-badge-role">${esc(roleLabel(context.effectiveRole))}</span></td><td class="action-cell">${launch}</td></tr>`; }
function renderResources(){ set('resourceCount',t('catalog.count',{count:context.resources.length})); $('resourceRows').innerHTML=context.resources.map(r=>resMarkup(r)).join(''); $('mobileResourceList').innerHTML=context.resources.map(r=>resMarkup(r,true)).join(''); document.querySelectorAll('[data-resource]').forEach(b=>b.onclick=()=>toast(t('catalog.launchDemo',{resource:b.dataset.resource}))); }
function renderComparison(){ if(!context.canViewComparison){$('comparisonPanel').hidden=true;return;} $('comparisonPanel').hidden=false; $('comparisonHead').innerHTML=`<tr><th>${esc(t('comparison.resource'))}</th>${context.allRoles.map(r=>`<th>${esc(roleLabel(r))}</th>`).join('')}</tr>`; $('comparisonRows').innerHTML=context.catalog.map(res=>`<tr><td><div class="system-cell"><span class="system-icon">${esc(res.icon)}</span>${esc(rName(res))}</div></td>${context.allRoles.map(role=>`<td><span class="status ${context.hasGrant(role.key,res.key)?'yes':'no'}">${context.hasGrant(role.key,res.key)?'✓':'—'}</span></td>`).join('')}</tr>`).join(''); }
const actions=id=>`<div class="settings-actions"><button id="${id}" class="primary-button btn fin-btn fin-btn-primary">${esc(t('settings.save'))}</button><button class="secondary-button btn fin-btn fin-btn-secondary" data-reset>${esc(t('settings.reset'))}</button></div>`;
function bindReset(){ document.querySelectorAll('[data-reset]').forEach(b=>b.onclick=()=>{ if(!confirm(t('settings.resetConfirm')))return; resetPrototypeSettings(); refresh(); toast(t('settings.resetDone')); }); }
function renderResourceTab(){
  const params=new URLSearchParams(location.search),creating=params.get('mode')==='create',returnPrincipal=params.get('returnPrincipal');
  const createForm=creating?`<section class="synthetic-resource-create card fin-card fin-card-compact"><div class="workbench-heading"><div><h3>${esc(t('settings.create.title'))}</h3><p>${esc(t('settings.create.subtitle'))}</p></div><span class="hero-badge badge fin-badge fin-badge-info">${esc(t('settings.create.syntheticBadge'))}</span></div><div class="resource-create-grid"><label><span>${esc(t('settings.resource.key'))}</span><input id="newResourceKey" class="form-control fin-form-control" maxlength="64" placeholder="travel-analytics"></label><label><span>${esc(t('settings.resource.name'))}</span><input id="newResourceName" class="form-control fin-form-control" maxlength="120"></label><label><span>${esc(t('settings.resource.category'))}</span><input id="newResourceCategory" class="form-control fin-form-control" maxlength="120"></label><label class="wide"><span>${esc(t('settings.resource.description'))}</span><textarea id="newResourceDescription" class="form-control fin-form-control" rows="3" maxlength="500"></textarea></label><label class="enabled-field"><input id="newResourceEnabled" type="checkbox" checked> ${esc(t('settings.resource.enabled'))}</label></div><div id="createResourceError" class="form-error" role="alert"></div><div class="create-resource-actions"><button id="cancelCreateResource" class="secondary-button btn fin-btn fin-btn-secondary" type="button">${esc(t('workbench.cancel'))}</button><button id="saveNewResource" class="primary-button btn fin-btn fin-btn-primary" type="button">${esc(t('settings.create.save'))}</button></div><div class="domain-note">${esc(t('settings.create.boundary'))}</div></section>`:'';
  $('settingsContent').innerHTML=`<div class="settings-section-heading"><div><h2>${esc(t('settings.resources.title'))}</h2><p>${esc(t('settings.resources.subtitle'))}</p></div><div class="settings-heading-actions">${returnPrincipal?`<button id="returnToPrincipal" class="secondary-button btn fin-btn fin-btn-secondary" type="button">← ${esc(t('settings.create.return'))}</button>`:''}<button id="openCreateResource" class="secondary-button btn fin-btn fin-btn-secondary" type="button">+ ${esc(t('settings.create.button'))}</button></div></div>${createForm}<div class="table-wrap fin-table-wrap settings-table-wrap"><table class="settings-table table table-vcenter fin-table"><thead><tr><th>${esc(t('settings.resource.key'))}</th><th>${esc(t('settings.resource.name'))}</th><th>${esc(t('settings.resource.category'))}</th><th>${esc(t('settings.resource.description'))}</th><th>${esc(t('settings.resource.enabled'))}</th></tr></thead><tbody>${context.catalog.map(r=>`<tr data-row="${r.key}"><td><code>${esc(r.key)}</code>${r.syntheticCustom?`<small class="row-key">${esc(t('settings.resource.syntheticCustom'))}</small>`:''}</td><td><input class="form-control fin-form-control" data-f="name" value="${esc(rName(r))}"></td><td><input class="form-control fin-form-control" data-f="category" value="${esc(rCategory(r))}"></td><td><textarea class="form-control fin-form-control" data-f="description" rows="2">${esc(rDesc(r))}</textarea></td><td class="center-cell"><label class="switch"><input data-f="enabled" type="checkbox" ${r.enabled?'checked':''}><span></span></label></td></tr>`).join('')}</tbody></table></div>${actions('saveResources')}`;
  const navigateCreate=enabled=>{const u=new URL(location.href);u.searchParams.set('tab','resources');enabled?u.searchParams.set('mode','create'):u.searchParams.delete('mode');location.assign(u);};
  $('openCreateResource').onclick=()=>navigateCreate(true);
  if(returnPrincipal)$('returnToPrincipal').onclick=()=>{const u=new URL(location.href);u.searchParams.set('page','people-overview');u.searchParams.set('principal',returnPrincipal);u.searchParams.delete('tab');u.searchParams.delete('mode');u.searchParams.delete('returnPrincipal');location.assign(u);};
  if(creating){$('cancelCreateResource').onclick=()=>navigateCreate(false);$('saveNewResource').onclick=()=>{const result=createSyntheticResource({key:$('newResourceKey').value,name:$('newResourceName').value,category:$('newResourceCategory').value,description:$('newResourceDescription').value,enabled:$('newResourceEnabled').checked});if(!result.ok){$('createResourceError').textContent=t(`settings.create.error.${result.code}`);return;}const u=new URL(location.href);u.searchParams.delete('mode');location.assign(u);};}
  $('saveResources').onclick=()=>{ saveResourceSettings([...document.querySelectorAll('[data-row]')].map(row=>({key:row.dataset.row,name:row.querySelector('[data-f=name]').value,category:row.querySelector('[data-f=category]').value,description:row.querySelector('[data-f=description]').value,enabled:row.querySelector('[data-f=enabled]').checked}))); refresh(); toast(t('settings.saved')); }; bindReset();
}
function renderPermissionsTab(){ $('settingsContent').innerHTML=`<div class="settings-section-heading"><div><h2>${esc(t('settings.permissions.title'))}</h2><p>${esc(t('settings.permissions.subtitle'))}</p></div><div class="reserved-role"><button class="secondary-button btn fin-btn fin-btn-secondary" disabled>${esc(t('settings.permissions.addRole'))}</button><small>${esc(t('settings.permissions.addRoleHint'))}</small></div></div><div class="table-wrap fin-table-wrap settings-table-wrap"><table class="permission-editor table table-vcenter fin-table"><thead><tr><th>${esc(t('settings.permissions.resource'))}</th>${context.allRoles.map(r=>`<th>${esc(roleLabel(r))}</th>`).join('')}</tr></thead><tbody>${context.catalog.map(res=>`<tr><td><div class="system-cell"><span class="system-icon">${esc(res.icon)}</span>${esc(rName(res))}</div></td>${context.allRoles.map(role=>`<td class="center-cell"><input class="grant-checkbox" type="checkbox" data-role="${role.key}" data-resource="${res.key}" ${context.hasGrant(role.key,res.key)?'checked':''}></td>`).join('')}</tr>`).join('')}</tbody></table></div>${actions('saveGrants')}`; $('saveGrants').onclick=()=>{saveRoleGrants([...document.querySelectorAll('.grant-checkbox:checked')].map(i=>({roleKey:i.dataset.role,resourceKey:i.dataset.resource})));refresh();toast(t('settings.saved'));}; bindReset(); }
function renderBaseTab(){ const b=context.baseSettings; $('settingsContent').innerHTML=`<div class="settings-section-heading"><div><h2>${esc(t('settings.base.title'))}</h2><p>${esc(t('settings.base.subtitle'))}</p></div></div><div class="base-settings-grid"><label><span>${esc(t('settings.base.alias'))}</span><input id="baseAlias" class="form-control fin-form-control" value="${esc(b.baseAlias)}"></label><label><span>${esc(t('settings.base.resourceTable'))}</span><input id="resourceTable" class="form-control fin-form-control" value="${esc(b.resourceTable)}"></label><label><span>${esc(t('settings.base.roleTable'))}</span><input id="roleTable" class="form-control fin-form-control" value="${esc(b.roleTable)}"></label><label><span>${esc(t('settings.base.assignmentTable'))}</span><input id="assignmentTable" class="form-control fin-form-control" value="${esc(b.assignmentTable)}"></label><label><span>${esc(t('settings.base.cacheTtl'))}</span><input id="cacheTtlSeconds" class="form-control fin-form-control" type="number" min="60" max="86400" value="${b.cacheTtlSeconds}"></label></div>${actions('saveBase')}`; $('saveBase').onclick=()=>{saveBaseSettings({baseAlias:$('baseAlias').value,resourceTable:$('resourceTable').value,roleTable:$('roleTable').value,assignmentTable:$('assignmentTable').value,cacheTtlSeconds:$('cacheTtlSeconds').value});refresh();toast(t('settings.saved'));}; bindReset(); }
function renderFutureTab(){ const cards=[['settings.future.scope','settings.future.scopeText','S'],['settings.future.org','settings.future.orgText','O'],['settings.future.owner','settings.future.ownerText','V'],['settings.future.approval','settings.future.approvalText','A']]; $('settingsContent').innerHTML=`<div class="settings-section-heading"><div><h2>${esc(t('settings.future.title'))}</h2><p>${esc(t('settings.future.subtitle'))}</p></div></div><div class="future-grid">${cards.map(c=>`<article class="future-card card fin-card fin-card-compact"><div class="future-icon">${c[2]}</div><h3>${esc(t(c[0]))}</h3><p>${esc(t(c[1]))}</p><span class="reserved-pill badge fin-badge fin-badge-reserved">${esc(t('settings.future.reserved'))}</span></article>`).join('')}</div><div class="settings-actions"><button class="secondary-button btn fin-btn fin-btn-secondary" data-reset>${esc(t('settings.reset'))}</button></div>`; bindReset(); }
function renderSettings(){ if(!context.canManageResources)return; const tabs=[['resources','settings.tab.resources'],['permissions','settings.tab.permissions'],['base','settings.tab.base'],['future','settings.tab.future']]; $('settingsTabs').innerHTML=tabs.map(x=>`<button class="settings-tab nav-link fin-tab ${activeSettingsTab===x[0]?'active':''}" type="button" role="tab" aria-selected="${activeSettingsTab===x[0]}" data-tab="${x[0]}">${esc(t(x[1]))}</button>`).join(''); $('settingsTabs').querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{activeSettingsTab=b.dataset.tab;renderSettings();}); if(activeSettingsTab==='permissions')renderPermissionsTab(); else if(activeSettingsTab==='base')renderBaseTab(); else if(activeSettingsTab==='future')renderFutureTab(); else renderResourceTab(); }

function modulePills(keys){ return `<span class="module-pill-list">${keys.map(key=>`<span class="current-role-pill badge fin-badge fin-badge-role">${esc(moduleLabel(key))}</span>`).join('')}</span>`; }
function openPrincipal(principalKey){ const u=new URL(location.href);u.searchParams.set('page','people-overview');u.searchParams.set('principal',principalKey);location.assign(u); }
function peopleRow(x){ return `<tr class="people-click-row" data-principal="${esc(x.principalKey)}"><td><button class="people-name-button" type="button" data-open-principal="${esc(x.principalKey)}"><strong>${esc(x.principal.larkUserName)}</strong><small class="row-key">${esc(x.principalKey)}</small></button></td><td>${esc(x.principal.department)}</td><td>${esc(brandsText(x.principal))}</td><td>${esc(x.principal.title)}</td><td>${modulePills(x.moduleKeys)}</td></tr>`; }
function peopleCard(x){ return `<article class="people-card people-click-card card fin-card fin-mobile-card" tabindex="0" role="button" data-open-principal="${esc(x.principalKey)}"><div class="people-card-head"><div class="identity-avatar mini">E</div><div><strong>${esc(x.principal.larkUserName)}</strong>${modulePills(x.moduleKeys)}</div></div><dl><div><dt>${esc(t('people.department'))}</dt><dd>${esc(x.principal.department)}</dd></div><div><dt>${esc(t('people.brand'))}</dt><dd>${esc(brandsText(x.principal))}</dd></div><div><dt>${esc(t('people.titleCol'))}</dt><dd>${esc(x.principal.title)}</dd></div></dl></article>`; }
function renderPeopleGroups(items){ const groups=new Map(); items.forEach(x=>{const key=x.principal.department||t('people.unknownDepartment');if(!groups.has(key))groups.set(key,[]);groups.get(key).push(x);}); $('peopleGroupedList').innerHTML=[...groups].map(([department,rows])=>`<section class="people-group"><div class="people-group-heading"><h3>${esc(department)}</h3><span>${esc(t('people.groupCount',{count:rows.length}))}</span></div><div class="people-group-grid">${rows.map(peopleCard).join('')}</div></section>`).join(''); }
function updatePeopleResults(){ const data=queryPeople(peopleState); peopleState.page=data.page; set('peopleResultCount',t('people.results',{count:data.total})); set('peoplePageStatus',t('people.page',{page:data.page,totalPages:data.totalPages})); $('peoplePrev').disabled=data.page<=1; $('peopleNext').disabled=data.page>=data.totalPages; if($('peopleDepartmentFilter').options.length<=1){ $('peopleDepartmentFilter').innerHTML=`<option value="">${esc(t('people.allDepartments'))}</option>${data.departments.map(d=>`<option value="${esc(d)}">${esc(d)}</option>`).join('')}`; $('peopleDepartmentFilter').value=peopleState.department; }
  const grouped=peopleState.mode==='department'; $('peopleAllList').hidden=grouped; $('peopleGroupedList').hidden=!grouped;
  if(grouped) renderPeopleGroups(data.items); else { $('peopleRows').innerHTML=data.items.map(peopleRow).join(''); $('mobilePeopleList').innerHTML=data.items.map(peopleCard).join(''); }
  document.querySelectorAll('[data-open-principal]').forEach(el=>{el.onclick=e=>{e.stopPropagation();openPrincipal(el.dataset.openPrincipal);};el.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openPrincipal(el.dataset.openPrincipal);}};});
}
function renderPeople(){ if(!context.canViewPeople)return; $('peopleHead').innerHTML=`<tr><th>${esc(t('people.name'))}</th><th>${esc(t('people.department'))}</th><th>${esc(t('people.brand'))}</th><th>${esc(t('people.titleCol'))}</th><th>${esc(t('people.modules'))}</th></tr>`; $('peopleSearch').placeholder=t('people.searchPlaceholder'); $('peopleSearch').value=peopleState.search; $('peopleAllMode').textContent=t('people.allMembers'); $('peopleGroupMode').textContent=t('people.groupByDepartment'); $('peoplePrev').textContent=t('people.prev'); $('peopleNext').textContent=t('people.next'); $('peopleAllMode').classList.toggle('active',peopleState.mode==='all'); $('peopleGroupMode').classList.toggle('active',peopleState.mode==='department');
  const onSearch=debounce(()=>{peopleState.search=$('peopleSearch').value;peopleState.page=1;updatePeopleResults();}); $('peopleSearch').oninput=onSearch;
  $('peopleDepartmentFilter').onchange=()=>{peopleState.department=$('peopleDepartmentFilter').value;peopleState.page=1;updatePeopleResults();};
  $('peopleAllMode').onclick=()=>{peopleState.mode='all';peopleState.page=1;renderPeople();}; $('peopleGroupMode').onclick=()=>{peopleState.mode='department';peopleState.page=1;renderPeople();};
  $('peoplePrev').onclick=()=>{peopleState.page=Math.max(1,peopleState.page-1);updatePeopleResults();}; $('peopleNext').onclick=()=>{peopleState.page+=1;updatePeopleResults();}; updatePeopleResults();
}

function sourceLabel(source){ return source.type==='module' ? t('workbench.sourceModule',{name:moduleLabel(source.key)}) : t('workbench.sourceIndividual'); }
function sourceList(sources){ return sources.map(source=>`<span class="source-chip ${source.type} badge fin-badge ${source.type==='module'?'fin-badge-info':'fin-badge-role'}">${esc(sourceLabel(source))}</span>`).join(''); }
function actionList(actions){ return actions.map(action=>`<span class="action-chip badge fin-badge fin-badge-neutral">${esc(t(`workbench.${action}`))}</span>`).join(''); }
function effectiveTable(rows){
  if(!rows.length)return `<div class="empty-state">${esc(t('workbench.noEffective'))}</div>`;
  const body=rows.map(row=>`<tr><td><div class="system-cell"><span class="system-icon">${esc(row.resource.icon)}</span>${esc(rName(row.resource))}</div></td><td>${actionList(row.actions)}</td><td>${sourceList(row.sources)}</td></tr>`).join('');
  const mobile=rows.map(row=>`<article class="effective-card card fin-card fin-mobile-card"><div class="system-cell"><span class="system-icon">${esc(row.resource.icon)}</span><strong>${esc(rName(row.resource))}</strong></div><div>${actionList(row.actions)}</div><div>${sourceList(row.sources)}</div></article>`).join('');
  return `<div class="table-wrap fin-table-wrap effective-table-wrap"><table class="table table-vcenter fin-table"><thead><tr><th>${esc(t('workbench.resource'))}</th><th>${esc(t('workbench.effectiveActions'))}</th><th>${esc(t('workbench.effectiveSource'))}</th></tr></thead><tbody>${body}</tbody></table></div><div class="mobile-effective-list">${mobile}</div>`;
}
function impactItem(item,kind){
  const resource=item.resource||context.catalog.find(r=>r.key===item.resourceKey);
  const sourceChange=kind==='sourceChanged' ? `<small>${esc(t('workbench.before'))}: ${esc(item.beforeSources.map(sourceLabel).join(' + '))}<br>${esc(t('workbench.after'))}: ${esc(item.afterSources.map(sourceLabel).join(' + '))}</small>` : '';
  return `<li><strong>${esc(rName(resource))}</strong><span>${esc(t(`workbench.${item.action}`))}</span>${sourceChange}</li>`;
}
function impactMarkup(impact){
  const groups=[['added','workbench.impactAdded'],['removed','workbench.impactRemoved'],['sourceChanged','workbench.impactSourceChanged']];
  if(groups.every(([key])=>!impact[key].length))return `<div class="empty-state compact">${esc(t('workbench.noChanges'))}</div>`;
  return `<div class="impact-grid">${groups.map(([key,label])=>`<section class="impact-group ${key}"><h4>${esc(t(label))}<span>${impact[key].length}</span></h4>${impact[key].length?`<ul>${impact[key].map(item=>impactItem(item,key)).join('')}</ul>`:`<p>${esc(t('workbench.none'))}</p>`}</section>`).join('')}</div>`;
}
function consolidateIndividualGrants(grants){ const byResource=new Map();grants.forEach(item=>{const grant={...item,actions:[...item.actions]};if(!byResource.has(grant.resourceKey))byResource.set(grant.resourceKey,grant);else{const current=byResource.get(grant.resourceKey);current.actions=[...new Set([...current.actions,...grant.actions])];}});return [...byResource.values()]; }
function initializeWorkbenchDraft(workbench){ workbenchDraft={ principalKey:workbench.principalKey, modules:[...workbench.modules], individualGrants:consolidateIndividualGrants(workbench.individualGrants) }; }
function matrixActionControl(row,action){ const state=row.actions[action],label=t(`workbench.${action}`);const moduleBadges=state.moduleSources.map(key=>`<span class="source-chip module badge fin-badge fin-badge-info">${esc(t('workbench.sourceModule',{name:moduleLabel(key)}))}</span>`).join('');const individualBadge=state.individual?`<span class="source-chip individual badge fin-badge fin-badge-role">${esc(t('workbench.sourceIndividual'))}</span>`:'';const title=state.locked?t('workbench.lockedHelp',{sources:state.moduleSources.map(moduleLabel).join(' + ')}):t('workbench.editableAllowHelp');return `<div class="matrix-action ${state.locked?'locked':'editable'} ${state.redundant?'redundant':''}"><label title="${esc(title)}"><input type="checkbox" data-matrix-action="${action}" data-resource-key="${esc(row.resource.key)}" ${state.checked?'checked':''} ${state.locked?'disabled':''}><span>${esc(label)}</span></label><div class="matrix-action-sources">${moduleBadges}${individualBadge}</div>${state.redundant?`<button class="text-button danger" type="button" data-remove-redundant="${action}" data-resource-key="${esc(row.resource.key)}">${esc(t('workbench.removeRedundant'))}</button>`:''}</div>`; }
function matrixGrantConfig(row){ const grant=row.individualGrant;if(!grant)return '';const redundant=['discover','launch'].filter(action=>row.actions[action].redundant);return `<div class="matrix-grant-config">${redundant.length?`<div class="redundant-warning"><strong>${esc(t('workbench.redundantTitle'))}</strong><span>${esc(t('workbench.redundantBody',{actions:redundant.map(action=>t(`workbench.${action}`)).join(' + ')}))}</span></div>`:''}<label><span>${esc(t('workbench.validity'))}</span><select class="form-select fin-form-control" data-grant-field="validity" data-resource-key="${esc(row.resource.key)}"><option value="permanent" ${grant.validity==='permanent'?'selected':''}>${esc(t('workbench.permanent'))}</option><option value="time-bound" ${grant.validity==='time-bound'?'selected':''}>${esc(t('workbench.timeBound'))}</option></select></label>${grant.validity==='time-bound'?`<label><span>${esc(t('workbench.expires'))}</span><input class="form-control fin-form-control" type="date" data-grant-field="expiresAt" data-resource-key="${esc(row.resource.key)}" value="${esc(grant.expiresAt||'')}"></label>`:''}<label class="reason"><span>${esc(t('workbench.reason'))}</span><input class="form-control fin-form-control" maxlength="300" data-grant-field="reason" data-resource-key="${esc(row.resource.key)}" value="${esc(grant.reason||'')}" placeholder="${esc(t('workbench.reasonPlaceholder'))}"></label></div>`; }
function resourceMatrixMarkup(rows){
  const tableRows=rows.map(row=>{const sources=[...new Set(['discover','launch'].flatMap(action=>row.actions[action].moduleSources))].map(key=>`<span class="source-chip module badge fin-badge fin-badge-info">${esc(t('workbench.sourceModule',{name:moduleLabel(key)}))}</span>`).join('')+(row.individualGrant?`<span class="source-chip individual badge fin-badge fin-badge-role">${esc(t('workbench.sourceIndividual'))}</span>`:'');const attrs=`data-matrix-item data-search="${esc(`${rName(row.resource)} ${row.resource.key} ${rCategory(row.resource)}`.toLowerCase())}" data-category="${esc(rCategory(row.resource))}" data-granted="${row.granted?'yes':'no'}"`;return `<tr ${attrs}><td><div class="system-cell"><span class="system-icon">${esc(row.resource.icon)}</span><span><strong>${esc(rName(row.resource))}</strong><small class="row-key">${esc(row.resource.key)}</small></span></div></td><td>${esc(rCategory(row.resource))}</td><td>${sources||'—'}</td><td>${matrixActionControl(row,'discover')}</td><td>${matrixActionControl(row,'launch')}</td></tr>${row.individualGrant?`<tr class="matrix-config-row" ${attrs}><td colspan="5">${matrixGrantConfig(row)}</td></tr>`:''}`;}).join('');
  const cards=rows.map(row=>{const attrs=`data-matrix-item data-search="${esc(`${rName(row.resource)} ${row.resource.key} ${rCategory(row.resource)}`.toLowerCase())}" data-category="${esc(rCategory(row.resource))}" data-granted="${row.granted?'yes':'no'}"`;return `<article class="resource-matrix-card card fin-card fin-mobile-card" ${attrs}><div class="resource-matrix-card-head"><div class="system-cell"><span class="system-icon">${esc(row.resource.icon)}</span><span><strong>${esc(rName(row.resource))}</strong><small class="row-key">${esc(row.resource.key)} · ${esc(rCategory(row.resource))}</small></span></div></div><div class="mobile-matrix-actions">${matrixActionControl(row,'discover')}${matrixActionControl(row,'launch')}</div>${matrixGrantConfig(row)}</article>`;}).join('');
  return `<div class="table-wrap fin-table-wrap resource-matrix-table"><table class="table table-vcenter fin-table"><thead><tr><th>${esc(t('workbench.resource'))}</th><th>${esc(t('catalog.category'))}</th><th>${esc(t('workbench.effectiveSource'))}</th><th>${esc(t('workbench.discover'))}</th><th>${esc(t('workbench.launch'))}</th></tr></thead><tbody>${tableRows}</tbody></table></div><div class="mobile-resource-matrix">${cards}</div><div id="matrixEmpty" class="empty-state compact" hidden>${esc(t('workbench.matrixEmpty'))}</div>`;
}
function applyMatrixFilters(){let visible=0;document.querySelectorAll('[data-matrix-item]').forEach(item=>{const matchesSearch=!matrixFilterState.search||item.dataset.search.includes(matrixFilterState.search.toLowerCase());const matchesCategory=!matrixFilterState.category||item.dataset.category===matrixFilterState.category;const matchesGrant=matrixFilterState.grant==='all'||(matrixFilterState.grant==='granted'?item.dataset.granted==='yes':item.dataset.granted==='no');item.hidden=!(matchesSearch&&matchesCategory&&matchesGrant);if(!item.hidden&&!item.classList.contains('matrix-config-row')&&!item.closest('.mobile-resource-matrix'))visible++;});$('matrixEmpty').hidden=visible>0;}
function updateIndividualAction(resourceKey,action,checked){let grant=workbenchDraft.individualGrants.find(item=>item.resourceKey===resourceKey);if(checked){if(!grant){grant={id:`individual-${Date.now()}`,resourceKey,actions:[],validity:'permanent',expiresAt:'',reason:''};workbenchDraft.individualGrants.push(grant);}if(!grant.actions.includes(action))grant.actions.push(action);}else if(grant){grant.actions=grant.actions.filter(item=>item!==action);if(!grant.actions.length)workbenchDraft.individualGrants=workbenchDraft.individualGrants.filter(item=>item!==grant);}renderWorkbench();}
function renderWorkbench(){
  const principalKey=new URLSearchParams(location.search).get('principal');
  const workbench=getPrincipalPermissionWorkbench(principalKey);
  if(!workbench){ const u=new URL(location.href);u.searchParams.delete('principal');location.assign(u);return; }
  if(!workbenchDraft||workbenchDraft.principalKey!==principalKey)initializeWorkbenchDraft(workbench);
  const preview=previewPrincipalPermissionChanges(principalKey,workbenchDraft),matrix=getPrincipalResourceAccessMatrix(principalKey,workbenchDraft);
  const p=workbench.principal;
  const categories=[...new Set(matrix.map(row=>rCategory(row.resource)))].filter(Boolean).sort((a,b)=>a.localeCompare(b));
  const moduleCards=workbench.moduleOptions.map(key=>`<label class="module-toggle ${key==='employee'?'baseline':''}"><input type="checkbox" data-module="${key}" ${workbenchDraft.modules.includes(key)?'checked':''} ${key==='employee'?'disabled':''}><span class="module-toggle-mark">${key==='employee'?'✓':'◆'}</span><span><strong>${esc(moduleLabel(key))}</strong><small>${esc(t(key==='employee'?'workbench.employeeHelp':key==='admin'?'workbench.adminHelp':'workbench.explicitHelp'))}</small></span></label>`).join('');
  $('principalWorkbenchContent').innerHTML=`
    <section class="page-hero page-header fin-page-header workbench-hero"><div><button id="workbenchBack" class="back-button btn fin-btn fin-btn-quiet" type="button">← ${esc(t('workbench.back'))}</button><div class="eyebrow">${esc(t('workbench.eyebrow'))}</div><h1>${esc(t('workbench.title'))}</h1><p>${esc(t('workbench.subtitle'))}</p></div><span class="hero-badge badge fin-badge fin-badge-info">${esc(t('workbench.syntheticBadge'))}</span></section>
    <div class="principal-workbench">
      <section class="panel workbench-panel identity-profile-panel card fin-card"><div class="workbench-heading"><div><h2>${esc(t('workbench.identityTitle'))}</h2><p>${esc(t('workbench.identityHelp'))}</p></div><span class="status-badge badge fin-badge ${p.status==='active'?'fin-badge-success':'fin-badge-danger'} ${esc(p.status)}">${esc(t(`people.status.${p.status}`))}</span></div><div class="profile-summary"><div class="identity-avatar workbench-avatar">${esc((p.displayName||'P')[0])}</div><dl><div><dt>${esc(t('people.name'))}</dt><dd>${esc(p.larkUserName)}</dd></div><div><dt>${esc(t('people.department'))}</dt><dd>${esc(p.department)}</dd></div><div><dt>${esc(t('people.brand'))}</dt><dd>${esc(brandsText(p))}<small>${esc(t('workbench.brandMetadata'))}</small></dd></div><div><dt>${esc(t('people.titleCol'))}</dt><dd>${esc(p.title)}</dd></div></dl></div></section>
      <section class="panel workbench-panel card fin-card"><div class="workbench-heading"><div><h2>${esc(t('workbench.modulesTitle'))}</h2><p>${esc(t('workbench.modulesHelp'))}</p></div></div><div class="module-toggle-grid">${moduleCards}</div></section>
      <section class="panel workbench-panel individual-panel card fin-card"><div class="workbench-heading"><div><h2>${esc(t('workbench.matrixTitle'))}</h2><p>${esc(t('workbench.matrixHelp'))}</p></div><button id="matrixCreateResource" class="secondary-button btn fin-btn fin-btn-secondary" type="button">+ ${esc(t('workbench.createResource'))}</button></div><div class="matrix-toolbar"><label class="search-field input-group fin-search-control"><span aria-hidden="true">⌕</span><input id="matrixSearch" class="form-control fin-form-control" type="search" value="${esc(matrixFilterState.search)}" placeholder="${esc(t('workbench.searchResource'))}"></label><select id="matrixCategory" class="filter-select form-select fin-form-control"><option value="">${esc(t('workbench.allCategories'))}</option>${categories.map(category=>`<option value="${esc(category)}" ${matrixFilterState.category===category?'selected':''}>${esc(category)}</option>`).join('')}</select><div class="view-segment matrix-segment btn-group">${[['all','workbench.allResources'],['granted','workbench.granted'],['not-granted','workbench.notGranted']].map(([key,label])=>`<button class="segment-button btn fin-btn fin-btn-quiet ${matrixFilterState.grant===key?'active':''}" type="button" data-matrix-filter="${key}">${esc(t(label))}</button>`).join('')}</div></div>${resourceMatrixMarkup(matrix)}<div class="domain-note">${esc(t('workbench.noDenyBoundary'))}</div></section>
      <section class="panel workbench-panel effective-panel card fin-card"><div class="workbench-heading"><div><h2>${esc(t('workbench.effectiveTitle'))}</h2><p>${esc(t('workbench.effectiveHelp'))}</p></div><span class="readonly-chip badge fin-badge fin-badge-info">${esc(t('workbench.readOnly'))}</span></div>${effectiveTable(preview.after)}</section>
      <section class="panel workbench-panel impact-panel card fin-card"><div class="workbench-heading"><div><h2>${esc(t('workbench.impactTitle'))}</h2><p>${esc(t('workbench.impactHelp'))}</p></div></div>${impactMarkup(preview.impact)}</section>
      <div class="workbench-savebar"><span>${esc(t('workbench.boundary'))}<strong id="workbenchSaveError" class="form-error"></strong></span><div><button id="workbenchCancel" class="secondary-button btn fin-btn fin-btn-secondary" type="button">${esc(t('workbench.cancel'))}</button><button id="workbenchSave" class="primary-button btn fin-btn fin-btn-primary" type="button">${esc(t('workbench.save'))}</button></div></div>
    </div>`;
  $('workbenchBack').onclick=$('workbenchCancel').onclick=()=>{const u=new URL(location.href);u.searchParams.delete('principal');location.assign(u);};
  document.querySelectorAll('[data-module]').forEach(input=>input.onchange=()=>{const key=input.dataset.module;workbenchDraft.modules=input.checked?[...new Set([...workbenchDraft.modules,key])]:workbenchDraft.modules.filter(x=>x!==key);renderWorkbench();});
  document.querySelectorAll('[data-matrix-action]:not(:disabled)').forEach(input=>input.onchange=()=>updateIndividualAction(input.dataset.resourceKey,input.dataset.matrixAction,input.checked));
  document.querySelectorAll('[data-remove-redundant]').forEach(button=>button.onclick=()=>updateIndividualAction(button.dataset.resourceKey,button.dataset.removeRedundant,false));
  document.querySelectorAll('[data-grant-field]').forEach(input=>input.onchange=input.oninput=()=>{const grant=workbenchDraft.individualGrants.find(item=>item.resourceKey===input.dataset.resourceKey);if(!grant)return;grant[input.dataset.grantField]=input.value;if(input.dataset.grantField==='validity')renderWorkbench();});
  $('matrixSearch').oninput=()=>{matrixFilterState.search=$('matrixSearch').value;applyMatrixFilters();};$('matrixCategory').onchange=()=>{matrixFilterState.category=$('matrixCategory').value;applyMatrixFilters();};document.querySelectorAll('[data-matrix-filter]').forEach(button=>button.onclick=()=>{matrixFilterState.grant=button.dataset.matrixFilter;renderWorkbench();});
  $('matrixCreateResource').onclick=()=>{const u=new URL(location.href);u.searchParams.set('page','resource-settings');u.searchParams.set('tab','resources');u.searchParams.set('mode','create');u.searchParams.set('returnPrincipal',principalKey);u.searchParams.delete('principal');location.assign(u);};applyMatrixFilters();
  $('workbenchSave').onclick=()=>{const result=savePrincipalPermissionChanges(principalKey,workbenchDraft);if(!result.ok){const sources=result.validation?.sourceKeys?.map(moduleLabel).join(' + ')||'';$('workbenchSaveError').textContent=t(`workbench.error.${result.code}`,{sources});return;}initializeWorkbenchDraft(result.workbench);renderWorkbench();toast(t('workbench.saved'));};
}

function auditResultBadge(result){ return `<span class="audit-result badge fin-badge ${result==='success'?'fin-badge-success success':'fin-badge-danger denied'}">${esc(t(`audit.result.${result}`))}</span>`; }
function auditRow(x){ const when=new Intl.DateTimeFormat(locale,{year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'}).format(new Date(x.occurredAt)); return `<tr><td>${esc(when)}</td><td><strong>${esc(x.actor)}</strong></td><td><code>${esc(x.type)}</code></td><td>${esc(x.target)}</td><td>${esc(x.source)}</td><td>${auditResultBadge(x.result)}</td></tr>`; }
function auditCard(x){ const when=new Intl.DateTimeFormat(locale,{year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'}).format(new Date(x.occurredAt)); return `<article class="audit-card card fin-card fin-mobile-card"><div class="audit-card-head"><strong>${esc(x.type)}</strong>${auditResultBadge(x.result)}</div><dl><div><dt>${esc(t('audit.time'))}</dt><dd>${esc(when)}</dd></div><div><dt>${esc(t('audit.actor'))}</dt><dd>${esc(x.actor)}</dd></div><div><dt>${esc(t('audit.target'))}</dt><dd>${esc(x.target)}</dd></div><div><dt>${esc(t('audit.source'))}</dt><dd>${esc(x.source)}</dd></div></dl></article>`; }
function updateAuditResults(){ const data=queryAudit(auditState); auditState.page=data.page; set('auditResultCount',t('audit.results',{count:data.total})); set('auditPageStatus',t('audit.page',{page:data.page,totalPages:data.totalPages})); $('auditPrev').disabled=data.page<=1; $('auditNext').disabled=data.page>=data.totalPages; if($('auditTypeFilter').options.length<=1){$('auditTypeFilter').innerHTML=`<option value="">${esc(t('audit.allTypes'))}</option>${data.eventTypes.map(x=>`<option value="${esc(x)}">${esc(x)}</option>`).join('')}`; $('auditTypeFilter').value=auditState.eventType;} $('auditRows').innerHTML=data.items.map(auditRow).join(''); $('mobileAuditList').innerHTML=data.items.map(auditCard).join(''); }
function renderAudit(){ if(!context.canViewAudit)return; $('auditSearch').placeholder=t('audit.searchPlaceholder'); $('auditSearch').value=auditState.search; $('auditPrev').textContent=t('audit.prev'); $('auditNext').textContent=t('audit.next'); $('auditHead').innerHTML=`<tr><th>${esc(t('audit.time'))}</th><th>${esc(t('audit.actor'))}</th><th>${esc(t('audit.event'))}</th><th>${esc(t('audit.target'))}</th><th>${esc(t('audit.source'))}</th><th>${esc(t('audit.result'))}</th></tr>`; const onSearch=debounce(()=>{auditState.search=$('auditSearch').value;auditState.page=1;updateAuditResults();}); $('auditSearch').oninput=onSearch; $('auditTypeFilter').onchange=()=>{auditState.eventType=$('auditTypeFilter').value;auditState.page=1;updateAuditResults();}; $('auditPrev').onclick=()=>{auditState.page=Math.max(1,auditState.page-1);updateAuditResults();}; $('auditNext').onclick=()=>{auditState.page+=1;updateAuditResults();}; updateAuditResults(); }

function renderPage(){ const principalKey=context.canViewPeople&&context.page==='people-overview'?new URLSearchParams(location.search).get('principal'):null; $('homeView').hidden=context.page!=='home'; $('adminOverviewView').hidden=context.page!=='admin-overview'; $('resourceSettingsView').hidden=context.page!=='resource-settings'; $('peopleOverviewView').hidden=context.page!=='people-overview'||Boolean(principalKey); $('principalWorkbenchView').hidden=context.page!=='people-overview'||!principalKey; $('auditView').hidden=context.page!=='audit'; if(context.page==='admin-overview')renderAdminOverview(); if(context.page==='resource-settings')renderSettings(); if(context.page==='people-overview'&&principalKey)renderWorkbench(); else if(context.page==='people-overview')renderPeople(); if(context.page==='audit')renderAudit(); }
function refresh(){ context=getPortalContext();renderSurfaceShell();renderIdentity();renderRuntimeWarning();renderPermissionNotice();renderNavigation();renderRoleSwitcher();renderWelcome();renderMetrics();renderReservedCapabilities();renderResources();renderComparison();renderPage(); }
function toast(msg){ const x=$('toast');x.textContent=msg;x.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>x.classList.remove('show'),2600); }
function setupAbout(){ const d=$('aboutDialog'); $('aboutButton').onclick=()=>d.showModal?d.showModal():d.setAttribute('open',''); d.onclick=e=>{if(e.target===d)d.close();}; }
function setupIdentityPanel(){ const card=$('identityCard'), toggle=$('identityToggle'), panel=$('identityPanel'); const close=()=>{panel.hidden=true;toggle.setAttribute('aria-expanded','false');card.classList.remove('open');}; const open=()=>{panel.hidden=false;toggle.setAttribute('aria-expanded','true');card.classList.add('open');}; toggle.onclick=e=>{e.stopPropagation(); panel.hidden?open():close();}; panel.onclick=e=>e.stopPropagation(); document.addEventListener('click',close); document.addEventListener('keydown',e=>{if(e.key==='Escape')close();}); }
function setupRuntimeWarning(){ const root=$('runtimeWarning'),toggle=$('runtimeWarningToggle'),panel=$('runtimeWarningPanel'); let pinned=false; const open=()=>{if(root.hidden)return;panel.hidden=false;toggle.setAttribute('aria-expanded','true');root.classList.add('open');}; const hide=()=>{panel.hidden=true;toggle.setAttribute('aria-expanded','false');root.classList.remove('open');}; const close=()=>{if(!pinned)hide();}; const forceClose=()=>{pinned=false;hide();}; toggle.onclick=e=>{e.stopPropagation();pinned=!pinned;pinned?open():hide();}; root.addEventListener('mouseenter',open);root.addEventListener('mouseleave',close);toggle.addEventListener('focus',open);panel.onclick=e=>e.stopPropagation();document.addEventListener('click',forceClose);document.addEventListener('keydown',e=>{if(e.key==='Escape')forceClose();}); }
function setupPermissionNotice(){ $('permissionNoticeAction').onclick=()=>{ const u=new URL(location.href); u.searchParams.set('permissionState','current'); location.assign(u); }; }
function setupLocaleSwitcher(){ const select=$('localeSwitcher'); select.onchange=()=>{const selected=select.value;localStorage.setItem(LOCALE_STORAGE_KEY,selected);location.assign(localeUrl(location.href,selected));}; }
function openMobileNav(){document.body.classList.add('mobile-nav-open');$('mobileNavBackdrop').hidden=false;} function closeMobileNav(){document.body.classList.remove('mobile-nav-open');$('mobileNavBackdrop').hidden=true;}
function setupSidebar(){
  const shell=$('appShell'),btn=$('sidebarCollapse');
  shell.classList.toggle('sidebar-collapsed',localStorage.getItem('fin-ssc-demo:sidebar-collapsed')==='1');
  const sync=()=>{const c=shell.classList.contains('sidebar-collapsed');btn.textContent=c?'›':'‹';btn.title=btn.ariaLabel=c?t('sidebar.expand'):t('sidebar.collapse');btn.setAttribute('aria-expanded',String(!c));};
  sync();
  btn.onclick=()=>{shell.classList.toggle('sidebar-collapsed');localStorage.setItem('fin-ssc-demo:sidebar-collapsed',shell.classList.contains('sidebar-collapsed')?'1':'0');sync();};
  $('mobileMenuButton').ariaLabel=t('sidebar.open');$('mobileMenuButton').onclick=openMobileNav;$('mobileNavBackdrop').onclick=closeMobileNav;window.addEventListener('resize',()=>{if(innerWidth>780)closeMobileNav();});
}

applyLocale();setupAbout();setupIdentityPanel();setupRuntimeWarning();setupPermissionNotice();setupLocaleSwitcher();setupSidebar();refresh();

})();
