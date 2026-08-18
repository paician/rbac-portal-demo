# RBAC Portal Demo R2.5

GitHub Pages 相容的 Vanilla HTML/CSS/JavaScript Prototype，用於驗證 Finance SSC Portal 的 Role-based UI、Resource Catalog、管理員 Authoring UI、人員目錄、Audit、多語與 H5 響應式行為。所有資料均為 synthetic data。

## 本機執行

可直接開啟 `index.html`，或使用：

```powershell
python -m http.server 8080
```

## 角色 URL

- `?role=employee`：普通員工
- `?role=finance`：財務員工
- `?role=manager`：主管
- `?role=admin`：管理員
- `?role=admin&viewAs=finance`：管理員預覽財務員工資源視圖

只有管理員可看到 Role Switcher 與角色／資源對照表。一般三種角色的左側導覽只有「首頁」。管理員導覽為「首頁／資源設定／人員總覽／Audit」。

## 管理頁

- `?role=admin&page=resource-settings`
  - 資源目錄
  - 角色權限
  - Base 基本設定
  - 預留擴充
- `?role=admin&page=people-overview`
  - 搜尋：Lark User Name、部門、品牌、職稱、角色
  - Department filter
  - 全部成員／依部門分組
  - 每頁最多 50 筆，避免一次建立 3,000+ DOM rows
  - Prototype lazy-generate 3,200 筆 synthetic records，用來驗證大型目錄 UX
- `?role=admin&page=audit`
  - synthetic 登入／資源點擊／管理異動／人員 Joiner-Mover-Leaver event
  - 搜尋、事件類型篩選與分頁

## 3,000+ 人員目錄負荷邊界

目前 UI 不直接取得完整 People dataset；`app.js` 僅透過 `queryPeople()` adapter 查詢，回傳最多 50 筆 UI page。Prototype adapter 在瀏覽器端 lazy-generate synthetic records 後進行 filter/page；正式版應把相同 contract 替換成 Flask API / Base serving adapter，改由 server-side 搜尋、Department filter、排序與 pagination。

這可避免正式 3,000+ 筆資料直接一次渲染到 DOM，也保留未來直接對應既有 Base 欄位的空間：

- Lark User Name
- Department
- Brand
- Job Title
- Role / Assignment

## Audit boundary

Prototype 的 Audit event 只是假資料。Production 不得依賴 browser JavaScript 自行寫 Audit；登入、resource launch、admin mutation、JML / 人員入離職與異動紀錄都應由 Flask / backend integration 寫入 durable audit store，並保留 actor、event type、target、source、result 與 timestamp。

## Prototype persistence

資源／Grant／Base 設定只儲存在瀏覽器 `localStorage`。未來應以 Flask API / Base Adapter 取代 `adapters/portal-adapter.js` 的本機 persistence；UI 不直接讀取 `data/grants.js`。

## 多語 Locale resolution

目前支援：`zh-TW`、`zh-CN`、`en-US`。

解析優先序：

```text
?lang=zh-TW
→ window.__FIN_SSC_PORTAL__.locale
→ window.__FIN_SSC_PORTAL__.larkClientLanguage
→ navigator.languages
→ navigator.language
→ zh-TW
```

## Data / Adapter boundary

- `data/roles.js`：角色與 capability
- `data/profiles.js`：synthetic identity profile（目前全部名稱為 Evren）
- `data/people.js`：大型 synthetic People directory generator
- `data/audit-events.js`：synthetic Audit event generator
- `data/resources.js`：Resource Catalog defaults
- `data/grants.js`：Role / Resource Grant defaults
- `data/navigation.js`：角色導覽
- `data/base-settings.js`：Synthetic Base defaults
- `data/i18n.js`：Locale 與翻譯字典
- `adapters/portal-adapter.js`：UI 唯一 Portal Context / query / mutation adapter

## Security boundary

JavaScript RBAC 只用於 Prototype UI，不是 security boundary。正式系統仍必須由 Flask server-side 根據 `Portal Session → Principal → Effective Grants → Resource / Scope` 執行 authorization。

## Direct local preview / generated bundle

`index.html` 載入 generated classic-script `app.bundle.js`，因此 Chrome/Edge 可直接以 `file://` 開啟。

`data/`、`adapters/` 與 `app.js` 為 source of truth。修改後重新生成：

```powershell
node .\tools\build-bundle.mjs
```


## R2.3 notes

- Identity display is compact by default and opens a floating panel on click.
- Synthetic display name is `Evren`; GitHub account identity is intentionally kept separate from in-app demo identities.
- Admin `viewAs=employee|finance|manager` hides the role/resource comparison table; only admin-as-admin can see the comparison table.
- For GitHub publishing, use the repository owner account configured in Git. Do not expose real employee, tenant, Base, credential, production URL, or internal organization data in this prototype.


## Admin-only Runtime Warning Indicator

管理員登入時顯示 synthetic Runtime Warning Indicator；一般角色完全不可見。管理員使用 `viewAs` 預覽其他角色時仍保持可見，因為登入 Principal 仍為 Admin。

展示資料固定為 synthetic UX：

- Authorization Status: `Degraded`
- Cache State: `Last-known-good`
- Cache Age: `8 min`
- Max Stale: `15 min`
- Last Reconciliation: `2 min ago`

此功能只驗證 hover / click 狀態提示的 UX，不建立正式 Runtime Health domain/schema，不連 Redis、Base、PostgreSQL，也不代表 Production health contract。


## R2.6 Shell / Permission freshness UX

- Admin-only Runtime Warning 已移至 Sidebar，仍僅為 synthetic UX indicator。
- Identity Card 已移至 Sidebar 底部，身份資料仍為 synthetic。
- 新增使用者 Permission Freshness Banner，可用 query parameter 模擬：
  - `?permissionState=current`：不顯示提示（預設）
  - `?permissionState=refresh`：顯示「更新權限」提醒
  - `?permissionState=reauth`：顯示「重新登入」提醒
- Banner action 目前只把 query state 重設為 `current`；沒有執行真正 cache invalidation、session refresh 或重新登入。
- 不建立正式 health、session freshness 或 authorization freshness schema；不接 Redis、Base、PostgreSQL。


## R2.7 UI micro-adjustment

- Runtime Warning popover 在桌面版提升至 App Shell 最上層，避免被 Main Content 卡片覆蓋。
- 僅調整 stacking order；RBAC、View-As、Permission Freshness 與 synthetic runtime payload 不變。
