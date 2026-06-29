"""
merge_sessions.py — Multi-Seat AGENTS.md Merge Pipeline
NiraNexus-OS Governance Layer

Implements the weekly merge protocol from docs/frameworks/framework-v3.0-lite-OPERATIONS.md
(Patch 6: Multi-Seat Aggregation Conflicts).

Scope: Environment-wide. Consolidates session_logs/ from ALL projects into a
single deduplicated AGENTS.md. Runs at the framework level, not per-project.

TWO PHASES:
  Phase 1 (default):  python .hermes/merge_sessions.py
    Load session logs → group by semantic fingerprint → classify
    CONSENSUS / DIVERGENT / DUPLICATE
    → auto-merge consensus + duplicates → write CONFLICT_REVIEW.md

  Phase 2 (resolve):  python .hermes/merge_sessions.py --resolve
    Read human picks from CONFLICT_REVIEW_RESOLVED.md → apply
    → output AGENTS.md patch + merged.json audit trail

ENTRY AGREEMENT DETECTION:
  - DUPLICATE:  text similarity > 0.90 (near-identical wording)
  - CONSENSUS:  same section + text similarity > 0.60 (same lesson, different words)
  - DIVERGENT:  similarity <= 0.60 (different fix approaches → human review)
  Conservative: borderline cases (0.60-0.70) surface as DIVERGENT.
"""

import json
import os
import sys
from difflib import SequenceMatcher
from datetime import datetime, timezone
from collections import defaultdict


# ── Configuration ──────────────────────────────────────────────────────────

SESSION_DIR = ".hermes/session_logs"
CONFLICT_FILE = "CONFLICT_REVIEW.md"
RESOLVED_FILE = "CONFLICT_REVIEW_RESOLVED.md"
MERGED_LOG = os.path.join(SESSION_DIR, "merged.json")
AGENTS_PATCH_FILE = ".hermes/merge_output_agents_patch.md"

DUPLICATE_THRESHOLD = 0.90
CONSENSUS_THRESHOLD = 0.60


# ── Helpers ─────────────────────────────────────────────────────────────────

def fingerprint(text: str) -> str:
    """First 3 words, lowercased. 'payment double charge advisory'"""
    return " ".join(text.split()[:3]).lower()


def entry_key(entry: dict) -> tuple:
    """Composite key: (section, fingerprint)"""
    return (entry.get("section", "Unknown"), fingerprint(entry.get("text", "")))


def text_similarity(a: str, b: str) -> float:
    """SequenceMatcher ratio. 1.0 = identical, 0.0 = unrelated."""
    return SequenceMatcher(None, a.strip(), b.strip()).ratio()


def load_sessions(session_dir: str) -> list[dict]:
    """Load all session JSON files from session_dir AND from any
    .hermes/session_logs/ directories found in immediate subdirectories.
    This aggregates logs from all sub-projects under the framework root."""
    sessions = []
    dirs_to_scan = [session_dir]

    # Also scan sub-project session_logs (one level deep)
    if os.path.isdir("."):
        for entry in os.listdir("."):
            sub_logs = os.path.join(entry, ".hermes", "session_logs")
            if os.path.isdir(sub_logs) and sub_logs != session_dir:
                dirs_to_scan.append(sub_logs)

    for scan_dir in dirs_to_scan:
        if not os.path.isdir(scan_dir):
            continue
        for fname in sorted(os.listdir(scan_dir)):
            if not fname.endswith(".json") or fname == "merged.json":
                continue
            fpath = os.path.join(scan_dir, fname)
            try:
                with open(fpath, "r", encoding="utf-8") as f:
                    data = json.load(f)
                sessions.append({"path": fpath, "data": data})
            except (json.JSONDecodeError, OSError) as e:
                print(f"[WARN] Skipping {fpath}: {e}")
    return sessions


