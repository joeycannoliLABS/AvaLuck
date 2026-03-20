import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AvaxLogo, ProgressBar, Badge } from '../components/ui';
import TicketPurchaseModal from '../components/TicketPurchaseModal';
import { MOCK_RAFFLES } from '../data/mockData';
import { getTokenLogo, TokenFallbackIcon } from '../data/tokenLogos';

// Community raffles (same data used in HomePage and RaffleListPage)
const COMMUNITY_RAFFLES = [
  {
    id: 10, title: "500 AVAX Giveaway", collection: "Community",
    ticketPrice: 0.5, totalTickets: 2000, ticketsSold: 1432, endsIn: "3h 45m",
    endsAt: Date.now() + 3 * 3600000, prizeValue: 500, prizeToken: "AVAX",
    status: "live", featured: false, type: "crypto",
    creator: "0xf1a2...b3c4", contractAddress: "0xaaaa...bbbb",
    description: "500 AVAX locked in escrow. One lucky winner takes it all!", participants: [],
  },
  {
    id: 11, title: "10,000 JOE Token Drop", collection: "Community",
    ticketPrice: 0.2, totalTickets: 1000, ticketsSold: 678, endsIn: "6h 10m",
    endsAt: Date.now() + 6 * 3600000, prizeValue: 850, prizeToken: "JOE",
    status: "live", featured: false, type: "crypto",
    creator: "0xd5e6...f7a8", contractAddress: "0xcccc...dddd",
    description: "10,000 JOE tokens up for grabs. Tokens locked in smart contract escrow.", participants: [],
  },
  {
    id: 12, title: "50,000 COQ Raffle", collection: "Community",
    ticketPrice: 0.1, totalTickets: 5000, ticketsSold: 2180, endsIn: "1d 2h",
    endsAt: Date.now() + 26 * 3600000, prizeValue: 320, prizeToken: "COQ",
    status: "live", featured: false, type: "crypto",
    creator: "0xb9c0...d1e2", contractAddress: "0xeeee...ffff",
    description: "50,000 COQ tokens locked and ready to raffle. Get your tickets!", participants: [],
  },
];

const ALL_RAFFLES = [...MOCK_RAFFLES, ...COMMUNITY_RAFFLES];

