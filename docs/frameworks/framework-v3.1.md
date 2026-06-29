# Agent Skills Stack v3.1 — Measured Upgrades

**17 deferred skills + 5 new custom implementations.**

---

## UPGRADE TRIGGERS — Data-Driven, Not Guess-Driven

Do not add skills because the framework says so. Add them because the data says so.

| # | Upgrade | Trigger Condition |
|---|---------|-------------------|
| 1 | Spec depth | Agent missed edge cases in 3+ specs |
| 2 | Design depth | Accessibility complaint OR design inconsistency across features |
| 3 | Build depth | Query perf issues OR data pipeline work needed |
| 4 | Review depth | Architecture smells visible OR pre-production launch |
| 5 | Ship safety | DB migration happened OR Vercel bill surprising OR canary needed |
| 6 | Monitoring maturity | 2 weeks of otel data collected OR "are users using this?" |
| 7 | Response automation | Debug cycles >30min average OR first production incident |
| 8 | Loop automation | Manual loop validated over 10+ sessions |
| 9 | Iteration refinement | Codebase feels messy OR docs inconsistent |

---

## UPGRADE 1: SPEC DEPTH (1 skill)

| # | Skill | Source | Tier | Score | Added to |
|---|-------|--------|------|-------|----------|
| D1 | `grill-with-docs` | mattpocock/skills | 2 | 9 | Phase 1 |

**What it adds:** Deep spec elicitation. Builds CONTEXT.md with ubiquitous
domain language. Creates Architecture Decision Records (ADRs). For brownfield
projects where brainstorming alone misses architectural constraints that only
emerge from domain modeling.

**Source:** mattpocock/skills — 139k stars, MIT. Matt Pocock (Total TypeScript, 139k followers).

**When to add:** After 3+ sessions where the agent built something that missed an
architectural dependency. Evidence: `grep "didn't know about" progress.txt` > 0.

---

## UPGRADE 2: DESIGN DEPTH (2 skills)

| # | Skill | Source | Tier | Score | Added to |
|---|-------|--------|------|-------|----------|
| D2 | `accessibility-agents` | Community-Access/accessibility-agents | 4 | 8 | Phase 2 |
| D3 | `frontend-ui-engineering` | addyosmani/agent-skills | 2 | 8 | Phase 3 |

**What they add:**
- D2: 11 WCAG 2.2 AA specialists. Screen reader testing, ARIA, focus order, color contrast. Deeper than web-design-guidelines.
- D3: Component architecture, design systems, state management patterns. Chrome engineering patterns from Addy Osmani.

**PURGE NOTE:** Both loaded in Phase 2. D2 purged with design skills after
Phase 2. D3 stays through Phase 3 (build). Constraints extracted to AGENTS.md
compliance checklist before purge.

**Sources:**
- accessibility-agents: Community-Access org — 318 stars, MIT, 33 forks. Covered by GitHub Blog.
- frontend-ui-engineering: addyosmani/agent-skills — Tier 2, 65k stars.

**When to add D2:** First accessibility complaint from a user or auditor.
**When to add D3:** UI components diverge from each other in style or behavior.

---

## UPGRADE 3: BUILD DEPTH (2 skills)

| # | Skill | Source | Tier | Score | Added to |
|---|-------|--------|------|-------|----------|
| D4 | `supabase-postgres-best-practices` | supabase/agent-skills | 1 | 8 | Phase 3 |
| D5 | `senior-data-engineer` | alirezarezvani/claude-skills | 2 | 7 | Phase 3 |

**What they add:**
- D4: Query perf, connection management, schema design, RLS, concurrency. 8 categories, impact-prioritized.
- D5: Python, SQL, Spark, Airflow, dbt, Kafka. Data modeling, pipeline orchestration, DataOps. For data pipeline work only.

**Sources:**
- supabase-postgres-best-practices: supabase/agent-skills — Tier 1, official Supabase ($196M raised).
- senior-data-engineer: alirezarezvani/claude-skills — 18.7k stars, individual but significant community adoption.

**When to add D4:** Any Postgres query takes >500ms or EXPLAIN ANALYZE shows seq scan.
**When to add D5:** Task list includes "build a data pipeline" or "set up Kafka/Airflow."

