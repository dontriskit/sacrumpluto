# CapRover deploy — sacrumpluto

Bash scripts that drive CapRover's HTTP API to ship the Next.js wireframe at
`iggy/` to a CapRover instance.

## Stack

| App           | Source                          | Public                          |
| ------------- | ------------------------------- | ------------------------------- |
| `$WEB_APP`    | tar of `iggy/` → `Dockerfile`   | yes (HTTPS on captain subdomain)|

No database, no migrations — auth/db are disabled in `src/env.js`.

## One-time setup

1. Prereqs locally: `curl`, `jq`, `tar`. (macOS: `brew install jq`.)
2. Fill the env file:
   ```bash
   cp infra/caprover/.env.example infra/caprover/.env
   $EDITOR infra/caprover/.env
   ```
   - `CAPROVER_URL` — dashboard URL (e.g. `https://captain.yourbox.com`)
   - `CAPROVER_PASSWORD` — dashboard password
   - `WEB_APP` — app name on CapRover (e.g. `sacrumpluto`)
   - `NEXT_PUBLIC_SITE_URL` — public URL the app serves from

## Bring it up

```bash
chmod +x infra/caprover/*.sh
./infra/caprover/up.sh
```

That runs:

1. `web-up.sh` — registers the app, sets env vars, configures port 3000, SSL.
2. `web-deploy.sh` — tars `iggy/` (excluding `node_modules`, `.next`, `.git`,
   `.env*`) and uploads it; CapRover builds the Dockerfile server-side.

Both scripts are idempotent.

## Individual scripts

```bash
./infra/caprover/web-up.sh      # register + configure web app (no deploy)
./infra/caprover/web-deploy.sh  # push a new build
./infra/caprover/teardown.sh    # delete the app (prompts; --yes to skip)
```

Run `web-deploy.sh` on every code push to ship a new version.

## How it works

- `iggy/Dockerfile` is a 2-stage build: builder runs `pnpm install` +
  `next build` with `output: 'standalone'`, runner copies the standalone
  server + static + public into a small Alpine image and runs
  `node server.js` on port 3000.
- `iggy/captain-definition` points CapRover at `./Dockerfile`.
- `web-deploy.sh` tars **`iggy/`'s contents** (not the parent dir) so the
  build-context root contains `Dockerfile` + `package.json` directly.
- The CapRover host runs ARM64. `node:20-alpine` is multi-arch so this is
  invisible — `pnpm install` and any native deps pull the right binaries
  natively on the server.

## Custom domain

After first deploy, attach a domain:

```bash
source infra/caprover/lib.sh; cap_login
curl -X POST "$CAPROVER_URL/api/v2/user/apps/appDefinitions/customdomain" \
  -H "x-captain-auth: $CAP_TOKEN" -H "x-namespace: captain" \
  -H "content-type: application/json" \
  -d "{\"appName\":\"$WEB_APP\",\"customDomain\":\"sacrumpluto.example.com\"}"
curl -X POST "$CAPROVER_URL/api/v2/user/apps/appDefinitions/enablecustomdomainssl" \
  -H "x-captain-auth: $CAP_TOKEN" -H "x-namespace: captain" \
  -H "content-type: application/json" \
  -d "{\"appName\":\"$WEB_APP\",\"customDomain\":\"sacrumpluto.example.com\"}"
```

Then update `NEXT_PUBLIC_SITE_URL` in `.env` and re-run `web-up.sh` +
`web-deploy.sh`.
