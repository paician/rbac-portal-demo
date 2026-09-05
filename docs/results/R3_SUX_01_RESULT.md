# R3-SUX-01 Static UX Foundation & Surface Separation Result

## Result

```text
COMPLETE / READY FOR HUMAN REVIEW
```

## Scope

- 在既有 R2.7 UX 上加入 Tabler primitive foundation 與 FIN-SSC semantic design token layer。
- 建立 Workspace／Admin Console UX surface、Admin-only switcher 與 URL normalization。
- 新增 minimal synthetic Admin Overview。
- 在 Workspace 新增 disabled、non-clickable 的 Ticket／Workflow／AI reserved positions。
- 保留既有 adapter boundary、RBAC／Resource／People／Workbench／Audit semantics、三語、responsive shell 與 generated bundle。
- 新增專案長期治理用的最小 `AGENTS.md` 與 R3-SUX-01 structural validator。

## Changed Files

- `AGENTS.md`
- `index.html`
- `styles/fin-tokens.css`
- `styles/r3-shell.css`
- `app.js`
- `app.bundle.js`（由 build tool 產生）
- `adapters/portal-adapter.js`
- `data/navigation.js`
- `data/i18n.js`
- `package.json`
- `tools/validate-r3-sux-01.mjs`
- `vendor/tabler/1.4.0/tabler.min.css`
- `vendor/tabler/1.4.0/LICENSE`
- `docs/context/R3_STATIC_UX_CONTEXT.md`
- `docs/results/R3_SUX_01_RESULT.md`

## UX Delta

### Tabler Foundation

- Version：`@tabler/core 1.4.0`（固定版本，無 `@latest`）。
- Asset strategy：local vendored CSS；未加入 `tabler.min.js`、npm dependency、framework 或 CDN runtime dependency。
- License：保留 Tabler MIT LICENSE attribution。
- 實際 primitives：container、card、badge、nav、button、grid 與 responsive／flex utilities。

### FIN-SSC Foundation

- 將既有 wood／camel／sand／cream visual identity 映射為 `--fin-*` semantic tokens。
- 維持 `styles.css` 為既有 validated component layer，R3 僅以 `styles/r3-shell.css` 整合新 shell。

### Workspace

- 所有角色預設進入 Workspace；保留 Home、Resource Catalog、role-based filtering、Identity Context 與 Permission Freshness。
- Admin View-As 僅在 Workspace 顯示及生效。
- 新增 Ticket／Workflow／AI reserved positions，全部 disabled、non-clickable 且清楚標示 Reserved。

### Admin Console

- 僅 signed-in Admin 顯示 surface switcher 與 Admin Console navigation。
- Admin Console 固定使用 signed-in Admin principal context；`viewAs` 不套用。
- Legacy Resource Settings／People Overview／Audit URLs 仍可使用並 infer Admin Console surface。
- Minimal Admin Overview 沿用既有 Resource、People、Audit 與 synthetic Runtime context，未建立新 domain model。

## Preservation Validation

| Capability | Final evidence |
|---|---|
| RBAC semantics | PASS — existing Workbench validator |
| Admin View-As | PASS — Workspace only；Admin Console 回到 Admin effective context |
| Resource Settings | PASS — legacy URL 與 adapter mutation assertions preserved |
| People | PASS — query boundary與 3,200 synthetic records preserved |
| Permission Workbench | PASS — modules、additive ALLOW、matrix、read-only effective authorization與 dry-run contract preserved |
| Audit | PASS — Admin legacy URL、query fixture與 navigation preserved |
| Runtime Warning | PASS（logic／structure）；browser click／hover visual validation NOT EXECUTED |
| Permission Freshness | PASS — `current`／`refresh`／`reauth` preserved |
| i18n | PASS — 所有新增 key 皆明確存在於 `zh-TW`／`zh-CN`／`en-US` |
| Responsive／H5 | PASS（structural CSS）；visual validation NOT EXECUTED |
| `file://` | PASS（local assets／classic generated bundle structure）；actual browser open NOT EXECUTED |

## Automated Validation

| Command | Result |
|---|---|
| `node --check app.js` | PASS |
| `node --check adapters\portal-adapter.js` | PASS |
| `node --check data\navigation.js` | PASS |
| `node --check data\i18n.js` | PASS |
| `node --check tools\validate-r3-sux-01.mjs` | PASS |
| `node .\tools\build-bundle.mjs` | PASS — `Generated app.bundle.js` |
| `node .\tools\validate-workbench.mjs` | PASS — `Principal Permission Workbench validation PASS` |
| `node .\tools\validate-r3-sux-01.mjs` | PASS — `R3-SUX-01 structural validation PASS` |
| `git diff --check` | PASS |

## Manual / Visual Validation

```text
NOT EXECUTED
```

本執行環境未提供可用的 browser connection，因此未宣稱 desktop、collapsed sidebar、H5/mobile、popover stacking、pixel-perfect 或 actual `file://` visual PASS。

## Known Gaps

- 需要 Human UX Review 實際檢查 desktop、collapsed sidebar、mobile drawer、surface switcher、Runtime Warning／Identity stacking 與三語版面。
- 需要以支援 `file://` 的實際瀏覽器確認 direct-open 視覺與互動。

## Architecture Boundary

```text
Production API Added             NO
Production Schema Added          NO
Real IAM Added                   NO
Redis Added                      NO
PostgreSQL Added                 NO
Lark Added                       NO
Xero Added                       NO
Base Added                       NO
Canonical Architecture Modified  NO
```

## Git State

```text
Branch        feat/r3-sux-01-static-foundation
Baseline      670e054546511b6d656ce7de93b277e07919fc3f
Working Tree  Uncommitted R3-SUX-01 Stage changes
Commit        NONE
Push          NONE
```

## Gate

```text
R3-SUX-01 Implementation     COMPLETE
Automated Validation         PASS
Human UX Review              PENDING
R3-SUX-01 Gate               READY FOR REVIEW
R3-SUX-02                    NOT AUTHORIZED
Production Implementation    BLOCKED
```