---

## UPGRADE 4: REVIEW DEPTH (2 skills)

| # | Skill | Source | Tier | Score | Added to |
|---|-------|--------|------|-------|----------|
| D6 | `improve-architecture` | mattpocock/skills | 2 | 8 | Phase 4 |
| D7 | `artillery-load-testing` | artilleryio/agent-skills | 4 | 8 | Phase 4 |

**What they add:**
- D6: Architectural smell scan → visual HTML report → grill improvement choices. Run every few days, not per-task. Complements the per-task `requesting-code-review`.
- D7: Official Artillery load/soak/stress testing. Define scenarios → run at scale → analyze p95/p99 latency, error rate, throughput. Gate: blocks ship if p95 > 2x baseline.

**Sources:**
- improve-architecture: mattpocock/skills — Tier 2, 139k stars.
- artillery-load-testing: artilleryio/agent-skills — Official Artillery org. 2 stars (brand new April 2026) but company-backed.

**When to add D6:** Any team member says "this codebase is getting hard to work with."
**When to add D7:** Before first production launch OR first user-facing traffic spike.

---

## UPGRADE 5: SHIP SAFETY (3 skills)

| # | Skill | Source | Tier | Score | Added to |
|---|-------|--------|------|-------|----------|
| D8 | `migration-safety` | softaworks/agent-toolkit | 4 | 9 | Phase 5 |
| D9 | `vercel-optimize` | vercel-labs/agent-skills | 1 | 8 | Phase 5 |
| D10 | `launchdarkly-guarded-rollout` | launchdarkly/ai-tooling | 4 | 7 | Phase 5 |

**What they add:**
- D8: Reversible migrations (up + down). Backward compatibility check. Zero-downtime deployment plan. Rollback procedure. Blocks ship if migration is irreversible. 2,069 stars, org-backed.
- D9: Cost audit, caching, ISR, middleware, image optimization, function usage, build minutes. Ranked report with $ impact. Vercel-specific.
- D10: Progressive rollout: canary → 10% → 50% → 100%. Metric monitoring with automatic rollback. Kill switch integration.

**Sources:**
- migration-safety: softaworks/agent-toolkit — Tier 4, 2,069 stars, 198 forks, organization.
- vercel-optimize: vercel-labs/agent-skills — Tier 1, 28k stars.
- guarded-rollout: launchdarkly/ai-tooling — Tier 4, official LaunchDarkly ($3B company). Low stars (17) because May 2026 launch.

**When to add D8:** First DB schema change (ALTER TABLE, new column, index change).
**When to add D9:** First Vercel invoice OR before production launch.
**When to add D10:** First canary deployment OR any feature that touches payments/auth.

---

## UPGRADE 6: MONITORING MATURITY (2 skills)

| # | Skill | Source | Tier | Score | Added to |
|---|-------|--------|------|-------|----------|
| D11 | `slo-definition` | CUSTOM | — | 9 | Phase 6 |
| D12 | `instrument-analytics` | PostHog Code (first-party) | 5 | 8 | Phase 6 |

### D11 — slo-definition (CUSTOM)

```
TRIGGER:   After otel-instrumentation has collected 2 weeks of production data.
GATE:      You cannot define SLOs from guesses. You need REAL percentile data.
           If otel has no data → do not load this skill. Wait.

PROTOCOL:
  1. INVENTORY → list all deployable services from terraform state + otel topology.
  2. CLASSIFY → critical (user-facing, payment, auth) vs standard (internal, admin).
  3. PICK_SLIs → for each service, choose 2-4 indicators:
     - Latency p95 (from otel traces)
     - Error rate (5xx / total requests)
     - Availability (successful health checks / total checks)
     - Throughput (requests/second for capacity planning)
  4. SET_SLOs → start with defaults, adjust from real data:
     - Critical: 99.9% availability, p95 < 200ms, error rate < 0.1%
     - Standard: 99% availability, p95 < 500ms, error rate < 1%
     - OVERRIDE if real data shows tighter or looser is appropriate.
  5. ERROR_BUDGET → (1 - SLO target) × reporting window (28 days).
     Example: 99.9% availability = 0.1% error budget = 40 minutes downtime/month.
  6. ALERT → burn rate thresholds:
     - Fast burn: 2% of budget consumed in 1 hour → PAGE (PagerDuty)
     - Slow burn: 10% of budget consumed in 3 days → TICKET
  7. WRITE → SLO_DEFINITIONS.md committed to primary branch.
  8. WIRE → alert rules to monitoring backend (Grafana, Datadog, PagerDuty).

REFERENCE: Google SRE Book, Chapters 2-4 (sre.google/books)
```

