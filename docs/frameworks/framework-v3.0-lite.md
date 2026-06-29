# Agent Skills Stack v3.0-lite — Production Framework

**22 sourced skills. 3 custom skill implementations. 0 external dependencies.**

---

## DESIGN CONSTRAINTS

This framework was hardened against three verified failure modes observed in
agent-in-the-loop development:

| # | Failure Mode | Root Cause | Fix |
|---|-------------|-----------|-----|
| 1 | **Hallucinated compliance** — agent reads AGENTS.md rules, claims to follow them, ignores them under cognitive load | LLMs prioritize pre-training weights over context files | grep-based deterministic audit in Phase 4 review |
| 2 | **Memory pollution** — agent codifies its own workarounds as verified patterns, permanently encoding technical debt | project-memex treats all lessons as equal | Provenance tags [CLEAN]/[WORKAROUND]/[DEBUG-SESSION]/[UNRESOLVED] on every AGENTS.md entry |
| 3 | **Git-conflict chaos** — meta-files modified inside feature worktrees collide with main branch modifications | worktrees isolate source code but not meta-files | Tiered file classification: meta-files written to primary branch only, worktrees touch source code only |
| 4 | **AGENTS.md bloat** — after 20 sessions, AGENTS.md exceeds 500 lines, consuming context budget | Unbounded append-only growth | Context-engineering compresses entries >300 lines into TL;DR + archive |

---

## ARCHITECTURE

```
                          ┌─────────────────────────────────┐
                          │         META (session boundaries) │
                          │  session-bootstrap   [M1]         │
                          │  project-memex       [M2]         │
                          │  context-engineering [Phase 8]    │
                          └───────────────┬─────────────────┘
                                          │
       ┌──────────┐    ┌──────────┐    ┌──┴───────┐    ┌──────────┐
       │  SPINE   │    │ Phase 0  │    │ Phase 2  │    │ Phase 3  │
       │ (always) │───►│Feasibility│───►│  Design  │───►│  Build   │
       │ 5 skills │    │ 1 skill  │    │ 2 skills │    │ 5 skills │
       └──────────┘    └──────────┘    └────┬─────┘    └────┬─────┘
                                            │ PURGE          │
       ┌──────────┐    ┌──────────┐    ┌────┴─────┐    ┌───┴──────┐
       │ Phase 8  │    │ Phase 7  │    │ Phase 6  │    │ Phase 4  │
       │ Iterate  │◄───│ Respond  │◄───│ Monitor  │◄───│ Review   │
       │ 1 skill  │    │ 2 skills │    │ 1 skill  │    │ 1 skill  │
       └──────────┘    └──────────┘    └──────────┘    └────┬─────┘
                                                            │
                                                 ┌──────────┴──────────┐
                                                 │      Phase 5        │
                                                 │       Ship          │
                                                 │      2 skills       │
                                                 └─────────────────────┘
```

**Context budget per phase:**

```
Phase 0:   6 skills  (spine + feasibility-checker)
Phase 2:   7 skills  (spine + 2 design) → PURGE design after → 5 remain
Phase 3:  10 skills  (spine + 5 build)
Phase 4:   6 skills  (spine + secure-agent-playbook + grep audit)
Phase 5:   7 skills  (spine + 2 ship)
Phase 6:   6 skills  (spine + otel-instrumentation)
Phase 7:   7 skills  (spine + 2 respond)
Phase 8:   6 skills  (spine + context-engineering)
```

---

## FILE CLASSIFICATION — TIERED STORAGE

To prevent git-conflict chaos between worktrees and the primary branch,
all files in the repository are classified into three tiers:

```
TIER 1 — SOURCE CODE (normal git workflow)
  ├── src/
  ├── tests/
  ├── terraform/
  └── ...all feature code...
  → Lives in worktree. Branched, merged, conflicted normally.

TIER 2 — META-FILES (primary branch only, append-only)
  ├── AGENTS.md              ← project-memex writes here
  ├── prd.json               ← writing-plans writes, loop-orchestrator reads
  ├── progress.txt           ← loop-orchestrator writes
  └── AGENTS_ARCHIVE.md      ← context-engineering archives old entries
  → Written to the PRIMARY repo path, never to a worktree.
  → Append-only. Sequential writes from session boundaries.
  → finishing-dev-branch verifies no meta-file contamination in worktree.

TIER 3 — LOCAL FILES (gitignored, never committed)
  ├── .hermes/
  └── tmp/
  → .gitignore'd. Never conflicts. Local to the machine.
```

