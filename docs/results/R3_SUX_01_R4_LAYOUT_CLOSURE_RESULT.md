# R3-SUX-01-R4 i18n Responsive Layout Closure Result

## Result

```text
COMPLETE / READY FOR FINAL REVIEW
```

## Fixed Scope

- 將 Preview Exit 從 role selector 的第四個 segment 分離為獨立 action button。
- Role selector 僅保留 Employee、Finance、HOD 三個可預覽角色。
- Preview Exit visible copy 改為短文案：`結束預覽`、`结束预览`、`End preview`。
- 完整「返回管理員」語意透過三語 `title` 與 `aria-label` 保留。
- Preview controls 支援 desktop 同列、中型寬度 flex wrapping，以及 mobile／H5 獨立滿寬堆疊。
- 未重新設計 R2 sidebar、locale switcher 或其他 R3 shell 元件。

## Changed Files

- `app.js`
- `app.bundle.js`（由 build tool 重新產生）
- `data/i18n.js`
- `docs/results/R3_SUX_01_R4_LAYOUT_CLOSURE_RESULT.md`
- `index.html`
- `styles/r3-shell.css`
- `tools/validate-r3-sux-01.mjs`

## Locale Priority

```text
URL lang
> localStorage.portal_lang
> browser / WebView language
> zh-TW fallback
```

本次未修改 locale resolution 或 persistence contract。Validator 持續驗證 URL 優先於 localStorage、localStorage 優先於 browser language，且 unsupported browser language fallback 至 zh-TW。

## Layout Fix

- `preview-controls` 採 flexible wrapping，未對 Preview Exit 設定固定 pixel width。
- Preview Exit 允許文字自然換行，不使用 ellipsis、`overflow: hidden` 或 `white-space: nowrap`。
- Mobile breakpoint 將 role selector 與 Preview Exit 排成單欄；role selector 內三個 role 採可縮放 grid。
- Surface switcher、prototype badges、Runtime Warning、sidebar navigation、locale switcher、Admin Overview、reserved capabilities 與主要 action buttons 的既有 responsive 規則保持不變。

## Automated Validation

| Command | Result |
| --- | --- |
| `node --check app.js` | PASS |
| `node --check data/i18n.js` | PASS |
| `node --check tools/validate-r3-sux-01.mjs` | PASS |
| `node tools/build-bundle.mjs` | PASS |
| `node tools/validate-workbench.mjs` | PASS — `Principal Permission Workbench validation PASS` |
| `node tools/validate-r3-sux-01.mjs` | PASS — `R3-SUX-01 structural validation PASS` |
| `git diff --check` | PASS |

Validator 已確認 Preview Exit 與 role segment 分離、三語短文案、三語 accessible description、desktop wrapping、mobile stacking、無固定寬度 clipping pattern、locale priority preservation 與既有 Workbench validation。

## Manual Review Pending

- English `End preview` 在 desktop、中型寬度與 mobile／H5 的實際顯示。
- Role selector 與 Preview Exit 的換行、gap、focus ring 與觸控操作。
- Workspace／Admin Console surface switcher、prototype badges、Runtime Warning、sidebar、locale switcher、Admin Overview cards、reserved capabilities 與主要 action buttons 的三語 layout regression check。

Manual Visual Validation：`NOT EXECUTED`。

## Known Gaps

- R4 responsive layout 尚待 Human Final Review；automated validation 未發現未解問題。

## Git State

```text
Branch:       feat/r3-sux-01-static-foundation
Baseline:     670e054546511b6d656ce7de93b277e07919fc3f
Working Tree: R3-SUX-01 implementation、review evidence 與 R1／R2／R3／R4 repair 尚未 commit
Commit:       NONE
Push:         NONE
```

## Gate

```text
R3-SUX-01-R4 Layout Closure   COMPLETE
Automated Validation          PASS
Human Final Review            PENDING
R3-SUX-01 Final Gate          READY FOR FINAL REVIEW
R3-SUX-02                     NOT AUTHORIZED
Production Implementation     BLOCKED
```

本任務未修改 RBAC semantics、View-As semantics、Admin／Workspace surface contract、locale priority、Production boundary 或 canonical architecture documents。
