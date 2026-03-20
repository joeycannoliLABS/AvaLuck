import { useParams, Link } from 'react-router-dom';
import RaffleCard from '../components/RaffleCard';
import { EmptyState } from '../components/ui';
import { MOCK_RAFFLES } from '../data/mockData';

const COMMUNITY_RAFFLES_DATA = [
  {
    id: 10, title: "500 AVAX Giveaway", collection: "Community", emoji: "🔺",
    ticketPrice: 0.5, totalTickets: 2000, ticketsSold: 1432, endsIn: "3h 45m",
    endsAt: Date.now() + 3 * 3600000, prizeValue: 500, prizeToken: "AVAX",
    status: "live", featured: false, type: "crypto",
    creator: "0xf1a2...b3c4", contractAddress: "0xaaaa...bbbb",
    description: "500 AVAX locked in escrow. One lucky winner takes it all!", participants: [],
  },
  {
    id: 11, title: "10,000 JOE Token Drop", collection: "Community", emoji: "🃏",
    ticketPrice: 0.2, totalTickets: 1000, ticketsSold: 678, endsIn: "6h 10m",
    endsAt: Date.now() + 6 * 3600000, prizeValue: 850, prizeToken: "JOE",
    status: "live", featured: false, type: "crypto",
    creator: "0xd5e6...f7a8", contractAddress: "0xcccc...dddd",
    description: "10,000 JOE tokens up for grabs.", participants: [],
  },
  {
    id: 12, title: "50,000 COQ Raffle", collection: "Community", emoji: "🐔",
    ticketPrice: 0.1, totalTickets: 5000, ticketsSold: 2180, endsIn: "1d 2h",
    endsAt: Date.now() + 26 * 3600000, prizeValue: 320, prizeToken: "COQ",
    status: "live", featured: false, type: "crypto",
    creator: "0xb9c0...d1e2", contractAddress: "0xeeee...ffff",
    description: "50,000 COQ tokens locked and ready to raffle.", participants: [],
  },
  {
    id: 13, title: "1,000 USDC Pot", collection: "Community", emoji: "💵",
    ticketPrice: 0.3, totalTickets: 800, ticketsSold: 800, endsIn: "Ended",
    endsAt: Date.now() - 3600000, prizeValue: 1000, prizeToken: "USDC",
    status: "ended", featured: false, type: "crypto",
    creator: "0xa1b2...c3d4", contractAddress: "0x1111...2222",
    description: "1,000 USDC raffle — completed.", winner: "0xc2a...e1f8", participants: [],
  },
  {
    id: 14, title: "25,000 PNG Giveaway", collection: "Community", emoji: "🐦",
    ticketPrice: 0.15, totalTickets: 600, ticketsSold: 600, endsIn: "Ended",
    endsAt: Date.now() - 7200000, prizeValue: 450, prizeToken: "PNG",
    status: "ended", featured: false, type: "crypto",
    creator: "0xe5f6...a7b8", contractAddress: "0x3333...4444",
    description: "25,000 PNG tokens — raffle complete.", winner: "0x7a3...f2d1", participants: [],
  },
];

export default function RaffleListPage() {
  const { type, status } = useParams();

  const isAvalanche = type === 'avalanche';
  const isLive = status === 'live';

  const sourceData = isAvalanche ? MOCK_RAFFLES : COMMUNITY_RAFFLES_DATA;
  const raffles = sourceData.filter(r =>
    isLive ? r.status === 'live' : r.status === 'ended'
  );

  const title = isAvalanche ? 'Avalanche Raffles' : 'Community Raffles';
  const statusLabel = isLive ? 'Live' : 'Ended';

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 80px' }}>
      <Link to="/" style={{
        color: 'var(--text-muted)', fontSize: 13,
        display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 24,
      }}>
        ← Back to home
      </Link>

      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 32, flexWrap: 'wrap', gap: 12,
      }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>
            {title} — {statusLabel}
          </h1>
          {!isAvalanche && (
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: 0 }}>
              User-created crypto raffles with tokens locked in escrow. Winners selected via Chainlink VRF.
            </p>
          )}
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <Link
            to={`/raffles/${type}/live`}
            style={{
              padding: '7px 18px', borderRadius: 8,
              border: isLive ? '1px solid var(--avax-red)' : '1px solid var(--card-border)',
              background: isLive ? 'rgba(232,65,66,0.08)' : 'transparent',
              color: isLive ? 'var(--avax-red)' : 'var(--text-secondary)',
              fontSize: 13, fontWeight: 500, display: 'inline-block',
            }}
          >
            Live
          </Link>
          <Link
            to={`/raffles/${type}/ended`}
            style={{
              padding: '7px 18px', borderRadius: 8,
              border: !isLive ? '1px solid var(--avax-red)' : '1px solid var(--card-border)',
              background: !isLive ? 'rgba(232,65,66,0.08)' : 'transparent',
              color: !isLive ? 'var(--avax-red)' : 'var(--text-secondary)',
              fontSize: 13, fontWeight: 500, display: 'inline-block',
            }}
          >
            Ended
          </Link>
        </div>
      </div>

      {raffles.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 20,
        }}>
          {raffles.map(raffle => (
            <RaffleCard key={raffle.id} raffle={raffle} />
          ))}
        </div>
      ) : (
        <EmptyState
          emoji={isLive ? '🎟️' : '🏁'}
          title={isLive ? 'No live raffles' : 'No ended raffles yet'}
          description={isLive
            ? 'There are no active raffles right now. Check back soon or create your own!'
            : 'No raffles have ended yet. Stay tuned for results!'}
        />
      )}
    </div>
  );
}
