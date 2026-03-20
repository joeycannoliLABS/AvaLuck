import { AvaxLogo } from './ui';

export default function Footer() {
  const links = [
    { label: 'Twitter', href: '#' },
    { label: 'Discord', href: '#' },
    { label: 'Docs', href: '#' },
    { label: 'GitHub', href: '#' },
  ];

  return (
    <footer style={{
      borderTop: '1px solid var(--card-border)',
      padding: '40px 24px',
      maxWidth: 1200,
      margin: '0 auto',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 20,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <AvaxLogo size={22} />
          <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: -0.5 }}>
            <span style={{ color: 'var(--avax-red)' }}>Ava</span>Luck
          </span>
        </div>

        <div style={{ display: 'flex', gap: 24 }}>
          {links.map(link => (
            <a
              key={link.label}
              href={link.href}
              style={{
                color: 'var(--text-muted)',
                fontSize: 13,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          © 2026 AvaLuck. Powered by Chainlink VRF.
        </div>
      </div>
    </footer>
  );
}
