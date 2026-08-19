import fs from 'node:fs';
import assert from 'node:assert/strict';

class MemoryStorage {
  constructor(){ this.map=new Map(); }
  getItem(key){ return this.map.has(key)?this.map.get(key):null; }
  setItem(key,value){ this.map.set(key,String(value)); }
  removeItem(key){ this.map.delete(key); }
  clear(){ this.map.clear(); }
}

globalThis.localStorage = new MemoryStorage();
globalThis.location = { search: '?role=admin&page=people-overview' };
globalThis.window = globalThis;
Object.defineProperty(globalThis, 'navigator', { value: { languages: ['zh-TW'], language: 'zh-TW' }, configurable: true });

const adapter = await import('../adapters/portal-adapter.js');
const { createTranslator } = await import('../data/i18n.js');

function setSearch(value){ globalThis.location.search=value; }
function actionKeys(rows){ return rows.flatMap(row=>row.actions.map(action=>`${row.resourceKey}:${action}`)).sort(); }
function sourceKeys(row){ return (row?.sources||[]).map(s=>`${s.type}:${s.key}`).sort(); }

adapter.resetPrototypeSettings();

// 1. Admin can query People Overview and open a principal.
setSearch('?role=admin&page=people-overview');
const people = adapter.queryPeople({ page:1, pageSize:50 });
assert.equal(people.items.length, 50);
const financePrincipal = people.items.find(x=>x.moduleKeys.includes('finance') && !x.moduleKeys.includes('manager'));
assert.ok(financePrincipal, 'finance principal fixture');
const wb = adapter.getPrincipalPermissionWorkbench(financePrincipal.principalKey);
assert.ok(wb);
assert.ok(Array.isArray(wb.principal.brands));
assert.ok(['active','inactive'].includes(wb.principal.status));
assert.ok(wb.modules.includes('employee'));
assert.ok(wb.modules.includes('finance'));
const brandShapes = people.items.map(x=>x.principal.brands.length);
assert.ok(brandShapes.some(n=>n===0));
assert.ok(brandShapes.some(n=>n>=2));
assert.equal(wb.activeResources.length, adapter.getPortalContext().catalog.filter(r=>r.enabled).length);

// 2. Non-admin cannot access People Overview / Workbench.
setSearch(`?role=employee&page=people-overview&principal=${financePrincipal.principalKey}`);
assert.equal(adapter.getPortalContext().page, 'home');
assert.equal(adapter.queryPeople().items.length, 0);
assert.equal(adapter.getPrincipalPermissionWorkbench(financePrincipal.principalKey), null);

// 3/4. Admin can toggle explicit Finance / HOD / Admin modules in synthetic dry-run.
setSearch('?role=admin&page=people-overview');
const toggled = adapter.previewPrincipalPermissionChanges(financePrincipal.principalKey, { modules:['employee','manager','admin'], individualGrants:[] });
assert.ok(toggled.after.some(x=>x.resourceKey==='people-access'), 'Admin control-plane resource appears');
assert.ok(toggled.after.some(x=>x.resourceKey==='datawind'), 'HOD resource appears');
assert.ok(!toggled.after.some(x=>x.resourceKey==='netsuite' && x.sources.some(s=>s.type==='module'&&s.key==='admin')), 'Admin module is not business superuser');

// 5/6. Individual Grant: redundant Helios blocked; Finance Discover-only Datawind can add Launch.
const redundant = adapter.validateIndividualGrantDraft(financePrincipal.principalKey, { modules:wb.modules, individualGrants:[] }, {
  resourceKey:'helios', actions:['discover','launch'], validity:'permanent', reason:'duplicate test'
});
assert.equal(redundant.ok, false);
assert.equal(redundant.code, 'redundant-module');
assert.ok(redundant.sourceKeys.includes('finance'));

const addLaunch = {
  id:'test-datawind-launch', resourceKey:'datawind', actions:['launch'], validity:'permanent', reason:'synthetic exception'
};
const nonRedundant = adapter.validateIndividualGrantDraft(financePrincipal.principalKey, { modules:wb.modules, individualGrants:[] }, addLaunch);
assert.equal(nonRedundant.ok, true);
const saved = adapter.savePrincipalPermissionChanges(financePrincipal.principalKey, { modules:wb.modules, individualGrants:[addLaunch] });
assert.equal(saved.ok, true);
const datawind = saved.workbench.effectiveAuthorization.find(x=>x.resourceKey==='datawind');
assert.deepEqual(datawind.actions, ['discover','launch']);
assert.ok(sourceKeys(datawind).includes('module:finance'));
assert.ok(sourceKeys(datawind).includes('individual:test-datawind-launch'));

