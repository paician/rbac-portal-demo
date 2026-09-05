export const SURFACES = Object.freeze({
  workspace: Object.freeze({ key: 'workspace', labelKey: 'surface.workspace' }),
  admin: Object.freeze({ key: 'admin', labelKey: 'surface.admin' })
});

export const WORKSPACE_NAVIGATION = Object.freeze([
  Object.freeze({ key: 'home', page: 'home', labelKey: 'nav.home', icon: '⌂', surface: 'workspace' })
]);

export const ADMIN_CONSOLE_NAVIGATION = Object.freeze([
  Object.freeze({ key: 'admin-overview', page: 'admin-overview', labelKey: 'nav.adminOverview', icon: '◫', surface: 'admin' }),
  Object.freeze({ key: 'resource-settings', page: 'resource-settings', labelKey: 'nav.resourceSettings', icon: '⚙', surface: 'admin' }),
  Object.freeze({ key: 'people-overview', page: 'people-overview', labelKey: 'nav.peopleOverview', icon: '◎', surface: 'admin' }),
  Object.freeze({ key: 'audit', page: 'audit', labelKey: 'nav.audit', icon: '≋', surface: 'admin' })
]);

// Compatibility export for existing consumers. Surface-specific UI uses the two lists above.
export const NAVIGATION_BY_ROLE = Object.freeze({
  employee: WORKSPACE_NAVIGATION,
  finance: WORKSPACE_NAVIGATION,
  manager: WORKSPACE_NAVIGATION,
  admin: Object.freeze([...WORKSPACE_NAVIGATION, ...ADMIN_CONSOLE_NAVIGATION])
});
