export const TOKEN_LOGOS = {
  AVAX: '/token-avax.png',
  JOE: 'https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/logos/0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd/logo.png',
  USDC: '/token-usdc.png',
  'USDC.e': '/token-usdc.png',
  USDT: '/token-usdt.png',
  'USDT.e': '/token-usdt.png',
  'WETH.e': 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=040',
  ETH: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=040',
  BTC: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=040',
  'BTC.b': 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=040',
  'WBTC.e': 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=040',
  PNG: '/token-png.png',
  COQ: '/token-coq.png',
  BLACKHOLE: '/token-blackhole.png',
  AAVE: 'https://cryptologos.cc/logos/aave-aave-logo.png?v=040',
  DAI: 'https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png?v=040',
};

export const POPULAR_TOKENS = [
  { symbol: 'AVAX', name: 'Avalanche', address: null },
  { symbol: 'USDC', name: 'USD Coin', address: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E' },
  { symbol: 'USDT', name: 'Tether', address: '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7' },
  { symbol: 'JOE', name: 'Trader Joe', address: '0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd' },
  { symbol: 'PNG', name: 'Pangolin', address: '0x60781C2586D68229fde47564546784ab3fACA982' },
  { symbol: 'COQ', name: 'Coq Inu', address: '0x420FcA0121DC28039145009570975747295f2329' },
  { symbol: 'BLACKHOLE', name: 'Blackhole', address: '0x0000000000000000000000000000000000000000' },
];

export function getTokenLogo(symbol) {
  if (!symbol) return null;
  const upper = symbol.toUpperCase();
  return TOKEN_LOGOS[upper] || null;
}

export function TokenFallbackIcon({ symbol, size = 48 }) {
  const colors = [
    '#E84142', '#2ECDA7', '#F5A623', '#6366F1',
    '#EC4899', '#14B8A6', '#F97316', '#8B5CF6',
  ];
  const idx = (symbol || '').charCodeAt(0) % colors.length;

  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: `${colors[idx]}20`,
      border: `2px solid ${colors[idx]}40`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: size * 0.4,
      fontWeight: 800,
      color: colors[idx],
      fontFamily: 'var(--font-mono)',
    }}>
      {(symbol || '?').slice(0, 2).toUpperCase()}
    </div>
  );
}
