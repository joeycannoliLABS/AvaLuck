import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AvaxLogo, ProgressBar, Badge } from './ui';
import { getTokenLogo, TokenFallbackIcon } from '../data/tokenLogos';
import { useAuth } from '../context/AuthContext';

export default function RaffleCard({ raffle }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const navigate = useNavigate();
  const { isConnected, isWatchlisted, toggleWatchlist } = useAuth();
  const pct = Math.round((raffle.ticketsSold / raffle.totalTickets) * 100);
  const isEnded = raffle.status === 'ended';
  const isAlmostFull = pct >= 90 && !isEnded;
  const isCrypto = raffle.type === 'crypto';
  const watched = isWatchlisted(raffle.id);

  const tokenLogo = isCrypto ? getTokenLogo(raffle.prizeToken) : null;

  const handleShare = (e) => {
    e.stopPropagation();
    const url = `${window.location.origin}/raffle/${raffle.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    });
  };

  const handleWatchlist = (e) => {
    e.stopPropagation();
    toggleWatchlist(raffle.id);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/raffle/${raffle.id}`)}
      style={{
        background: hovered ? 'var(--surface)' : 'var(--card-bg)',
        border: `1px solid ${hovered ? 'rgba(232,65,66,0.25)' : 'var(--card-border)'}`,
        borderRadius: 16,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-4px)' : 'none',
        position: 'relative',
        animation: 'slideUp 0.4s ease both',
      }}
    >
      {raffle.featured && (
        <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 2 }}>
          <Badge variant="gold">Featured</Badge>
        </div>
      )}
      {isAlmostFull && (
        <div style={{ position: 'absolute', top: raffle.featured ? 40 : 12, right: 12, zIndex: 2 }}>
          <Badge variant="danger">Almost full</Badge>
        </div>
      )}

      {/* Action buttons — top left (or right if no almostFull badge) */}
      <div style={{
        position: 'absolute',
        top: 12,
        left: 12,
        right: 'auto',
        zIndex: 3,
        display: 'flex',
        gap: 6,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.2s ease',
      }}>
        {/* Watchlist heart */}
        <button
          onClick={handleWatchlist}
          title={watched ? 'Remove from watchlist' : 'Add to watchlist'}
          style={{
            width: 32, height: 32, borderRadius: 8,
            border: 'none',
            background: watched ? 'rgba(232,65,66,0.9)' : 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(8px)',
            color: watched ? 'white' : 'rgba(255,255,255,0.8)',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
          }}
        >
          <svg width={14} height={14} viewBox="0 0 24 24"
            fill={watched ? 'currentColor' : 'none'}
            stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Share */}
        <button
          onClick={handleShare}
          title="Copy raffle link"
          style={{
            width: 32, height: 32, borderRadius: 8,
            border: 'none',
            background: showCopied ? 'rgba(46,205,167,0.9)' : 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(8px)',
            color: 'rgba(255,255,255,0.8)',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
          }}
        >
          {showCopied ? (
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          )}
        </button>
      </div>

      {/* Always-visible watchlist indicator (when watched but not hovered) */}
      {watched && !hovered && (
        <div style={{
          position: 'absolute',
          top: 12, left: 12,
          right: 'auto',
          zIndex: 3,
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 7,
            background: 'rgba(232,65,66,0.85)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width={12} height={12} viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
        </div>
      )}

      {/* Image Preview */}
      <div style={{
        height: 180,
        background: isCrypto
          ? 'linear-gradient(145deg, #1a1225, #0f1a20)'
          : 'linear-gradient(145deg, var(--dark-bg), var(--surface))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          width: 200, height: 200,
          background: isCrypto
            ? 'radial-gradient(circle, rgba(46,205,167,0.1), transparent 70%)'
            : 'radial-gradient(circle, rgba(232,65,66,0.08), transparent 70%)',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
        }} />

        {isCrypto ? (
          tokenLogo && !imgError ? (
            <img
              src={tokenLogo}
              alt={raffle.prizeToken}
              onError={() => setImgError(true)}
              style={{
                width: 80, height: 80,
                borderRadius: '50%',
                objectFit: 'contain',
                filter: isEnded ? 'grayscale(0.5)' : 'none',
                transition: 'transform 0.3s ease',
                transform: hovered ? 'scale(1.1)' : 'scale(1)',
              }}
            />
          ) : (
            <TokenFallbackIcon symbol={raffle.prizeToken} size={80} />
          )
        ) : (
          raffle.image && !imgError ? (
            <img
              src={raffle.image}
              alt={raffle.title}
              onError={() => setImgError(true)}
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover',
                filter: isEnded ? 'grayscale(0.5)' : 'none',
                transition: 'transform 0.3s ease',
                transform: hovered ? 'scale(1.08)' : 'scale(1)',
              }}
            />
          ) : (
            <div style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 8, color: 'var(--text-muted)',
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
              <span style={{ fontSize: 11 }}>NFT Image</span>
            </div>
          )
        )}

        {isCrypto && (
          <div style={{
            position: 'absolute',
            bottom: 12, left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(46,205,167,0.12)',
            border: '1px solid rgba(46,205,167,0.25)',
            borderRadius: 20,
            padding: '4px 12px',
            fontSize: 11, fontWeight: 600,
            color: 'var(--accent-teal)',
            letterSpacing: 0.5,
            textTransform: 'uppercase',
          }}>
            Token raffle
          </div>
        )}
      </div>

      {/* Card Body */}
      <div style={{ padding: '16px 20px 20px' }}>
        <div style={{
          fontSize: 11, color: 'var(--text-muted)',
          textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4,
        }}>
          {raffle.collection}
        </div>
        <div style={{
          fontSize: 16, fontWeight: 600,
          color: 'var(--text-primary)', marginBottom: 12,
        }}>
          {raffle.title}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>
              {isCrypto ? 'Prize pool' : 'Prize value'}
            </div>
            <div style={{
              fontSize: 15, fontWeight: 600,
              color: isCrypto ? 'var(--accent-teal)' : 'var(--text-primary)',
              display: 'flex', alignItems: 'center', gap: 4,
            }}>
              {!isCrypto && <AvaxLogo size={14} />}
              {isCrypto
                ? `$${raffle.prizeValue} in ${raffle.prizeToken}`
                : `${raffle.prizeValue} AVAX`}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>Ticket price</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>
              {raffle.ticketPrice} AVAX
            </div>
          </div>
        </div>

        <ProgressBar sold={raffle.ticketsSold} total={raffle.totalTickets} />

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
          <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
            {raffle.ticketsSold}/{raffle.totalTickets} sold
          </span>
          <span style={{
            fontSize: 12,
            color: isEnded ? 'var(--text-muted)' : pct >= 90 ? 'var(--avax-red)' : 'var(--accent-teal)',
            fontWeight: 600,
          }}>
            {isEnded ? 'Ended' : raffle.endsIn}
          </span>
        </div>

        <button
          disabled={isEnded}
          style={{
            width: '100%', marginTop: 14, padding: '10px 0',
            borderRadius: 10, border: 'none',
            background: isEnded
              ? 'var(--card-border)'
              : 'linear-gradient(135deg, var(--avax-red), var(--avax-red-dark))',
            color: isEnded ? 'var(--text-muted)' : 'white',
            fontSize: 14, fontWeight: 600,
            cursor: isEnded ? 'default' : 'pointer',
            transition: 'all 0.2s', letterSpacing: 0.5,
          }}
        >
          {isEnded ? 'Raffle ended' : 'Buy tickets'}
        </button>
      </div>
    </div>
  );
}