**What D12 adds:** Event tracking instrumentation. Funnel analysis setup. Session
replay integration. Feature adoption metrics. Closes the "did anyone even use this?"
loop that otel alone can't answer.

**Source:** PostHog Code — first-party skills built into PostHog product. YC W20,
$150M+ raised, 100k+ customers. Not a standalone repo — loaded via PostHog Code
integration: posthog.com/docs/posthog-code/skills.

**When to add D11:** After otel has data. "Is this latency spike normal?" questions.
**When to add D12:** After core monitoring works. "Did users find the new feature?"

---

## UPGRADE 7: RESPONSE AUTOMATION (2 skills)

| # | Skill | Source | Score | Added to |
|---|-------|--------|-------|----------|
| D13 | `state-snapshotter` | CUSTOM | 10 | Phase 7 (BEFORE debugging) |
| D14 | `sre-incident-responder` | CUSTOM | 9 | Phase 7 (incident handling) |

### D13 — state-snapshotter (CUSTOM)

```
TRIGGER:   FIRES AT THE START of any debugging cycle. BEFORE systematic-debugging.
GATE:      Agent cannot propose a fix until this data is collected.
RATIONALE: 80% of debugging time is spent gathering context. This collapses that
           into 5 deterministic tool calls.

MANDATORY:  This is not optional. If state-snapshotter is loaded in v3.1,
            systematic-debugging must refuse to hypothesize until snapshotter
            has collected its data.

PROTOCOL:
  1. EXTRACT → error signature, service name, timestamp from alert/issue/triage.

  2. PULL_TRACE → query OTLP backend for trace ID within ±5min window.
     terminal("curl -s '<otel-backend>/api/traces?service=<name>&window=10m' | jq '.traces[0].traceId'")
     If no OTLP backend configured → SKIP, note gap in STATE_SNAPSHOT.md.

  3. PULL_DB → pg_stat_activity snapshot.
     terminal("psql -c \"SELECT pid, state, wait_event_type, wait_event,
     query_start, LEFT(query, 200) FROM pg_stat_activity
     WHERE state != 'idle' ORDER BY query_start;\"")
     Capture: long-running queries, lock waits, idle-in-transaction.

  4. PULL_LOGS → last 50 lines from container/pod, filtered by correlation ID.
     terminal("docker logs --tail 50 <service> 2>&1 | grep -i 'error\|warn\|panic'")
     Or kubectl equivalent.

  5. PULL_DIFF → git diff since last deploy tag.
     terminal("git diff $(git describe --tags --abbrev=0)..HEAD --stat")
     "What changed between last known-good and now?"

  6. ASSEMBLE → STATE_SNAPSHOT.md with all findings, gaps noted.
     Format: timestamped sections. Empty sections marked "NO DATA AVAILABLE."

  7. HANDOFF → pass STATE_SNAPSHOT.md to systematic-debugging as pre-filled context.
     systematic-debugging starts at "isolate" phase — reproduction already captured.

OUTPUT: A complete forensic snapshot assembled before the first hypothesis is formed.
```

### D14 — sre-incident-responder (CUSTOM)

