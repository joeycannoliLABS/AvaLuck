import { useState } from 'react';
import { AvaxLogo } from '../components/ui';
import { LEADERBOARD, PAST_WINNERS } from '../data/mockData';

export default function LeaderboardPage() {
  const [tab, setTab] = useState('top');

  const medalColors = ['#FFD700', '#C0C0C0', '#CD7F32'];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 80px' }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Leaderboard</h1>
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 32 }}>
        Top winners and recent activity on AVAXRaffle.
      </p>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {[
          { key: 'top', label: 'Top winners' },
          { key: 'recent', label: 'Recent wins' },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              padding: '9px 22px',
              borderRadius: 10,
              border: tab === t.key ? '1px solid var(--avax-red)' : '1px solid var(--card-border)',
              background: tab === t.key ? 'rgba(232,65,66,0.08)' : 'transparent',
              color: tab === t.key ? 'var(--avax-red)' : 'var(--text-secondary)',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'top' && (
        <>
          {/* Top 3 podium */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16,
            marginBottom: 24,
          }}>
            {LEADERBOARD.slice(0, 3).map((entry, i) => (
              <div key={entry.rank} style={{
                background: 'var(--card-bg)',
                border: `1px solid ${i === 0 ? 'rgba(255,215,0,0.3)' : 'var(--card-border)'}`,
                borderRadius: 20,
                padding: '28px 20px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {i === 0 && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: 'linear-gradient(90deg, transparent, #FFD700, transparent)',
                  }} />
                )}
                <div style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: `${medalColors[i]}20`,
                  border: `2px solid ${medalColors[i]}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px',
                  fontSize: 20,
                  fontWeight: 800,
                  color: medalColors[i],
                  fontFamily: 'var(--font-mono)',
                }}>
                  {entry.rank}
                </div>
                <div style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-mono)',
                  marginBottom: 4,
                }}>
                  {entry.address}
                </div>
                <div style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: 'var(--accent-teal)',
                  fontFamily: 'var(--font-mono)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  margin: '8px 0',
                }}>
                  <AvaxLogo size={18} /> {entry.totalValue}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  {entry.wins} wins · {entry.ticketsBought} tickets
                </div>
              </div>
            ))}
          </div>

          {/* Full table */}
          <div style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: 16,
            overflow: 'hidden',
          }}>
            {/* Header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '60px 1fr 100px 120px 100px',
              padding: '12px 20px',
              borderBottom: '1px solid var(--card-border)',
              fontSize: 11,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              fontWeight: 600,
            }}>
              <span>Rank</span>
              <span>Address</span>
              <span style={{ textAlign: 'right' }}>Wins</span>
              <span style={{ textAlign: 'right' }}>Total value</span>
              <span style={{ textAlign: 'right' }}>Tickets</span>
            </div>

            {/* Rows */}
            {LEADERBOARD.map((entry, i) => (
              <div
                key={entry.rank}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '60px 1fr 100px 120px 100px',
                  padding: '14px 20px',
                  borderBottom: i < LEADERBOARD.length - 1 ? '1px solid var(--card-border)' : 'none',
                  alignItems: 'center',
                  transition: 'background 0.15s',
                  cursor: 'default',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--surface)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <span style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: i < 3 ? medalColors[i] : 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                }}>
                  #{entry.rank}
                </span>
                <span style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-mono)',
                }}>
                  {entry.address}
                </span>
                <span style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  textAlign: 'right',
                }}>
                  {entry.wins}
                </span>
                <span style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'var(--accent-teal)',
                  textAlign: 'right',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: 4,
                }}>
                  <AvaxLogo size={12} /> {entry.totalValue}
                </span>
                <span style={{
                  fontSize: 14,
                  color: 'var(--text-secondary)',
                  textAlign: 'right',
                }}>
                  {entry.ticketsBought}
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === 'recent' && (
        <div style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--card-border)',
          borderRadius: 16,
          overflow: 'hidden',
        }}>
          {PAST_WINNERS.map((winner, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderBottom: i < PAST_WINNERS.length - 1 ? '1px solid var(--card-border)' : 'none',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--surface)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(232,65,66,0.15), rgba(46,205,167,0.15))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                }}>
                  🏆
                </div>
                <div>
                  <div style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-mono)',
                  }}>
                    {winner.user}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                    Won <strong>{winner.prize}</strong> from {winner.raffle}
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: 'var(--accent-teal)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: 4,
                }}>
                  <AvaxLogo size={14} /> {winner.value} AVAX
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{winner.timeAgo}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
