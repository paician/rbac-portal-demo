export const NAVIGATION_BY_ROLE = Object.freeze({
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
