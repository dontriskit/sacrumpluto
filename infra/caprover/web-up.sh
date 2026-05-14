#!/usr/bin/env bash
# Register + configure the Next.js web app on CapRover. Idempotent.
#
# Result:
#   - App: $WEB_APP, container HTTP port 3000, exposed publicly.
#   - SSL enabled on the captain subdomain.
#   - NODE_ENV + NEXT_PUBLIC_SITE_URL set on the app.
#
# Does NOT deploy code — run ./web-deploy.sh next.

source "$(dirname "$0")/lib.sh"

: "${WEB_APP:?}" "${NEXT_PUBLIC_SITE_URL:?}"

cap_app_register "$WEB_APP" false

# Enable SSL on the captain subdomain BEFORE the main update — CapRover refuses
# `forceSsl: true` until at least one domain has SSL enabled.
echo "▶  Enabling HTTPS on the captain subdomain…"
cap_api POST "/api/v2/user/apps/appDefinitions/enablebasedomainssl" \
  "$(jq -nc --arg n "$WEB_APP" '{appName:$n}')" >/dev/null || true
echo "✓  SSL enabled (no-op if already on)."

ENV_JSON="$(jq -nc \
  --arg NODE_ENV "production" \
  --arg NEXT_PUBLIC_SITE_URL "$NEXT_PUBLIC_SITE_URL" \
  '[
    {key:"NODE_ENV",             value:$NODE_ENV},
    {key:"NEXT_PUBLIC_SITE_URL", value:$NEXT_PUBLIC_SITE_URL}
  ]')"

UPDATE_BODY="$(jq -nc \
  --arg app "$WEB_APP" \
  --argjson envs "$ENV_JSON" \
  '{
    appName: $app,
    instanceCount: 1,
    notExposeAsWebApp: false,
    forceSsl: true,
    websocketSupport: true,
    containerHttpPort: 3000,
    description: "Igor `Sacrumpluto` kiteboarding — Next.js wireframe site",
    envVars: $envs,
    volumes: [],
    ports: [],
    appPushWebhook: {},
    customNginxConfig: "",
    preDeployFunction: "",
    serviceUpdateOverride: ""
  }')"

echo "▶  Configuring '$WEB_APP' (env, port 3000, SSL on)…"
cap_app_update "$UPDATE_BODY"
echo "✓  Configured."

cat <<EOF

Web app configured. Next step:
  ./infra/caprover/web-deploy.sh

To attach a custom domain later:
  source infra/caprover/lib.sh; cap_login
  curl -X POST "\$CAPROVER_URL/api/v2/user/apps/appDefinitions/customdomain" \\
    -H "x-captain-auth: \$CAP_TOKEN" -H "x-namespace: captain" \\
    -H "content-type: application/json" \\
    -d '{"appName":"$WEB_APP","customDomain":"sacrumpluto.example.com"}'

EOF
