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

export const SYNTHETIC_PEOPLE_COUNT = 3200;

export function createSyntheticPeople(count = SYNTHETIC_PEOPLE_COUNT) {
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
