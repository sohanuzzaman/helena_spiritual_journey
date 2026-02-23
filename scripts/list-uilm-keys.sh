#!/usr/bin/env bash
# List all UILM keys for a project.
# Auth: set PROJECT_KEY (required). Use either TOKEN (Bearer) or X-Blocks-Key (PROJECT_KEY is the key).
# Usage with Bearer token:
#   TOKEN="<access_token>" PROJECT_KEY="<project-key>" ./scripts/list-uilm-keys.sh
# Usage with X-Blocks-Key only (no login):
#   PROJECT_KEY="P43335b928ba643959d9755c542239a1d" ./scripts/list-uilm-keys.sh
# (If you get 404 Application_Not_Found, UILM is not enabled for this project key yet.)

set -e
PROJECT_KEY="${PROJECT_KEY:?Set PROJECT_KEY}"
BASE_URL="${BASE_URL:-https://api.seliseblocks.com/uilm/v1}"
PAGE_SIZE=100
PAGE_NUMBER=1

# Auth: Bearer if TOKEN set, else X-Blocks-Key
CURL_AUTH=()
if [[ -n "${TOKEN:-}" ]]; then
  CURL_AUTH=(-H "Authorization: Bearer $TOKEN")
else
  CURL_AUTH=(-H "x-blocks-key: $PROJECT_KEY" -H "X-Blocks-Key: $PROJECT_KEY")
fi

echo "Fetching keys for project (masked): ${PROJECT_KEY:0:8}... (auth: ${TOKEN:+Bearer}${TOKEN:-X-Blocks-Key})"
echo ""

while true; do
  RESP=$(curl -s -X POST "$BASE_URL/Key/Gets" \
    "${CURL_AUTH[@]}" \
    -H "Content-Type: application/json" \
    -d "{
      \"ProjectKey\": \"$PROJECT_KEY\",
      \"PageSize\": $PAGE_SIZE,
      \"PageNumber\": $PAGE_NUMBER
    }")

  if echo "$RESP" | jq -e '.IsSuccess == false' >/dev/null 2>&1; then
    echo "Error: $RESP" >&2
    exit 1
  fi

  COUNT=$(echo "$RESP" | jq -r '.keys | length')
  TOTAL=$(echo "$RESP" | jq -r '.totalCount // 0')

  if [[ "$COUNT" == "0" ]] || [[ "$COUNT" == "null" ]]; then
    if [[ $PAGE_NUMBER -eq 1 ]]; then
      echo "No keys found."
    fi
    break
  fi

  if [[ $PAGE_NUMBER -eq 1 ]]; then
    echo "Total keys: $TOTAL"
    echo "---"
  fi

  echo "$RESP" | jq -r '.keys[] | "\(.keyName) (itemId: \(.itemId))"'
  echo ""

  if [[ "$COUNT" -lt "$PAGE_SIZE" ]]; then
    break
  fi
  PAGE_NUMBER=$((PAGE_NUMBER + 1))
done

echo "Done."