```
TRIGGER:   PagerDuty/Grafana alert webhook OR user reports "production is down."
GATE:      Human 2FA approval required for ANY state-changing command.
           Read-only commands (kubectl get, psql SELECT, curl health checks)
           are safe to run automatically.

PROTOCOL:
  1. ALERT_TRIGGERED → ingest webhook payload.
     Parse: service name, severity (SEV1-SEV4), alert name, timestamp.
     SEV1 (user-facing down) → immediate response. SEV4 (warning) → ticket.

  2. ISOLATE → query otel for service topology.
     "What depends on this service? What does this service depend on?"
     Map blast radius. Identify affected users/features.

  3. INGEST_RUNBOOK → search /docs/runbooks/*.md for matching alert name.
     If runbook found → follow steps exactly.
     If NO runbook found → flag gap, continue manually, create runbook ticket.

  4. EXECUTE_SAFE → READ-ONLY commands only. Never state-changing.
     ALLOWED: kubectl get/describe/logs, psql SELECT, supabase CLI reads,
              terraform plan (never apply), curl health checks, otel queries.
     BLOCKED: kubectl delete/apply, psql INSERT/UPDATE/DELETE/DROP,
              terraform apply, any restart/reload command.
     If a runbook step requires state change → HALT → ask for human approval.

  5. PROPOSE → draft fix as:
     - Git diff (code change)
     - CLI command sequence (infra change)
     - Configuration change (env var, feature flag toggle)
     BLOCK on human 2FA approval. Display: "Proposed mitigation: <diff>.
     Type /approve to execute."

  6. MITIGATE (after approval) → apply fix. Monitor for 5 minutes.
     Query otel for: error rate, latency p95, availability.
     If metrics return to baseline → mark mitigated.
     If metrics do NOT recover → rollback proposed fix.

  7. POSTMORTEM → auto-generate timeline:
     - Alert fired: <timestamp>
     - Isolated to: <service>, blast radius: <N services, M users>
     - State snapshot: <link to STATE_SNAPSHOT.md>
     - Runbook used: <path> or "NO RUNBOOK — created ticket #N"
     - Mitigation: <diff link or command log>
     - Time to detect: <N minutes>
     - Time to mitigate: <N minutes>
     - Root cause: <from systematic-debugging output>
     - Prevention: <proposed AGENTS.md entry, tagged [DEBUG-SESSION]>
     Commit postmortem to /docs/postmortems/<date>-<incident>.md

REFERENCE: Anthropic SRE Cookbook (platform.claude.com/cookbook/managed-agents-sre-incident-responder)
           Google SRE Book, Chapters 11-15 (sre.google/books)
```

**When to add D13:** Average debug cycle >30 minutes across 3+ sessions.
**When to add D14:** AFTER first real production incident. Do NOT build this
before you've felt the pain. You can't write runbooks for incidents you've
never had.

---

## UPGRADE 8: LOOP AUTOMATION (2 skills)

| # | Skill | Source | Score | Added to |
|---|-------|--------|-------|----------|
| D15 | `loop-orchestrator` | CUSTOM | 10 | Meta (wraps all phases) |
| D16 | `pattern-detector` | CUSTOM | 9 | Phase 7 (during debug) |

### D15 — loop-orchestrator (CUSTOM)

