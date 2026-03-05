#!/bin/bash
# TaskCompleted Hook — Enforces quality criteria before a task can be marked complete
# Exit code 2 = block completion and send feedback
# Exit code 0 = allow task completion

INPUT=$(cat)
TASK_ID=$(echo "$INPUT" | jq -r '.task_id // "unknown"')
TASK_SUBJECT=$(echo "$INPUT" | jq -r '.task_subject // "unknown"')
TASK_DESCRIPTION=$(echo "$INPUT" | jq -r '.task_description // ""')
TEAMMATE_NAME=$(echo "$INPUT" | jq -r '.teammate_name // "unknown"')
CWD=$(echo "$INPUT" | jq -r '.cwd // "."')

echo "🔍 Validating task completion: '$TASK_SUBJECT' by '$TEAMMATE_NAME'..." >&2

cd "$CWD" 2>/dev/null

# Check 1: If the task involves tests, make sure they pass
if echo "$TASK_SUBJECT $TASK_DESCRIPTION" | grep -qi "test\|spec\|audit"; then
  if [ -f "package.json" ]; then
    # Check if there's a test script
    HAS_TEST=$(jq -r '.scripts.test // ""' package.json 2>/dev/null)
    if [ -n "$HAS_TEST" ] && [ "$HAS_TEST" != "null" ]; then
      echo "Running tests..." >&2
      TEST_OUTPUT=$(timeout 60 npm test 2>&1 || true)
      if echo "$TEST_OUTPUT" | grep -q "FAIL\|failed\|Error"; then
        echo "❌ Tests are not passing. Fix failing tests before completing: $TASK_SUBJECT" >&2
        echo "Test output: $(echo "$TEST_OUTPUT" | tail -20)" >&2
        exit 2
      fi
    fi
  fi
fi

# Check 2: If the task involves UI, check for build errors
if echo "$TASK_SUBJECT $TASK_DESCRIPTION" | grep -qi "component\|page\|ui\|layout\|style\|css"; then
  if [ -f "package.json" ]; then
    BUILD_CHECK=$(timeout 30 npx next build --no-lint 2>&1 | tail -5 || true)
    if echo "$BUILD_CHECK" | grep -q "Build error\|Failed to compile"; then
      echo "❌ Build errors detected. Fix compilation errors before completing: $TASK_SUBJECT" >&2
      echo "Build output: $BUILD_CHECK" >&2
      exit 2
    fi
  fi
fi

# Check 3: If the task involves API, check for exposed secrets
if echo "$TASK_SUBJECT $TASK_DESCRIPTION" | grep -qi "api\|endpoint\|route\|backend"; then
  SECRETS_FOUND=$(grep -rn "sk-\|api_key.*=.*['\"]" --include="*.js" --include="*.ts" --include="*.mjs" . 2>/dev/null | grep -v node_modules | grep -v ".env" | head -3)
  if [ -n "$SECRETS_FOUND" ]; then
    echo "❌ Potential exposed secrets found in code. Move to environment variables:" >&2
    echo "$SECRETS_FOUND" >&2
    exit 2
  fi
fi

echo "✅ Task '$TASK_SUBJECT' passed completion checks." >&2
exit 0
