import { useState } from 'react';
import { AvaxLogo } from '../components/ui';
import { useAuth } from '../context/AuthContext';
import { POPULAR_TOKENS, getTokenLogo, TokenFallbackIcon } from '../data/tokenLogos';

export default function CreateRafflePage() {
  const { isAdmin, isConnected } = useAuth();
  const [raffleType, setRaffleType] = useState('crypto');
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedToken, setSelectedToken] = useState(null);
  const [showTokenPicker, setShowTokenPicker] = useState(false);
  const [form, setForm] = useState({
    prizeTitle: '',
    contractAddress: '',
    tokenId: '',
    tokenSymbol: '',
    tokenAmount: '',
    customTokenAddress: '',
    ticketPrice: '',
    totalTickets: '',
    duration: '24',
    description: '',
  });

  const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const selectToken = (token) => {
    setSelectedToken(token);
    update('tokenSymbol', token.symbol);
    update('customTokenAddress', token.address || '');
    setShowTokenPicker(false);
  };

  const tokenLogo = selectedToken ? getTokenLogo(selectedToken.symbol) : null;

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    background: 'var(--surface)',
    border: '1px solid var(--card-border)',
    borderRadius: 10,
    color: 'var(--text-primary)',
    fontSize: 14,
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  };

  const labelStyle = {
    fontSize: 12,
    color: 'var(--text-secondary)',
    display: 'block',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: 600,
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 80px' }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Create a raffle</h1>
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 32 }}>
        {isAdmin
          ? 'As an admin, you can create Avalanche official raffles or community crypto raffles.'
          : 'List crypto tokens for raffle and let the community compete for a chance to win.'}
      </p>

      {/* Type Toggle */}
      <div style={{
        display: 'flex', gap: 0, marginBottom: 32,
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: 12, padding: 4, width: 'fit-content',
      }}>
        <button
          onClick={() => setRaffleType('crypto')}
          style={{
            padding: '10px 24px', borderRadius: 8, border: 'none',
            background: raffleType === 'crypto' ? 'var(--avax-red)' : 'transparent',
            color: raffleType === 'crypto' ? 'white' : 'var(--text-secondary)',
            fontSize: 14, fontWeight: 600, cursor: 'pointer',
            transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', gap: 8,
          }}
        >
          <span style={{ fontSize: 16 }}>💰</span> Community raffle
        </button>
        {isAdmin && (
          <button
            onClick={() => setRaffleType('avalanche')}
            style={{
              padding: '10px 24px', borderRadius: 8, border: 'none',
              background: raffleType === 'avalanche' ? 'var(--avax-red)' : 'transparent',
              color: raffleType === 'avalanche' ? 'white' : 'var(--text-secondary)',
              fontSize: 14, fontWeight: 600, cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', gap: 8,
            }}
          >
            <span style={{ fontSize: 16 }}>🔺</span> Avalanche raffle
          </button>
        )}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))',
        gap: 32,
      }}>
        {/* Form */}
        <div style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--card-border)',
          borderRadius: 20, padding: 32,
        }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 24 }}>
            {raffleType === 'avalanche' ? 'Avalanche raffle details' : 'Community raffle details'}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Prize Title — mandatory, shared */}
            <div>
              <label style={labelStyle}>Prize title <span style={{ color: 'var(--avax-red)' }}>*</span></label>
              <input
                placeholder="e.g. 500 AVAX Giveaway"
                value={form.prizeTitle}
                onChange={e => { if (e.target.value.length <= 100) update('prizeTitle', e.target.value); }}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'var(--avax-red)'}
                onBlur={e => e.target.style.borderColor = 'var(--card-border)'}
                required
              />
              <span style={{
                fontSize: 11, color: form.prizeTitle.length >= 90 ? 'var(--avax-red)' : 'var(--text-muted)',
                marginTop: 4, display: 'block', textAlign: 'right',
              }}>
                {form.prizeTitle.length}/100
              </span>
            </div>

            {/* Description — mandatory, shared, moved up */}
            <div>
              <label style={labelStyle}>Description <span style={{ color: 'var(--avax-red)' }}>*</span></label>
              <textarea
                placeholder={raffleType === 'avalanche'
                  ? 'Describe the prize and raffle details...'
                  : 'Tell people about this token raffle...'}
                rows={3}
                value={form.description}
                onChange={e => update('description', e.target.value)}
                style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.5 }}
                onFocus={e => e.target.style.borderColor = 'var(--avax-red)'}
                onBlur={e => e.target.style.borderColor = 'var(--card-border)'}
                required
              />
            </div>

            {raffleType === 'avalanche' ? (
              <>
                {/* Avalanche raffle: NFT fields + image upload */}
                <div>
                  <label style={labelStyle}>NFT contract address</label>
                  <input
                    placeholder="0x..."
                    value={form.contractAddress}
                    onChange={e => update('contractAddress', e.target.value)}
                    style={{ ...inputStyle, fontFamily: 'var(--font-mono)' }}
                    onFocus={e => e.target.style.borderColor = 'var(--avax-red)'}
                    onBlur={e => e.target.style.borderColor = 'var(--card-border)'}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Token ID</label>
                  <input
                    placeholder="e.g. 4821"
                    value={form.tokenId}
                    onChange={e => update('tokenId', e.target.value)}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'var(--avax-red)'}
                    onBlur={e => e.target.style.borderColor = 'var(--card-border)'}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Raffle image</label>
                  <div
                    onClick={() => document.getElementById('image-upload').click()}
                    style={{
                      border: '2px dashed var(--card-border)',
                      borderRadius: 12,
                      padding: imagePreview ? 0 : '32px 20px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'border-color 0.2s',
                      overflow: 'hidden',
                      position: 'relative',
                      minHeight: 140,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--avax-red)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--card-border)'}
                  >
                    {imagePreview ? (
                      <>
                        <img src={imagePreview} alt="Preview" style={{
                          width: '100%', height: 180, objectFit: 'cover',
                        }} />
                        <div style={{
                          position: 'absolute', bottom: 8, right: 8,
                          background: 'rgba(0,0,0,0.7)', borderRadius: 8,
                          padding: '4px 10px', fontSize: 11, color: 'white',
                        }}>
                          Click to change
                        </div>
                      </>
                    ) : (
                      <div style={{ color: 'var(--text-muted)' }}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ display: 'block', margin: '0 auto 8px' }}>
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="17 8 12 3 7 8" />
                          <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                        <div style={{ fontSize: 13, fontWeight: 500 }}>Click to upload image</div>
                        <div style={{ fontSize: 11, marginTop: 4 }}>PNG, JPG, GIF up to 5MB</div>
                      </div>
                    )}
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                </div>
              </>
            ) : (
              <>
                {/* Community raffle: token picker */}
                <div>
                  <label style={labelStyle}>Select token</label>
                  <div style={{ position: 'relative' }}>
                    <button
                      onClick={() => setShowTokenPicker(!showTokenPicker)}
                      style={{
                        ...inputStyle,
                        display: 'flex', alignItems: 'center', gap: 10,
                        cursor: 'pointer', textAlign: 'left',
                        justifyContent: 'space-between',
                      }}
                    >
                      {selectedToken ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          {tokenLogo ? (
                            <img src={tokenLogo} alt="" style={{ width: 24, height: 24, borderRadius: '50%' }} />
                          ) : (
                            <TokenFallbackIcon symbol={selectedToken.symbol} size={24} />
                          )}
                          <span style={{ fontWeight: 600 }}>{selectedToken.symbol}</span>
                          <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>{selectedToken.name}</span>
                        </div>
                      ) : (
                        <span style={{ color: 'var(--text-muted)' }}>Choose a token...</span>
                      )}
                      <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>▼</span>
                    </button>

                    {showTokenPicker && (
                      <div style={{
                        position: 'absolute', top: '100%', left: 0, right: 0,
                        background: 'var(--card-bg)',
                        border: '1px solid var(--card-border)',
                        borderRadius: 12, marginTop: 4,
                        zIndex: 50, maxHeight: 280, overflow: 'auto',
                        animation: 'scaleIn 0.15s ease',
                      }}>
                        {POPULAR_TOKENS.map(token => {
                          const logo = getTokenLogo(token.symbol);
                          return (
                            <button
                              key={token.symbol}
                              onClick={() => selectToken(token)}
                              style={{
                                width: '100%', padding: '10px 14px',
                                background: 'transparent', border: 'none',
                                display: 'flex', alignItems: 'center', gap: 10,
                                cursor: 'pointer', transition: 'background 0.15s',
                                color: 'var(--text-primary)', textAlign: 'left',
                              }}
                              onMouseEnter={e => e.currentTarget.style.background = 'var(--surface)'}
                              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                            >
                              {logo ? (
                                <img src={logo} alt="" style={{ width: 28, height: 28, borderRadius: '50%' }} />
                              ) : (
                                <TokenFallbackIcon symbol={token.symbol} size={28} />
                              )}
                              <div>
                                <div style={{ fontSize: 14, fontWeight: 600 }}>{token.symbol}</div>
                                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{token.name}</div>
                              </div>
                            </button>
                          );
                        })}
                        <div style={{ padding: '8px 14px', borderTop: '1px solid var(--card-border)' }}>
                          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                            Don't see your token? Enter the address below
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Token contract address</label>
                  <input
                    placeholder="0x... (auto-filled or enter custom)"
                    value={form.customTokenAddress}
                    onChange={e => {
                      update('customTokenAddress', e.target.value);
                      setSelectedToken(null);
                    }}
                    style={{ ...inputStyle, fontFamily: 'var(--font-mono)' }}
                    onFocus={e => e.target.style.borderColor = 'var(--avax-red)'}
                    onBlur={e => e.target.style.borderColor = 'var(--card-border)'}
                  />
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4, display: 'block' }}>
                    Leave blank to raffle native AVAX
                  </span>
                </div>

                <div>
                  <label style={labelStyle}>Amount to raffle</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      placeholder="e.g. 500"
                      type="number"
                      value={form.tokenAmount}
                      onChange={e => update('tokenAmount', e.target.value)}
                      style={{ ...inputStyle, paddingRight: selectedToken ? 70 : 14 }}
                      onFocus={e => e.target.style.borderColor = 'var(--avax-red)'}
                      onBlur={e => e.target.style.borderColor = 'var(--card-border)'}
                    />
                    {selectedToken && (
                      <span style={{
                        position: 'absolute', right: 14, top: '50%',
                        transform: 'translateY(-50%)',
                        fontSize: 13, fontWeight: 600, color: 'var(--text-muted)',
                      }}>
                        {selectedToken.symbol}
                      </span>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Shared fields */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={labelStyle}>Ticket price (AVAX)</label>
                <input
                  placeholder="0.5"
                  type="number" step="0.01" min="0.01"
                  value={form.ticketPrice}
                  onChange={e => update('ticketPrice', e.target.value)}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'var(--avax-red)'}
                  onBlur={e => e.target.style.borderColor = 'var(--card-border)'}
                />
              </div>
              <div>
                <label style={labelStyle}>Total tickets</label>
                <input
                  placeholder="500"
                  type="number" min="10" max="10000"
                  value={form.totalTickets}
                  onChange={e => update('totalTickets', e.target.value)}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'var(--avax-red)'}
                  onBlur={e => e.target.style.borderColor = 'var(--card-border)'}
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Duration</label>
              <select
                value={form.duration}
                onChange={e => update('duration', e.target.value)}
                style={{
                  ...inputStyle, appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%238B95A5' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 14px center',
                  paddingRight: 36,
                }}
              >
                <option value="6">6 hours</option>
                <option value="12">12 hours</option>
                <option value="24">24 hours</option>
                <option value="48">48 hours</option>
                <option value="72">3 days</option>
                <option value="168">7 days</option>
                <option value="240">10 days</option>
                <option value="336">14 days</option>
              </select>
            </div>

            <button style={{
              width: '100%', padding: '14px 0', borderRadius: 12,
              border: 'none',
              background: 'linear-gradient(135deg, var(--avax-red), var(--avax-red-dark))',
              color: 'white', fontSize: 15, fontWeight: 700,
              cursor: 'pointer', marginTop: 4, letterSpacing: 0.5,
            }}
              onMouseEnter={e => e.target.style.transform = 'scale(1.02)'}
              onMouseLeave={e => e.target.style.transform = 'scale(1)'}
            >
              {isConnected ? 'Create raffle' : 'Connect wallet to create'}
            </button>
          </div>
        </div>

        {/* Right side: Preview + Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Preview */}
          <div style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: 20, padding: 24,
          }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Preview
            </h3>

            <div style={{
              background: raffleType === 'crypto'
                ? 'linear-gradient(145deg, #1a1225, #0f1a20)'
                : 'linear-gradient(145deg, var(--dark-bg), var(--surface))',
              borderRadius: 14, height: 180,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 16, border: '1px solid var(--card-border)',
              overflow: 'hidden',
            }}>
              {raffleType === 'avalanche' ? (
                imagePreview ? (
                  <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ color: 'var(--text-muted)', textAlign: 'center' }}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ display: 'block', margin: '0 auto 8px' }}>
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M21 15l-5-5L5 21" />
                    </svg>
                    <span style={{ fontSize: 12 }}>Upload an image to preview</span>
                  </div>
                )
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                  {selectedToken && tokenLogo ? (
                    <img src={tokenLogo} alt="" style={{ width: 64, height: 64, borderRadius: '50%' }} />
                  ) : selectedToken ? (
                    <TokenFallbackIcon symbol={selectedToken.symbol} size={64} />
                  ) : (
                    <span style={{ fontSize: 48 }}>💰</span>
                  )}
                  {selectedToken && form.tokenAmount && (
                    <span style={{
                      fontSize: 14, fontWeight: 600,
                      color: 'var(--accent-teal)',
                      fontFamily: 'var(--font-mono)',
                    }}>
                      {Number(form.tokenAmount).toLocaleString()} {selectedToken.symbol}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>Ticket price</div>
                <div style={{ fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <AvaxLogo size={14} /> {form.ticketPrice || '—'} AVAX
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>Total tickets</div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{form.totalTickets || '—'}</div>
              </div>
            </div>

            {form.ticketPrice && form.totalTickets && (
              <div style={{
                background: 'var(--surface)', borderRadius: 10, padding: '12px 14px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Max revenue</span>
                <span style={{
                  fontSize: 16, fontWeight: 700, color: 'var(--accent-teal)',
                  fontFamily: 'var(--font-mono)',
                  display: 'flex', alignItems: 'center', gap: 4,
                }}>
                  <AvaxLogo size={14} />
                  {(Number(form.ticketPrice) * Number(form.totalTickets)).toFixed(2)} AVAX
                </span>
              </div>
            )}
          </div>

          {/* How it works */}
          <div style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: 20, padding: 24,
          }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              {raffleType === 'avalanche' ? 'How Avalanche raffles work' : 'How community raffles work'}
            </h3>
            {(raffleType === 'avalanche' ? [
              { step: '1', text: 'Approve your NFT for the raffle contract' },
              { step: '2', text: 'Upload an image and set raffle details' },
              { step: '3', text: 'Your NFT is escrowed in the smart contract' },
              { step: '4', text: 'Once sold out or time expires, Chainlink VRF draws the winner' },
              { step: '5', text: 'Winner receives the NFT, you receive the AVAX' },
            ] : [
              { step: '1', text: 'Select the token you want to raffle' },
              { step: '2', text: 'Approve and deposit tokens into escrow' },
              { step: '3', text: 'Tokens are locked in the smart contract until the draw' },
              { step: '4', text: 'Once sold out or time expires, Chainlink VRF draws the winner' },
              { step: '5', text: 'Winner receives the tokens, you receive the AVAX from ticket sales' },
            ]).map(item => (
              <div key={item.step} style={{
                display: 'flex', gap: 12, alignItems: 'flex-start',
                padding: '10px 0', borderBottom: '1px solid var(--card-border)',
              }}>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%',
                  background: 'rgba(232,65,66,0.12)',
                  color: 'var(--avax-red)',
                  fontSize: 12, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, marginTop: 1,
                }}>
                  {item.step}
                </div>
                <span style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          {/* Fees */}
          <div style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: 20, padding: 24,
          }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Platform fees
            </h3>
            {[
              { label: 'Raffle creation', value: 'Free', color: 'var(--accent-teal)' },
              { label: 'Platform fee', value: '2.5%', color: 'var(--text-primary)' },
              { label: 'Winner receives', value: raffleType === 'avalanche' ? 'NFT (100%)' : 'Tokens (100%)', color: 'var(--text-primary)' },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{row.label}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: row.color }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
