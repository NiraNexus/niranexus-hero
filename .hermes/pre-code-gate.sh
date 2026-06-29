#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════
# NIRANEXUS PRE-CODE GATE — Phase 0 Mechanical Enforcement
# ═══════════════════════════════════════════════════════════════
# Runs the standard gotcha scan pipeline before ANY code change.
# Exit 0 = PASS. Exit non-zero = FAIL (violations found).
#
# Usage: bash .hermes/pre-code-gate.sh [project_root]
#
# The agent MUST run this and show its output before any write_file
# or patch call on source files. No scan output = no code change.

set -euo pipefail

PROJECT_ROOT="${1:-.}"
cd "$PROJECT_ROOT" 2>/dev/null || { echo "FAIL: cannot access $PROJECT_ROOT"; exit 1; }

fail=0
checks=0

echo "═══════════════════════════════════════════"
echo "  NIRANEXUS PRE-CODE GATE — Gotcha Scan"
echo "═══════════════════════════════════════════"
echo ""

# ── 1. Stray model references ──────────────────────────────────
checks=$((checks + 1))
echo -n "[$checks/11] Stray model references... "
if grep -rn 'grok\|opus[^-]\|gemini\|deepseek-v4-pro' src/ 2>/dev/null | grep -v '\.test\.\|__tests__' | grep -v 'node_modules' | grep -v 'FALLBACK_CHAINS\|fallbackChain\|ORCHESTRATOR_MODEL\|claude-3-opus' | grep -q .; then
    echo "FAIL"
    grep -rn 'grok\|opus[^-]\|gemini\|deepseek-v4-pro' src/ 2>/dev/null | grep -v '\.test\.\|__tests__' | grep -v 'node_modules' | grep -v 'FALLBACK_CHAINS\|fallbackChain\|ORCHESTRATOR_MODEL\|claude-3-opus' || true
    fail=$((fail + 1))
else
    echo "PASS"
fi

