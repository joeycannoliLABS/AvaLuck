import { EmptyState } from '../components/ui';
import { useAuth } from '../context/AuthContext';

export default function MyTicketsPage() {
  const { isConnected, connect } = useAuth();

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 80px' }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>My tickets</h1>
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 32 }}>
        View all your raffle entries and track your wins.
      </p>

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
            Connect your Avalanche wallet to view your tickets, track active raffles, and claim your prizes.
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
        <EmptyState
          emoji="🎟️"
          title="No tickets yet"
          description="You haven't entered any raffles yet. Browse active raffles to get started!"
        />
      )}

      {/* Ticket stats preview (shown when connected) */}
      {isConnected && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 16,
          marginTop: 32,
        }}>
          {[
            { label: 'Active entries', value: '0', color: 'var(--accent-teal)' },
            { label: 'Total spent', value: '0 AVAX', color: 'var(--text-primary)' },
            { label: 'Raffles won', value: '0', color: 'var(--accent-gold)' },
            { label: 'Total winnings', value: '0 AVAX', color: 'var(--avax-red)' },
          ].map(stat => (
            <div key={stat.label} style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              borderRadius: 16,
              padding: '20px 24px',
            }}>
              <div style={{
                fontSize: 12,
                color: 'var(--text-muted)',
                marginBottom: 8,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}>
                {stat.label}
              </div>
              <div style={{
                fontSize: 24,
                fontWeight: 700,
                color: stat.color,
                fontFamily: 'var(--font-mono)',
              }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