---

## SPINE — Always Loaded (5 skills)

These skills never leave context. They are the foundation every phase builds on.

| # | Skill | Source | Tier | Score | Role |
|---|-------|--------|------|-------|------|
| S1 | `brainstorming` | obra/superpowers | 2 | 9 | Structured idea refinement. Saves design doc. Greenfield-first. |
| S2 | `writing-plans` | obra/superpowers | 2 | 10 | Break design into 2–5min tasks. Exact paths, code, verification. THE contract. |
| S3 | `subagent-driven-dev` | obra/superpowers | 2 | 10 | Fresh subagent per task. Two-stage review. Zero context pollution. |
| S4 | `test-driven-development` | obra/superpowers | 2 | 10 | RED-GREEN-REFACTOR. Delete code written before tests. Beyonce Rule. |
| S5 | `requesting-code-review` | obra/superpowers | 2 | 9 | Severity-ranked issues. **NOW INCLUDES deterministic grep-based AGENTS.md compliance audit.** |
| S6 | `framework-gate` | CUSTOM | 10 | Mechanical Phase 0/2/4 enforcement. Runs gotcha scan via standardised pipeline before any write_file/patch. Uses terminal() tool output as non-falsifiable evidence. |

**Source:** obra/superpowers — Jesse Vincent (CTO Keyboardio, creator of RT, Perl core). 235k stars, MIT. Referenced by Anthropic and Vercel.

### S5 — requesting-code-review (HARDENED)

This skill now contains a mandatory mechanical compliance step that cannot be
hallucinated. It runs AFTER normal review and BEFORE marking any task as complete.

```
COMPLIANCE AUDIT PROTOCOL (mandatory step inside requesting-code-review):

  For each rule in AGENTS.md ## Gotchas and ## Patterns sections:

  1. EXTRACT the rule as a grep-able pattern.
     Example: "Never use raw SQL in /api routes — use Supabase RLS"
     → Pattern: 'supabase.*\.from\('
     → Target: /api/

  2. MECHANICAL CHECK — deterministic, not LLM judgment:
     terminal("grep -rL '<required-pattern>' <target-dir>")

     WRONG: "Agent, did you follow rule #3?" (agent will always say yes)
     RIGHT: grep returns files MISSING the pattern (grep doesn't hallucinate)

  3. OUTPUT per rule:
     PASS Rule #3 (RLS): All /api files use supabase.from() — 14 files checked, 0 missing
     FAIL Rule #7 (advisory locks): payment.ts missing advisory lock pattern

  4. GATE:
     Any FAIL → task does NOT pass review → agent must fix before retry.
     All PASS → normal review continues.

  5. FAIL CLOSED:
     If grep returns ambiguous (e.g., pattern too broad), treat as FAIL.
     Better to force a re-check than to miss a violation.

  WHY grep:
    grep doesn't hallucinate. It either finds the pattern or it doesn't.
    The agent cannot talk its way out of a grep failure. This is the same
    principle behind type checkers and linters — mechanical verification
    beats self-reporting every time.
```

---

## META — Session Boundaries (2 skills)

| # | Skill | Source | Score | Impl |
|---|-------|--------|-------|------|
| M1 | `session-bootstrap` | CUSTOM | 10 | Must implement |
| M2 | `project-memex` | CUSTOM | 10 | Must implement |

### M1 — session-bootstrap (CUSTOM)