```
TRIGGER:   After writing-plans generates prd.json task list.
STOP:      All tasks complete OR 3 consecutive failures.
PREREQ:    10+ sessions of manual loop execution validated. Do not automate
           a process you haven't proven works manually.

BASED ON:  Addy Osmani "Self-Improving Coding Agents" (addyosmani.com, Jan 2026)
           The "Ralph Wiggum" continuous coding loop technique.

PROTOCOL:
  1. LOAD_TASKS → read prd.json from PRIMARY branch.
     prd.json was written by writing-plans (Phase 1). Format:
     [{"id": "1", "desc": "...", "files": [...], "acceptance": "...", "passes": false}]

  2. PICK_NEXT → find first task with passes: false.
     If none remain → all tasks complete → STOP.

  3. PROMPT_TEMPLATE → assemble context for subagent:
     - Task description from prd.json
     - Relevant AGENTS.md sections (Gotchas, Patterns)
     - Relevant source files (from prd.json files list)
     - DESIGN_COMPLIANCE_CHECKLIST (from Phase 2 purge)
     - NO full design skills (already compressed)

  4. SPAWN → delegate_task(goal=<task>, context=<template>)
     subagent-driven-dev (S3) implements the task in worktree.

  5. VALIDATE → requesting-code-review (S5) checks output against plan.
     INCLUDES grep-based AGENTS.md compliance audit (Fix 1).

  6. LOCKSTEP:
     - Tests pass + compliance audit passes?
       → git commit in worktree → mark passes: true in prd.json.
       → log to progress.txt: "TASK <id> PASS <timestamp>"

     - Tests fail or compliance audit fails?
       → systematic-debugging (S7) attempts fix.
       → Retry once.
       → If still fails → mark passes: false in prd.json.
       → log to progress.txt: "TASK <id> FAIL <error> <timestamp>"
       → pattern-detector (D16) checks if this is a recurring failure.
       → Skip task, continue loop.

  7. RESET → context-engineering (Phase 8) purges task context.
     Fresh subagent per task. Zero pollution.

  8. GOTO 2 → pick next task.

  9. STOP → all tasks complete OR 3 consecutive failures.
     On stop: write summary to progress.txt. Signal session end.

PROGRESS TRACKING (all on PRIMARY branch):
  progress.txt  → chronological journal: task ID, pass/fail, error, timestamp
  prd.json      → structured task state with passes: true/false per item
  git log       → one commit per completed task (from worktree merges)

HUMAN OVERSIGHT:
  - Loop runs autonomously but can be interrupted at any time.
  - If 3 consecutive failures → loop stops. Human investigates.
  - progress.txt is human-readable. Check progress at any time.
  - prd.json can be edited mid-loop to add/remove/reorder tasks.
```

### D16 — pattern-detector (CUSTOM)

```
TRIGGER:   Fires when test fails, review flags issue, or debug cycle starts.
PREREQ:    At least 10 sessions of history in session_search.
           This skill has nothing to search without history.

PROTOCOL:
  1. FINGERPRINT → extract from current failure:
     - Error type (TypeError, null reference, race condition, timeout)
     - File path and module
     - Stack trace signature (first 3 frames)
     - AGENTS.md section that would have prevented it (if known)

  2. SEARCH_MEMORY → Hermes memory: query for matching error patterns.
     memory action is auto-injected, but here we actively search:
     "payment race condition" → finds prior memory entry.

  3. SEARCH_SESSIONS → session_search(query="<fingerprint key terms>").
     Limit: 3 sessions. Extract: debugging approach, fix applied, time spent.

  4. SEARCH_GOTCHAS → grep AGENTS.md for matching [DEBUG-SESSION] or
     [WORKAROUND] entries that relate to this module or error type.

  5. OUTPUT (three possible):

     MATCH FOUND (high confidence):
       "PATTERN RECOGNIZED: This error matches 3 prior sessions.
       Module: payment.ts. Error: race condition on concurrent charges.
       Prior fix: advisory lock (AGENTS.md #7, [WORKAROUND]).
       Prior fix time: 45min avg. Estimated fix time now: 10min.
       RECOMMENDATION: Apply advisory lock pattern. Flag for promotion
       to [CLEAN] if confirmed in this session."

     SIMILAR FOUND (medium confidence):
       "PARTIAL MATCH: Similar to session #42 (auth timeout, 2026-05-15).
       Different module but same error class (race condition).
       Prior approach may apply. Review session #42 for context."

     NO MATCH:
       "NEW FAILURE PATTERN. No prior sessions found matching this
       fingerprint. Flagging for project-memex capture as [DEBUG-SESSION].
       Proceeding with systematic-debugging from scratch."

  6. FEED → output goes to systematic-debugging as additional context.
     If MATCH FOUND → systematic-debugging starts at "hypothesize" phase
     with a candidate fix already identified.
     If NO MATCH → systematic-debugging runs full 4-phase cycle.

ACCELERATION EFFECT:
  Session 1: Payment race condition → 2 hours debugging → pattern-detector
             has no history → captured as [DEBUG-SESSION]
  Session 5: Payment race condition again → pattern-detector finds prior
             session → suggests fix in 30 seconds → captured as [WORKAROUND]
  Session 12: Payment race condition again → pattern-detector finds 3 prior
             sessions → fix applied in 2 minutes → promoted to [CLEAN]

  The agent gets faster at recurring problems. This is the compound loop.
```