// Resource Access Matrix always includes active resources and exposes no DENY state.
let matrix = adapter.getPrincipalResourceAccessMatrix(financePrincipal.principalKey);
assert.equal(matrix.length, adapter.getPortalContext().catalog.filter(r=>r.enabled).length);
const matrixHelios = matrix.find(row=>row.resource.key==='helios');
assert.equal(matrixHelios.actions.discover.checked, true);
assert.equal(matrixHelios.actions.discover.locked, true);
assert.equal(matrixHelios.actions.launch.checked, true);
assert.equal(matrixHelios.actions.launch.locked, true);
assert.equal('deny' in matrixHelios.actions.launch, false);
const matrixDatawind = matrix.find(row=>row.resource.key==='datawind');
assert.equal(matrixDatawind.actions.discover.locked, true);
assert.equal(matrixDatawind.actions.launch.individual, true);
assert.equal(matrixDatawind.actions.launch.locked, false);

// Removing an Individual-only action leaves module actions intact and creates no DENY.
matrix = adapter.getPrincipalResourceAccessMatrix(financePrincipal.principalKey, { modules:wb.modules, individualGrants:[] });
assert.equal(matrix.find(row=>row.resource.key==='datawind').actions.discover.checked, true);
assert.equal(matrix.find(row=>row.resource.key==='datawind').actions.launch.checked, false);

// Adding HOD makes the saved Datawind Launch individual action redundant; Save blocks until explicitly removed.
const redundancyFromModuleChange = adapter.savePrincipalPermissionChanges(financePrincipal.principalKey, { modules:['employee','finance','manager'], individualGrants:[addLaunch] });
assert.equal(redundancyFromModuleChange.ok, false);
assert.equal(redundancyFromModuleChange.code, 'redundant-module');
assert.deepEqual(redundancyFromModuleChange.validation.redundantActions, ['launch']);

// 7/8. Change impact: compound Finance + HOD shows REMOVED and SOURCE_CHANGED when Finance removed.
const compound = adapter.queryPeople({ page:1, pageSize:100 }).items.find(x=>x.moduleKeys.includes('finance')&&x.moduleKeys.includes('manager'));
assert.ok(compound, 'compound Finance + HOD fixture');
const compoundWb = adapter.getPrincipalPermissionWorkbench(compound.principalKey);
const impactPreview = adapter.previewPrincipalPermissionChanges(compound.principalKey, { modules:['employee','manager'], individualGrants:compoundWb.individualGrants });
assert.ok(impactPreview.impact.removed.some(x=>x.resourceKey==='fdp'&&x.action==='launch'));
assert.ok(impactPreview.impact.sourceChanged.some(x=>x.resourceKey==='datawind'&&x.action==='discover'));

// 9. Brand metadata does not affect effective authorization.
const financeCandidates = adapter.queryPeople({ page:1, pageSize:100 }).items.filter(x=>x.moduleKeys.length===2&&x.moduleKeys.includes('finance'));
const peer0 = financeCandidates[0];
const peer1 = financeCandidates.find(x=>JSON.stringify(x.principal.brands)!==JSON.stringify(peer0.principal.brands));
const financePeers = [peer0, peer1];
assert.ok(financePeers.every(Boolean));
assert.notDeepEqual(financePeers[0].principal.brands, financePeers[1].principal.brands);
const peerA = adapter.previewPrincipalPermissionChanges(financePeers[0].principalKey,{modules:['employee','finance'],individualGrants:[]});
const peerB = adapter.previewPrincipalPermissionChanges(financePeers[1].principalKey,{modules:['employee','finance'],individualGrants:[]});
assert.deepEqual(actionKeys(peerA.after),actionKeys(peerB.after));

// 10. Category changes are display metadata only and do not affect effective authorization.
const beforeCategory = adapter.previewPrincipalPermissionChanges(financePeers[0].principalKey,{modules:['employee','finance'],individualGrants:[]});
const ctx = adapter.getPortalContext();
adapter.saveResourceSettings(ctx.catalog.map(r=>({key:r.key,name:r.customName||r.name,category:r.key==='helios'?'Synthetic Changed Category':(r.customCategory||r.categoryKey),description:r.customDescription||'',enabled:r.enabled})));
const afterCategory = adapter.previewPrincipalPermissionChanges(financePeers[0].principalKey,{modules:['employee','finance'],individualGrants:[]});
assert.deepEqual(actionKeys(beforeCategory.after),actionKeys(afterCategory.after));
adapter.resetPrototypeSettings();

