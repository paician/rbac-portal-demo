# Project Mode

- FIN-SSC Static UX Prototype
- NON-PRODUCTION
- Synthetic Data Only
- 回覆一律使用台灣用語繁體中文。

# Core Engineering Rules

- Existing validated UX must be preserved unless explicitly authorized.
- Recommendation is not authorization.
- Automated PASS is not Human Acceptance.
- Do not self-advance to another Stage.
- Do not weaken validation to obtain PASS.
- Prototype schema is not Production schema.
- Browser RBAC is not a security boundary.
- Canonical architecture documents must not be modified unless explicitly authorized.

# Adapter Boundary

UI must use `adapters/portal-adapter.js` for prototype context, query, and mutation. Do not couple UI directly to future Production services.

# Result Evidence Rule

Every substantive Codex task must produce `docs/results/<TASK>_RESULT.md`.

```text
Final State
+ Changed Scope
+ Validation
+ Known Gaps
+ Git State
+ Gate
```

Result Evidence is not a transcript, execution diary, or reasoning log.

# Git Rule

After Stage implementation, do not commit, push, or merge without Human Review.
