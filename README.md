# ENVY Luxury Homes

Ultra-luxury South African real estate platform — Safari Noir & Cape Elegance.

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
