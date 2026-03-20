import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AvaxLogo, StatCard } from '../components/ui';
import RaffleCard from '../components/RaffleCard';
import { MOCK_RAFFLES, PAST_WINNERS, PLATFORM_STATS } from '../data/mockData';

const AVAX_RAFFLES = MOCK_RAFFLES.filter(r => r.status === 'live');
const AVAX_FEATURED = AVAX_RAFFLES.filter(r => r.featured).length > 0
  ? AVAX_RAFFLES.filter(r => r.featured)
  : AVAX_RAFFLES.slice(0, 3);
const COMMUNITY_RAFFLES = [
  {
    id: 10,
    title: "500 AVAX Giveaway",
    collection: "Community",
    emoji: "🔺",
    ticketPrice: 0.5,
    totalTickets: 2000,
    ticketsSold: 1432,
    endsIn: "3h 45m",
    endsAt: Date.now() + 3 * 3600000 + 45 * 60000,
    prizeValue: 500,
    prizeToken: "AVAX",
    status: "live",
    featured: true,
    type: "crypto",
    creator: "0xf1a2...b3c4",
    contractAddress: "0xaaaa...bbbb",
    description: "500 AVAX locked in escrow. One lucky winner takes it all!",
    participants: [],
  },
  {
    id: 11,
    title: "10,000 JOE Token Drop",
    collection: "Community",
    emoji: "🃏",
    ticketPrice: 0.2,
    totalTickets: 1000,
    ticketsSold: 678,
    endsIn: "6h 10m",
    endsAt: Date.now() + 6 * 3600000 + 10 * 60000,
    prizeValue: 850,
    prizeToken: "JOE",
    status: "live",
    featured: true,
    type: "crypto",
    creator: "0xd5e6...f7a8",
    contractAddress: "0xcccc...dddd",
    description: "10,000 JOE tokens up for grabs. Tokens locked in smart contract escrow.",
    participants: [],
  },
  {
    id: 12,
    title: "50,000 COQ Raffle",
    collection: "Community",
    emoji: "🐔",
    ticketPrice: 0.1,
    totalTickets: 5000,
    ticketsSold: 2180,
    endsIn: "1d 2h",
    endsAt: Date.now() + 26 * 3600000,
    prizeValue: 320,
    prizeToken: "COQ",
    status: "live",
    featured: true,
    type: "crypto",
    creator: "0xb9c0...d1e2",
    contractAddress: "0xeeee...ffff",
    description: "50,000 COQ tokens locked and ready to raffle. Get your tickets!",
    participants: [],
  },
];

const COMMUNITY_FEATURED = COMMUNITY_RAFFLES.filter(r => r.featured).slice(0, 3);

function HowItWorks() {
  const steps = [
    { num: '01', title: 'Connect wallet', desc: 'Link your Avalanche wallet to get started', icon: '🔗' },
    { num: '02', title: 'Choose a raffle', desc: 'Browse active raffles and pick your favorite', icon: '🎯' },
    { num: '03', title: 'Buy tickets', desc: 'Purchase tickets with AVAX for a chance to win', icon: '🎟️' },
    { num: '04', title: 'Win prizes', desc: 'Winners drawn via Chainlink VRF — provably fair', icon: '🏆' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
      {steps.map(step => (
        <div key={step.num} style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--card-border)',
          borderRadius: 16,
          padding: '24px 20px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>{step.icon}</div>
          <div style={{
            fontSize: 11, color: 'var(--avax-red)', fontWeight: 700,
            letterSpacing: 2, marginBottom: 8, fontFamily: 'var(--font-mono)',
          }}>
            STEP {step.num}
          </div>
          <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>
            {step.title}
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            {step.desc}
          </div>
        </div>
      ))}
    </div>
  );
}