```
TRIGGER:   Start of every session, before Phase 0.
DURATION:  ~2 tool calls. Token cost: <500.

PROTOCOL:
  1. LOAD_AGENTS → read_file(AGENTS.md) from PRIMARY repo path.
     Detect primary repo: parent of $(git rev-parse --git-common-dir).
     Do NOT load from worktree — meta-files live on primary branch only.

  2. SIZE_CHECK → if AGENTS.md > 300 lines:
     - Display TL;DR section first (auto-generated summary of top 10 rules).
     - Load specific sections on demand, not all at once.
     - Older entries available in AGENTS_ARCHIVE.md for deep dives.

  3. PROVENANCE_WARNING → for each entry tagged [WORKAROUND] or [DEBUG-SESSION]:
     Display: "WARNING PROVISIONAL RULE: <entry text>. Review before applying
     to new architecture. Origin: <session date, debug cycle>."

     This ensures the agent KNOWS which rules are provisional. It doesn't
     prevent the agent from using them — it prevents blind trust.

  4. SEARCH_PAST → session_search(query="<project name> <current task>").
     Pull 2-3 most relevant past sessions. Extract gotchas and decisions.
     Surface alongside AGENTS.md entries for cross-reference.

  5. REPORT → "Loaded AGENTS.md (N lines, M provisional). Found X past
     sessions. Y relevant facts from Hermes memory."

  6. HANDOFF → Proceed to Phase 0 (feasibility-checker) with context loaded.

OUTPUT: Agent starts Phase 0 with project context, past lessons with
        provenance awareness, and known gotchas already in working memory.
```

### M2 — project-memex (CUSTOM, HARDENED)

```
TRIGGER:   End of session, after all Phase 8 work is complete.
DURATION:  ~5 tool calls. Token cost: <1000.
TARGET:    PRIMARY repo path, NEVER worktree path.

PROTOCOL:
  1. SCAN → review session transcript for: test failures, debug cycles,
     novel architecture decisions, user corrections, tool quirks.

  2. EXTRACT → for each finding: "What rule, if known earlier, would have
     prevented this?" Format as one AGENTS.md bullet.

  3. PROVENANCE → tag every entry based on HOW it was learned:

     [CLEAN]        — Task passed cleanly. Tests pass. Design intentional.
     [WORKAROUND]   — Task passed after >30min debug. Fixes symptom but may
                      not address root cause. REVIEW BEFORE TRUSTING.
     [DEBUG-SESSION] — Discovered during debug >30min. Root cause may not be
                       fully understood. INVESTIGATION NEEDED.
     [UNRESOLVED]   — Pattern observed, never fully fixed. KNOWN ISSUE.

     NEVER write an entry without a provenance tag. This is mandatory.

  4. DOUBT → for [WORKAROUND] and [DEBUG-SESSION] entries, append explicit
     doubt statement:
     "[WORKAROUND] Payment double-charge: added advisory lock. But
     investigate: is this masking a deeper transaction isolation issue?
     Review this entry before trusting it in new code."

  5. CATEGORIZE → place under correct AGENTS.md section:
     - ## Gotchas (pitfalls to avoid)
     - ## Patterns & Conventions (discovered standards)
     - ## Recent Learnings (dated: "## 2026-06-21")

  6. DEDUPLICATE → check for existing similar entries. Merge, don't duplicate.
     If an existing [WORKAROUND] is confirmed as correct across 3+ sessions,
     suggest promotion to [CLEAN] for human review.

  7. WRITE_AGENTS → patch PRIMARY BRANCH AGENTS.md with new entries.
     Path: $(git rev-parse --git-common-dir)/../AGENTS.md
     NEVER write to a worktree path.

  8. WRITE_MEMORY → Hermes memory(action='add', target='memory',
     content="<project>: <key lesson> [<PROVENANCE>]") for durable facts.

  9. SKILL_FLAG → append "## Skill Quality Log" section if any skill
     produced misleading or conflicting guidance during the session.
     Agent NEVER auto-patches skills. Human reviews weekly.

  10. RETRO → append "## Retro: <date>" with:
      - What shipped
      - What broke
      - What we'd do differently
      - Provenance summary: N [CLEAN], M [WORKAROUND], K [DEBUG-SESSION]

  11. COMMIT → "docs: capture lessons from <date> session (<N> clean, <M> provisional)"

HUMAN PROCESS (5 min/week):
  Review AGENTS.md ## Skill Quality Log and ## Recent Learnings.
  Promote confirmed [WORKAROUND] entries to [CLEAN].
  Delete entries that were wrong.
  Create investigation tickets for [DEBUG-SESSION] entries.
```

---

## PRE-CODE GATE — Mandatory Before Any write_file/patch

**Effective:** v3.0-lite Patch 7. **Enforced by:** S6 `framework-gate`.

Before ANY `write_file` or `patch` call on source files, the agent MUST:

1. Run the standardised scan pipeline from `framework-gate` skill
   reference `gotcha-grep-patterns.md`. Do NOT craft a custom pipeline.
2. The pipeline runs ALL checks regardless of individual failures.
   It uses a `fail` counter — no short-circuiting.
3. Exit code 0 = all checks passed → proceed to code change.
   Exit code ≠ 0 = violations found → HARD STOP → fix before touching code.
4. Include the `terminal()` tool output in the SAME message as any
   code change. The tool output block proves execution — it cannot be
   faked by the agent's text generation.

**Three-Layer Defense:**
- Standardised pipeline: reference file is single source — no custom checks
- terminal() exit code: non-zero = violations, machine-verifiable
- Same-message rule: scan output + code change in same message = contradiction
  visible to human reviewer if scan shows FAIL

**No terminal() output → no code change. The output IS the evidence.**

GOTCHA SCAN PATTERNS (living registry at gotcha-grep-patterns.md):
- Stray model references
- JSX inline comments
- HTML button nesting
- Async generators in Edge routes
- Model ID consistency across files
- Design spec exists for today

---

## PHASE 0 — Feasibility (1 skill)

| # | Skill | Source | Score | Impl |
|---|-------|--------|-------|------|
| 0 | `feasibility-checker` | CUSTOM | 10 | Must implement |

```
TRIGGER:   After session-bootstrap loads context.
DURATION:  ~5 tool calls. Token cost: <1500.
GATE:      GO / NEEDS_CLARIFICATION / NO_GO. If NO_GO, STOP immediately.

PROTOCOL:
  1. ARCH_FIT → search_files for existing APIs, data models, boundaries.
     Flag: "This would require changing X which also affects Y and Z."

  2. RESOURCES → check .env for required API keys. Check terraform state
     for provisionable infrastructure. Flag missing dependencies.

  3. DEP_GRAPH → map prerequisite work. Flag unmet dependencies.
     "Before building the refund flow, we need the payment ledger API
     which doesn't exist yet."

  4. T_SHIRT → S (<1d) / M (2-5d) / L (1-3w) / XL (1m+).
     Flag if timeline doesn't match expectation.

  5. RISK → auth changes (high), DB migrations (high), payments (critical),
     new 3rd-party deps (medium). Flag per domain.

  6. OUTPUT → GO | NEEDS_CLARIFICATION | NO_GO.
     NO_GO must include specific reason AND suggested alternative path.
     "NO_GO: Payment refunds require PCI compliance which this project
     doesn't have. Alternative: use Stripe's hosted refund page instead
     of building a custom flow."

WHY THIS EXISTS:
  The user may not know that the "simple login page" requires touching
  14 files across auth, billing, and session management. The agent can
  see this in 30 seconds by scanning the repo. An agent that never says
  no will build beautiful, well-tested, completely impossible things.
```

---

## PHASE 1 — Spec (0 extra skills)

Spine handles this. `brainstorming` (S1) refines the idea. `writing-plans` (S2)
breaks into tasks and generates prd.json on the primary branch. No additional
skills needed for v3.0-lite.

> Note: `writing-plans` writes prd.json to the PRIMARY branch path, not to a
> worktree. If a worktree is already active, the plan file stays on the primary
> branch as the single source of truth for task state.

---

## PHASE 2 — Design (2 skills, PURGED after phase)

| # | Skill | Source | Tier | Score | Role |
|---|-------|--------|------|-------|------|
| 10 | `frontend-design` | anthropics/skills | 1 | 8 | Anthropic's official frontend spec. Components, responsive, design tokens. |
| 11 | `web-design-guidelines` | vercel-labs/agent-skills | 1 | 8 | 100+ rules: accessibility, forms, animation, typography, dark mode. |

**PURGE PROTOCOL (after Phase 2):**
  1. Extract design constraints from both skills.
  2. Append as `# DESIGN_COMPLIANCE_CHECKLIST` to AGENTS.md on PRIMARY branch.
  3. Tag compliance checklist entries as [CLEAN] (they come from official specs).
  4. Unload both design skills from context.
  5. Phase 3 starts with ~5 skills active (spine only), ~40% more context free.

**Source credibility:**
- frontend-design: anthropics/skills — Anthropic ($14.7B), 153k stars, Tier 1.
- web-design-guidelines: vercel-labs/agent-skills — Vercel ($3.25B), 28k stars, Tier 1.

