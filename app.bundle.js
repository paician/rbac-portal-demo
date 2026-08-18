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
  { key: 'admin', labelKey: 'role.admin', icon: '◆', capabilities: ['preview_roles', 'view_comparison', 'manage_resources', 'view_people', 'view_audit'] }
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
const PEOPLE_ROLE_KEYS = Object.freeze(['employee', 'finance', 'manager', 'admin']);

const SYNTHETIC_PEOPLE_COUNT = 3200;

function createSyntheticPeople(count = SYNTHETIC_PEOPLE_COUNT) {
  const size = Math.max(0, Math.min(10000, Number(count) || 0));
  return Array.from({ length: size }, (_, index) => {
    const roleKey = PEOPLE_ROLE_KEYS[index % PEOPLE_ROLE_KEYS.length];
    const department = PEOPLE_DEPARTMENTS[index % PEOPLE_DEPARTMENTS.length];
    const brand = PEOPLE_BRANDS[index % PEOPLE_BRANDS.length];
    const title = PEOPLE_TITLES[index % PEOPLE_TITLES.length];
    return Object.freeze({
      principalKey: `synthetic-${String(index + 1).padStart(4, '0')}`,
      roleKey,
      principal: Object.freeze({
        displayName: 'Evren',
        larkUserName: 'Evren',
        department,
        brand,
        title
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
  ['admin', 'helios'], ['admin', 'netsuite'], ['admin', 'sharepoint'], ['admin', 'datawind'], ['admin', 'fdp'], ['admin', 'people-access'], ['admin', 'hylearning'], ['admin', 'ai-chatbot']
].map(([roleKey, resourceKey]) => Object.freeze({ roleKey, resourceKey, scope: 'portal:launch' })));


// ---- data/navigation.js ----
const NAVIGATION_BY_ROLE = Object.freeze({
  employee: Object.freeze([{ key: 'home', page: 'home', labelKey: 'nav.home', icon: '⌂' }]),
  finance: Object.freeze([{ key: 'home', page: 'home', labelKey: 'nav.home', icon: '⌂' }]),
  manager: Object.freeze([{ key: 'home', page: 'home', labelKey: 'nav.home', icon: '⌂' }]),
  admin: Object.freeze([
    { key: 'home', page: 'home', labelKey: 'nav.home', icon: '⌂' },
    { key: 'resource-settings', page: 'resource-settings', labelKey: 'nav.resourceSettings', icon: '⚙' },
    { key: 'people-overview', page: 'people-overview', labelKey: 'nav.peopleOverview', icon: '◎' },
    { key: 'audit', page: 'audit', labelKey: 'nav.audit', icon: '≋' }
  ])
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

function getPortalContext() {
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

function queryPeople({ search = '', department = '', page = 1, pageSize = 50 } = {}) {
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
  rows.forEach(row => { if (validResources.has(row?.key)) out[row.key] = { name: String(row.name || '').trim(), category: String(row.category || '').trim(), description: String(row.description || '').trim(), enabled: Boolean(row.enabled) }; });
  write(STORAGE_KEYS.resources, out);
}
function saveRoleGrants(rows) {
  const seen = new Set(); const out = [];
  rows.forEach(row => { if (!validRoles.has(row?.roleKey) || !validResources.has(row?.resourceKey)) return; const k = `${row.roleKey}:${row.resourceKey}`; if (seen.has(k)) return; seen.add(k); out.push({ roleKey: row.roleKey, resourceKey: row.resourceKey, scope: 'portal:launch' }); });
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
  'role.employee':'普通員工','role.finance':'財務員工','role.manager':'主管','role.admin':'管理員','role.previewEyebrow':'Administrator preview','role.previewHelper':'此切換器僅供管理員預覽角色資源視圖；登入身分仍為管理員。','role.previewAria':'角色預覽切換',
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
  'people.eyebrow':'Admin only','people.title':'人員總覽','people.subtitle':'Synthetic identity 清單，用於驗證未來 Principal / Role / Organization 的管理視圖；介面採查詢、篩選與分頁，不一次渲染全部成員。','people.name':'Lark User Name','people.department':'所屬部門','people.brand':'所屬品牌','people.titleCol':'職稱','people.role':'角色','people.searchPlaceholder':'搜尋姓名、部門、品牌、職稱或角色…','people.allDepartments':'所有部門','people.allMembers':'全部成員','people.groupByDepartment':'依部門分組','people.results':'共 {count} 位成員','people.page':'第 {page} / {totalPages} 頁','people.prev':'上一頁','people.next':'下一頁','people.groupCount':'本頁 {count} 位','people.unknownDepartment':'未設定部門',
  'audit.eyebrow':'Admin only','audit.title':'Audit','audit.subtitle':'集中檢視登入、資源點擊、管理操作與人員生命週期事件的稽核入口。','audit.boundary':'Prototype 目前只顯示 synthetic event。正式版 Audit 必須由 Flask／後端連線與 JML 流程以不可由瀏覽器竄改的方式寫入持久化 Audit Store。','audit.searchPlaceholder':'搜尋使用者、事件、目標或來源…','audit.allTypes':'所有事件類型','audit.results':'共 {count} 筆事件','audit.page':'第 {page} / {totalPages} 頁','audit.prev':'上一頁','audit.next':'下一頁','audit.time':'時間','audit.actor':'使用者','audit.event':'事件','audit.target':'目標','audit.source':'來源','audit.result':'結果','audit.result.success':'成功','audit.result.denied':'拒絕',
  'resource.helios.category':'差旅','resource.helios.description':'報銷／差旅平台。','resource.netsuite.category':'ERP／財務','resource.netsuite.description':'Synthetic finance ERP 工作區。','resource.sharepoint.category':'文件協作','resource.sharepoint.description':'Synthetic SSC 文件與知識庫。','resource.datawind.category':'BI 分析','resource.datawind.description':'Synthetic 財務及營運分析儀表板。','resource.fdp.category':'財務資料','resource.fdp.description':'Synthetic 財務資料與報表服務。','resource.peopleAccess.category':'IAM 管理','resource.peopleAccess.description':'Synthetic 人員與權限管理工作區。','resource.hylearning.category':'學習發展','resource.hylearning.description':'Synthetic 學習資源與課程入口。','resource.aiChatbot.category':'AI 助理','resource.aiChatbot.description':'Synthetic SSC 知識問答體驗。'
};
const ZH_CN = {...ZH_TW,
  'nav.main':'功能菜单','nav.home':'首页','nav.resourceSettings':'资源设置','nav.peopleOverview':'人员总览','nav.audit':'Audit','sidebar.synthetic':'仅限 synthetic data','sidebar.collapse':'收起侧栏','sidebar.expand':'展开侧栏','sidebar.open':'打开菜单','sidebar.close':'关闭菜单','about.button':'关于系统','about.body':'此网站为 FIN-SSC IAM Portal 的交互式前端原型，用于验证角色导航、资源目录、管理设置与响应式 H5 体验。','about.boundary':'Prototype 不包含真实 Lark、Base、Production URL 或凭证。正式授权必须由 Flask server-side 执行。','common.close':'关闭','identity.aria':'登录身份','identity.department':'所属部门','identity.brand':'所属品牌','identity.title':'职称','role.employee':'普通员工','role.finance':'财务员工','role.admin':'管理员','role.previewHelper':'此切换器仅供管理员预览角色资源视图；登录身份仍为管理员。','home.welcome':'欢迎回来，{name}','home.welcomeText':'以下为你目前有效访问范围内的系统资源。','home.previewText':'目前以管理员身份预览“{role}”的有效资源视图。','metric.systems':'可用系统','metric.identity':'登录身份','metric.mode':'数据模式','metric.authorization':'授权状态','metric.authorizationValue':'已筛选','catalog.title':'系统资源目录','catalog.subtitle':'已按“{role}”的有效授权筛选。','catalog.count':'{count} 项资源','catalog.system':'资源系统','catalog.description':'说明','catalog.access':'有效访问','catalog.action':'操作','catalog.launch':'打开资源','comparison.title':'角色／资源对照表','comparison.subtitle':'仅供管理员查看原型数据模型中的有效访问范围。','comparison.adminOnly':'管理员限定','comparison.resource':'资源系统','comparison.yes':'可访问','comparison.no':'未授予','settings.title':'资源设置','settings.subtitle':'延续 Table 模板，作为未来 Base Authoring Plane 的前端设置雏形。','settings.tab.resources':'资源目录','settings.tab.permissions':'角色权限','settings.tab.base':'Base 基本设置','settings.tab.future':'预留扩展','settings.resources.title':'资源目录设置','settings.resources.subtitle':'管理 Portal Resource Catalog 的基本显示数据与启用状态。','settings.resource.name':'显示名称','settings.resource.description':'说明','settings.resource.enabled':'启用','settings.permissions.title':'角色可见系统权限','settings.permissions.subtitle':'设置 Role × Resource 的可见／启动授权；Prototype 存储于本机浏览器。','settings.permissions.resource':'资源系统','settings.permissions.addRole':'+ 新增角色（预留）','settings.base.title':'Base 基本设置','settings.base.subtitle':'仅保存 synthetic alias 与 table name；不得在 Prototype 放入 token、credential 或真实 Base ID。','settings.future.title':'预留扩展空间','settings.future.subtitle':'这些字段目前不启用，用来保留后续 IAM 治理与 Base schema 的演进位置。','settings.save':'保存 Prototype 设置','settings.saved':'设置已保存至此浏览器的 localStorage。','settings.reset':'重置 Demo','settings.resetConfirm':'确定要清除本机 Prototype 设置并恢复默认值吗？','settings.resetDone':'Prototype 设置已恢复默认值。','people.title':'人员总览','people.subtitle':'Synthetic identity 清单，用于验证未来 Principal / Role / Organization 的管理视图；界面采用查询、筛选与分页，不一次渲染全部成员。','people.department':'所属部门','people.brand':'所属品牌','people.titleCol':'职称','people.role':'角色','people.searchPlaceholder':'搜索姓名、部门、品牌、职称或角色…','people.allDepartments':'所有部门','people.allMembers':'全部成员','people.groupByDepartment':'按部门分组','people.results':'共 {count} 位成员','people.page':'第 {page} / {totalPages} 页','people.prev':'上一页','people.next':'下一页','people.groupCount':'本页 {count} 位','people.unknownDepartment':'未设置部门','audit.title':'Audit','audit.subtitle':'集中查看登录、资源点击、管理操作与人员生命周期事件的审计入口。','audit.boundary':'Prototype 目前只显示 synthetic event。正式版 Audit 必须由 Flask／后端连接与 JML 流程以不可由浏览器篡改的方式写入持久化 Audit Store。','audit.searchPlaceholder':'搜索用户、事件、目标或来源…','audit.allTypes':'所有事件类型','audit.results':'共 {count} 条事件','audit.page':'第 {page} / {totalPages} 页','audit.prev':'上一页','audit.next':'下一页','audit.time':'时间','audit.actor':'用户','audit.event':'事件','audit.target':'目标','audit.source':'来源','audit.result':'结果','audit.result.success':'成功','audit.result.denied':'拒绝','resource.helios.description':'报销／差旅平台。','resource.netsuite.category':'ERP／财务','resource.sharepoint.category':'文档协作','resource.datawind.description':'Synthetic 财务及运营分析仪表板。','resource.fdp.category':'财务数据','resource.peopleAccess.description':'Synthetic 人员与权限管理工作区。','resource.hylearning.category':'学习发展','resource.aiChatbot.category':'AI 助手'
};
const EN = {...ZH_TW,
  'app.title':'Finance SSC Portal | RBAC Prototype','nav.main':'Navigation','nav.home':'Home','nav.resourceSettings':'Resource Settings','nav.peopleOverview':'People Overview','nav.audit':'Audit','sidebar.synthetic':'Synthetic data only','sidebar.collapse':'Collapse sidebar','sidebar.expand':'Expand sidebar','sidebar.open':'Open menu','sidebar.close':'Close menu','about.button':'About system','about.body':'This is an interactive FIN-SSC IAM Portal frontend prototype for validating role navigation, resource catalog, administration settings, and responsive H5 behavior.','about.boundary':'The prototype contains no real Lark data, Base identifiers, production URLs, or credentials. Production authorization must be enforced server-side by Flask.','common.close':'Close','identity.aria':'Signed-in identity','identity.department':'Department','identity.brand':'Brand','identity.title':'Job Title','role.employee':'Employee','role.finance':'Finance','role.manager':'Manager','role.admin':'Administrator','role.previewHelper':'This switcher lets administrators preview role-specific resources while the signed-in identity remains Administrator.','role.previewAria':'Role preview switcher','home.welcome':'Welcome back, {name}','home.welcomeText':'Below are the resources available within your current effective access.','home.previewText':'Administrator preview of the effective “{role}” resource view.','metric.systems':'Available systems','metric.identity':'Signed-in role','metric.mode':'Data mode','metric.authorization':'Authorization','metric.authorizationValue':'Filtered','catalog.title':'System Resource Catalog','catalog.subtitle':'Filtered by the effective “{role}” grants.','catalog.count':'{count} resources','catalog.system':'Resource','catalog.category':'Category','catalog.description':'Description','catalog.access':'Effective access','catalog.action':'Action','catalog.launch':'Open resource','catalog.launchDemo':'{resource}: this prototype never opens a real system.','comparison.title':'Role / Resource Matrix','comparison.subtitle':'Visible only to administrators for reviewing the prototype effective access model.','comparison.adminOnly':'Admin only','comparison.resource':'Resource','comparison.yes':'Granted','comparison.no':'Not granted','prototype.body':'JavaScript only demonstrates UI behavior. Production must enforce authorization server-side in Flask using Portal Session → Principal → Effective Grants → Resource / Scope.','settings.title':'Resource Settings','settings.subtitle':'An extension of the Table template and a frontend prototype for the future Base Authoring Plane.','settings.tab.resources':'Resource Catalog','settings.tab.permissions':'Role Permissions','settings.tab.base':'Base Settings','settings.tab.future':'Future Extension','settings.resources.title':'Resource Catalog Settings','settings.resources.subtitle':'Manage the basic display metadata and enabled state of Portal resources.','settings.resource.name':'Display Name','settings.resource.category':'Category','settings.resource.description':'Description','settings.resource.enabled':'Enabled','settings.permissions.title':'Role-visible System Permissions','settings.permissions.subtitle':'Configure the Role × Resource visibility / launch matrix. Prototype changes are stored in the browser only.','settings.permissions.resource':'Resource','settings.permissions.addRole':'+ Add Role (reserved)','settings.permissions.addRoleHint':'Future extensions may add Scope, Brand, Department, or custom roles.','settings.base.title':'Base Settings','settings.base.subtitle':'Store synthetic aliases and table names only. Do not place tokens, credentials, or real Base IDs in this prototype.','settings.base.cacheTtl':'Cache TTL (seconds)','settings.future.title':'Reserved Extension Space','settings.future.subtitle':'These options are intentionally inactive and reserve room for future IAM governance and Base schema evolution.','settings.future.scopeText':'Potentially separate launch, view, and admin actions/scopes.','settings.future.orgText':'Support brand- and department-scoped resources.','settings.future.ownerText':'Add resource owner, validity windows, and retirement metadata.','settings.future.approvalText':'Administrator changes may later require approval, review, and audit trails.','settings.save':'Save Prototype Settings','settings.saved':'Settings were saved to this browser localStorage.','settings.reset':'Reset Demo','settings.resetConfirm':'Clear local prototype settings and restore defaults?','settings.resetDone':'Prototype settings restored to defaults.','people.title':'People Overview','people.subtitle':'Synthetic identities for the future Principal / Role / Organization view. Search, filters, and pagination keep DOM rendering bounded for large directories.','people.department':'Department','people.brand':'Brand','people.titleCol':'Job Title','people.role':'Role','people.searchPlaceholder':'Search name, department, brand, title, or role…','people.allDepartments':'All departments','people.allMembers':'All members','people.groupByDepartment':'Group by department','people.results':'{count} members','people.page':'Page {page} of {totalPages}','people.prev':'Previous','people.next':'Next','people.groupCount':'{count} on this page','people.unknownDepartment':'No department','audit.title':'Audit','audit.subtitle':'A centralized view for sign-ins, resource launches, administrative changes, and identity lifecycle events.','audit.boundary':'The prototype shows synthetic events only. Production Audit must be written server-side by Flask, connected services, and JML workflows into a durable store that browser clients cannot tamper with.','audit.searchPlaceholder':'Search actor, event, target, or source…','audit.allTypes':'All event types','audit.results':'{count} events','audit.page':'Page {page} of {totalPages}','audit.prev':'Previous','audit.next':'Next','audit.time':'Time','audit.actor':'Actor','audit.event':'Event','audit.target':'Target','audit.source':'Source','audit.result':'Result','audit.result.success':'Success','audit.result.denied':'Denied','resource.helios.category':'Travel','resource.helios.description':'Expense reimbursement / travel platform.','resource.netsuite.category':'ERP / Finance','resource.netsuite.description':'Synthetic finance ERP workspace.','resource.sharepoint.category':'Collaboration','resource.sharepoint.description':'Synthetic SSC document and knowledge workspace.','resource.datawind.category':'BI Analytics','resource.datawind.description':'Synthetic finance and operations analytics dashboards.','resource.fdp.category':'Finance Data','resource.fdp.description':'Synthetic finance data and reporting services.','resource.peopleAccess.category':'IAM Administration','resource.peopleAccess.description':'Synthetic people and access administration workspace.','resource.hylearning.category':'Learning','resource.hylearning.description':'Synthetic learning resources and course portal.','resource.aiChatbot.category':'AI Assistant','resource.aiChatbot.description':'Synthetic SSC knowledge Q&A experience.'
};
const DICTS = {'zh-TW':ZH_TW,'zh-CN':ZH_CN,'en-US':EN};
function normalize(value){ if(!value)return null; const v=String(value).trim().replace('_','-').toLowerCase(); if(v.startsWith('zh-tw')||v.startsWith('zh-hant'))return 'zh-TW'; if(v.startsWith('zh-cn')||v.startsWith('zh-hans')||v==='zh')return 'zh-CN'; if(v.startsWith('en'))return 'en-US'; return null; }
function resolveLocale(){ const q=normalize(new URLSearchParams(location.search).get('lang')); if(q)return q; const injected=normalize(window.__FIN_SSC_PORTAL__?.locale||window.__FIN_SSC_PORTAL__?.larkClientLanguage); if(injected)return injected; for(const item of (navigator.languages||[])){const n=normalize(item); if(n)return n;} return normalize(navigator.language)||'zh-TW'; }
function createTranslator(locale=resolveLocale()){ const selected=DICTS[locale]?locale:'zh-TW'; const dict=DICTS[selected]; const t=(key,vars={})=>{let text=dict[key]??ZH_TW[key]??key; Object.entries(vars).forEach(([k,v])=>text=text.replaceAll(`{${k}}`,String(v))); return text;}; return Object.freeze({locale:selected,t}); }


// ---- app.js ----
let context = getPortalContext();
const { locale, t } = createTranslator();
let activeSettingsTab = 'resources';
const peopleState = { search: '', department: '', mode: 'all', page: 1, pageSize: 50 };
const auditState = { search: '', eventType: '', page: 1, pageSize: 50 };
const $ = id => document.getElementById(id);
const esc = v => String(v).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[c]));
const roleLabel = r => t(r.labelKey);
const rName = r => r.customName || r.name;
const rCategory = r => r.customCategory || t(r.categoryKey);
const rDesc = r => r.customDescription || t(r.descriptionKey);
const set = (id, value) => { if ($(id)) $(id).textContent = value; };
const debounce = (fn, wait = 180) => { let timer; return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), wait); }; };

function applyLocale(){
  document.documentElement.lang = locale==='zh-TW'?'zh-Hant-TW':locale==='zh-CN'?'zh-Hans-CN':'en-US'; document.title=t('app.title');
  $('sidebar').setAttribute('aria-label',t('nav.main')); $('identityCard').setAttribute('aria-label',t('identity.aria')); $('roleSwitcher').setAttribute('aria-label',t('role.previewAria')); $('aboutButton').setAttribute('aria-label',t('about.button')); $('aboutButton').title=t('about.button');
  const pairs={syntheticLabel:'sidebar.synthetic',labelLarkName:'identity.larkName',labelDepartment:'identity.department',labelBrand:'identity.brand',labelTitle:'identity.title',roleEyebrow:'role.previewEyebrow',roleHelper:'role.previewHelper',homeEyebrow:'home.eyebrow',catalogEyebrow:'catalog.eyebrow',catalogTitle:'catalog.title',resourceSystemHeader:'catalog.system',resourceCategoryHeader:'catalog.category',resourceDescriptionHeader:'catalog.description',resourceAccessHeader:'catalog.access',resourceActionHeader:'catalog.action',comparisonEyebrow:'comparison.eyebrow',comparisonTitle:'comparison.title',comparisonSubtitle:'comparison.subtitle',comparisonAdminChip:'comparison.adminOnly',legendYes:'comparison.yes',legendNo:'comparison.no',prototypeTitle:'prototype.title',prototypeBody:'prototype.body',settingsEyebrow:'settings.eyebrow',settingsTitle:'settings.title',settingsSubtitle:'settings.subtitle',peopleEyebrow:'people.eyebrow',peopleTitle:'people.title',peopleSubtitle:'people.subtitle',auditEyebrow:'audit.eyebrow',auditTitle:'audit.title',auditSubtitle:'audit.subtitle',auditBoundary:'audit.boundary',aboutSubtitle:'about.subtitle',aboutTitle:'about.title',aboutBody:'about.body',aboutBoundary:'about.boundary',aboutClose:'common.close'};
  Object.entries(pairs).forEach(([id,key])=>set(id,t(key)));
}
function renderIdentity(){ const p=context.principal; const initial=(p.displayName||'p')[0].toUpperCase(); set('identityName',p.displayName); set('identityPanelName',p.displayName); set('identityAvatar',initial); set('welcomeIcon',initial); set('identityRole',roleLabel(context.loginRole)); set('identityPanelRole',roleLabel(context.loginRole)); document.querySelectorAll('.panel-avatar').forEach(el=>{el.textContent=initial;}); set('profileName',p.larkUserName); set('profileDepartment',p.department); set('profileBrand',p.brand); set('profileTitle',p.title); }
function goto(page){ const u=new URL(location.href); page==='home'?u.searchParams.delete('page'):u.searchParams.set('page',page); location.assign(u); }
function renderNavigation(){ $('sideNav').innerHTML=context.navigation.map(i=>`<button class="nav-item ${i.page===context.page?'active':''}" data-page="${i.page}" title="${esc(t(i.labelKey))}"><span class="nav-icon">${esc(i.icon)}</span><span class="nav-label">${esc(t(i.labelKey))}</span></button>`).join(''); $('sideNav').querySelectorAll('[data-page]').forEach(b=>b.onclick=()=>{closeMobileNav();goto(b.dataset.page);}); }
function renderRoleSwitcher(){ if(!context.canPreviewRoles){$('roleControl').hidden=true;return;} $('roleControl').hidden=false; $('roleSwitcher').innerHTML=context.allRoles.map(r=>`<button class="role-button ${r.key===context.effectiveRole.key?'active':''}" data-role="${r.key}">${r.icon} ${esc(roleLabel(r))}</button>`).join(''); $('roleSwitcher').querySelectorAll('[data-role]').forEach(b=>b.onclick=()=>{ const u=new URL(location.href); b.dataset.role==='admin'?u.searchParams.delete('viewAs'):u.searchParams.set('viewAs',b.dataset.role); location.assign(u); }); }
function renderWelcome(){ set('welcomeTitle',t('home.welcome',{name:context.principal.displayName})); const preview=context.loginRole.key==='admin'&&context.effectiveRole.key!=='admin'; set('welcomeText',preview?t('home.previewText',{role:roleLabel(context.effectiveRole)}):t('home.welcomeText')); set('catalogSubtitle',t('catalog.subtitle',{role:roleLabel(context.effectiveRole)})); }
function renderMetrics(){ const m=[['▦',t('metric.systems'),context.resources.length,t('metric.systemsDetail')],['◌',t('metric.identity'),roleLabel(context.loginRole),t('metric.identityDetail')],['◷',t('metric.mode'),t('metric.modeValue'),t('metric.modeDetail')],['✓',t('metric.authorization'),t('metric.authorizationValue'),t('metric.authorizationDetail')]]; $('metricGrid').innerHTML=m.map(x=>`<article class="metric-card"><div class="metric-icon">${esc(x[0])}</div><div><div class="metric-label">${esc(x[1])}</div><div class="metric-value">${esc(x[2])}</div><div class="metric-detail">${esc(x[3])}</div></div></article>`).join(''); }
function resMarkup(r,mobile=false){ const name=rName(r),cat=rCategory(r),desc=rDesc(r),launch=`<button class="launch-button" data-resource="${esc(name)}">${esc(t('catalog.launch'))}</button>`; if(mobile)return `<article class="mobile-resource-card"><div class="system-cell"><span class="system-icon">${esc(r.icon)}</span>${esc(name)}</div><p>${esc(desc)}</p><div class="mobile-resource-meta"><span>${esc(cat)}</span><span>${esc(roleLabel(context.effectiveRole))}</span></div>${launch}</article>`; return `<tr><td><div class="system-cell"><span class="system-icon">${esc(r.icon)}</span>${esc(name)}</div></td><td>${esc(cat)}</td><td class="resource-description">${esc(desc)}</td><td><span class="current-role-pill">${esc(roleLabel(context.effectiveRole))}</span></td><td class="action-cell">${launch}</td></tr>`; }
function renderResources(){ set('resourceCount',t('catalog.count',{count:context.resources.length})); $('resourceRows').innerHTML=context.resources.map(r=>resMarkup(r)).join(''); $('mobileResourceList').innerHTML=context.resources.map(r=>resMarkup(r,true)).join(''); document.querySelectorAll('[data-resource]').forEach(b=>b.onclick=()=>toast(t('catalog.launchDemo',{resource:b.dataset.resource}))); }
function renderComparison(){ if(!context.canViewComparison){$('comparisonPanel').hidden=true;return;} $('comparisonPanel').hidden=false; $('comparisonHead').innerHTML=`<tr><th>${esc(t('comparison.resource'))}</th>${context.allRoles.map(r=>`<th>${esc(roleLabel(r))}</th>`).join('')}</tr>`; $('comparisonRows').innerHTML=context.catalog.map(res=>`<tr><td><div class="system-cell"><span class="system-icon">${esc(res.icon)}</span>${esc(rName(res))}</div></td>${context.allRoles.map(role=>`<td><span class="status ${context.hasGrant(role.key,res.key)?'yes':'no'}">${context.hasGrant(role.key,res.key)?'✓':'—'}</span></td>`).join('')}</tr>`).join(''); }
const actions=id=>`<div class="settings-actions"><button id="${id}" class="primary-button">${esc(t('settings.save'))}</button><button class="secondary-button" data-reset>${esc(t('settings.reset'))}</button></div>`;
function bindReset(){ document.querySelectorAll('[data-reset]').forEach(b=>b.onclick=()=>{ if(!confirm(t('settings.resetConfirm')))return; resetPrototypeSettings(); refresh(); toast(t('settings.resetDone')); }); }
function renderResourceTab(){ $('settingsContent').innerHTML=`<div class="settings-section-heading"><div><h2>${esc(t('settings.resources.title'))}</h2><p>${esc(t('settings.resources.subtitle'))}</p></div></div><div class="table-wrap settings-table-wrap"><table class="settings-table"><thead><tr><th>${esc(t('settings.resource.key'))}</th><th>${esc(t('settings.resource.name'))}</th><th>${esc(t('settings.resource.category'))}</th><th>${esc(t('settings.resource.description'))}</th><th>${esc(t('settings.resource.enabled'))}</th></tr></thead><tbody>${context.catalog.map(r=>`<tr data-row="${r.key}"><td><code>${esc(r.key)}</code></td><td><input data-f="name" value="${esc(rName(r))}"></td><td><input data-f="category" value="${esc(rCategory(r))}"></td><td><textarea data-f="description" rows="2">${esc(rDesc(r))}</textarea></td><td class="center-cell"><label class="switch"><input data-f="enabled" type="checkbox" ${r.enabled?'checked':''}><span></span></label></td></tr>`).join('')}</tbody></table></div>${actions('saveResources')}`; $('saveResources').onclick=()=>{ saveResourceSettings([...document.querySelectorAll('[data-row]')].map(row=>({key:row.dataset.row,name:row.querySelector('[data-f=name]').value,category:row.querySelector('[data-f=category]').value,description:row.querySelector('[data-f=description]').value,enabled:row.querySelector('[data-f=enabled]').checked}))); refresh(); toast(t('settings.saved')); }; bindReset(); }
function renderPermissionsTab(){ $('settingsContent').innerHTML=`<div class="settings-section-heading"><div><h2>${esc(t('settings.permissions.title'))}</h2><p>${esc(t('settings.permissions.subtitle'))}</p></div><div class="reserved-role"><button class="secondary-button" disabled>${esc(t('settings.permissions.addRole'))}</button><small>${esc(t('settings.permissions.addRoleHint'))}</small></div></div><div class="table-wrap settings-table-wrap"><table class="permission-editor"><thead><tr><th>${esc(t('settings.permissions.resource'))}</th>${context.allRoles.map(r=>`<th>${esc(roleLabel(r))}</th>`).join('')}</tr></thead><tbody>${context.catalog.map(res=>`<tr><td><div class="system-cell"><span class="system-icon">${esc(res.icon)}</span>${esc(rName(res))}</div></td>${context.allRoles.map(role=>`<td class="center-cell"><input class="grant-checkbox" type="checkbox" data-role="${role.key}" data-resource="${res.key}" ${context.hasGrant(role.key,res.key)?'checked':''}></td>`).join('')}</tr>`).join('')}</tbody></table></div>${actions('saveGrants')}`; $('saveGrants').onclick=()=>{saveRoleGrants([...document.querySelectorAll('.grant-checkbox:checked')].map(i=>({roleKey:i.dataset.role,resourceKey:i.dataset.resource})));refresh();toast(t('settings.saved'));}; bindReset(); }
function renderBaseTab(){ const b=context.baseSettings; $('settingsContent').innerHTML=`<div class="settings-section-heading"><div><h2>${esc(t('settings.base.title'))}</h2><p>${esc(t('settings.base.subtitle'))}</p></div></div><div class="base-settings-grid"><label><span>${esc(t('settings.base.alias'))}</span><input id="baseAlias" value="${esc(b.baseAlias)}"></label><label><span>${esc(t('settings.base.resourceTable'))}</span><input id="resourceTable" value="${esc(b.resourceTable)}"></label><label><span>${esc(t('settings.base.roleTable'))}</span><input id="roleTable" value="${esc(b.roleTable)}"></label><label><span>${esc(t('settings.base.assignmentTable'))}</span><input id="assignmentTable" value="${esc(b.assignmentTable)}"></label><label><span>${esc(t('settings.base.cacheTtl'))}</span><input id="cacheTtlSeconds" type="number" min="60" max="86400" value="${b.cacheTtlSeconds}"></label></div>${actions('saveBase')}`; $('saveBase').onclick=()=>{saveBaseSettings({baseAlias:$('baseAlias').value,resourceTable:$('resourceTable').value,roleTable:$('roleTable').value,assignmentTable:$('assignmentTable').value,cacheTtlSeconds:$('cacheTtlSeconds').value});refresh();toast(t('settings.saved'));}; bindReset(); }
function renderFutureTab(){ const cards=[['settings.future.scope','settings.future.scopeText','S'],['settings.future.org','settings.future.orgText','O'],['settings.future.owner','settings.future.ownerText','V'],['settings.future.approval','settings.future.approvalText','A']]; $('settingsContent').innerHTML=`<div class="settings-section-heading"><div><h2>${esc(t('settings.future.title'))}</h2><p>${esc(t('settings.future.subtitle'))}</p></div></div><div class="future-grid">${cards.map(c=>`<article class="future-card"><div class="future-icon">${c[2]}</div><h3>${esc(t(c[0]))}</h3><p>${esc(t(c[1]))}</p><span class="reserved-pill">Reserved</span></article>`).join('')}</div><div class="settings-actions"><button class="secondary-button" data-reset>${esc(t('settings.reset'))}</button></div>`; bindReset(); }
function renderSettings(){ if(!context.canManageResources)return; const tabs=[['resources','settings.tab.resources'],['permissions','settings.tab.permissions'],['base','settings.tab.base'],['future','settings.tab.future']]; $('settingsTabs').innerHTML=tabs.map(x=>`<button class="settings-tab ${activeSettingsTab===x[0]?'active':''}" data-tab="${x[0]}">${esc(t(x[1]))}</button>`).join(''); $('settingsTabs').querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{activeSettingsTab=b.dataset.tab;renderSettings();}); if(activeSettingsTab==='permissions')renderPermissionsTab(); else if(activeSettingsTab==='base')renderBaseTab(); else if(activeSettingsTab==='future')renderFutureTab(); else renderResourceTab(); }

function peopleRow(x){ return `<tr><td><strong>${esc(x.principal.larkUserName)}</strong><small class="row-key">${esc(x.principalKey)}</small></td><td>${esc(x.principal.department)}</td><td>${esc(x.principal.brand)}</td><td>${esc(x.principal.title)}</td><td><span class="current-role-pill">${esc(roleLabel(x.role))}</span></td></tr>`; }
function peopleCard(x){ return `<article class="people-card"><div class="people-card-head"><div class="identity-avatar mini">E</div><div><strong>${esc(x.principal.larkUserName)}</strong><span>${esc(roleLabel(x.role))}</span></div></div><dl><div><dt>${esc(t('people.department'))}</dt><dd>${esc(x.principal.department)}</dd></div><div><dt>${esc(t('people.brand'))}</dt><dd>${esc(x.principal.brand)}</dd></div><div><dt>${esc(t('people.titleCol'))}</dt><dd>${esc(x.principal.title)}</dd></div></dl></article>`; }
function renderPeopleGroups(items){ const groups=new Map(); items.forEach(x=>{const key=x.principal.department||t('people.unknownDepartment');if(!groups.has(key))groups.set(key,[]);groups.get(key).push(x);}); $('peopleGroupedList').innerHTML=[...groups].map(([department,rows])=>`<section class="people-group"><div class="people-group-heading"><h3>${esc(department)}</h3><span>${esc(t('people.groupCount',{count:rows.length}))}</span></div><div class="people-group-grid">${rows.map(peopleCard).join('')}</div></section>`).join(''); }
function updatePeopleResults(){ const data=queryPeople(peopleState); peopleState.page=data.page; set('peopleResultCount',t('people.results',{count:data.total})); set('peoplePageStatus',t('people.page',{page:data.page,totalPages:data.totalPages})); $('peoplePrev').disabled=data.page<=1; $('peopleNext').disabled=data.page>=data.totalPages; if($('peopleDepartmentFilter').options.length<=1){ $('peopleDepartmentFilter').innerHTML=`<option value="">${esc(t('people.allDepartments'))}</option>${data.departments.map(d=>`<option value="${esc(d)}">${esc(d)}</option>`).join('')}`; $('peopleDepartmentFilter').value=peopleState.department; }
  const grouped=peopleState.mode==='department'; $('peopleAllList').hidden=grouped; $('peopleGroupedList').hidden=!grouped;
  if(grouped) renderPeopleGroups(data.items); else { $('peopleRows').innerHTML=data.items.map(peopleRow).join(''); $('mobilePeopleList').innerHTML=data.items.map(peopleCard).join(''); }
}
function renderPeople(){ if(!context.canViewPeople)return; $('peopleHead').innerHTML=`<tr><th>${esc(t('people.name'))}</th><th>${esc(t('people.department'))}</th><th>${esc(t('people.brand'))}</th><th>${esc(t('people.titleCol'))}</th><th>${esc(t('people.role'))}</th></tr>`; $('peopleSearch').placeholder=t('people.searchPlaceholder'); $('peopleSearch').value=peopleState.search; $('peopleAllMode').textContent=t('people.allMembers'); $('peopleGroupMode').textContent=t('people.groupByDepartment'); $('peoplePrev').textContent=t('people.prev'); $('peopleNext').textContent=t('people.next'); $('peopleAllMode').classList.toggle('active',peopleState.mode==='all'); $('peopleGroupMode').classList.toggle('active',peopleState.mode==='department');
  const onSearch=debounce(()=>{peopleState.search=$('peopleSearch').value;peopleState.page=1;updatePeopleResults();}); $('peopleSearch').oninput=onSearch;
  $('peopleDepartmentFilter').onchange=()=>{peopleState.department=$('peopleDepartmentFilter').value;peopleState.page=1;updatePeopleResults();};
  $('peopleAllMode').onclick=()=>{peopleState.mode='all';peopleState.page=1;renderPeople();}; $('peopleGroupMode').onclick=()=>{peopleState.mode='department';peopleState.page=1;renderPeople();};
  $('peoplePrev').onclick=()=>{peopleState.page=Math.max(1,peopleState.page-1);updatePeopleResults();}; $('peopleNext').onclick=()=>{peopleState.page+=1;updatePeopleResults();}; updatePeopleResults();
}

function auditResultBadge(result){ return `<span class="audit-result ${result==='success'?'success':'denied'}">${esc(t(`audit.result.${result}`))}</span>`; }
function auditRow(x){ const when=new Intl.DateTimeFormat(locale,{year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'}).format(new Date(x.occurredAt)); return `<tr><td>${esc(when)}</td><td><strong>${esc(x.actor)}</strong></td><td><code>${esc(x.type)}</code></td><td>${esc(x.target)}</td><td>${esc(x.source)}</td><td>${auditResultBadge(x.result)}</td></tr>`; }
function auditCard(x){ const when=new Intl.DateTimeFormat(locale,{year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'}).format(new Date(x.occurredAt)); return `<article class="audit-card"><div class="audit-card-head"><strong>${esc(x.type)}</strong>${auditResultBadge(x.result)}</div><dl><div><dt>${esc(t('audit.time'))}</dt><dd>${esc(when)}</dd></div><div><dt>${esc(t('audit.actor'))}</dt><dd>${esc(x.actor)}</dd></div><div><dt>${esc(t('audit.target'))}</dt><dd>${esc(x.target)}</dd></div><div><dt>${esc(t('audit.source'))}</dt><dd>${esc(x.source)}</dd></div></dl></article>`; }
function updateAuditResults(){ const data=queryAudit(auditState); auditState.page=data.page; set('auditResultCount',t('audit.results',{count:data.total})); set('auditPageStatus',t('audit.page',{page:data.page,totalPages:data.totalPages})); $('auditPrev').disabled=data.page<=1; $('auditNext').disabled=data.page>=data.totalPages; if($('auditTypeFilter').options.length<=1){$('auditTypeFilter').innerHTML=`<option value="">${esc(t('audit.allTypes'))}</option>${data.eventTypes.map(x=>`<option value="${esc(x)}">${esc(x)}</option>`).join('')}`; $('auditTypeFilter').value=auditState.eventType;} $('auditRows').innerHTML=data.items.map(auditRow).join(''); $('mobileAuditList').innerHTML=data.items.map(auditCard).join(''); }
function renderAudit(){ if(!context.canViewAudit)return; $('auditSearch').placeholder=t('audit.searchPlaceholder'); $('auditSearch').value=auditState.search; $('auditPrev').textContent=t('audit.prev'); $('auditNext').textContent=t('audit.next'); $('auditHead').innerHTML=`<tr><th>${esc(t('audit.time'))}</th><th>${esc(t('audit.actor'))}</th><th>${esc(t('audit.event'))}</th><th>${esc(t('audit.target'))}</th><th>${esc(t('audit.source'))}</th><th>${esc(t('audit.result'))}</th></tr>`; const onSearch=debounce(()=>{auditState.search=$('auditSearch').value;auditState.page=1;updateAuditResults();}); $('auditSearch').oninput=onSearch; $('auditTypeFilter').onchange=()=>{auditState.eventType=$('auditTypeFilter').value;auditState.page=1;updateAuditResults();}; $('auditPrev').onclick=()=>{auditState.page=Math.max(1,auditState.page-1);updateAuditResults();}; $('auditNext').onclick=()=>{auditState.page+=1;updateAuditResults();}; updateAuditResults(); }

function renderPage(){ $('homeView').hidden=context.page!=='home'; $('resourceSettingsView').hidden=context.page!=='resource-settings'; $('peopleOverviewView').hidden=context.page!=='people-overview'; $('auditView').hidden=context.page!=='audit'; if(context.page==='resource-settings')renderSettings(); if(context.page==='people-overview')renderPeople(); if(context.page==='audit')renderAudit(); }
function refresh(){ context=getPortalContext();renderIdentity();renderNavigation();renderRoleSwitcher();renderWelcome();renderMetrics();renderResources();renderComparison();renderPage(); }
function toast(msg){ const x=$('toast');x.textContent=msg;x.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>x.classList.remove('show'),2600); }
function setupAbout(){ const d=$('aboutDialog'); $('aboutButton').onclick=()=>d.showModal?d.showModal():d.setAttribute('open',''); d.onclick=e=>{if(e.target===d)d.close();}; }
function setupIdentityPanel(){ const card=$('identityCard'), toggle=$('identityToggle'), panel=$('identityPanel'); const close=()=>{panel.hidden=true;toggle.setAttribute('aria-expanded','false');card.classList.remove('open');}; const open=()=>{panel.hidden=false;toggle.setAttribute('aria-expanded','true');card.classList.add('open');}; toggle.onclick=e=>{e.stopPropagation(); panel.hidden?open():close();}; panel.onclick=e=>e.stopPropagation(); document.addEventListener('click',close); document.addEventListener('keydown',e=>{if(e.key==='Escape')close();}); }
function openMobileNav(){document.body.classList.add('mobile-nav-open');$('mobileNavBackdrop').hidden=false;} function closeMobileNav(){document.body.classList.remove('mobile-nav-open');$('mobileNavBackdrop').hidden=true;}
function setupSidebar(){ const shell=$('appShell'),btn=$('sidebarCollapse'); shell.classList.toggle('sidebar-collapsed',localStorage.getItem('fin-ssc-demo:sidebar-collapsed')==='1'); const sync=()=>{const c=shell.classList.contains('sidebar-collapsed');btn.textContent=c?'›':'‹';btn.title=btn.ariaLabel=c?t('sidebar.expand'):t('sidebar.collapse');};sync(); btn.onclick=()=>{shell.classList.toggle('sidebar-collapsed');localStorage.setItem('fin-ssc-demo:sidebar-collapsed',shell.classList.contains('sidebar-collapsed')?'1':'0');sync();}; $('mobileMenuButton').ariaLabel=t('sidebar.open');$('mobileMenuButton').onclick=openMobileNav;$('mobileNavBackdrop').onclick=closeMobileNav;window.addEventListener('resize',()=>{if(innerWidth>780)closeMobileNav();}); }

applyLocale();setupAbout();setupIdentityPanel();setupSidebar();refresh();

})();