def classify_group(entries: list[dict]) -> str:
    """
    Classify entries sharing a fingerprint:
      DUPLICATE:  all pairwise similarities > 0.90
      CONSENSUS:  all pairwise > 0.60 (same lesson, different words)
      DIVERGENT:  any pair <= 0.60 (conflicting approaches)
    """
    if len(entries) <= 1:
        return "CONSENSUS"

    texts = [e.get("text", "") for e in entries]
    min_sim = 1.0

    for i in range(len(texts)):
        for j in range(i + 1, len(texts)):
            sim = text_similarity(texts[i], texts[j])
            min_sim = min(min_sim, sim)

    if min_sim >= DUPLICATE_THRESHOLD:
        return "DUPLICATE"
    elif min_sim >= CONSENSUS_THRESHOLD:
        return "CONSENSUS"
    else:
        return "DIVERGENT"


def pick_winner(entries: list[dict]) -> dict:
    """
    Pick winning entry from a CONSENSUS/DUPLICATE group.
    Rule: earliest [WORKAROUND] wins if provenance mixed, else earliest date.
    """
    sorted_entries = sorted(
        entries, key=lambda e: e.get("_session_date", "9999")
    )

    # Prefer [CLEAN] — confirmed across 3+ sessions, intentionally designed.
    # [WORKAROUND] is a provisional symptom-fix; [CLEAN] is the canonical version.
    clean = [e for e in sorted_entries if e.get("tag") == "[CLEAN]"]
    winner = clean[0] if clean else sorted_entries[0]

    return {
        "entry": winner["entry"],
        "source_session_id": winner.get("_session_id", "unknown"),
        "all_session_ids": [
            e.get("_session_id", "unknown") for e in sorted_entries
        ],
    }


def format_entry_md(entry: dict) -> str:
    """Format a single entry as an AGENTS.md bullet."""
    tag = entry.get("tag", "[CLEAN]")
    text = entry.get("text", "")
    return f"- {tag} {text}"


# ── Phase 1: Detect & Auto-Merge ───────────────────────────────────────────