// Resource Settings creates a synthetic GLOBAL Resource with zero grants.
setSearch('?role=admin&page=resource-settings&tab=resources&mode=create');
const created = adapter.createSyntheticResource({ key:'travel-analytics', name:'Travel Analytics', category:'Analytics', description:'Synthetic matrix fixture', enabled:true });
assert.equal(created.ok, true);
assert.equal(created.grantsCreated, 0);
let customPortal = adapter.getPortalContext();
assert.ok(customPortal.catalog.some(resource=>resource.key==='travel-analytics'&&resource.enabled));
assert.ok(customPortal.allRoles.every(role=>customPortal.hasGrant(role.key,'travel-analytics')===false));
const customMatrix = adapter.getPrincipalResourceAccessMatrix(financePrincipal.principalKey);
const customRow = customMatrix.find(row=>row.resource.key==='travel-analytics');
assert.ok(customRow);
assert.equal(customRow.granted, false);
assert.equal(customRow.actions.discover.checked, false);
assert.equal(customRow.actions.launch.checked, false);
setSearch('?role=employee&page=resource-settings');
assert.equal(adapter.createSyntheticResource({ key:'forbidden-resource', name:'Forbidden' }).code, 'forbidden');
setSearch('?role=admin&page=people-overview');
adapter.resetPrototypeSettings();

// 11. UI authorization mutations keep the adapter seam.
const appSource = fs.readFileSync(new URL('../app.js', import.meta.url), 'utf8');
assert.ok(appSource.includes("from './adapters/portal-adapter.js'"));
assert.ok(!appSource.includes("from './data/grants.js'"));
assert.ok(!appSource.includes("from './data/resources.js'"));
assert.ok(appSource.includes('savePrincipalPermissionChanges'));
assert.ok(appSource.includes('getPrincipalResourceAccessMatrix'));
assert.ok(appSource.includes('createSyntheticResource'));
assert.ok(!appSource.includes('fin-ssc-demo:custom-resources'));
assert.ok(appSource.includes('data-matrix-action'));
assert.ok(appSource.includes("state.locked?'disabled':''"));
const effectiveRenderer = appSource.slice(appSource.indexOf('function effectiveTable'), appSource.indexOf('function impactItem'));
assert.ok(!effectiveRenderer.includes('type="checkbox"'));

// 12. i18n Workbench keys across supported locales.
for (const locale of ['zh-TW','zh-CN','en-US']) {
  const {t} = createTranslator(locale);
  assert.notEqual(t('workbench.title'),'workbench.title');
  assert.notEqual(t('workbench.individualTitle'),'workbench.individualTitle');
  assert.notEqual(t('workbench.matrixTitle'),'workbench.matrixTitle');
  assert.notEqual(t('settings.create.title'),'settings.create.title');
  assert.notEqual(t('role.manager'),'role.manager');
}

// 13. Desktop/H5 workbench layout selectors exist.
const css = fs.readFileSync(new URL('../styles.css', import.meta.url), 'utf8');
assert.ok(css.includes('.principal-workbench'));
assert.ok(css.includes('@media(max-width:780px)'));
assert.ok(css.includes('.mobile-effective-list'));
assert.ok(css.includes('.resource-matrix-table'));
assert.ok(css.includes('.mobile-resource-matrix'));

// 14. Admin View-As / Resource Settings / Runtime Warning regressions.
setSearch('?role=admin&viewAs=finance');
let portal = adapter.getPortalContext();
assert.equal(portal.loginRole.key,'admin');
assert.equal(portal.effectiveRole.key,'finance');
assert.equal(portal.canViewRuntimeWarning,true);
assert.equal(portal.canViewComparison,false);
setSearch('?role=admin&page=resource-settings');
portal=adapter.getPortalContext();
assert.equal(portal.page,'resource-settings');
assert.equal(portal.canManageResources,true);
setSearch('?role=employee&page=resource-settings');
portal=adapter.getPortalContext();
assert.equal(portal.page,'home');
assert.equal(portal.canManageResources,false);

console.log('Principal Permission Workbench validation PASS');
