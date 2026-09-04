# FIN-SSC Static UX Prototype R3 — 工作上下文交接

> **狀態：** 本文件僅供工作階段上下文交接使用，以支援跨機器、Codex session、Cursor 與 ChatGPT thread 的工作連續性。本文件不是 canonical architecture document，也不是 Production Architecture 的 source of truth。

最後驗證日期：2026-09-04（Asia/Taipei）

## 儲存庫識別資訊（Repository Identity）

- 專案：FIN-SSC RBAC Portal Demo／FIN-SSC Static UX Architecture Validation Prototype。
- Canonical repository：`paician/rbac-portal-demo`。
- 目前 `origin` 的 fetch／push URL：`https://github.com/paician/rbac-portal-demo.git`。
- 目前 branch 與已驗證 revision：`main`，位於 `173366cf74bc26bacd699ce545b7badef226051e`（`docs: establish R3 static UX context governance`）。
- Repository identity discrepancy：`RESOLVED`。
- Resolution evidence：上一輪 GitHub push redirect 明確回報 repository 已移至 `https://github.com/paician/rbac-portal-demo.git`；目前 `origin` 已指向此 canonical URL。

## 目前 R2.7 Baseline

R3 必須在此 repository 內延續已驗證的 R2 UX，不是 greenfield rebuild。

目前有效 baseline 為 R2.7。`README.md` 的主標題仍標示 R2.5，但文件中的 R2.6、R2.7 說明與實作均已包含後續 UX 工作。R2.7 是 UI micro-adjustment：修正桌面版 Runtime Warning popover 的 stacking order，同時維持 RBAC、Admin View-As、Permission Freshness 與 synthetic runtime payload 不變。

目前 `main` 亦已包含合併完成的 Principal Permission Workbench 與 Resource Access Matrix。即使部分 source comment 使用 R3／R3.1 標籤，這些功能仍視為 R3 的既有 baseline capability。

## R3 目標

在保留已驗證 R2 行為的前提下，將現有 RBAC Portal Demo 演進為 **FIN-SSC Static UX Architecture Validation Prototype**。

- Tabler 是 R3 演進所採用的 UI primitive foundation。
- FIN-SSC 擁有 Design System 與 Product UX 的決策權。
- Tabler primitive 用於支援 FIN-SSC 的產品決策與互動模式，不得取代這些決策與模式。

## 目前 R3 階段

**Context Bootstrap 與 Repository Identity Reconciliation Human Review 均已完成。**

目前已將此 repository 盤點為源自 R2.7、並包含已合併 Permission Workbench capability 的 static prototype。Repository identity discrepancy 已依 GitHub push redirect 與目前 `origin` 設定完成 reconciliation，且已通過 Human Review。本文件本身不授權廣泛的 R3 UI migration 或產品實作。

## 必須保留的 UX 能力

除非後續任務提出明確且經 review 的變更理由，否則必須保留：

- `adapters/portal-adapter.js` 所提供的 UI-to-data adapter boundary。
- Synthetic fixture 與僅限瀏覽器使用的 prototype persistence。
- Role-based navigation、effective resource filtering、Admin role preview／View-As，以及僅限 Admin 可見的 role/resource comparison。
- Admin Resource Settings，包含 Resource Catalog、role grant、Base settings 與 reserved extension UX。
- People Overview，包含搜尋、department filter、grouped/list view、bounded pagination，以及包含 3,200 筆 synthetic person record 的 dataset。
- Principal Permission Workbench，包含 explicit permission module、additive ALLOW individual grant、read-only Effective Authorization、change-impact dry-run、Resource Access Matrix，以及建立 global synthetic resource 的能力。
- Synthetic Audit 的搜尋、篩選、桌面版 table、行動版 card 與 pagination。
- Admin-only Runtime Warning 及其 R2.7 overlay 行為。
- Permission Freshness 的 `current`、`refresh`、`reauth` 狀態及其 synthetic presentation 行為。
- Identity UX，以及 signed-in Admin principal 與 effective View-As role 之間的明確區分。
- `zh-TW`、`zh-CN`、`en-US` 的 locale resolution 與翻譯。
- Desktop 與 H5／mobile responsive behavior。
- 在經核准的 R3 implementation approach 仍採用此能力時，透過生成的 `app.bundle.js` 直接以 `file://` 預覽。

## Architecture Boundaries（架構邊界）