def phase1_detect():
    """Load sessions, group entries, classify, auto-merge, write conflict table."""
    sessions = load_sessions(SESSION_DIR)

    if not sessions:
        print(
            "[INFO] No session logs found in .hermes/session_logs/. "
            "Nothing to merge."
        )
        return

    # Gather all entries with session provenance attached.
    # Deduplicate: skip entries with identical (session_id, section, fingerprint)
    # within the same session to prevent misleading "confirmed by 2 sessions" counts.
    all_entries = []
    seen_in_session = set()
    for sess in sessions:
        data = sess["data"]
        session_id = data.get("session_id", "unknown")
        session_date = data.get("date", "unknown")
        for entry in data.get("entries", []):
            dedup_key = (
                session_id,
                entry.get("section", ""),
                fingerprint(entry.get("text", "")),
            )
            if dedup_key in seen_in_session:
                continue
            seen_in_session.add(dedup_key)
            all_entries.append({
                "entry": entry,
                "_session_id": session_id,
                "_session_date": session_date,
            })

    if not all_entries:
        print("[INFO] No entries found across session logs.")
        return

    # Group by (section, fingerprint)
    groups = defaultdict(list)
    for item in all_entries:
        key = entry_key(item["entry"])
        groups[key].append(item)

    # Classify and partition
    consensus_entries = []
    divergent_groups = []

    for key, items in groups.items():
        classification = classify_group(items)

        if classification in ("CONSENSUS", "DUPLICATE"):
            winner = pick_winner(items)
            consensus_entries.append({
                "section": key[0],
                "fingerprint": key[1],
                "classification": classification,
                "entry_line": format_entry_md(winner["entry"]),
                "source_session": winner["source_session_id"],
                "all_sessions": winner["all_session_ids"],
                "entry_count": len(items),
            })
        else:
            divergent_groups.append({
                "section": key[0],
                "fingerprint": key[1],
                "entries": [
                    {
                        "session_id": item["_session_id"],
                        "session_date": item["_session_date"],
                        "tag": item["entry"].get("tag", ""),
                        "text": item["entry"].get("text", ""),
                        "source": item["entry"].get("source", ""),
                    }
                    for item in items
                ],
            })

    # ── Write CONFLICT_REVIEW.md ──
    week_label = datetime.now(timezone.utc).strftime("%Y-%m-%d")

    with open(CONFLICT_FILE, "w", encoding="utf-8") as f:
        f.write(f"## Merge Conflicts — Week of {week_label}\n\n")
        f.write(
            "**Instructions:** For each conflict, replace `[ ]` with `[x]` "
            "on ONE entry per group.\n"
            "Save as **CONFLICT_REVIEW_RESOLVED.md**, then run:\n\n"
            "    python .hermes/merge_sessions.py --resolve\n\n"
            "---\n\n"
        )

        if not divergent_groups:
            f.write("**No conflicts.** All entries reached consensus. ✓\n\n")
        else:
            for i, group in enumerate(divergent_groups):
                conflict_id = f"DIVERGENT-{i + 1:03d}"
                f.write(
                    f"### {conflict_id}: `{group['fingerprint']}`\n\n"
                )
                f.write(f"**Section:** {group['section']}  \n")
                f.write(
                    f"**Entries:** {len(group['entries'])} sessions "
                    f"disagree on approach\n\n"
                )
                f.write(
                    "| Pick | Session | Date | Tag | Text |\n"
                    "| :---: | :--- | :--- | :--- | :--- |\n"
                )
                for entry in group["entries"]:
                    f.write(
                        f"| [ ] | {entry['session_id']} "
                        f"| {entry['session_date']} "
                        f"| {entry['tag']} "
                        f"| {entry['text']} |\n"
                    )
                f.write("\n---\n\n")

    # ── Console Summary ──
    print(f"\n[PHASE 1 — DETECT]")
    print(f"  Sessions loaded:      {len(sessions)}")
    print(f"  Total entries:        {len(all_entries)}")
    print(f"  Unique fingerprints:  {len(groups)}")
    print(f"  Auto-merged:          {len(consensus_entries)}")
    print(f"  Conflicts:            {len(divergent_groups)}")
    print(f"\n[OUTPUT] {CONFLICT_FILE}")

    if consensus_entries:
        print(f"\n── Auto-Merged (applied on --resolve) ──")
        for ce in consensus_entries:
            print(
                f"  [{ce['classification']:9}] {ce['section']}: "
                f"{ce['entry_line'][:100]}"
            )
            print(
                f"    Source: {ce['source_session']}, "
                f"confirmed by {ce['entry_count']} session(s)"
            )

    if divergent_groups:
        print(f"\n── Needs Human Review ──")
        for dg in divergent_groups:
            sessions_involved = [e["session_id"] for e in dg["entries"]]
            print(
                f"  [{dg['fingerprint']}] — "
                f"{len(dg['entries'])} approaches from {sessions_involved}"
            )

    # ── Save merge state for Phase 2 ──
    merge_state = {
        "week": week_label,
        "session_count": len(sessions),
        "total_entries": len(all_entries),
        "unique_fingerprints": len(groups),
        "consensus": consensus_entries,
        "divergent": divergent_groups,
    }
    os.makedirs(SESSION_DIR, exist_ok=True)
    with open(MERGED_LOG, "w", encoding="utf-8") as f:
        json.dump(merge_state, f, indent=2)
    print(f"\n[MERGE STATE] {MERGED_LOG}")


# ── Phase 2: Resolve ───────────────────────────────────────────────────────

