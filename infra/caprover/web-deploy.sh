#!/usr/bin/env bash
# Tar the Next.js app at iggy/ and push it to CapRover for build+deploy.
#
# CapRover runs `docker build` server-side using ./Dockerfile (which lives at
# iggy/Dockerfile). The tar puts iggy/'s contents at the tar root so the
# Dockerfile sits at the build-context root.

source "$(dirname "$0")/lib.sh"

: "${WEB_APP:?}"

# Always reconcile env + port before deploying. CapRover sometimes loses
# them across operations; treating env as a deploy-time invariant prevents
# silent crashloops.
echo "▶  Reconciling app config (env, port, SSL)…"
"$SCRIPT_DIR/web-up.sh" >/dev/null

APP_DIR="$REPO_ROOT/iggy"
if [[ ! -d "$APP_DIR" ]]; then
  echo "❌  Expected Next.js app at $APP_DIR — not found." >&2
  exit 1
fi

TAR="$(mktemp -t sacrumpluto-deploy.XXXXXX.tar)"
trap 'rm -f "$TAR"' EXIT

echo "▶  Building deploy tarball at $TAR…"
tar -cf "$TAR" \
  -C "$APP_DIR" \
  --exclude-vcs \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='.turbo' \
  --exclude='.vercel' \
  --exclude='.claude' \
  --exclude='.env' \
  --exclude='.env.local' \
  --exclude='.env.*.local' \
  --exclude='tsconfig.tsbuildinfo' \
  --exclude='coverage' \
  --exclude='.DS_Store' \
  .

cap_deploy_tar "$WEB_APP" "$TAR"

cat <<EOF

Deploy uploaded. Watch the build log:
  $CAPROVER_URL/#/apps/details/$WEB_APP

After it goes green, the site is live at:
  $NEXT_PUBLIC_SITE_URL

EOF
