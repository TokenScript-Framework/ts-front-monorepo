import { TokenKit } from "../../config";

export enum ChainID {
  ETHEREUM = 1,
  POLYGON = 137,
  ARBITRUM = 42161,
  OPTIMISM = 10,
  BSC = 56,
  BSC_TESTNET = 97,
  SEPOLIA = 11155111,
  HOLESKY = 17000,
  KOVAN = 42,
  AMOY = 80002,
  AVALANCH = 43114,
  FANTOM = 250,
  KLAYTN = 8217,
  BAOBAB = 1001,
  HARDHAT_LOCALHOST = 31337,
  MANTLE = 5000,
  MANTLE_SEPOLIA = 5003,
  BASE = 8453,
  BASE_SEPOLIA = 84532,
  BLAST = 81457,
  BLAST_SEPOLIA = 168587773,
  MINT = 185,
  MINT_SEPOLIA = 1687,
}

export const getChainConfig = () => ({
  [ChainID.ETHEREUM]: {
    rpc: `https://mainnet.infura.io/v3/${TokenKit.infuraApiKey}`,
    explorer: "https://etherscan.com/tx/",
  },
  [ChainID.SEPOLIA]: {
    rpc: `https://sepolia.infura.io/v3/${TokenKit.infuraApiKey}`,
    explorer: "https://sepolia.etherscan.io/tx/",
  },
  [ChainID.HOLESKY]: {
    rpc: `https://holesky.infura.io/v3/${TokenKit.infuraApiKey}`,
    explorer: "https://holesky.etherscan.io/tx/",
  },
  [ChainID.POLYGON]: {
    rpc: [
      `https://polygon-mainnet.infura.io/v3/${TokenKit.infuraApiKey}`,
      "https://polygon-rpc.com/",
      "https://rpc-mainnet.matic.quiknode.pro",
      /*"https://polygon-bor.publicnode.com",
			"https://polygon.gateway.tenderly.co"*/
    ],
    explorer: "https://polygonscan.com/tx/",
  },
  [ChainID.AMOY]: {
    rpc: `https://polygon-amoy.infura.io/v3/${TokenKit.infuraApiKey}`,
    explorer: "https://amoy.polygonscan.com/tx/",
  },
  [ChainID.BSC]: {
    rpc: "https://bsc-dataseed.binance.org/",
    explorer: "https://bscscan.com/tx/",
  },
  [ChainID.BSC_TESTNET]: {
    rpc: "https://data-seed-prebsc-1-s1.binance.org:8545",
    explorer: "https://testnet.bscscan.com/tx/",
  },
  [ChainID.AVALANCH]: {
    rpc: "https://api.avax.network/ext/bc/C/rpc",
    explorer: "https://cchain.explorer.avax.network/tx/",
  },
  [ChainID.FANTOM]: {
    rpc: "https://rpc.fantom.network/",
    explorer: "https://ftmscan.com/tx/",
  },
  [ChainID.ARBITRUM]: {
    rpc: "https://arb1.arbitrum.io/rpc",
    explorer: "https://arbiscan.io/tx/",
  },
  [ChainID.OPTIMISM]: {
    rpc: "https://mainnet.optimism.io",
    explorer: "https://optimistic.etherscan.io/tx/",
  },
  [ChainID.KLAYTN]: {
    rpc: [
      "https://public-en-cypress.klaytn.net",
      "https://rpc.ankr.com/klaytn",
      "https://klaytn-pokt.nodies.app",
      "https://1rpc.io/klay",
    ],
    explorer: "https://scope.klaytn.com/tx/",
  },
  [ChainID.BAOBAB]: {
    rpc: [
      "https://public-en-baobab.klaytn.net",
      "https://rpc.ankr.com/klaytn_testnet",
      "https://klaytn-baobab.blockpi.network/v1/rpc/public",
    ],
    explorer: "https://baobab.scope.klaytn.com/tx/",
  },
  [ChainID.HARDHAT_LOCALHOST]: {
    rpc: "http://127.0.0.1:8545/",
    explorer: "",
  },
  [ChainID.MANTLE]: {
    rpc: "https://rpc.mantle.xyz",
    explorer: "https://explorer.mantle.xyz/tx/",
  },
  [ChainID.MANTLE_SEPOLIA]: {
    rpc: "https://rpc.sepolia.mantle.xyz",
    explorer: "https://explorer.sepolia.mantle.xyz/tx/",
  },
  [ChainID.BASE]: {
    rpc: `https://base-mainnet.infura.io/v3/${TokenKit.infuraApiKey}`,
    explorer: "https://basescan.org/tx/",
  },
  [ChainID.BASE_SEPOLIA]: {
    rpc: `https://base-sepolia.infura.io/v3/${TokenKit.infuraApiKey}`,
    explorer: "https://sepolia.basescan.org/tx/",
  },
  [ChainID.BLAST]: {
    rpc: `https://blast-mainnet.infura.io/v3/${TokenKit.infuraApiKey}`,
    explorer: "https://basescan.org/tx/",
  },
  [ChainID.BLAST_SEPOLIA]: {
    rpc: `https://blast-sepolia.infura.io/v3/${TokenKit.infuraApiKey}`,
    explorer: "https://sepolia.basescan.org/tx/",
  },
  [ChainID.MINT]: {
    rpc: [
      "https://rpc.mintchain.io",
      "https://asia.rpc.mintchain.io",
      "https://global.rpc.mintchain.io",
    ],
    explorer: "https://explorer.mintchain.io/tx/",
  },
  [ChainID.MINT_SEPOLIA]: {
    rpc: `https://sepolia-testnet-rpc.mintchain.io`,
    explorer: "https://sepolia-testnet-explorer.mintchain.io/tx/",
  },
});
