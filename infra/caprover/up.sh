#!/usr/bin/env bash
# Bring the whole stack up: register + configure web app, then deploy.

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

"$SCRIPT_DIR/web-up.sh"
"$SCRIPT_DIR/web-deploy.sh"
