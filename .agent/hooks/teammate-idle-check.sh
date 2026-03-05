#!/bin/bash
# TeammateIdle Hook — Enforces quality checks before a teammate can go idle
# Exit code 2 = send feedback and keep teammate working
# Exit code 0 = allow teammate to go idle

INPUT=$(cat)
TEAMMATE_NAME=$(echo "$INPUT" | jq -r '.teammate_name // "unknown"')
TEAM_NAME=$(echo "$INPUT" | jq -r '.team_name // "unknown"')
CWD=$(echo "$INPUT" | jq -r '.cwd // "."')

echo "🔍 Checking teammate '$TEAMMATE_NAME' from team '$TEAM_NAME' before idle..." >&2

# Check 1: Are there any TypeScript/ESLint errors?
if command -v npx &> /dev/null; then
  cd "$CWD" 2>/dev/null
  
  # Quick lint check (timeout after 30s to avoid blocking)
  LINT_OUTPUT=$(timeout 30 npx next lint --quiet 2>&1 || true)
  if echo "$LINT_OUTPUT" | grep -q "Error"; then
    echo "❌ Lint errors found. Fix all lint errors before going idle." >&2
    echo "Errors: $LINT_OUTPUT" >&2
    exit 2
  fi
fi

# Check 2: Is PLAN.md updated with current status?
if [ -f "$CWD/PLAN.md" ]; then
  # Check if PLAN.md was modified in the last 10 minutes
  if [ "$(uname)" = "Darwin" ]; then
    PLAN_MOD=$(stat -f %m "$CWD/PLAN.md" 2>/dev/null || echo 0)
    NOW=$(date +%s)
  else
    PLAN_MOD=$(stat -c %Y "$CWD/PLAN.md" 2>/dev/null || echo 0)
    NOW=$(date +%s)
  fi
  
  DIFF=$((NOW - PLAN_MOD))
  if [ "$DIFF" -gt 600 ] && [ "$TEAMMATE_NAME" = "researcher" ]; then
    echo "⚠️ PLAN.md hasn't been updated in over 10 minutes. Update it with current progress before going idle." >&2
    exit 2
  fi
fi

# Check 3: Verify no uncommitted changes left by the teammate
# (Only check for implementation teammates, not QC or researcher)
if [ "$TEAMMATE_NAME" = "design-lead" ] || [ "$TEAMMATE_NAME" = "builder" ]; then
  cd "$CWD" 2>/dev/null
  UNCOMMITTED=$(git status --porcelain 2>/dev/null | wc -l | tr -d ' ')
  if [ "$UNCOMMITTED" -gt 10 ]; then
    echo "⚠️ You have $UNCOMMITTED uncommitted changes. Consider committing your work before going idle." >&2
    # Note: This is a warning, not a block. Exit 0 to allow idle.
    # Change to exit 2 if you want to enforce commits.
  fi
fi

echo "✅ Teammate '$TEAMMATE_NAME' passed idle checks." >&2
exit 0