**When to add D15:** After 10+ manual sessions prove the loop works. "I want this
to run overnight without me."
**When to add D16:** After 10+ sessions of history exist. Before that, it has
nothing to search.

---

## UPGRADE 9: ITERATION REFINEMENTS (2 skills)

| # | Skill | Source | Tier | Score | Added to |
|---|-------|--------|------|-------|----------|
| D17 | `code-simplify` | addyosmani/agent-skills | 2 | 8 | Phase 8 |
| D18 | `writing-guidelines` | vercel-labs/agent-skills | 1 | 7 | Phase 8 |

**What they add:**
- D17: Dead code detection, over-abstraction identification, clever-but-fragile pattern flagging. Simplify toward clarity. NOW INCLUDES dependency hygiene (unused deps audit, outdated package check, version conflict detection).
- D18: 80+ rules for docs: voice, tone per content type (tutorial/how-to/reference), code samples, typography, source formatting. Post-ship docs quality gate.

**Sources:**
- code-simplify: addyosmani/agent-skills — Tier 2, 65k stars.
- writing-guidelines: vercel-labs/agent-skills — Tier 1, 28k stars.

**When to add D17:** Any team member says "this code is confusing" or `cloc` shows
files >500 lines.
**When to add D18:** Before publishing docs to users OR after onboarding a new team member.

---

## UPGRADE 10: PROJECT-MEMEX ENHANCEMENT (no new skill)

```
project-memex v3.1 — SKILL RETROSPECTIVE

  Add this section to project-memex output (no new skill required):

  ## Skill Quality Log (human reviews weekly)
  | Date | Skill | Issue | Severity | Evidence | Action |
  |------|-------|-------|----------|----------|--------|
  | 2026-06-21 | react-best-practices | Rule #14 (useMemo) conflicts with Rule #8 (useCallback) on render optimization | Medium | Both rules correct in isolation, conflict in composition | Review |
  | 2026-06-22 | web-design-guidelines | Recommends font-display:swap — caused CLS regression on product page | High | Lighthouse CLS score +0.15 after applying | Patch or pin |

  RULES:
  - Agent NEVER auto-patches skills.
  - Agent flags issues with: date, skill name, specific rule, severity, evidence.
  - Severity: High (caused regression/broken output), Medium (conflicting guidance), Low (stale reference).
  - Human reviews this section weekly (included in the 15min/week touchpoint).
  - Human decides: patch the skill, pin the version, file upstream issue, or ignore.
  - Hermes curator handles lifecycle (archive stale) independently of quality log.
```

---

## COMPLETE v3.1 SKILL INVENTORY

```
v3.0-lite skills              22
v3.1 added skills              17
v3.1 new custom skills          6  (S6 framework-gate, D11, D13, D14, D15, D16)
v3.1 enhancements (no new)      5  (S5 compliance audit, M2 provenance,
                                   18 meta-file check, 23 bloat mgmt,
                                   M2 skill retrospective)
─────────────────────────────────
TOTAL v3.1                     40 skills + 9 custom specs
```

## v3.1 CREDIBILITY ADDITIONS

| New Source | Stars | What | Tier |
|-----------|-------|------|------|
| mattpocock/skills | 139k | grill-with-docs, improve-architecture | 2 |
| Community-Access | 318 | accessibility-agents | 4 |
| addyosmani/agent-skills | 65k | frontend-ui-engineering, code-simplify | 2 |
| supabase/agent-skills | 2.3k | supabase-pg-practices | 1 |
| alirezarezvani/claude-skills | 18.7k | senior-data-engineer | 2 |
| artilleryio/agent-skills | 2 | artillery-load-testing | 4 |
| softaworks/agent-toolkit | 2,069 | migration-safety | 4 |
| vercel-labs/agent-skills | 28k | vercel-optimize, writing-guidelines | 1 |
| launchdarkly/ai-tooling | 17 | guarded-rollout | 4 |
| PostHog Code | n/a | instrument-analytics | 5 |
| Custom (specs above) | — | slo-definition, state-snapshotter, sre-incident-responder, loop-orchestrator, pattern-detector | — |

