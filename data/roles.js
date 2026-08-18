export const ROLES = Object.freeze([
  { key: 'employee', labelKey: 'role.employee', icon: '○' },
  { key: 'finance', labelKey: 'role.finance', icon: '◇' },
  { key: 'manager', labelKey: 'role.manager', icon: '□' },
  { key: 'admin', labelKey: 'role.admin', icon: '◆', capabilities: ['preview_roles', 'view_comparison', 'manage_resources', 'view_people', 'view_audit'] }
]);
export const ROLE_BY_KEY = Object.freeze(Object.fromEntries(ROLES.map(role => [role.key, role])));
