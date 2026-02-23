#!/usr/bin/env bash
# Delete all UILM keys for a project.
# Auth: set PROJECT_KEY (required). Use either TOKEN (Bearer) or X-Blocks-Key (PROJECT_KEY is the key).
# Usage with Bearer token:
#   TOKEN="<access_token>" PROJECT_KEY="<project-key>" ./scripts/delete-uilm-keys.sh
# Usage with X-Blocks-Key only:
#   PROJECT_KEY="P43335b928ba643959d9755c542239a1d" ./scripts/delete-uilm-keys.sh

set -e
PROJECT_KEY="${PROJECT_KEY:?Set PROJECT_KEY}"
BASE_URL="${BASE_URL:-https://api.seliseblocks.com/uilm/v1}"
PAGE_SIZE=100
PAGE_NUMBER=1
TOTAL_DELETED=0

# Auth: Bearer if TOKEN set, else X-Blocks-Key
CURL_AUTH=()
if [[ -n "${TOKEN:-}" ]]; then
  CURL_AUTH=(-H "Authorization: Bearer $TOKEN")
else
  CURL_AUTH=(-H "x-blocks-key: $PROJECT_KEY" -H "X-Blocks-Key: $PROJECT_KEY")
fi

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
      echo "No keys to delete."
    fi
    break
  fi

  if [[ $PAGE_NUMBER -eq 1 ]]; then
    echo "Total keys to delete: $TOTAL"
  fi

  while read -r id; do
    [[ -z "$id" ]] && continue
    curl -s -X DELETE "$BASE_URL/Key/Delete?ItemId=$id&ProjectKey=$PROJECT_KEY" \
      -H "Authorization: Bearer $TOKEN" >/dev/null
    TOTAL_DELETED=$((TOTAL_DELETED + 1))
    echo -ne "\rDeleted $TOTAL_DELETED / $TOTAL"
  done < <(echo "$RESP" | jq -r '.keys[].itemId')
  echo ""

  if [[ "$COUNT" -lt "$PAGE_SIZE" ]]; then
    break
  fi
  PAGE_NUMBER=$((PAGE_NUMBER + 1))
done

echo "Done. Total deleted: $TOTAL_DELETED"
