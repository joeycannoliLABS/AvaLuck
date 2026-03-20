import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AvaxLogo } from './ui';
import { useAuth } from '../context/AuthContext';

function WalletIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4z" />
    </svg>
  );
}

function WalletDropdown({ isOpen, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    if (isOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div ref={ref} style={{
      position: 'absolute',
      top: 'calc(100% + 8px)',
      right: 0,
      width: 300,
      background: 'var(--card-bg)',
      border: '1px solid var(--card-border)',
      borderRadius: 16,
      padding: 0,
      zIndex: 200,
      animation: 'scaleIn 0.15s ease',
      overflow: 'hidden',
    }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--card-border)' }}>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>
          Total balance
        </div>
        <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
          $0.00
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
          Combined fiat + Crypto value
        </div>
      </div>

      <div style={{ padding: '12px 20px' }}>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>
          Breakdown
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 14px',
          background: 'var(--surface)',
          borderRadius: 10,
          marginBottom: 8,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(46, 205, 167, 0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, color: 'var(--accent-teal)', fontWeight: 700,
            }}>$</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>Fiat Balance</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>USD Account</div>
            </div>
          </div>
          <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>$0.00</span>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 14px',
          background: 'var(--surface)',
          borderRadius: 10,
          marginBottom: 8,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(232, 65, 66, 0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <AvaxLogo size={20} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>Crypto</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>0 assets</div>
            </div>
          </div>
          <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>$0.00</span>
        </div>
      </div>

      <div style={{
        padding: '12px 20px 16px',
        borderTop: '1px solid var(--card-border)',
        textAlign: 'center',
      }}>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          Connect wallet to view balances
        </span>
      </div>
    </div>
  );
}

function NotificationDropdown({ isOpen, onClose, notifications, isConnected }) {
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    if (isOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const typeIcons = {
    win: '🏆',
    announcement: '📢',
    news: '📰',
  };

  return (
    <div ref={ref} style={{
      position: 'absolute',
      top: 'calc(100% + 8px)',
      right: 0,
      width: 340,
      background: 'var(--card-bg)',
      border: '1px solid var(--card-border)',
      borderRadius: 16,
      padding: 0,
      zIndex: 200,
      animation: 'scaleIn 0.15s ease',
      overflow: 'hidden',
    }}>
      <div style={{
        padding: '14px 20px',
        borderBottom: '1px solid var(--card-border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>
          Notifications
        </span>
        {isConnected && notifications.filter(n => n.unread).length > 0 && (
          <span style={{
            fontSize: 11, fontWeight: 600,
            background: 'rgba(232,65,66,0.15)',
            color: 'var(--avax-red)',
            padding: '2px 8px',
            borderRadius: 10,
          }}>
            {notifications.filter(n => n.unread).length} new
          </span>
        )}
      </div>

      {!isConnected ? (
        <div style={{ padding: '32px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🔔</div>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>
            Connect your wallet to receive notifications
          </p>
        </div>
      ) : notifications.length === 0 ? (
        <div style={{ padding: '32px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>✨</div>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>
            No notifications yet
          </p>
        </div>
      ) : (
        <div style={{ maxHeight: 320, overflow: 'auto' }}>
          {notifications.map(notif => (
            <div
              key={notif.id}
              style={{
                padding: '12px 20px',
                borderBottom: '1px solid var(--card-border)',
                display: 'flex',
                gap: 12,
                alignItems: 'flex-start',
                background: notif.unread ? 'rgba(232,65,66,0.03)' : 'transparent',
                cursor: 'pointer',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--surface)'}
              onMouseLeave={e => e.currentTarget.style.background = notif.unread ? 'rgba(232,65,66,0.03)' : 'transparent'}
            >
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: 'var(--surface)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, flexShrink: 0,
              }}>
                {typeIcons[notif.type] || '📌'}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                  <span style={{
                    fontSize: 13, fontWeight: 600,
                    color: 'var(--text-primary)',
                  }}>
                    {notif.title}
                  </span>
                  {notif.unread && (
                    <span style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: 'var(--avax-red)',
                      flexShrink: 0,
                    }} />
                  )}
                </div>
                <p style={{
                  fontSize: 12, color: 'var(--text-secondary)',
                  margin: 0, lineHeight: 1.4,
                  overflow: 'hidden', textOverflow: 'ellipsis',
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                }}>
                  {notif.message}
                </p>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4, display: 'block' }}>
                  {notif.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {isConnected && notifications.length > 0 && (
        <div style={{
          padding: '10px 20px',
          borderTop: '1px solid var(--card-border)',
          textAlign: 'center',
        }}>
          <span style={{ fontSize: 12, color: 'var(--avax-red)', fontWeight: 600, cursor: 'pointer' }}>
            Mark all as read
          </span>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const location = useLocation();
  const { isConnected, isAdmin, address, connect, disconnect, toggleAdmin } = useAuth();

  const notifications = [
    { id: 1, type: 'win', title: 'You won!', message: 'Congratulations! You won the 500 AVAX Giveaway raffle.', time: '2 min ago', unread: true },
    { id: 2, type: 'announcement', title: 'New Avalanche Raffle', message: 'A Rolex Submariner has been listed. Get your tickets now!', time: '1 hour ago', unread: true },
    { id: 3, type: 'news', title: 'Platform update', message: 'Community raffles now support all ERC-20 tokens on Avalanche.', time: '3 hours ago', unread: false },
    { id: 4, type: 'win', title: 'Raffle ended', message: 'The MacBook Pro raffle has ended. Winner being drawn...', time: '5 hours ago', unread: false },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setWalletOpen(false);
    setNotifOpen(false);
  }, [location]);

  const navLinks = [
    { label: 'Raffles', path: '/' },
    { label: 'My tickets', path: '/my-tickets' },
    { label: 'Create', path: '/create' },
    { label: 'Leaderboard', path: '/leaderboard' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '0 24px',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(11, 14, 17, 0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--card-border)' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <AvaxLogo size={28} />
          <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: -0.5 }}>
            <span style={{ color: 'var(--avax-red)' }}>Ava</span>Luck
          </span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ display: 'flex', gap: 24 }} className="desktop-nav">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  color: isActive(link.path) ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontSize: 14,
                  fontWeight: isActive(link.path) ? 600 : 500,
                  transition: 'color 0.2s',
                  position: 'relative',
                }}
              >
                {link.label}
                {isActive(link.path) && (
                  <span style={{
                    position: 'absolute',
                    bottom: -4,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: 'var(--avax-red)',
                    borderRadius: 1,
                  }} />
                )}
              </Link>
            ))}
          </div>

          {/* Notification bell */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              style={{
                width: 38, height: 38, borderRadius: 10,
                border: '1px solid var(--card-border)',
                background: notifOpen ? 'var(--surface)' : 'transparent',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s',
                position: 'relative',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--text-muted)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
              onMouseLeave={e => { if (!notifOpen) { e.currentTarget.style.borderColor = 'var(--card-border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}}
            >
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              {isConnected && notifications.length > 0 && (
                <span style={{
                  position: 'absolute', top: 4, right: 4,
                  width: 8, height: 8, borderRadius: '50%',
                  background: 'var(--avax-red)',
                  border: '2px solid var(--dark-bg)',
                }} />
              )}
            </button>
            <NotificationDropdown isOpen={notifOpen} onClose={() => setNotifOpen(false)} notifications={notifications} isConnected={isConnected} />
          </div>

          {/* Wallet icon */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setWalletOpen(!walletOpen)}
              style={{
                width: 38, height: 38, borderRadius: 10,
                border: '1px solid var(--card-border)',
                background: walletOpen ? 'var(--surface)' : 'transparent',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--text-muted)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
              onMouseLeave={e => { if (!walletOpen) { e.currentTarget.style.borderColor = 'var(--card-border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}}
            >
              <WalletIcon size={18} />
            </button>
            <WalletDropdown isOpen={walletOpen} onClose={() => setWalletOpen(false)} />
          </div>

          {isConnected ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {/* Admin toggle (for demo) */}
              <button
                onClick={toggleAdmin}
                title={isAdmin ? 'Admin mode ON' : 'Click to enable admin mode'}
                style={{
                  width: 38, height: 38, borderRadius: 10,
                  border: `1px solid ${isAdmin ? 'var(--accent-gold)' : 'var(--card-border)'}`,
                  background: isAdmin ? 'rgba(245,166,35,0.12)' : 'transparent',
                  color: isAdmin ? 'var(--accent-gold)' : 'var(--text-muted)',
                  cursor: 'pointer', fontSize: 16,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s',
                }}
              >
                {isAdmin ? '👑' : '🔒'}
              </button>

              {/* Address pill */}
              <button
                onClick={disconnect}
                style={{
                  padding: '8px 16px', borderRadius: 10,
                  border: '1px solid var(--card-border)',
                  background: 'var(--surface)',
                  color: 'var(--text-primary)',
                  fontSize: 13, fontWeight: 500, cursor: 'pointer',
                  fontFamily: 'var(--font-mono)',
                  transition: 'all 0.2s',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--avax-red)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--card-border)'}
              >
                <span style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: 'var(--accent-teal)',
                  display: 'inline-block',
                }} />
                {address}
              </button>
            </div>
          ) : (
            <button
              onClick={connect}
              style={{
                padding: '8px 20px', borderRadius: 10,
                border: '1px solid var(--avax-red)',
                background: 'rgba(232, 65, 66, 0.08)',
                color: 'var(--avax-red)',
                fontSize: 13, fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.2s',
                letterSpacing: 0.3,
              }}
              onMouseEnter={e => {
                e.target.style.background = 'var(--avax-red)';
                e.target.style.color = 'white';
              }}
              onMouseLeave={e => {
                e.target.style.background = 'rgba(232, 65, 66, 0.08)';
                e.target.style.color = 'var(--avax-red)';
              }}
            >
              Connect wallet
            </button>
          )}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-menu-btn"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              fontSize: 24,
              cursor: 'pointer',
              padding: 4,
            }}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div style={{
          position: 'fixed',
          top: 64, left: 0, right: 0, bottom: 0,
          background: 'var(--dark-bg)',
          zIndex: 99,
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          animation: 'fadeIn 0.2s ease',
        }}>
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                color: isActive(link.path) ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontSize: 18,
                fontWeight: 500,
                padding: '14px 0',
                borderBottom: '1px solid var(--card-border)',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </>
  );
}
