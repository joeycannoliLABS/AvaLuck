# AVAXRaffle — NFT Raffle Platform on Avalanche

A provably fair NFT raffle platform built on Avalanche C-Chain with Chainlink VRF for verifiable random draws.

![Avalanche](https://img.shields.io/badge/Avalanche-E84142?style=for-the-badge&logo=avalanche&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## Features

- **Browse Raffles** — View active and ended NFT raffles with real-time ticket counts
- **Raffle Detail Pages** — Full detail view with contract info, progress, and ticket purchase
- **Create Raffles** — List your NFTs for raffle with customizable ticket price, quantity, and duration
- **My Tickets** — Track your raffle entries and wins (wallet connection required)
- **Leaderboard** — Top winners and recent activity
- **Provably Fair** — Chainlink VRF integration for transparent, verifiable random draws
- **Responsive** — Fully responsive design with mobile navigation

## Tech Stack

- **React 18** — UI framework
- **React Router v6** — Client-side routing
- **Vite 6** — Build tool and dev server
- **CSS Variables** — Consistent theming system

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/avax-raffle.git
cd avax-raffle
npm install
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:3000`

### Build

```bash
npm run build
```

Output in `dist/`

## Deploy to Vercel

### Option 1: Vercel CLI

```bash
npm i -g vercel
vercel
```

### Option 2: GitHub Integration

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repo
4. Vercel auto-detects Vite — just click **Deploy**

The `vercel.json` is already configured to handle client-side routing rewrites.

## Project Structure

```
avax-raffle/
├── public/
│   └── avax-logo.svg          # Favicon
├── src/
│   ├── components/
│   │   ├── Footer.jsx          # Site footer
│   │   ├── Layout.jsx          # Page layout wrapper
│   │   ├── Navbar.jsx          # Navigation bar
│   │   ├── RaffleCard.jsx      # Raffle grid card
│   │   ├── TicketPurchaseModal.jsx  # Buy tickets modal
│   │   └── ui.jsx              # Shared UI components
│   ├── data/
│   │   └── mockData.js         # Mock raffle/winner data
│   ├── pages/
│   │   ├── HomePage.jsx        # Landing page
│   │   ├── RaffleDetailPage.jsx # Individual raffle view
│   │   ├── MyTicketsPage.jsx   # User's tickets
│   │   ├── CreateRafflePage.jsx # Create new raffle
│   │   └── LeaderboardPage.jsx # Winners leaderboard
│   ├── App.jsx                 # Router config
│   ├── index.css               # Global styles
│   └── main.jsx                # Entry point
├── index.html
├── package.json
├── vercel.json                 # Vercel routing config
└── vite.config.js
```

## Next Steps (Backend)

This is the frontend-only version. To add full functionality:

- [ ] Smart contract development (Solidity)
- [ ] Wallet connection (wagmi + RainbowKit / Core Wallet)
- [ ] Chainlink VRF integration for random winner selection
- [ ] NFT escrow and prize distribution
- [ ] Ticket purchase transactions
- [ ] Real-time event listeners (websockets or polling)
- [ ] Subgraph for indexing raffle data

## License

MIT
