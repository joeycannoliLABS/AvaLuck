import { useState } from 'react';

// ─── Avalanche Logo (uses uploaded PNG) ───────────────────
export function AvaxLogo({ size = 20 }) {
  return (
    <img
      src="/avalanche_logo.png"
      alt="Avalanche"
      width={size}
      height={size}
      style={{ objectFit: 'contain', display: 'block' }}
    />
  );
}

// ─── Progress Bar ─────────────────────────────────────────
export function ProgressBar({ sold, total, height = 6 }) {
  const pct = Math.min((sold / total) * 100, 100);
  const isFull = sold >= total;
  return (
    <div style={{
      width: '100%',
      height,
      background: 'var(--card-border)',
      borderRadius: height / 2,
      overflow: 'hidden',
    }}>
      <div style={{
        width: `${pct}%`,
        height: '100%',
        background: isFull
          ? 'linear-gradient(90deg, var(--accent-teal), #22B890)'
          : 'linear-gradient(90deg, var(--avax-red), #FF6B6B)',
        borderRadius: height / 2,
        transition: 'width 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
      }} />
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────
export function StatCard({ label, value, suffix }) {
  return (
    <div style={{
      background: 'var(--card-bg)',
      border: '1px solid var(--card-border)',
      borderRadius: 16,
      padding: '20px 24px',
      flex: 1,
      minWidth: 140,
    }}>
      <div style={{
        fontSize: 13,
        color: 'var(--text-secondary)',
        marginBottom: 8,
        letterSpacing: 0.5,
        textTransform: 'uppercase',
      }}>
        {label}
      </div>
      <div style={{
        fontSize: 28,
        fontWeight: 700,
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-mono)',
      }}>
        {value}
        {suffix && <span style={{ fontSize: 14, color: 'var(--text-secondary)', marginLeft: 4 }}>{suffix}</span>}
      </div>
    </div>
  );
}

// ─── Badge ────────────────────────────────────────────────
export function Badge({ children, variant = 'default' }) {
  const styles = {
    default: {
      background: 'rgba(232, 65, 66, 0.15)',
      color: 'var(--avax-red)',
      border: '1px solid rgba(232, 65, 66, 0.3)',
    },
    gold: {
      background: 'linear-gradient(135deg, var(--accent-gold), #E8941A)',
      color: '#1A1200',
      border: 'none',
    },
    teal: {
      background: 'rgba(46, 205, 167, 0.15)',
      color: 'var(--accent-teal)',
      border: '1px solid rgba(46, 205, 167, 0.3)',
    },
    danger: {
      background: 'rgba(232, 65, 66, 0.2)',
      color: '#FF8A8A',
      border: 'none',
    },
  };

  return (
    <span style={{
      fontSize: 11,
      fontWeight: 700,
      padding: '4px 10px',
      borderRadius: 6,
      letterSpacing: 0.5,
      textTransform: 'uppercase',
      display: 'inline-flex',
      alignItems: 'center',
      ...styles[variant],
    }}>
      {children}
    </span>
  );
}

// ─── Countdown Timer ──────────────────────────────────────
export function CountdownTimer({ endsAt }) {
  const [, setTick] = useState(0);

  const getTimeLeft = () => {
    const diff = endsAt - Date.now();
    if (diff <= 0) return 'Ended';
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    if (d > 0) return `${d}d ${h}h ${m}m`;
    if (h > 0) return `${h}h ${m}m ${s}s`;
    return `${m}m ${s}s`;
  };

  useState(() => {
    const interval = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(interval);
  });

  return <span>{getTimeLeft()}</span>;
}

// ─── Empty State ──────────────────────────────────────────
export function EmptyState({ emoji, title, description }) {
  return (
    <div style={{
      textAlign: 'center',
      padding: '80px 24px',
    }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>{emoji}</div>
      <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{title}</h3>
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', maxWidth: 400, margin: '0 auto' }}>{description}</p>
    </div>
  );
}

// ─── Modal Overlay ────────────────────────────────────────
export function ModalOverlay({ children, onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(8px)',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ animation: 'scaleIn 0.25s ease' }}
      >
        {children}
      </div>
    </div>
  );
}
