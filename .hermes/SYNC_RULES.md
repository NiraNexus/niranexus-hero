# Framework Sync Protocol — Two-Way Knowledge Loop

## Concept

The root framework template is a **living knowledge base**. Every project
bootstraps from it and feeds learnings back. This creates a virtuous cycle:

```
ROOT FRAMEWORK ──bootstrap──→ NEW PROJECT
       ↑                          │
       └──promote learnings───────┘
```

After every session where framework files improve, strip project-specific
content and promote generic improvements back to root. The next project
starts smarter than the last.

## When to promote

Promotion is triggered by `project-memex` — either invoked by the user
(`run project-memex`) or by the agent at end-of-session. After writing
new entries to the project AGENTS.md, the PROMOTE step scans for
framework-generic patterns and offers to sync them to root.

The user MUST approve each promotion. Nothing is auto-promoted.

## Files to sync

| File | Strip | Keep |
|------|-------|------|
| `AGENTS.md` | Project-specific gotchas, retros, design checklists, model names, URLs | Generic gotchas, patterns, skill quality log, pre-code gate section, framework references |
| `docs/frameworks/*.md` | None — frameworks are definitional | Entire file |
| `.hermes/pre-code-gate.sh` | None — fully generic | Entire file |
| `.hermes/skills/custom/*.md` | None — skills are generic | Entire file |
| `user.md` | None — founder identity | Entire file |
| `soul.md` | None — agent role | Entire file |

## Files to NEVER promote

- `src/` — all application code
- `docs/superpowers/specs/` — project-specific design specs
- `docs/BRAND-GUIDE.md` — project-specific (though palette tokens may be reusable)
- `prd.json` — project tasks
- `progress.txt` — project progress
- `package.json`, `tsconfig.json` — project config
- `.env`, `.env.local` — secrets

## Sync checklist

After a session with framework improvements:
1. Update root AGENTS.md with new generic gotchas and patterns
2. Copy updated framework files (docs/frameworks/*.md)
3. Copy updated custom skills (.hermes/skills/custom/*.md)
4. Copy pre-code-gate.sh if modified
5. Verify root pre-code-gate.sh passes (exit 0)

## New project bootstrap

```bash
ROOT="/path/to/framework/template"
PROJECT="/path/to/new/project"

mkdir -p "$PROJECT/.hermes/skills/custom" "$PROJECT/docs/frameworks"
cp "$ROOT/AGENTS.md" "$PROJECT/"
cp "$ROOT/user.md" "$PROJECT/"
cp "$ROOT/soul.md" "$PROJECT/"
cp "$ROOT/.hermes/pre-code-gate.sh" "$PROJECT/.hermes/"
cp "$ROOT/.hermes/skills/custom/"*.md "$PROJECT/.hermes/skills/custom/"
cp "$ROOT/docs/frameworks/"*.md "$PROJECT/docs/frameworks/"
cp "$ROOT/AGENTS_ARCHIVE.md" "$PROJECT/"
```