# ENVY Luxury Homes

Ultra-luxury South Africa real estate platform — Safari Noir & Cape Elegance.

## Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Deployment:** Cloudflare Pages (Edge Runtime)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Architecture

| Route | Purpose |
|---|---|
| `/` | Public showroom — hero + property collection grid |
| `/properties/[id]` | Property detail — gallery + booking widget |
| `/checkout` | Secure checkout with PayFast integration |
| `/admin` | Concierge dashboard (PIN: `0000`) — manage properties & bookings |

## Data Persistence

All state is managed via React Context and persisted to `localStorage` (key: `envy-estate-db`). This allows full CRUD without a backend — ideal for Cloudflare Pages free tier.

## Admin Access

Click the ENVY logo **5 times** to navigate to `/admin`, or go directly to `/admin`. Enter PIN `0000`.

## Deployment

### Local

```bash
npm run build
npm run deploy
```

### CI/CD — Cloudflare Pages via GitHub Actions

The `Deploy to Cloudflare Pages` workflow triggers on every push to `main`.

**Required GitHub repository secrets** (Settings → Secrets and variables → Actions):

| Secret | Where to find it |
|---|---|
| `CLOUDFLARE_API_TOKEN` | [Cloudflare Dashboard → My Profile → API Tokens](https://dash.cloudflare.com/profile/api-tokens) |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare Dashboard → right-hand sidebar on any zone/account page |

**Creating the `CLOUDFLARE_API_TOKEN`:**

1. Go to <https://dash.cloudflare.com/profile/api-tokens> and click **Create Token**.
2. Use the **Edit Cloudflare Pages** template, or create a custom token with:
   - `Cloudflare Pages:Edit` — Account level *(required)*
   - `Account:Read` — Account level *(required)*
   - `User:Read` — User level *(optional — suppresses the email-retrieval warning)*
3. Set **Account Resources** to the account that owns the Pages project.
4. Copy the generated token and save it as the `CLOUDFLARE_API_TOKEN` secret in this repository.

> **Common error:** If the deployment fails with `Authentication error [code: 10000]`, the token is either missing the `Cloudflare Pages:Edit` permission or has expired. Regenerate the token and update the secret.