---

## PHASE 3 — Build (5 skills)

| # | Skill | Source | Tier | Score | Role |
|---|-------|--------|------|-------|------|
| 12 | `using-git-worktrees` | obra/superpowers | 2 | 8 | Isolated worktree per feature. Clean baseline verification. **Meta-files excluded from worktree scope.** |
| 13 | `react-best-practices` | vercel-labs/agent-skills | 1 | 8 | 40+ rules. Waterfalls, bundle size, server perf. Impact-prioritized. |
| 14 | `incremental-implementation` | addyosmani/agent-skills | 2 | 8 | Vertical slices: implement → test → verify → commit. Feature flags, safe defaults. |
| 15 | `supabase` | supabase/agent-skills | 1 | 9 | Auth, DB, Edge Functions, Realtime, Storage, Vectors, Cron, Queues. |
| 16 | `terraform` | hashicorp/agent-skills | 1 | 9 | Official HashiCorp. IaC, HCL patterns, Vault, Consul. |

**Worktree safety —  using-git-worktrees HARDENING:**

```
  This skill now operates with meta-file awareness:

  1. Worktree is for TIER 1 files ONLY (source code).
  2. prd.json is read from PRIMARY branch, not worktree copy.
  3. AGENTS.md is NEVER modified inside worktree.
  4. progress.txt is written to PRIMARY branch, not worktree.
  5. finishing-dev-branch (Phase 5) verifies no meta-file contamination
     before merging worktree to primary.
```

**Source credibility:**
- using-git-worktrees: obra/superpowers — Tier 2, 235k stars.
- react-best-practices: vercel-labs/agent-skills — Tier 1, 28k stars.
- incremental-implementation: addyosmani/agent-skills — Tier 2, 65k stars, Addy Osmani (Anthropic engineer).
- supabase: supabase/agent-skills — Tier 1, YC S20, $196M raised.
- terraform: hashicorp/agent-skills — Tier 1, HashiCorp ($6.1B IBM acquisition), 677 stars, MPL-2.0.

---

## PHASE 4 — Review (1 skill, hardened)

| # | Skill | Source | Tier | Score | Role |
|---|-------|--------|------|-------|------|
| 17 | `secure-agent-playbook` | OWASP/secure-agent-playbook | 3 | 9 | 221 rules. Dependency scan, secrets, OWASP Top 10. |

> **AGENTS.md compliance audit is handled by S5 (requesting-code-review).**
> See S5 protocol above for the deterministic grep-based verification step.
> This audit runs for EVERY task review in Phase 4. It is not optional.

---

## PHASE 5 — Ship (2 skills, hardened)

| # | Skill | Source | Tier | Score | Role |
|---|-------|--------|------|-------|------|
| 18 | `finishing-dev-branch` | obra/superpowers | 2 | 9 | Tests pass → merge/PR/discard. Cleans worktree. **NOW VERIFIES no meta-file contamination.** |
| 19 | `deploy-to-vercel` | vercel-labs/agent-skills | 1 | 8 | Official Vercel deploy. Git-linked, preview URLs. v3.0.0. |

### 18 — finishing-dev-branch (HARDENED)

```
ADD MANDATORY STEP (before merge):

  META-FILE CONTAMINATION CHECK:
    terminal("git diff --name-only <primary-branch>..<worktree-branch> | grep -E '(AGENTS\.md|prd\.json|progress\.txt)'")

    If output is non-empty:
      → WARN: "Meta-files were modified in worktree. These files belong on
        the primary branch. They will NOT be merged. Check if these changes
        need to be manually applied to primary branch AGENTS.md."
      → Exclude meta-files from merge.
      → Proceed with source code merge only.

    If output is empty:
      → Clean merge. No meta-file contamination. Proceed normally.
```

---

## PHASE 6 — Monitor (1 skill)

| # | Skill | Source | Tier | Score | Role |
|---|-------|--------|------|-------|------|
| 20 | `otel-instrumentation` | dash0hq/agent-skills | 4 | 10 | OpenTelemetry across 10+ languages. Vendor-neutral OTLP. SDK setup, semantic conventions, Collector. |

**Source:** dash0hq/agent-skills — Dash0 (VC-backed observability company), Apache-2.0.

---

