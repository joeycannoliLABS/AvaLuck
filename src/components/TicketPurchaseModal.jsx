import { useState } from 'react';
import { AvaxLogo, ModalOverlay } from './ui';

export default function TicketPurchaseModal({ raffle, onClose }) {
  const [qty, setQty] = useState(1);
  if (!raffle) return null;

  const remaining = raffle.totalTickets - raffle.ticketsSold;
  const maxQty = Math.min(remaining, 10);

  return (
    <ModalOverlay onClose={onClose}>
      <div style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: 20,
        padding: 32,
        width: '90vw',
        maxWidth: 400,
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <span style={{ fontSize: 56 }}>{raffle.emoji}</span>
          <h3 style={{
            fontSize: 18,
            fontWeight: 700,
            color: 'var(--text-primary)',
            margin: '12px 0 4px',
          }}>
            {raffle.title}
          </h3>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0 }}>
            {raffle.collection}
          </p>
        </div>

        {/* Info */}
        <div style={{
          background: 'var(--surface)',
          borderRadius: 12,
          padding: 16,
          marginBottom: 20,
        }}>
          {[
            { label: 'Prize value', value: `${raffle.prizeValue} AVAX` },
            { label: 'Ticket price', value: `${raffle.ticketPrice} AVAX` },
            { label: 'Remaining', value: `${remaining} tickets`, color: 'var(--accent-teal)' },
          ].map(row => (
            <div key={row.label} style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '4px 0',
            }}>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{row.label}</span>
              <span style={{
                fontSize: 13,
                fontWeight: 600,
                color: row.color || 'var(--text-primary)',
              }}>
                {row.value}
              </span>
            </div>
          ))}
        </div>

        {/* Quantity */}
        <div style={{ marginBottom: 20 }}>
          <label style={{
            fontSize: 12,
            color: 'var(--text-secondary)',
            display: 'block',
            marginBottom: 8,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
          }}>
            Quantity
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                border: '1px solid var(--card-border)',
                background: 'var(--surface)',
                color: 'var(--text-primary)',
                fontSize: 18,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              −
            </button>
            <span style={{
              fontSize: 24,
              fontWeight: 700,
              color: 'var(--text-primary)',
              minWidth: 40,
              textAlign: 'center',
              fontFamily: 'var(--font-mono)',
            }}>
              {qty}
            </span>
            <button
              onClick={() => setQty(Math.min(maxQty, qty + 1))}
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                border: '1px solid var(--card-border)',
                background: 'var(--surface)',
                color: 'var(--text-primary)',
                fontSize: 18,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              +
            </button>
          </div>
        </div>

        {/* Total */}
        <div style={{
          background: 'var(--surface)',
          borderRadius: 12,
          padding: 16,
          marginBottom: 20,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Total cost</span>
          <span style={{
            fontSize: 20,
            fontWeight: 700,
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}>
            <AvaxLogo size={18} /> {(qty * raffle.ticketPrice).toFixed(2)} AVAX
          </span>
        </div>

        {/* CTA */}
        <button style={{
          width: '100%',
          padding: '14px 0',
          borderRadius: 12,
          border: 'none',
          background: 'linear-gradient(135deg, var(--avax-red), var(--avax-red-dark))',
          color: 'white',
          fontSize: 15,
          fontWeight: 700,
          cursor: 'pointer',
          letterSpacing: 0.5,
        }}>
          Connect wallet to buy
        </button>

        <p style={{
          fontSize: 11,
          color: 'var(--text-muted)',
          textAlign: 'center',
          marginTop: 10,
        }}>
          Powered by Chainlink VRF for provably fair draws
        </p>
      </div>
    </ModalOverlay>
  );
}
