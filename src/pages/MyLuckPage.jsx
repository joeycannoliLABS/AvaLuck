import { useState } from 'react';
import { Link } from 'react-router-dom';
import { EmptyState, AvaxLogo } from '../components/ui';
import { useAuth } from '../context/AuthContext';
import { MOCK_RAFFLES } from '../data/mockData';
import RaffleCard from '../components/RaffleCard';

// Community raffles (same as HomePage)
const COMMUNITY_RAFFLES = [
  { id: 10, title: "500 AVAX Giveaway", collection: "Community", ticketPrice: 0.5, totalTickets: 2000, ticketsSold: 1432, endsIn: "3h 45m", prizeValue: 500, prizeToken: "AVAX", status: "live", featured: true, type: "crypto", creator: "0xf1a2...b3c4", contractAddress: "0xaaaa...bbbb", description: "", participants: [] },
  { id: 11, title: "10,000 JOE Token Drop", collection: "Community", ticketPrice: 0.2, totalTickets: 1000, ticketsSold: 678, endsIn: "6h 10m", prizeValue: 850, prizeToken: "JOE", status: "live", featured: true, type: "crypto", creator: "0xd5e6...f7a8", contractAddress: "0xcccc...dddd", description: "", participants: [] },
  { id: 12, title: "50,000 COQ Raffle", collection: "Community", ticketPrice: 0.1, totalTickets: 5000, ticketsSold: 2180, endsIn: "1d 2h", prizeValue: 320, prizeToken: "COQ", status: "live", featured: true, type: "crypto", creator: "0xb9c0...d1e2", contractAddress: "0xeeee...ffff", description: "", participants: [] },
];

const ALL_RAFFLES = [...MOCK_RAFFLES, ...COMMUNITY_RAFFLES];

export default function MyLuckPage() {
  const [tab, setTab] = useState('tickets');
  const { isConnected, connect, watchlist } = useAuth();

  const watchlistedRaffles = ALL_RAFFLES.filter(r => watchlist.includes(r.id));

  const tabs = [
    { key: 'tickets', label: 'My Tickets', icon: '🎟️' },
    { key: 'watchlist', label: 'Watchlist', icon: '❤️', count: watchlistedRaffles.length },
    { key: 'won', label: 'Won', icon: '🏆' },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 80px' }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>MyLuck</h1>
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 24 }}>
        Your raffle entries, watchlist, and wins — all in one place.
      </p>

      {/* Tabs */}
      <div style={{
        display: 'flex', gap: 8, marginBottom: 32,
        borderBottom: '1px solid var(--card-border)',
        paddingBottom: 0,
      }}>
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              padding: '10px 20px',
              border: 'none',
              borderBottom: tab === t.key ? '2px solid var(--avax-red)' : '2px solid transparent',
              background: 'transparent',
              color: tab === t.key ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontSize: 14,
              fontWeight: tab === t.key ? 600 : 500,
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: -1,
            }}
          >
            <span style={{ fontSize: 15 }}>{t.icon}</span>
            {t.label}
            {t.count > 0 && (
              <span style={{
                fontSize: 11, fontWeight: 700,
                background: tab === t.key ? 'rgba(232,65,66,0.15)' : 'var(--surface)',
                color: tab === t.key ? 'var(--avax-red)' : 'var(--text-muted)',
                padding: '2px 8px',
                borderRadius: 10,
              }}>
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {!isConnected ? (
        <div style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--card-border)',
          borderRadius: 20,
          padding: '80px 24px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🔐</div>
          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Connect your wallet</h3>
          <p style={{
            fontSize: 14,
            color: 'var(--text-secondary)',
            maxWidth: 400,
            margin: '0 auto 24px',
            lineHeight: 1.6,
          }}>
            Connect your Avalanche wallet to view your tickets, watchlist, and claim your prizes.
          </p>
          <button onClick={connect} style={{
            padding: '12px 32px',
            borderRadius: 12,
            border: 'none',
            background: 'linear-gradient(135deg, var(--avax-red), var(--avax-red-dark))',
            color: 'white',
            fontSize: 15,
            fontWeight: 700,
            cursor: 'pointer',
            letterSpacing: 0.3,
          }}>
            Connect wallet
          </button>
        </div>
      ) : (
        <>
          {/* Stats strip */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 16,
            marginBottom: 32,
          }}>
            {[
              { label: 'Active entries', value: '0', color: 'var(--accent-teal)' },
              { label: 'Total spent', value: '0 AVAX', color: 'var(--text-primary)' },
              { label: 'Raffles won', value: '0', color: 'var(--accent-gold)' },
              { label: 'Watchlist', value: String(watchlistedRaffles.length), color: 'var(--avax-red)' },
            ].map(stat => (
              <div key={stat.label} style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: 16,
                padding: '20px 24px',
              }}>
                <div style={{
                  fontSize: 12, color: 'var(--text-muted)',
                  marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5,
                }}>
                  {stat.label}
                </div>
                <div style={{
                  fontSize: 24, fontWeight: 700,
                  color: stat.color, fontFamily: 'var(--font-mono)',
                }}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* Tab content */}
          {tab === 'tickets' && (
            <EmptyState
              emoji="🎟️"
              title="No tickets yet"
              description="You haven't entered any raffles yet. Browse active raffles to get started!"
            />
          )}

          {tab === 'watchlist' && (
            watchlistedRaffles.length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 20,
              }}>
                {watchlistedRaffles.map(raffle => (
                  <RaffleCard key={raffle.id} raffle={raffle} />
                ))}
              </div>
            ) : (
              <EmptyState
                emoji="❤️"
                title="Watchlist is empty"
                description="Hover over any raffle card and click the heart icon to add it to your watchlist."
              />
            )
          )}

          {tab === 'won' && (
            <EmptyState
              emoji="🏆"
              title="No wins yet"
              description="Keep entering raffles — your lucky break could be just one ticket away!"
            />
          )}
        </>
      )}
    </div>
  );
}