## PHASE 7 — Respond (2 skills)

| # | Skill | Source | Tier | Score | Role |
|---|-------|--------|------|-------|------|
| 21 | `systematic-debugging` | obra/superpowers | 2 | 9 | 4-phase root cause: reproduce → isolate → fix → regression test. |
| 22 | `triage` | mattpocock/skills | 2 | 8 | Issue state machine. Labels, severity, assignment. |

**Source credibility:**
- systematic-debugging: obra/superpowers — Tier 2, 235k stars.
- triage: mattpocock/skills — Tier 2, 139k stars, Matt Pocock (Total TypeScript).

---

## PHASE 8 — Iterate (1 skill)

| # | Skill | Source | Tier | Score | Role |
|---|-------|--------|------|-------|------|
| 23 | `context-engineering` | addyosmani/agent-skills | 2 | 9 | Meta-skill. Manages load/compress/purge. **NOW HANDLES AGENTS.md bloat prevention.** |

### 23 — context-engineering (HARDENED)

```
ADD AGENTS.md SIZE MANAGEMENT:

  TRIGGER:   Checked by session-bootstrap at every session start.

  If AGENTS.md > 300 lines:
    1. COMPRESS → summarize all entries into a generated "## TL;DR" section
       at the top. Format: "The 10 most important rules (auto-generated)..."

    2. ARCHIVE → move entries older than 90 days to AGENTS_ARCHIVE.md.
       Do NOT delete. History is preserved, just not in active context.

    3. SHRINK → active AGENTS.md should contain:
       - TL;DR section (10 rules, auto-generated)
       - ## Gotchas (last 90 days, provenance-tagged)
       - ## Patterns & Conventions (last 90 days)
       - ## Recent Learnings (last 30 days)

    4. ARCHIVE → AGENTS_ARCHIVE.md contains everything older.
       Available for deep dives. Not loaded into context by default.

  This prevents context bloat while preserving full project history.
```

> Note: `project-memex` [M2] also fires after Phase 8 completes — captures lessons
> into AGENTS.md on the PRIMARY branch with provenance tags.

**Source:** addyosmani/agent-skills — Tier 2, 65k stars, Addy Osmani (ex-Google Chrome, now Anthropic).

---

## CREDIBILITY SUMMARY

| Tier | Definition | Count | Sources |
|------|-----------|-------|---------|
| 1 | Company-backed ($1B+ valuation or public) | 5 | Anthropic, Vercel, Supabase, HashiCorp |
| Tier 2 | Industry-recognized author (65k+ stars) | 13 | obra (6), addyosmani (3), mattpocock (2), dash0 (1) |
| Tier 3 | Standards body (nonprofit) | 1 | OWASP |
| — | Custom (spec provided above) | 4 | feasibility-checker, session-bootstrap, project-memex, framework-gate |
| **Total** | | **23 skills + 4 custom specs** | |

---

## IMPLEMENTATION PLAN

### Phase 1: Install existing skills (1 hour)

```bash
# Spine (all from same repo - install once)
npx skills add obra/superpowers --skill brainstorming
npx skills add obra/superpowers --skill writing-plans
npx skills add obra/superpowers --skill subagent-driven-development
npx skills add obra/superpowers --skill test-driven-development
npx skills add obra/superpowers --skill requesting-code-review
npx skills add obra/superpowers --skill using-git-worktrees
npx skills add obra/superpowers --skill systematic-debugging
npx skills add obra/superpowers --skill finishing-a-development-branch

# Phase 2 (design)
npx skills add anthropics/skills --skill frontend-design
npx skills add vercel-labs/agent-skills --skill web-design-guidelines

# Phase 3 (build)
npx skills add vercel-labs/agent-skills --skill react-best-practices
npx skills add addyosmani/agent-skills --skill incremental-implementation
npx skills add supabase/agent-skills --skill supabase
npx skills add hashicorp/agent-skills --skill terraform

# Phase 4 (review)
npx skills add OWASP/secure-agent-playbook

# Phase 5 (ship)
npx skills add vercel-labs/agent-skills --skill deploy-to-vercel

# Phase 6 (monitor)
npx skills add dash0hq/agent-skills --skill otel-instrumentation

# Phase 7 (respond)
npx skills add mattpocock/skills --skill triage

# Phase 8 (iterate)
npx skills add addyosmani/agent-skills --skill context-engineering
```

