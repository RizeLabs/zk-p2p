import { SendNetworkType, SendNetwork } from "./";


export const ReceiveToken = {
  USDC: "USDC",
  USDT: "USDT",
  ETH: "ETH",
} as const;

export const receiveTokens = [
  ReceiveToken.USDC,
  ReceiveToken.USDT,
  ReceiveToken.ETH
];

export type ReceiveTokenType = keyof typeof ReceiveToken;

export const networkSupportedTokens: Record<SendNetworkType, ReceiveTokenType[]> = {
  [SendNetwork.ARBITRUM]: [
    ReceiveToken.USDC,
    ReceiveToken.ETH
  ],
  [SendNetwork.AVALANCHE]: [
    ReceiveToken.USDC,
    ReceiveToken.USDT
  ],
  [SendNetwork.BASE]: [
    ReceiveToken.USDC,
    ReceiveToken.ETH
  ],
  [SendNetwork.BINANCE]: [
    ReceiveToken.USDT
  ],
  [SendNetwork.ETHEREUM]: [
    ReceiveToken.USDC,
    ReceiveToken.USDT,
    ReceiveToken.ETH
  ],
  [SendNetwork.OPTIMISM]: [
    ReceiveToken.USDC,
    ReceiveToken.ETH
  ],
  [SendNetwork.POLYGON]: [
    ReceiveToken.USDC,
    ReceiveToken.USDT
  ],
  [SendNetwork.ZKSYNC]: [
    ReceiveToken.USDC,
    ReceiveToken.ETH
  ],
};

export type ReceiveTokenData = {
  address: string;
  symbol: string;
  decimals: number;
  name: string;
  logoURI: string;
};

export type ReceiveTokensMap = {
  [key in SendNetworkType]: { [key in ReceiveTokenType]?: ReceiveTokenData };
};

export const receiveTokenData: ReceiveTokensMap = {
  // Ethereum mainnet
  [SendNetwork.ETHEREUM]: {
    USDC: {
      "address": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      "symbol": "USDC",
      "decimals": 6,
      "name": "USD Coin",
      "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
    },
    USDT: {
      "address": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      "symbol": "USDT",
      "decimals": 6,
      "name": "USDT",
      "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png",
    },
    ETH: {
      "address": "0x0000000000000000000000000000000000000000",
      "symbol": "ETH",
      "decimals": 18,
      "name": "ETH",
      "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
    }
  },

  // Base
  [SendNetwork.BASE]: {
    USDC: {
      "address": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      "decimals": 6,
      "name": "USD Coin",
      "symbol": "USDC",
      "logoURI": "https://static.debank.com/image/coin/logo_url/usdc/e87790bfe0b3f2ea855dc29069b38818.png"
    },
    ETH: {
      "address": "0x0000000000000000000000000000000000000000",
      "decimals": 18,
      "name": "ETH",
      "symbol": "ETH",
      "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
    }
  },

  // Polygon
  [SendNetwork.POLYGON]: {
    USDC: {
      "address": "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
      "decimals": 6,
      "name": "USD Coin (Polygon)",
      "symbol": "USDC.e",
      "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
    },
    ETH: {
      "address": "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
      "decimals": 6,
      "name": "USDT",
      "symbol": "USDT",
      "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png",
    }
  },

  // Arbitrum
  [SendNetwork.ARBITRUM]: {
    USDC: {
      "address": "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      "decimals": 6,
      "name": "USD Coin",
      "symbol": "USDC",
      "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
    },
    ETH: {
      "address": "0x0000000000000000000000000000000000000000",
      "decimals": 18,
      "name": "ETH",
      "symbol": "ETH",
      "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
    },
  },

  // Optimism
  [SendNetwork.OPTIMISM]: {
    USDC: {
      "address": "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
      "symbol": "USDC.e",
      "decimals": 6,
      "name": "Bridged USD Coin",
      "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
    },
    ETH: {
      "address": "0x0000000000000000000000000000000000000000",
      "symbol": "ETH",
      "decimals": 18,
      "name": "ETH",
      "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
    }
  },

  // Binance Smart Chains
  [SendNetwork.BINANCE]: {
    USDT: {
      "address": "0x55d398326f99059fF775485246999027B3197955",
      "symbol": "USDT",
      "decimals": 18,
      "name": "USDT",
      "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png",
    }
  },

  // ZKSync
  [SendNetwork.ZKSYNC]: {
    USDC: {
      "address": "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4",
      "symbol": "USDC",
      "decimals": 6,
      "name": "USD Coin",
      "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
    },
    ETH: {
      "address": "0x0000000000000000000000000000000000000000",
      "symbol": "ETH",
      "decimals": 18,
      "name": "ETH",
      "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
    }
  },

  // Avalanche
  [SendNetwork.AVALANCHE]: {
    USDC: {
      "address": "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
      "symbol": "USDC",
      "decimals": 6,
      "name": "USD Coin",
      "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
    },
    USDT: {
      "address": "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
      "symbol": "USDt",
      "decimals": 6,
      "name": "TetherToken",
      "logoURI": "https://static.debank.com/image/coin/logo_url/usdt/23af7472292cb41dc39b3f1146ead0fe.png",
    }
  },
  
  // Solana
  // 'solana': {
  //   {
  //     "address": "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
  //     "symbol": "USDT",
  //     "decimals": 6,
  //     "name": "USDT",
  //     "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png",
  //   },
  //   {
  //     "address": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  //     "symbol": "USDC",
  //     "decimals": 6,
  //     "name": "USD Coin",
  //     "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
  //   }
  // }
};
