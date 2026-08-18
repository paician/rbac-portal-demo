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

export const SYNTHETIC_PEOPLE_COUNT = 3200;

export function createSyntheticPeople(count = SYNTHETIC_PEOPLE_COUNT) {
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