function WinnerRow({ winner, index }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 0', borderBottom: '1px solid var(--card-border)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(232,65,66,0.2), rgba(46,205,167,0.2))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, fontWeight: 700, color: 'var(--avax-red)',
        }}>
          {index + 1}
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
            {winner.user}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{winner.prize}</div>
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{
          fontSize: 14, fontWeight: 600, color: 'var(--accent-teal)',
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          <AvaxLogo size={12} /> {winner.value} AVAX
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{winner.timeAgo}</div>
      </div>
    </div>
  );
}

function RaffleSection({ title, description, raffles, featuredRaffles, livePath, endedPath }) {
  const [activeTab, setActiveTab] = useState('featured');
  const displayRaffles = activeTab === 'featured' ? (featuredRaffles || raffles) : raffles;

  return (
    <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 60px' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        marginBottom: 24, flexWrap: 'wrap', gap: 12,
      }}>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: description ? 6 : 0 }}>{title}</h2>
          {description && (
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: 0, maxWidth: 520 }}>
              {description}
            </p>
          )}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setActiveTab('featured')}
            style={{
              padding: '7px 18px', borderRadius: 8,
              border: activeTab === 'featured' ? '1px solid var(--accent-gold)' : '1px solid var(--card-border)',
              background: activeTab === 'featured' ? 'rgba(245,166,35,0.08)' : 'transparent',
              color: activeTab === 'featured' ? 'var(--accent-gold)' : 'var(--text-secondary)',
              fontSize: 13, fontWeight: 500, cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Featured
          </button>
          <Link to={livePath} style={{
            padding: '7px 18px', borderRadius: 8,
            border: '1px solid var(--card-border)',
            background: 'transparent',
            color: 'var(--text-secondary)',
            fontSize: 13, fontWeight: 500,
            transition: 'all 0.2s',
            display: 'inline-block',
          }}>
            Live
          </Link>
          <Link to={endedPath} style={{
            padding: '7px 18px', borderRadius: 8,
            border: '1px solid var(--card-border)',
            background: 'transparent',
            color: 'var(--text-secondary)',
            fontSize: 13, fontWeight: 500,
            transition: 'all 0.2s',
            display: 'inline-block',
          }}>
            Ended
          </Link>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 20,
      }}>
        {displayRaffles.map(raffle => (
          <RaffleCard key={raffle.id} raffle={raffle} />
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section style={{
        paddingTop: 80, paddingBottom: 80, textAlign: 'center',
        maxWidth: 1200, margin: '0 auto', padding: '80px 24px',
      }}>
        <div style={{
          display: 'inline-block',
          background: 'rgba(232,65,66,0.08)',
          border: '1px solid rgba(232,65,66,0.2)',
          borderRadius: 100, padding: '6px 16px', marginBottom: 24,
        }}>
          <span style={{
            fontSize: 12, color: 'var(--avax-red)', fontWeight: 600,
            letterSpacing: 1, textTransform: 'uppercase',
          }}>
            <span style={{
              display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
              background: 'var(--avax-red)', marginRight: 8, animation: 'pulse 2s infinite',
            }} />
            Live on Avalanche C-Chain
          </span>
        </div>

        <h1 style={{
          fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 800,
          lineHeight: 1.1, marginBottom: 20, letterSpacing: -1,
        }}>
          Win prizes with<br />
          <span style={{
            background: 'linear-gradient(135deg, var(--avax-red), #FF6B6B, var(--accent-gold))',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'gradient 4s ease infinite',
          }}>
            provably fair
          </span>{' '}raffles
        </h1>

        <p style={{
          fontSize: 18, color: 'var(--text-secondary)',
          maxWidth: 560, margin: '0 auto 36px', lineHeight: 1.6,
        }}>
          The fairest raffle platform on Avalanche. Buy tickets, win prizes, and verify every draw on-chain with Chainlink VRF.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#avalanche-raffles" style={{
            padding: '14px 36px', borderRadius: 12, border: 'none',
            background: 'linear-gradient(135deg, var(--avax-red), var(--avax-red-dark))',
            color: 'white', fontSize: 15, fontWeight: 700,
            cursor: 'pointer', letterSpacing: 0.3, display: 'inline-block',
          }}>
            Explore raffles
          </a>
          <Link to="/create" style={{
            padding: '14px 36px', borderRadius: 12,
            border: '1px solid var(--card-border)',
            background: 'var(--card-bg)', color: 'var(--text-primary)',
            fontSize: 15, fontWeight: 600, display: 'inline-block',
          }}>
            Create raffle
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 60px' }}>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <StatCard label="Total volume" value={PLATFORM_STATS.totalVolume} suffix="AVAX" />
          <StatCard label="Raffles completed" value={PLATFORM_STATS.rafflesCompleted} />
          <StatCard label="Unique winners" value={PLATFORM_STATS.uniqueWinners} />
          <StatCard label="Active raffles" value={PLATFORM_STATS.activeRaffles} />
        </div>
      </section>

      {/* Avalanche Raffles */}
      <div id="avalanche-raffles">
        <RaffleSection
          title="Avalanche Raffles"
          description={null}
          raffles={AVAX_RAFFLES}
          featuredRaffles={AVAX_FEATURED}
          livePath="/raffles/avalanche/live"
          endedPath="/raffles/avalanche/ended"
        />
      </div>

      {/* Community Raffles */}
      <RaffleSection
        title="Community Raffles"
        description="User-created crypto raffles with tokens locked in escrow. Winners selected via Chainlink VRF."
        raffles={COMMUNITY_RAFFLES}
        featuredRaffles={COMMUNITY_FEATURED}
        livePath="/raffles/community/live"
        endedPath="/raffles/community/ended"
      />

      {/* How It Works */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 60px' }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, textAlign: 'center' }}>
          How it works
        </h2>
        <HowItWorks />
      </section>

      {/* Winners + Avalanche info */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 60px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
          gap: 24,
        }}>
          <div style={{
            background: 'var(--card-bg)', border: '1px solid var(--card-border)',
            borderRadius: 16, padding: 24,
          }}>
            <h3 style={{
              fontSize: 18, fontWeight: 700, marginBottom: 16,
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{ fontSize: 18 }}>🏆</span> Recent winners
            </h3>
            {PAST_WINNERS.slice(0, 4).map((w, i) => (
              <WinnerRow key={i} winner={w} index={i} />
            ))}
            <Link to="/leaderboard" style={{
              display: 'block', textAlign: 'center', marginTop: 16,
              color: 'var(--avax-red)', fontSize: 13, fontWeight: 600,
            }}>
              View all winners →
            </Link>
          </div>

          <div style={{
            background: 'var(--card-bg)', border: '1px solid var(--card-border)',
            borderRadius: 16, padding: 24,
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center', textAlign: 'center',
          }}>
            <img
              src="/avalanche_logo.png"
              alt="Avalanche"
              style={{ width: 80, height: 80, objectFit: 'contain', marginBottom: 20 }}
            />
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Built on Avalanche</h3>
            <p style={{
              fontSize: 14, color: 'var(--text-secondary)',
              lineHeight: 1.6, maxWidth: 360, marginBottom: 20,
            }}>
              Lightning-fast transactions with sub-second finality. Low gas fees mean more value for players. All draws verified via Chainlink VRF.
            </p>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
              {[
                { label: 'Finality', value: '<1s' },
                { label: 'Avg gas', value: '~$0.02' },
                { label: 'TPS', value: '4,500+' },
              ].map(item => (
                <div key={item.label}>
                  <div style={{
                    fontSize: 22, fontWeight: 700, color: 'var(--avax-red)',
                    fontFamily: 'var(--font-mono)',
                  }}>
                    {item.value}
                  </div>
                  <div style={{
                    fontSize: 11, color: 'var(--text-muted)',
                    textTransform: 'uppercase', letterSpacing: 0.5,
                  }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
