// 資源授權資料：UI 不直接讀取這份表，而是透過 adapter 取得 read model。
export const ROLE_RESOURCE_GRANTS = Object.freeze([
  ['employee', 'helios'], ['employee', 'sharepoint'], ['employee', 'hylearning'], ['employee', 'ai-chatbot'],
  ['finance', 'helios'], ['finance', 'netsuite'], ['finance', 'sharepoint'], ['finance', 'datawind'], ['finance', 'fdp'], ['finance', 'hylearning'], ['finance', 'ai-chatbot'],
  ['manager', 'helios'], ['manager', 'netsuite'], ['manager', 'sharepoint'], ['manager', 'datawind'], ['manager', 'fdp'], ['manager', 'hylearning'], ['manager', 'ai-chatbot'],
  // Admin keeps Employee baseline resources plus the Portal control-plane resource;
  // it is intentionally not a Business Resource Superuser.
  ['admin', 'helios'], ['admin', 'sharepoint'], ['admin', 'people-access'], ['admin', 'hylearning'], ['admin', 'ai-chatbot']
].map(([roleKey, resourceKey]) => Object.freeze({ roleKey, resourceKey, scope: 'portal:launch' })));
