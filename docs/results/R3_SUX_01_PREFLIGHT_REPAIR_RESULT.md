# R3-SUX-01 Preflight Repair Result

## Task Information

- Stage：R3-SUX-01 Preflight Repair
- Baseline Commit：`e55fae6331963e5e67701af4d8cca5c9535abd3d`
- Branch：`main`（本任務未建立 R3-SUX-01 branch）
- Date：2026-09-05

## Original Blockers

1. Working tree 出現未追蹤的 `.cursorindexingignore` 與 `.specstory/`。
2. `node .\tools\validate-workbench.mjs` 在 Node.js `v21.6.2` 執行失敗，錯誤為 `SyntaxError: Cannot use import statement outside a module`。

## Root Cause

`tools/validate-workbench.mjs` 使用 dynamic import 載入 `adapters/portal-adapter.js`；adapter、`app.js` 與 `data/*.js` 依既有設計皆使用 ES Module import/export syntax，但 repository root 原先沒有明確宣告 Node 應將 `.js` 解析為 ES Module。Node 因而把 adapter 當成 CommonJS 解析並在第一行 `import` 失敗。

這是 Node tooling module boundary 缺漏，不是 Workbench assertion、RBAC semantics 或 browser runtime architecture 的問題。

## Local Tooling Artifact Classification

### `.cursorindexingignore`

- Classification：`IGNORE`
- 內容只排除 `.specstory/**` 的 Cursor indexing，並註明仍允許透過明確 reference 納入 context。
- 此設定僅服務本機 SpecStory／Cursor 工作流程，沒有獨立的 repository governance 或 runtime 價值。
- 檔案保留在使用者本機，僅以 `.gitignore` 排除。

### `.specstory/`

- Classification：`IGNORE`
- 檢查到 `.project.json`、`cli/config.toml` 與 `history/` 等 IDE／extension 產生的專案、CLI 與歷程中繼資料。
- 它不是 application source、architecture evidence 或必要 runtime asset。
- 目錄保留在使用者本機，未刪除，僅以 `.gitignore` 排除。

## Node Tooling Repair

- 新增 `package.json`：YES
- 新增 `"type": "module"`：YES
- 目的：明確宣告既有 Node tooling 對 repository `.js` ES Modules 的解析方式。
- 新增 `build` 與 `validate:workbench` scripts，指向既有 `.mjs` 工具。
- 新增 npm dependency：NO
- 執行 `npm install`：NO
- 建立 `node_modules`：NO
- 此設定不是 Production runtime requirement。

## Modified Files

- `.gitignore`
- `package.json`
- `docs/results/R3_SUX_01_PREFLIGHT_BLOCKED_RESULT.md`
- `docs/results/R3_SUX_01_PREFLIGHT_REPAIR_RESULT.md`

`app.bundle.js` 曾由必要 build command 重新寫入並觸發 Windows 行尾狀態；確認 Git filtered blob hash與 baseline 均為 `2174e9413213ebb222332d32ca93b01b126f933b` 後，已正規化回 checkout 行尾表示。最終沒有 bundle 內容差異，也未納入本任務範圍。

## Validation

| Command | Result | Evidence |
|---|---|---|
| `node --check adapters\portal-adapter.js` | PASS | Exit code 0，無語法錯誤 |
| `node --check data\i18n.js` | PASS | Exit code 0，無語法錯誤 |
| `node .\tools\validate-workbench.mjs` | PASS | `Principal Permission Workbench validation PASS` |
| `node .\tools\build-bundle.mjs` | PASS | `Generated app.bundle.js` |
| `git diff --check` | PASS | Exit code 0，無 whitespace error |
| `git status --short` | PASS FOR EXPECTED SCOPE | 僅列出本任務四個未追蹤 evidence/tooling 檔案；local-only artifacts 已被忽略 |

## Architecture Boundary Confirmation

```text
Application UX Modified          NO
RBAC Semantics Modified          NO
Adapter Contract Modified        NO
Production API Added             NO
Production Schema Added          NO
Production Integration Added     NO
Canonical Architecture Modified  NO
```

## Gate

```text
R3-SUX-01 Preflight Repair       READY FOR HUMAN REVIEW
R3-SUX-01 Implementation         NOT STARTED
```