# ── 2. JSX inline comments ─────────────────────────────────────
checks=$((checks + 1))
echo -n "[$checks/11] JSX inline comments... "
# Exclude code-level comments: regex patterns, effect annotations, etc.
if grep -n '//' src/components/*.tsx src/app/*.tsx 2>/dev/null \
    | grep -v '://\|eslint\|TODO\|FIXME' \
    | grep -v '\.replace(' \
    | grep -v '// \*\*\|// \*italic\|// ##\|// - bullet\|// \`code\`' \
    | grep -v '// Animate arcs\|// Stagger each\|// 150ms\|// Count responding' \
    | grep -v '// Use execCommand\|// Include per-model\|// For now' \
    | grep -q .; then
    echo "FAIL"
    grep -n '//' src/components/*.tsx src/app/*.tsx 2>/dev/null | grep -v '://\|eslint\|TODO\|FIXME' | grep -v '\.replace(' || true
    fail=$((fail + 1))
else
    echo "PASS"
fi

# ── 3. HTML button nesting ─────────────────────────────────────
checks=$((checks + 1))
echo -n "[$checks/11] HTML button nesting... "
if [[ "$OS" == "Windows_NT" ]] || [[ "$(uname -s 2>/dev/null)" == *"MINGW"* ]]; then
    echo "SKIP (Windows — PCRE false positive)"
else
    if grep -Pzo '<button[^>]*>[\s\S]*?<button' src/components/*.tsx 2>/dev/null | grep -q .; then
        echo "FAIL"
        fail=$((fail + 1))
    else
        echo "PASS"
    fi
fi

# ── 4. Async generators in Edge routes ─────────────────────────
checks=$((checks + 1))
echo -n "[$checks/11] Async generators (Edge)... "
if grep -rn 'async function\*' src/app/api/ src/lib/ 2>/dev/null | grep -q .; then
    echo "FAIL"
    grep -rn 'async function\*' src/app/api/ src/lib/ 2>/dev/null || true
    fail=$((fail + 1))
else
    echo "PASS"
fi

# ── 5. Model ID consistency ────────────────────────────────────
checks=$((checks + 1))
echo -n "[$checks/11] Model ID consistency... "
ref_files=(
    "src/lib/types.ts"
    "src/lib/prompts.ts"
)
# These files define/use model IDs directly. Other files use COUNCIL_MODELS dynamically.
expected=${#ref_files[@]}
id_fail=0
for id in gpt55 r1 sonnet qwen; do
    count=$(grep -l "$id" "${ref_files[@]}" 2>/dev/null | wc -l)
    if [ "$count" -lt "$expected" ]; then
        [ "$id_fail" -eq 0 ] && echo "FAIL"
        echo "  Model '$id': $count/$expected files"
        id_fail=$((id_fail + 1))
    fi
done
if [ "$id_fail" -eq 0 ]; then
    echo "PASS"
else
    fail=$((fail + 1))
fi

# ── 6. Design spec exists for today ────────────────────────────
checks=$((checks + 1))
echo -n "[$checks/11] Design spec for today... "
today=$(date +%Y-%m-%d 2>/dev/null || echo "2026-06-26")
count=$(ls docs/superpowers/specs/${today}-*.md 2>/dev/null | wc -l) || count=0
if [ "${count:-0}" -ge 1 ]; then
    echo "PASS ($count found)"
else
    echo "FAIL (0 found for $today)"
    fail=$((fail + 1))
fi

# ── 7. Dead duplicate files with broken relative imports ────────
checks=$((checks + 1))
echo -n "[$checks/11] Dead duplicate files... "
dup_fail=0
for f in src/components/*.ts src/app/*.ts; do
    [ -f "$f" ] || continue
    base=$(basename "$f")
    # Check: does a file with the same name exist in src/lib/?
    if [ -f "src/lib/$base" ]; then
        # This is a duplicate. Check if its relative imports resolve.
                imports=$(sed -n "s/.*from '\.\/\([^']*\)'.*/\1/p" "$f" 2>/dev/null || true)
        dir=$(dirname "$f")
        for imp in $imports; do
            if [ ! -f "$dir/$imp.ts" ] && [ ! -f "$dir/$imp.tsx" ]; then
                [ "$dup_fail" -eq 0 ] && echo "FAIL"
                echo "  $f imports './$imp' — not found in $dir/"
                dup_fail=$((dup_fail + 1))
            fi
        done
        # Also flag any duplicate that exists — even if imports resolve today
        if [ "$dup_fail" -eq 0 ]; then
            [ -z "${dup_warned:-}" ] && echo "WARN (duplicates exist, imports resolve for now)"
            dup_warned=1
        fi
    fi
done
if [ "$dup_fail" -eq 0 ]; then
    [ -z "${dup_warned:-}" ] && echo "PASS"
fi
[ "$dup_fail" -gt 0 ] && fail=$((fail + 1))

# ── 8. Eager process.env assertions at module scope ─────────────
checks=$((checks + 1))
echo -n "[$checks/11] Eager process.env throws... "
# Non-null assertions on process.env at module scope break clean builds.
# Exclude: test files, files inside function bodies (indented), lazy-init wrappers.
if grep -rn "process\.env\.\w\+!" src/ --include="*.ts" --include="*.tsx" 2>/dev/null \
    | grep -v node_modules \
    | grep -v __tests__ \
    | grep -v "\.test\." \
    | grep -v "getSupabase\|getClient\|lazyInit\|persistSafely" \
    | grep -q .; then
    echo "FAIL"
    grep -rn "process\.env\.\w\+!" src/ --include="*.ts" --include="*.tsx" 2>/dev/null \
        | grep -v node_modules \
        | grep -v __tests__ \
        | grep -v "\.test\." \
        | grep -v "getSupabase\|getClient\|lazyInit\|persistSafely" \
        || true
    fail=$((fail + 1))
else
    echo "PASS"
fi

