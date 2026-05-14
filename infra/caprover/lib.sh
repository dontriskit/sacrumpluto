# Shared helpers for CapRover IaC scripts. Source, don't execute.
# Requires: curl, jq, tar.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[1]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
ENV_FILE="${ENV_FILE:-$SCRIPT_DIR/.env}"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "❌  Missing $ENV_FILE — copy .env.example to .env and fill in." >&2
  exit 1
fi

# shellcheck disable=SC1090
set -a; source "$ENV_FILE"; set +a

for bin in curl jq tar; do
  command -v "$bin" >/dev/null || { echo "❌  $bin not installed" >&2; exit 1; }
done

: "${CAPROVER_URL:?CAPROVER_URL is required}"
: "${CAPROVER_PASSWORD:?CAPROVER_PASSWORD is required}"

CAPROVER_URL="${CAPROVER_URL%/}"

cap_login() {
  if [[ -n "${CAP_TOKEN:-}" ]]; then return; fi
  local resp
  resp="$(curl -fsS -X POST "$CAPROVER_URL/api/v2/login" \
    -H 'x-namespace: captain' \
    -H 'content-type: application/json' \
    -d "{\"password\":\"$CAPROVER_PASSWORD\"}")"
  CAP_TOKEN="$(echo "$resp" | jq -r '.data.token')"
  if [[ -z "$CAP_TOKEN" || "$CAP_TOKEN" == "null" ]]; then
    echo "❌  Login failed: $resp" >&2
    exit 1
  fi
  export CAP_TOKEN
}

cap_api() {
  # cap_api METHOD PATH [JSON_BODY]
  # CapRover returns HTTP 200 even on logical failures, with {status, description}
  # in the body. status=100 means OK; anything else is an error.
  local method="$1" path="$2" body="${3:-}"
  cap_login
  local resp
  if [[ -n "$body" ]]; then
    resp="$(curl -fsS -X "$method" "$CAPROVER_URL$path" \
      -H "x-captain-auth: $CAP_TOKEN" \
      -H 'x-namespace: captain' \
      -H 'content-type: application/json' \
      -d "$body")"
  else
    resp="$(curl -fsS -X "$method" "$CAPROVER_URL$path" \
      -H "x-captain-auth: $CAP_TOKEN" \
      -H 'x-namespace: captain')"
  fi
  local status
  status="$(echo "$resp" | jq -r '.status // empty' 2>/dev/null)"
  if [[ -n "$status" && "$status" != "100" ]]; then
    echo "❌  CapRover API error on $method $path:" >&2
    echo "$resp" | jq '.' >&2 2>/dev/null || echo "$resp" >&2
    return 1
  fi
  echo "$resp"
}

cap_app_exists() {
  local name="$1"
  cap_api GET "/api/v2/user/apps/appDefinitions" \
    | jq -e --arg n "$name" '.data.appDefinitions[] | select(.appName == $n)' >/dev/null
}

cap_app_register() {
  # cap_app_register NAME HAS_PERSISTENT_DATA(true|false)
  local name="$1" persistent="${2:-false}"
  if cap_app_exists "$name"; then
    echo "↺  App '$name' already exists — skipping register."
    return
  fi
  echo "▶  Registering app '$name' (persistent=$persistent)…"
  cap_api POST "/api/v2/user/apps/appDefinitions/register" \
    "$(jq -nc --arg n "$name" --argjson p "$persistent" \
      '{appName:$n, hasPersistentData:$p}')" >/dev/null
  echo "✓  Registered."
}

cap_app_update() {
  local body="$1"
  cap_api POST "/api/v2/user/apps/appDefinitions/update" "$body" >/dev/null
}

cap_deploy_tar() {
  # cap_deploy_tar APP_NAME TAR_PATH
  local name="$1" tar="$2"
  cap_login
  echo "▶  Uploading $(du -h "$tar" | cut -f1) tarball to '$name'…"
  curl -fsS -X POST "$CAPROVER_URL/api/v2/user/apps/appData/$name?detached=1" \
    -H "x-captain-auth: $CAP_TOKEN" \
    -H 'x-namespace: captain' \
    -F "sourceFile=@$tar" >/dev/null
  echo "✓  Upload complete. Build runs on the server — check the dashboard."
}
