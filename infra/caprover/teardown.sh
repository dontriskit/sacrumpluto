#!/usr/bin/env bash
# Delete the CapRover web app. Prompts before deleting unless --yes is passed.

source "$(dirname "$0")/lib.sh"

: "${WEB_APP:?}"

YES=0
[[ "${1:-}" == "--yes" ]] && YES=1

confirm() {
  if [[ "$YES" == "1" ]]; then return 0; fi
  read -r -p "$1 [y/N] " ans
  [[ "$ans" =~ ^[Yy]$ ]]
}

if cap_app_exists "$WEB_APP"; then
  if confirm "Delete web app '$WEB_APP'?"; then
    echo "▶  Deleting '$WEB_APP'…"
    cap_api POST "/api/v2/user/apps/appDefinitions/delete" \
      "$(jq -nc --arg n "$WEB_APP" '{appName:$n}')" >/dev/null
    echo "✓  Deleted."
  fi
else
  echo "↺  '$WEB_APP' not found — nothing to do."
fi