export default function RaffleDetailPage() {
  const { id } = useParams();
  const [showBuy, setShowBuy] = useState(false);
  const [imgError, setImgError] = useState(false);
  const raffle = ALL_RAFFLES.find(r => r.id === Number(id));

  if (!raffle) {
    return (
      <div style={{ textAlign: 'center', padding: '120px 24px' }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🔍</div>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Raffle not found</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
          This raffle doesn't exist or has been removed.
        </p>
        <Link to="/" style={{ color: 'var(--avax-red)', fontWeight: 600, fontSize: 14 }}>
          ← Back to raffles
        </Link>
      </div>
    );
  }

  const pct = Math.round((raffle.ticketsSold / raffle.totalTickets) * 100);
  const isEnded = raffle.status === 'ended';
  const remaining = raffle.totalTickets - raffle.ticketsSold;
  const isCrypto = raffle.type === 'crypto';
  const tokenLogo = isCrypto ? getTokenLogo(raffle.prizeToken) : null;

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 80px' }}>
      <Link to="/" style={{
        color: 'var(--text-muted)', fontSize: 13,
        display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 32,
      }}>
        ← Back to raffles
      </Link>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
        gap: 32,
      }}>
        {/* Left: Preview */}
        <div>
          <div style={{
            background: isCrypto
              ? 'linear-gradient(145deg, #1a1225, #0f1a20)'
              : 'linear-gradient(145deg, var(--dark-bg), var(--surface))',
            borderRadius: 20,
            border: '1px solid var(--card-border)',
            height: 400,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', width: 300, height: 300,
              background: isCrypto
                ? 'radial-gradient(circle, rgba(46,205,167,0.1), transparent 70%)'
                : 'radial-gradient(circle, rgba(232,65,66,0.1), transparent 70%)',
              top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            }} />

            {isCrypto ? (
              tokenLogo && !imgError ? (
                <img
                  src={tokenLogo} alt={raffle.prizeToken}
                  onError={() => setImgError(true)}
                  style={{ width: 140, height: 140, borderRadius: '50%', objectFit: 'contain' }}
                />
              ) : (
                <TokenFallbackIcon symbol={raffle.prizeToken} size={140} />
              )
            ) : (
              raffle.image && !imgError ? (
                <img
                  src={raffle.image} alt={raffle.title}
                  onError={() => setImgError(true)}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div style={{ color: 'var(--text-muted)', textAlign: 'center' }}>
                  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ display: 'block', margin: '0 auto 12px' }}>
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                  <span style={{ fontSize: 14 }}>NFT Image</span>
                </div>
              )
            )}

            {raffle.featured && (
              <div style={{ position: 'absolute', top: 16, right: 16 }}>
                <Badge variant="gold">Featured</Badge>
              </div>
            )}
            {isCrypto && (
              <div style={{ position: 'absolute', top: 16, left: 16 }}>
                <Badge variant="teal">Token raffle</Badge>
              </div>
            )}
            {isEnded && (
              <div style={{ position: 'absolute', top: 16, left: 16 }}>
                <Badge variant="default">Ended</Badge>
              </div>
            )}
          </div>

          <div style={{
            background: 'var(--card-bg)', border: '1px solid var(--card-border)',
            borderRadius: 16, padding: 20, marginTop: 16,
          }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>
              Description
            </h3>
            <p style={{ fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.6 }}>
              {raffle.description}
            </p>
          </div>
        </div>

        {/* Right: Details */}
        <div>
          <div style={{
            fontSize: 11, color: 'var(--text-muted)',
            textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4,
          }}>
            {raffle.collection}
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 16, letterSpacing: -0.5 }}>
            {raffle.title}
          </h1>

          <div style={{ display: 'flex', gap: 12, marginBottom: 24, alignItems: 'center' }}>
            <Badge variant={isEnded ? 'default' : isCrypto ? 'teal' : 'teal'}>
              {isEnded ? 'Ended' : 'Live'}
            </Badge>
            {!isEnded && (
              <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
                Ends in <strong style={{ color: 'var(--accent-teal)' }}>{raffle.endsIn}</strong>
              </span>
            )}
          </div>

          {/* Prize Card */}
          <div style={{
            background: 'var(--card-bg)', border: '1px solid var(--card-border)',
            borderRadius: 16, padding: 24, marginBottom: 16,
          }}>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              {isCrypto ? 'Prize pool' : 'Prize value'}
            </div>
            <div style={{
              fontSize: 36, fontWeight: 800,
              display: 'flex', alignItems: 'center', gap: 8,
              marginBottom: 16, fontFamily: 'var(--font-mono)',
              color: isCrypto ? 'var(--accent-teal)' : 'var(--text-primary)',
            }}>
              {!isCrypto && <AvaxLogo size={28} />}
              {isCrypto
                ? `$${raffle.prizeValue} in ${raffle.prizeToken}`
                : `${raffle.prizeValue} AVAX`}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
              {[
                { label: 'Ticket price', value: `${raffle.ticketPrice} AVAX` },
                { label: 'Total tickets', value: raffle.totalTickets },
                { label: 'Tickets sold', value: raffle.ticketsSold },
                { label: 'Remaining', value: remaining },
              ].map(item => (
                <div key={item.label} style={{
                  background: 'var(--surface)', borderRadius: 10, padding: '12px 14px',
                }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{pct}% sold</span>
                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                  {raffle.ticketsSold}/{raffle.totalTickets}
                </span>
              </div>
              <ProgressBar sold={raffle.ticketsSold} total={raffle.totalTickets} height={8} />
            </div>
          </div>

          {/* Buy / Winner */}
          {!isEnded ? (
            <button
              onClick={() => setShowBuy(true)}
              style={{
                width: '100%', padding: '16px 0', borderRadius: 14, border: 'none',
                background: 'linear-gradient(135deg, var(--avax-red), var(--avax-red-dark))',
                color: 'white', fontSize: 16, fontWeight: 700,
                cursor: 'pointer', letterSpacing: 0.5,
                transition: 'transform 0.2s', marginBottom: 16,
              }}
              onMouseEnter={e => e.target.style.transform = 'scale(1.02)'}
              onMouseLeave={e => e.target.style.transform = 'scale(1)'}
            >
              Buy tickets
            </button>
          ) : (
            <div style={{
              background: 'var(--card-bg)', border: '1px solid var(--card-border)',
              borderRadius: 14, padding: 20, textAlign: 'center', marginBottom: 16,
            }}>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Winner
              </div>
              <div style={{ fontSize: 16, fontWeight: 600, fontFamily: 'var(--font-mono)', color: 'var(--accent-teal)' }}>
                {raffle.winner || 'Drawing...'}
              </div>
            </div>
          )}

          {/* Contract Info */}
          <div style={{
            background: 'var(--card-bg)', border: '1px solid var(--card-border)',
            borderRadius: 16, padding: 20,
          }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 12 }}>
              Contract details
            </h3>
            {[
              { label: 'Contract', value: raffle.contractAddress },
              ...(raffle.tokenId ? [{ label: 'Token ID', value: raffle.tokenId }] : []),
              ...(raffle.prizeToken ? [{ label: 'Prize token', value: raffle.prizeToken }] : []),
              { label: 'Creator', value: raffle.creator },
              { label: 'Network', value: 'Avalanche C-Chain' },
            ].map(item => (
              <div key={item.label} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '8px 0', borderBottom: '1px solid var(--card-border)',
              }}>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{item.label}</span>
                <span style={{ fontSize: 13, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showBuy && <TicketPurchaseModal raffle={raffle} onClose={() => setShowBuy(false)} />}
    </div>
  );
}