# ── 9. Model gate: architectural changes require V4 ─────────────
checks=$((checks + 1))
echo -n "[$checks/11] Model gate enforcement... "
MODEL_FILE=".hermes/current-model"
if [ ! -f "$MODEL_FILE" ]; then
    echo "FAIL (no .hermes/current-model — run session-bootstrap)"
    fail=$((fail + 1))
else
    MODEL=$(cat "$MODEL_FILE" | head -1 | tr -d '[:space:]')
    # Detect architectural changes: new files, new imports, new exports
    arch_changes=$(git diff --cached --name-only 2>/dev/null | grep -E 'src/lib/|src/app/api/' | head -1 || true)
    if [ -n "$arch_changes" ] && [ "$MODEL" != "deepseek-v4-pro" ]; then
        echo "FAIL ($MODEL on architectural change: $arch_changes)"
        fail=$((fail + 1))
    elif [ -n "$arch_changes" ]; then
        echo "PASS ($MODEL on architectural change)"
    else
        echo "PASS ($MODEL, no architectural changes)"
    fi
fi

# ── 10. Import/dependency consistency ──────────────────────────
checks=$((checks + 1))
echo -n "[$checks/11] Import/dependency consistency... "
dep_fail=0
# Extract all npm package imports (not relative, not node builtins)
pkgs=$(grep -rh "from ['\"]@\?[a-z][a-z0-9-]*" src/ --include="*.ts" --include="*.tsx" 2>/dev/null \
    | grep -v "from '\./" \
    | grep -v "from '\.\." \
    | grep -v "from 'node:" \
    | grep -v "from 'react'" \
    | grep -v "from 'next" \
    | sed "s/.*from ['\"]//" | sed "s/['\"].*//" \
    | grep -v "^$" | sort -u || true)
for pkg in $pkgs; do
    # Extract base package: @scope/pkg/sub → @scope/pkg, pkg/sub → pkg
    base_pkg=$(echo "$pkg" | sed 's|^\(@[^/]*/[^/]*\).*|\1|' | sed 's|^\([^/@][^/]*\).*|\1|')
    # Check if either the full import or base package is in package.json
    if ! grep -q "\"$pkg\"" package.json 2>/dev/null && ! grep -q "\"$base_pkg\"" package.json 2>/dev/null; then
        [ "$dep_fail" -eq 0 ] && echo "FAIL"
        echo "  $pkg imported but not in package.json"
        dep_fail=$((dep_fail + 1))
    fi
done
[ "$dep_fail" -eq 0 ] && echo "PASS"
[ "$dep_fail" -gt 0 ] && fail=$((fail + 1))

# ── 11. Build cache staleness ───────────────────────────────────
checks=$((checks + 1))
echo -n "[$checks/11] Build cache freshness... "
if [ -d ".next" ]; then
    # Only check if there are staged source changes pending
    staged_src=$(git diff --cached --name-only 2>/dev/null | grep -E '\.(ts|tsx)$' | head -1 || true)
    if [ -n "$staged_src" ]; then
        newest_src=$(find src/ -name "*.ts" -o -name "*.tsx" -type f -exec stat -c %Y {} \; 2>/dev/null | sort -rn | head -1 || echo 0)
        cache_time=$(stat -c %Y .next 2>/dev/null || echo 0)
        if [ "${newest_src:-0}" -gt "${cache_time:-0}" ]; then
            echo "FAIL (source newer than .next — rebuild required)"
            fail=$((fail + 1))
        else
            echo "PASS"
        fi
    else
        echo "PASS (no staged source changes)"
    fi
else
    echo "SKIP (no .next directory)"
fi

# ── Report ─────────────────────────────────────────────────────
echo ""
echo "═══════════════════════════════════════════"
if [ "$fail" -eq 0 ]; then
    echo "  GATE: PASS — $checks/$checks checks passed"
    echo "═══════════════════════════════════════════"
    exit 0
else
    echo "  GATE: FAIL — $fail/$checks violations found"
    echo "═══════════════════════════════════════════"
    exit 1
fi