import { ROLE_BY_KEY, ROLES } from '../data/roles.js';
import { SYNTHETIC_PROFILES } from '../data/profiles.js';
import { createSyntheticPeople } from '../data/people.js';
import { createSyntheticAuditEvents } from '../data/audit-events.js';
import { RESOURCE_CATALOG } from '../data/resources.js';
import { ROLE_RESOURCE_GRANTS } from '../data/grants.js';
import { NAVIGATION_BY_ROLE } from '../data/navigation.js';
import { DEFAULT_BASE_SETTINGS } from '../data/base-settings.js';

const STORAGE_KEYS = Object.freeze({ resources: 'fin-ssc-demo:resource-overrides:v1', grants: 'fin-ssc-demo:grants:v1', base: 'fin-ssc-demo:base-settings:v1' });
const validRoles = new Set(ROLES.map(r => r.key));
const validResources = new Set(RESOURCE_CATALOG.map(r => r.key));
let peopleCache = null;
let auditCache = null;

function read(key, fallback) {
  try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch { return fallback; }
}
function write(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function grantRecords() {
  const stored = read(STORAGE_KEYS.grants, null);
  if (!Array.isArray(stored)) return ROLE_RESOURCE_GRANTS.map(g => ({ ...g }));
  return stored.filter(g => validRoles.has(g?.roleKey) && validResources.has(g?.resourceKey)).map(g => ({ roleKey: g.roleKey, resourceKey: g.resourceKey, scope: 'portal:launch' }));
}
function catalogRecords() {
  const overrides = read(STORAGE_KEYS.resources, {});
  return RESOURCE_CATALOG.map(resource => {
    const o = overrides?.[resource.key] || {};
    return Object.freeze({ ...resource, customName: typeof o.name === 'string' ? o.name : '', customCategory: typeof o.category === 'string' ? o.category : '', customDescription: typeof o.description === 'string' ? o.description : '', enabled: typeof o.enabled === 'boolean' ? o.enabled : resource.enabled !== false });
  });
}
function runtime() {
  const params = new URLSearchParams(location.search);
  const requestedRole = params.get('role');
  const loginRoleKey = ROLE_BY_KEY[requestedRole] ? requestedRole : 'admin';
  const loginRole = ROLE_BY_KEY[loginRoleKey];
  const requestedPreview = params.get('viewAs');
  const effectiveRoleKey = loginRoleKey === 'admin' && ROLE_BY_KEY[requestedPreview] ? requestedPreview : loginRoleKey;
  const requestedPage = params.get('page') || 'home';
  const page = loginRoleKey === 'admin' && ['home', 'resource-settings', 'people-overview', 'audit'].includes(requestedPage) ? requestedPage : 'home';
  return { loginRoleKey, loginRole, effectiveRoleKey, effectiveRole: ROLE_BY_KEY[effectiveRoleKey], page };
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
    principal: SYNTHETIC_PROFILES[r.loginRoleKey], loginRole: r.loginRole, effectiveRole: r.effectiveRole, page: r.page,
    navigation: NAVIGATION_BY_ROLE[r.loginRoleKey], resources: catalog.filter(x => x.enabled && granted.has(x.key)), catalog, allRoles: ROLES,
    baseSettings: Object.freeze({ ...DEFAULT_BASE_SETTINGS, ...read(STORAGE_KEYS.base, {}) }),
    canPreviewRoles: caps.includes('preview_roles'), canViewComparison: caps.includes('view_comparison') && r.effectiveRoleKey === 'admin', canManageResources: caps.includes('manage_resources'), canViewPeople: caps.includes('view_people'), canViewAudit: caps.includes('view_audit'),
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
    const role = ROLE_BY_KEY[x.roleKey];
    return [x.principal.larkUserName, x.principal.department, x.principal.brand, x.principal.title, x.roleKey, role?.labelKey].some(v => normalizeSearch(v).includes(q));
  }).sort((a, b) => a.principal.department.localeCompare(b.principal.department) || a.principal.brand.localeCompare(b.principal.brand) || a.principal.title.localeCompare(b.principal.title) || a.principalKey.localeCompare(b.principalKey));
  const size = clampPageSize(pageSize);
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / size));
  const currentPage = Math.max(1, Math.min(totalPages, Number(page) || 1));
  const start = (currentPage - 1) * size;
  const items = filtered.slice(start, start + size).map(x => Object.freeze({ principalKey: x.principalKey, role: ROLE_BY_KEY[x.roleKey], principal: x.principal }));
  return Object.freeze({ items, total, page: currentPage, pageSize: size, totalPages, departments });
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
  rows.forEach(row => { if (validResources.has(row?.key)) out[row.key] = { name: String(row.name || '').trim(), category: String(row.category || '').trim(), description: String(row.description || '').trim(), enabled: Boolean(row.enabled) }; });
  write(STORAGE_KEYS.resources, out);
}
export function saveRoleGrants(rows) {
  const seen = new Set(); const out = [];
  rows.forEach(row => { if (!validRoles.has(row?.roleKey) || !validResources.has(row?.resourceKey)) return; const k = `${row.roleKey}:${row.resourceKey}`; if (seen.has(k)) return; seen.add(k); out.push({ roleKey: row.roleKey, resourceKey: row.resourceKey, scope: 'portal:launch' }); });
  write(STORAGE_KEYS.grants, out);
}
export function saveBaseSettings(settings) {
  write(STORAGE_KEYS.base, {
    baseAlias: String(settings?.baseAlias || '').trim().slice(0,120), resourceTable: String(settings?.resourceTable || '').trim().slice(0,120), roleTable: String(settings?.roleTable || '').trim().slice(0,120), assignmentTable: String(settings?.assignmentTable || '').trim().slice(0,120), cacheTtlSeconds: Math.max(60, Math.min(86400, Number(settings?.cacheTtlSeconds) || DEFAULT_BASE_SETTINGS.cacheTtlSeconds))
  });
}
export function resetPrototypeSettings() { Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key)); }
