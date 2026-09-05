# R3-SUX-01-R3 Visible Locale Switcher & Full-page i18n Result

## Result

```text
COMPLETE / READY FOR HUMAN REVIEW
```

## Fixed Scope

- 在 global R3 shell 新增可見且可鍵盤操作的 locale switcher，Workspace、Admin Console 與 View-As Preview 共用同一控制。
- 提供固定語言選項：`繁體中文 (zh-TW)`、`简体中文 (zh-CN)`、`English (en-US)`。
- Locale 切換只更新 `lang`，保留 `role`、`surface`、`viewAs`、`page`、`permissionState`、`principal`、`tab`、`mode` 等既有 query state。
- 使用 browser-only `localStorage.portal_lang` 保存使用者選擇，未建立 Production preference schema。
- 補齊 global shell、主要 Admin views、Resource Settings、People、Audit、Permission Workbench badges 與相關 accessibility labels 的 i18n routing。
- 保留 R2 desktop sidebar boundary control、mobile hidden rule 與 drawer behavior。

## Changed Files

- `app.js`
- `app.bundle.js`（由 build tool 重新產生）
- `data/i18n.js`
- `docs/context/R3_STATIC_UX_CONTEXT.md`
- `docs/results/R3_SUX_01_R3_I18N_POLISH_RESULT.md`
- `index.html`
- `styles/r3-shell.css`
- `tools/validate-r3-sux-01.mjs`

## Locale Support

| 能力 | 結果 |
| --- | --- |
| Visible global locale switcher | IMPLEMENTED |
| zh-TW / `zh-Hant-TW` | SUPPORTED |
| zh-CN / `zh-Hans-CN` | SUPPORTED |
| en-US / `en-US` | SUPPORTED |
| URL `lang` priority | VALIDATED |
| `localStorage.portal_lang` fallback | VALIDATED |
| Browser language fallback | VALIDATED |
| zh-TW final fallback | VALIDATED |
| Existing query state preservation | VALIDATED |

Locale 選項名稱依任務指定採固定顯示名稱，不視為未翻譯文案。

## Automated Validation

| Command | Result |
| --- | --- |
| `node --check app.js` | PASS |
| `node --check adapters/portal-adapter.js` | PASS |
| `node --check data/i18n.js` | PASS |
| `node --check tools/validate-r3-sux-01.mjs` | PASS |
| `node tools/build-bundle.mjs` | PASS |
| `node tools/validate-workbench.mjs` | PASS — `Principal Permission Workbench validation PASS` |
| `node tools/validate-r3-sux-01.mjs` | PASS — `R3-SUX-01 structural validation PASS` |
| `git diff --check` | PASS |

Validator 已新增 visible selector、三個 locale option、URL state preservation、locale resolution priority、三語 R3 keys、accessibility labels、主要 hard-coded copy removal 與 R2 sidebar preservation checks；既有 assertions 未削弱。

## Manual Visual Validation

```text
NOT EXECUTED
```

目前無可用 browser connection。Human UX Final Review 尚需檢查：

- `?role=admin&lang=zh-TW`
- `?role=admin&lang=zh-CN`
- `?role=admin&lang=en-US`
- `?role=admin&viewAs=finance&lang=zh-TW`
- `?role=admin&viewAs=finance&lang=zh-CN`
- `?role=admin&viewAs=finance&lang=en-US`
- `?role=admin&surface=admin&lang=zh-TW`
- `?role=admin&surface=admin&lang=zh-CN`
- `?role=admin&surface=admin&lang=en-US`
- Desktop／mobile locale switcher layout，以及 R2 sidebar／drawer preservation。

## Known Gaps

- 三語實際文案、overflow、popover stacking 與 mobile layout 尚待 Human UX Final Review。

## Git State

```text
Branch:       feat/r3-sux-01-static-foundation
Baseline:     670e054546511b6d656ce7de93b277e07919fc3f
Working Tree: R3-SUX-01 implementation、review evidence、R1／R2／R3 polish 尚未 commit
Commit:       NONE
Push:         NONE
```

## Gate

```text
R3-SUX-01 Implementation       COMPLETE
R3-SUX-01-R1 Repair            COMPLETE
R3-SUX-01-R2 Polish            COMPLETE
R3-SUX-01-R3 i18n Polish       COMPLETE
Automated Validation           PASS
Human UX Final Review          PENDING
R3-SUX-01 Final Gate           READY FOR REVIEW
R3-SUX-02                      NOT AUTHORIZED
Production Implementation      BLOCKED
```

本任務未修改 RBAC semantics、View-As semantics、Admin／Workspace surface contract、Production boundary 或 canonical architecture documents。