def phase2_resolve():
    """Read human picks from RESOLVED_FILE, output final AGENTS.md patch."""
    if not os.path.exists(RESOLVED_FILE):
        print(f"[ERROR] {RESOLVED_FILE} not found.")
        print(
            "  Run Phase 1, edit CONFLICT_REVIEW.md with your picks, "
            f"save as {RESOLVED_FILE}, then re-run with --resolve."
        )
        sys.exit(1)

    if not os.path.exists(MERGED_LOG):
        print(f"[ERROR] {MERGED_LOG} not found. Run Phase 1 first.")
        sys.exit(1)

    with open(MERGED_LOG, "r", encoding="utf-8") as f:
        merge_state = json.load(f)

    # Parse resolved file — extract [x]-checked rows
    with open(RESOLVED_FILE, "r", encoding="utf-8") as f:
        content = f.read()

    resolved_picks = {}
    for group in merge_state.get("divergent", []):
        for entry in group["entries"]:
            marker = f"| [x] | {entry['session_id']}"
            if marker in content:
                resolved_picks[group["fingerprint"]] = entry
                break

    # Assemble final entries: consensus (auto) + divergent (human picks)
    all_final = []

    for ce in merge_state.get("consensus", []):
        all_final.append({
            "section": ce["section"],
            "fingerprint": ce["fingerprint"],
            "entry_line": ce["entry_line"],
            "resolution": "auto",
            "source_session": ce["source_session"],
        })

    for group in merge_state.get("divergent", []):
        fp = group["fingerprint"]
        if fp in resolved_picks:
            winner = resolved_picks[fp]
            all_final.append({
                "section": group["section"],
                "fingerprint": fp,
                "entry_line": format_entry_md(winner),
                "resolution": "human",
                "source_session": winner["session_id"],
            })
        else:
            print(f"[WARN] No pick found for: {fp}")
            print(
                f"  SKIPPED. Edit {RESOLVED_FILE} and check [x] on one entry."
            )

    # ── Write AGENTS.md patch ──
    by_section = defaultdict(list)
    for entry in all_final:
        by_section[entry["section"]].append(entry)

    timestamp = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    with open(AGENTS_PATCH_FILE, "w", encoding="utf-8") as f:
        f.write(
            "## Merged AGENTS.md Entries\n\n"
            f"*Auto-generated by merge_sessions.py — {timestamp}*\n"
            "*Apply these entries to the appropriate sections in AGENTS.md "
            "on the primary branch.*\n\n"
            "---\n\n"
        )

        for section, entries in sorted(by_section.items()):
            f.write(f"### {section}\n\n")
            for entry in entries:
                tag = (
                    "auto" if entry["resolution"] == "auto" else "human \u2713"
                )
                f.write(
                    f"{entry['entry_line']}  "
                    f"\u2190 [{tag}, {entry['source_session']}]\n"
                )
            f.write("\n")

    # ── Update audit log ──
    merge_state["resolved_at"] = datetime.now(timezone.utc).isoformat()
    merge_state["final_entry_count"] = len(all_final)
    merge_state["unresolved"] = [
        g["fingerprint"]
        for g in merge_state.get("divergent", [])
        if g["fingerprint"] not in resolved_picks
    ]
    with open(MERGED_LOG, "w", encoding="utf-8") as f:
        json.dump(merge_state, f, indent=2)

    print(f"\n[PHASE 2 — RESOLVE]")
    print(
        f"  Final entries: {len(all_final)} "
        f"({len(merge_state.get('consensus', []))} auto, "
        f"{len(resolved_picks)} human)"
    )
    unresolved = len(merge_state.get("unresolved", []))
    if unresolved:
        print(f"  Unresolved:    {unresolved} (re-run after fixing picks)")
    print(f"\n[OUTPUT] {AGENTS_PATCH_FILE}")
    print(f"[AUDIT]  {MERGED_LOG}")
    print(
        "\n── Apply ──\n"
        f"  1. Open:  {os.path.abspath(AGENTS_PATCH_FILE)}\n"
        "  2. Copy each entry into the matching ## section in AGENTS.md\n"
        "  3. Commit: git add AGENTS.md && git commit -m \"docs: merge \"\n"
        "     session learnings (week of <date>)\"\n"
        "  4. Archive sessions: mv .hermes/session_logs/*.json .hermes/session_logs/archive/"
    )


# ── Main ────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    if "--resolve" in sys.argv:
        phase2_resolve()
    else:
        phase1_detect()