### Phase 2: Author custom skills (3 small SKILL.md files)

```
~/.hermes/skills/custom/
├── feasibility-checker.md   (~80 lines, spec in Phase 0 above)
├── session-bootstrap.md     (~60 lines, spec in M1 above)
└── project-memex.md         (~120 lines, spec in M2 above)
```

### Phase 3: Initialize AGENTS.md (1 file, 5 minutes)

```markdown
# AGENTS.md — Project Memory

## TL;DR (auto-generated)
*Populated by context-engineering when this file exceeds 300 lines.*

## Gotchas
*Populated by project-memex at end of each session.*
*All entries MUST have provenance tags: [CLEAN], [WORKAROUND], [DEBUG-SESSION], or [UNRESOLVED].*

## Patterns & Conventions
*Discovered standards. Populated by project-memex.*

## Recent Learnings
*Last 30 days. Populated by project-memex.*

## Skill Quality Log
*Flagged skill issues. Human reviews weekly. Agent NEVER auto-patches skills.*
| Date | Skill | Issue | Severity | Action |
|------|-------|-------|----------|--------|
```

### Phase 4: Run

Start a session. `session-bootstrap` fires first. `project-memex` fires last.
The loop is self-sustaining after the first session.

---

## HUMAN TOUCHPOINTS (minimal, weekly)

| Task | Time | Frequency |
|------|------|-----------|
| Review AGENTS.md Skill Quality Log | 5 min | Weekly |
| Promote confirmed [WORKAROUND] to [CLEAN] | 2 min | Weekly |
| Delete wrong entries from AGENTS.md | 1 min | Weekly |
| Create investigation tickets for [DEBUG-SESSION] entries | 3 min | As needed |
| **Total** | **<15 min/week** | |

---

## FRAMEWORK RATING

```
DIMENSION                         SCORE   NOTES
──────────────────────────────────────────────────────
Phase coverage                    8/8     Full lifecycle
Context discipline                10/10   PURGE protocol + bloat prevention
Compliance verification           10/10   Deterministic grep-based audit
Memory safety                     9/10    Provenance tags prevent pollution
Worktree safety                   9/10    Tiered file classification
Backend coverage                  6/10    Supabase + Terraform. K8s not covered.
Debug rigor                       8/10    4-phase root cause, no state-snapshotter yet
SRE production readiness          5/10    Manual incident response. v3.1 adds automation.
Self-learning                     8/10    project-memex + session-bootstrap loop
Credibility (avg tier)            1.9     Mostly Tier 1-2 sources
Custom implementation burden      3 files ~260 lines total
External dependencies             0       Everything runs on Hermes built-in tools
──────────────────────────────────────────────────────
OVERALL                           8.7/10  Production-ready for web apps on Vercel+Supabase
```

---

## WHAT THIS FRAMEWORK DELIBERATELY DEFERS (→ v3.1)

| Deferred | Why | Trigger to add |
|----------|-----|---------------|
| grill-with-docs | brainstorming handles initial spec | Agent keeps missing edge cases |
| accessibility-agents | web-design-guidelines covers basics | First accessibility complaint |
| frontend-ui-engineering | react-best-practices covers patterns | Design inconsistency across features |
| supabase-pg-practices | supabase skill covers basics | Query performance issues |
| improve-architecture | Run manually between sessions | Codebase feels messy |
| artillery-load-testing | Manual load testing initially | First production launch |
| migration-safety | Manual migration review initially | DB schema changes |
| vercel-optimize | Monitor costs manually at first | Surprising Vercel bill |
| launchdarkly-guarded-rollout | Manual rollout initially | First canary deployment |
| slo-definition | Define after 2 weeks of otel data | "Is this normal?" questions |
| instrument-analytics | Add after core monitoring | "Are users using this?" questions |
| state-snapshotter | Build after seeing real debug patterns | Debug cycles taking >30min |
| sre-incident-responder | Build AFTER first real incident | First production outage |
| loop-orchestrator | Validate manual loop first | "I want overnight autonomy" |
| pattern-detector | Needs 10+ sessions of history | Recurring bug patterns visible |
| Skill self-audit | Auto-patching skills is dangerous | Never — human reviews Skill Quality Log instead 


