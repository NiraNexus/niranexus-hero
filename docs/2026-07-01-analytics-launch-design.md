# Usage Analytics + Launch Readiness — Design Spec

**Feature:** Live metrics endpoint + launch messages
**Version:** 0.1
**Date:** 2026-07-01
**Status:** Approved

---

## 1. Analytics Endpoint (`/api/metrics`)

**File:** `src/app/api/metrics/route.ts`

Returns JSON:
```json
{
  "debatesTotal": 12,
  "uniqueUsers": 3,
  "debatesToday": 2,
  "conversionRate": 0
}
```

**Queries (Supabase service_role):**
- `SELECT count(*) FROM debates`
- `SELECT count(distinct user_id) FROM debates`
- `SELECT count(*) FROM debates WHERE created_at > today()`
- `SELECT count(*) FROM profiles WHERE credits_remaining > 0` / unique users for conversion

**Caching:** 60-second cache via `Cache-Control: public, max-age=60`

**Security:** API route is public (read-only metrics). No auth required.

## 2. Hub Page — Live Metrics Card

**File:** `src/app/page.tsx`

Add 4th stat to existing live metrics row: "Converting Users" — shows conversion rate from free to paid.

## 3. Launch Messages

**WhatsApp draft:**
```
Rakesh here. Built something. NiraNexus Model Council — governance-first AI infrastructure. Four frontier models deliberate. Cross-examine. Synthesize. Every verdict has an auditable Evidence Basis with VERIFIED/DISPUTED flags. Free tier: 3 debates. model-council.niranexus.com

Not a product. Infrastructure I use myself. Would value your honest reaction.
```

**Telegram draft:**
```
NiraNexus Model Council is live. Multi-model deliberation engine with auditable source verification. 4 models. 3 rounds. 1 verdict. Evidence Basis with VERIFIED/DISPUTED/UNVERIFIED flags. Free tier: 3 debates. model-council.niranexus.com

Built under a mechanical governance framework (Phase 0-8). Not a wrapper — infrastructure.
```

## Files

| Action | File |
|---|---|
| CREATE | `src/app/api/metrics/route.ts` |
| MODIFY | `src/app/page.tsx` (add conversion stat) |

## Non-goals
- No analytics dashboard
- No historical trends
- No per-user metrics
- No automated launch message sending
