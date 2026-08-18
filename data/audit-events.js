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

export function createSyntheticAuditEvents(count = 96) {
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