- `app.js`、`data/` 與 `adapters/` 是 source；`app.bundle.js` 由 `tools/build-bundle.mjs` 產生。
- UI code 必須透過 `adapters/portal-adapter.js` 使用 portal context、query 與 mutation；不得直接相依於未來的 production service。
- `data/` 只包含 synthetic fixture 與 prototype default，不是 production domain model。
- JavaScript RBAC 僅用於展示 product behavior，不是 authorization boundary 或 security boundary。
- Brand 與 Resource Category 僅為顯示／篩選 metadata，不參與 authorization。
- `manager` 保留為 internal/query compatibility key，並在 UX 顯示為 HOD。
- Admin 代表 Portal Control Plane privilege，不代表自動擁有 Business Resource Superuser access。
- Resource 是 global entity；建立 Resource 與指派 principal grant 必須維持為兩個不同 mutation。
- Effective Authorization 是 derived read-only view。可編輯的 individual grant 僅支援 additive ALLOW；action 未勾選不代表 DENY。
- Canonical architecture document 不在本工作交接的範圍內。除非另行授權，R3 UX 工作不得修改此類文件。

## 明確的 Non-production Constraints

本 prototype 不得新增或暗示下列內容：

- Production API 或 production schema。
- 真實 IAM、Redis、PostgreSQL、Lark、Xero、Base 或其他 production integration。
- 真實 employee、tenant、credential、token、Base ID、internal production URL 或機密組織資料。
- 將 browser-side enforcement 視為 production security control。
- 將 browser-authored event 視為 durable production Audit design。
- 將 `localStorage` 視為 production persistence。
- 將 synthetic Runtime Warning 或 Permission Freshness payload 視為 production health、cache、session 或 authorization contract。
- 將 synthetic Resource Catalog、People dataset、grant rule 或 adapter shape 視為 canonical production repository 或 schema。

## 目前決策

1. R3 是在目前 repository 與已驗證 R2.7 UX 上進行的原地演進。
2. 預設保留既有 capability；任何移除或語意變更都需要明確理由與 review。
3. Tabler 提供 UI primitive；FIN-SSC 持續擁有 visual language、information architecture、interaction behavior 與 product terminology 的決策權。
4. Prototype 維持 static 與 synthetic；Production backend 與 schema 明確延後處理。
5. Architecture validation 必須清楚維持可替換的 boundary，且不得過早定義 production contract。
6. 本文件用於記錄工作狀態與決策，不重複也不取代 canonical architecture documentation。
7. Canonical repository 已確認為 `paician/rbac-portal-demo`，Repository identity discrepancy 狀態為 `RESOLVED`；此次 reconciliation 未建立或 rename repository，也未變更 branch 或 history。

## 目前實作狀態

- Static Vanilla HTML／CSS／JavaScript prototype 已存在，可直接開啟或透過 local static server 執行。
- 目前 UI 主要使用 repository-native markup 與 CSS；Tabler-based R3 migration 尚未實作。
- R2.7 Runtime Warning stacking behavior 已存在。
- R2.6 shell placement 與 Permission Freshness simulation 已存在。
- RBAC view、responsive behavior、三種 locale、Resource Settings、People Overview、synthetic Audit 與 browser persistence 已存在。
- Principal Permission Workbench 與 Resource Access Matrix 已合併至 `main`。
- 在已驗證 revision 上，`tools/validate-workbench.mjs` 驗證通過。
- 尚未加入 production integration 或 production schema。
- 本 R3 Context 工作未修改 canonical architecture document。

## Review Gate（審查關卡）

在開始任何廣泛的 R3 implementation 前，必須 review 並核准：

- 本 baseline inventory；Repository Identity Reconciliation 另依其 Human Review gate 確認。
- 預定的 R3 UX delta，以及納入範圍的 screen 或 flow。
- 如何引入 Tabler primitive，且不造成 preserved behavior regression。
- 針對 RBAC semantics、Admin-only state、i18n、responsive／H5 behavior、Runtime Warning、Permission Freshness、People Overview 與 Permission Workbench 的 preservation check。
- 確認 proposed work 持續維持 static／synthetic，且不建立 production contract。

通過此 gate 必須取得明確的 task authorization；本文件存在不代表 application refactor 或 migration 已獲核准。

## 下一個獲授權的任務

目前下一個獲授權的工作僅限 Repository Identity Reconciliation 的 Git checkpoint。完成 checkpoint 後，仍必須等待明確的 R3 implementation 或 design-validation task。在取得該授權前，不得開始 Tabler migration、變更 preserved UX semantics、新增 production integration，或修改 canonical architecture documentation。
