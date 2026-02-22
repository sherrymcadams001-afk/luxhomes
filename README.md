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

```bash
npm run build
npm run deploy
```

## Deploy from WSL (Cloudflare Pages)

This repo is already set up for Cloudflare Pages via Wrangler + `@cloudflare/next-on-pages`.
The deploy script builds to `.vercel/output/static` and deploys that directory.

### 1) One-time WSL setup

- Install WSL + Ubuntu (Windows):

```powershell
wsl --install -d Ubuntu
```

- In Ubuntu (WSL), install Node.js (use any recent LTS; Node 20+ is a safe default for Next.js 14):

```bash
sudo apt-get update
sudo apt-get install -y curl
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
npm -v
```

### 2) Work inside the WSL filesystem (recommended)

From Ubuntu (WSL):

```bash
mkdir -p ~/src
cd ~/src
git clone <YOUR_REPO_URL> ELH
cd ELH
npm install
```

### 3) Authenticate Wrangler

Option A (interactive login):

```bash
npx wrangler login
```

Option B (CI-friendly token): set an API token in your shell before deploy:

```bash
export CLOUDFLARE_API_TOKEN="..."
```

### 4) Ensure the Pages project exists (one-time)

The Pages project name defaults to the `name` in `wrangler.toml` (`envy-luxury-homes`).
If you haven’t created it yet:

```bash
npx wrangler pages project create envy-luxury-homes
```

### 5) Deploy

```bash
npm run deploy
```

Optional local preview (runs Pages locally against the build output):

```bash
npm run preview
```
