# FIN-SSC Static UX Prototype R3 — 工作上下文交接

> **狀態：** 本文件僅供工作階段上下文交接使用，以支援跨機器、Codex session、Cursor 與 ChatGPT thread 的工作連續性。本文件不是 canonical architecture document，也不是 Production Architecture 的 source of truth。

最後驗證日期：2026-09-05（Asia/Taipei）

## 儲存庫識別資訊（Repository Identity）

- 專案：FIN-SSC RBAC Portal Demo／FIN-SSC Static UX Architecture Validation Prototype。
- Canonical repository：`paician/rbac-portal-demo`。
- 目前 `origin` 的 fetch／push URL：`https://github.com/paician/rbac-portal-demo.git`。
- R3-SUX-01 授權 baseline：`670e054546511b6d656ce7de93b277e07919fc3f`。
- R3-SUX-02 授權 baseline：`7f6c172435351ceb9ab945aca24ddc442d2bc6af`。
- 目前 working branch：`feat/r3-sux-02-component-consolidation`；R3-SUX-02 implementation 尚未建立 commit。
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

**R3-SUX-02：HUMAN REVIEW PASS / READY FOR GIT CHECKPOINT。**

R3-SUX-01 已關閉並整合至 `main`。R3-SUX-02 元件收斂與 R1 motion repair 均已完成，Human UX Re-Review 已確認 Sidebar、Role selector、Resource launch、主要按鈕、Switch、Toast、Mobile drawer 與 R3 shell controls 通過；Workbench／Matrix 與 mobile-specific information architecture 保持原結構，Runtime Warning behavior／popover architecture未重構。目前僅等待 R3-SUX-02 Git checkpoint，尚未合併至 `main`。R3-SUX-03 為 `NOT AUTHORIZED`，Production Implementation 維持 `BLOCKED`。

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
- 已以 local vendored `@tabler/core 1.4.0` 建立 foundation adoption；未加入 Tabler JavaScript 或 framework runtime。
- 已新增 FIN-SSC semantic token stylesheet 與 R3 shell override stylesheet；既有 `styles.css` 與 validated feature component styling 仍保留。
- 已新增 FIN-SSC shared semantic component stylesheet，統一共用 button、badge、card、page header、form、tab、pagination 與 generic table presentation；`styles.css` 持續作為 R2 validated compatibility layer，`r3-shell.css` 保留 surface／shell／layout responsibility。
- 已建立 Workspace／Admin Console UX surface、Admin-only surface switcher、minimal Admin Overview，以及 Workspace 的 disabled Reserved Ticket／Workflow／AI positions。
- `View-As` 非 Admin 身分時會進入 Workspace Preview Mode，隱藏 Admin Console surface selector 與 navigation，並保留明確返回管理員的控制；正常 Admin 與 Legacy Admin page URL 仍可進入 Admin Console context。
- Desktop sidebar collapse control 已調整為從 sidebar／main content 邊界凸出的 dedicated control；mobile／H5 仍使用既有 drawer navigation。
- Global shell 已提供 `zh-TW`、`zh-CN`、`en-US` visible locale switcher；切換時保留既有 query state，並以 browser-only `portal_lang` preference 提供 fallback。
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

目前下一個獲授權的動作僅為 R3-SUX-02 Git checkpoint 與 feature branch push；不得合併至 `main`。R3-SUX-03 為 `NOT AUTHORIZED`，Production Implementation 為 `BLOCKED`；未取得明確授權前，不得開始下一 Stage 或加入任何 Production integration。
