import { ROLE_BY_KEY, ROLES } from '../data/roles.js';
import { SYNTHETIC_PROFILES } from '../data/profiles.js';
import { createSyntheticPeople } from '../data/people.js';
import { createSyntheticAuditEvents } from '../data/audit-events.js';
import { RESOURCE_CATALOG } from '../data/resources.js';
import { ROLE_RESOURCE_GRANTS } from '../data/grants.js';
import { ADMIN_CONSOLE_NAVIGATION, NAVIGATION_BY_ROLE, WORKSPACE_NAVIGATION } from '../data/navigation.js';
import { DEFAULT_BASE_SETTINGS } from '../data/base-settings.js';

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

export function getPortalContext() {
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

export function queryPeople({ search = '', department = '', page = 1, pageSize = 50 } = {}) {
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

export function getPrincipalPermissionWorkbench(principalKey) {
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

export function validateIndividualGrantDraft(principalKey, proposed, draft) {
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

export function previewPrincipalPermissionChanges(principalKey, proposed) {
  if (!canManagePeople()) return null;
  const record = principalRecord(String(principalKey || ''));
  if (!record) return null;
  const beforeConfig = storedPrincipalConfig(record);
  const afterConfig = { modules: normalizeModules(proposed?.modules), individualGrants: Array.isArray(proposed?.individualGrants) ? proposed.individualGrants.map(normalizeIndividualGrant) : [] };
  const before = deriveAuthorization(beforeConfig), after = deriveAuthorization(afterConfig);
  return Object.freeze({ before: Object.freeze(before), after: Object.freeze(after), impact: impactBetween(before, after) });
}

export function getPrincipalResourceAccessMatrix(principalKey, proposed) {
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

export function savePrincipalPermissionChanges(principalKey, proposed) {
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

export function queryAudit({ search = '', eventType = '', page = 1, pageSize = 50 } = {}) {
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

export function saveResourceSettings(rows) {
  const out = {};
  const resourceKeys = new Set(catalogRecords().map(resource => resource.key));
  rows.forEach(row => { if (resourceKeys.has(row?.key)) out[row.key] = { name: String(row.name || '').trim(), category: String(row.category || '').trim(), description: String(row.description || '').trim(), enabled: Boolean(row.enabled) }; });
  write(STORAGE_KEYS.resources, out);
}
export function createSyntheticResource(input) {
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
export function saveRoleGrants(rows) {
  const seen = new Set(); const out = [];
  const resourceKeys = new Set(catalogRecords().map(resource => resource.key));
  rows.forEach(row => { if (!validRoles.has(row?.roleKey) || !resourceKeys.has(row?.resourceKey)) return; const k = `${row.roleKey}:${row.resourceKey}`; if (seen.has(k)) return; seen.add(k); out.push({ roleKey: row.roleKey, resourceKey: row.resourceKey, scope: 'portal:launch' }); });
  write(STORAGE_KEYS.grants, out);
}
export function saveBaseSettings(settings) {
  write(STORAGE_KEYS.base, {
    baseAlias: String(settings?.baseAlias || '').trim().slice(0,120), resourceTable: String(settings?.resourceTable || '').trim().slice(0,120), roleTable: String(settings?.roleTable || '').trim().slice(0,120), assignmentTable: String(settings?.assignmentTable || '').trim().slice(0,120), cacheTtlSeconds: Math.max(60, Math.min(86400, Number(settings?.cacheTtlSeconds) || DEFAULT_BASE_SETTINGS.cacheTtlSeconds))
  });
}
export function resetPrototypeSettings() { Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key)); }