---

## MIGRATION PATH — v3.0-lite → v3.1

```
WEEK 1-2 (v3.0-lite baseline):
  Run v3.0-lite. Let session-bootstrap and project-memex build AGENTS.md.
  Track in progress.txt: debug cycle duration, edge cases missed.
  Do NOT add any skills yet. Collect data.

WEEK 3 (trigger-based):
  - IF agent missed edge cases in 3+ specs → add UPGRADE 1 (grill-with-docs)
  - IF any DB query >500ms → add UPGRADE 3 (supabase-pg-practices)
  - IF "this codebase is messy" → add UPGRADE 4 (improve-architecture)

WEEK 4 (pre-production):
  - IF launching to production → add UPGRADE 4 (artillery-load-testing)
  - IF DB schema change → add UPGRADE 5 (migration-safety)
  - IF Vercel deployment → add UPGRADE 5 (vercel-optimize)

WEEK 5-6 (post-launch monitoring):
  - IF otel has 2 weeks of data → add UPGRADE 6 (slo-definition)
  - IF "are users using this?" → add UPGRADE 6 (instrument-analytics)

WEEK 6+ (maturity):
  - IF debug cycles averaging >30min → add UPGRADE 7 (state-snapshotter)
  - IF first production incident occurred → add UPGRADE 7 (sre-incident-responder)
  - IF 10+ manual sessions validated → add UPGRADE 8 (loop-orchestrator)
  - IF 10+ sessions of history → add UPGRADE 8 (pattern-detector)

ON DEMAND:
  - UPGRADE 2 (accessibility, frontend-ui-engineering) — when triggered by complaints
  - UPGRADE 3 (senior-data-engineer) — when task list includes data pipelines
  - UPGRADE 5 (guarded-rollout) — when canary deployment needed
  - UPGRADE 9 (code-simplify, writing-guidelines) — when triggered by team feedback
```

---

## v3.1 FRAMEWORK RATING

```
DIMENSION                     v3.0-lite   v3.1      DELTA
──────────────────────────────────────────────────────────
Phase coverage                  8/8        8/8        —
Context discipline              10/10      10/10       —
Compliance verification         10/10      10/10       —
Memory safety                   9/10       9/10        —
Worktree safety                 9/10       9/10        —
Backend coverage                6/10       8/10       +data pipelines, +migration safety
Debug rigor                     8/10       10/10      +state-snapshotter
SRE production readiness        5/10       9/10       +incident-responder, +slo-definition
Self-learning                   8/10       10/10      +pattern-detector, +loop-orchestrator
Load testing                    0/10       8/10       +artillery
Migration safety                0/10       9/10       +softaworks
User analytics                  0/10       7/10       +PostHog
Credibility (avg tier)          1.9        2.0        slight dilution from Tier 4 additions
Custom implementation burden    3 files    8 files    5 new custom skills
──────────────────────────────────────────────────────────
OVERALL                         8.7/10     9.5/10     +8%
```

---

## WHAT EVEN v3.1 HONESTLY DOES NOT COVER

| Gap | Why | Mitigation |
|-----|-----|-----------|
| Kubernetes deep-dive | No credible K8s agent skill exists. HashiCorp covers Nomad. | Use terraform skill for K8s infrastructure + official K8s docs as reference. Author custom skill if K8s becomes core. |
| Stream processing (Flink, Beam) | Data engineer skill touches Spark/Kafka but not streaming windowing/state. | Acceptable gap unless streaming is a core workload. Author custom skill if needed. |
| Mobile native (Swift/Kotlin) | react-native-guidelines covers React Native only. Native mobile needs platform-specific skills. | Acceptable gap unless building native mobile. |
| Multi-cloud service patterns | Terraform covers IaC, not cloud-native architecture decisions. | HashiCorp's Vault/Consul/Nomad skills provide multi-cloud orchestration. Cloud-specific architecture patterns deferred. |
| Skill self-audit | Auto-patching skills without human review or regression tests is dangerous. | Human reviews Skill Quality Log weekly. Hermes curator handles lifecycle. This gap is closed by process, not automation — by design. |

