export interface ChainsData {
  name: string;
  chain: string;
  icon?: string;
  title?: string;
  rpc: string[];
  apiURL?: string;
  browserURL?: string;
  features?: { name: string }[];
  faucets?: string[];
  nativeCurrency: { name: string; symbol: string; decimals: number };
  infoURL?: string;
  shortName?: string;
  chainId: number;
  networkId: number;
  slip44?: number;
  status?: string;
  ens?: { registry: string };
  explorers?: {
    name: string;
    url: string;
    icon?: string;
    standard: string;
  }[];
  parent?: {
    type: string;
    chain: string;
    bridges?: { url: string }[];
  };
  redFlags?: string[];
}

export const chainsData: ChainsData[] = [
  {
    name: "Ethereum Mainnet",
    chain: "ETH",
    icon: "ethereum",
    rpc: [
      "https://mainnet.infura.io/v3/${INFURA_API_KEY}",
      "wss://mainnet.infura.io/ws/v3/${INFURA_API_KEY}",
      "https://api.mycryptoapi.com/eth",
      "https://cloudflare-eth.com",
      "https://ethereum.publicnode.com",
      "wss://ethereum.publicnode.com",
      "https://mainnet.gateway.tenderly.co",
      "wss://mainnet.gateway.tenderly.co",
      "https://rpc.blocknative.com/boost",
      "https://rpc.flashbots.net",
      "https://rpc.flashbots.net/fast",
      "https://rpc.mevblocker.io",
      "https://rpc.mevblocker.io/fast",
      "https://rpc.mevblocker.io/noreverts",
      "https://rpc.mevblocker.io/fullprivacy",
    ],
    apiURL: "https://api.etherscan.io/api",
    browserURL: "https://etherscan.io",
    features: [{ name: "EIP155" }, { name: "EIP1559" }],
    faucets: [],
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    infoURL: "https://ethereum.org",
    shortName: "eth",
    chainId: 1,
    networkId: 1,
    slip44: 60,
    ens: { registry: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e" },
    explorers: [
      {
        name: "etherscan",
        url: "https://etherscan.io",
        standard: "EIP3091",
      },
      {
        name: "blockscout",
        url: "https://eth.blockscout.com",
        icon: "blockscout",
        standard: "EIP3091",
      },
      {
        name: "dexguru",
        url: "https://ethereum.dex.guru",
        icon: "dexguru",
        standard: "EIP3091",
      },
    ],
  },
  {
    name: "Sepolia",
    title: "Ethereum Testnet Sepolia",
    chain: "ETH",
    rpc: [
      "https://rpc.sepolia.org",
      "https://rpc2.sepolia.org",
      "https://rpc-sepolia.rockx.com",
      "https://rpc.sepolia.ethpandaops.io",
      "https://sepolia.infura.io/v3/${INFURA_API_KEY}",
      "wss://sepolia.infura.io/v3/${INFURA_API_KEY}",
      "https://sepolia.gateway.tenderly.co",
      "wss://sepolia.gateway.tenderly.co",
      "https://ethereum-sepolia.publicnode.com",
      "wss://ethereum-sepolia.publicnode.com",
    ],
    apiURL: "https://api-sepolia.etherscan.io/api",
    browserURL: "https://sepolia.etherscan.io",
    faucets: ["http://fauceth.komputing.org?chain=11155111&address=${ADDRESS}"],
    nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
    infoURL: "https://sepolia.otterscan.io",
    shortName: "sep",
    chainId: 11155111,
    networkId: 11155111,
    explorers: [
      {
        name: "etherscan-sepolia",
        url: "https://sepolia.etherscan.io",
        standard: "EIP3091",
      },
      {
        name: "otterscan-sepolia",
        url: "https://sepolia.otterscan.io",
        standard: "EIP3091",
      },
    ],
  },
  {
    name: "Polygon Mainnet",
    chain: "Polygon",
    icon: "polygon",
    rpc: [
      "https://polygon-rpc.com/",
      "https://rpc-mainnet.matic.network",
      "https://matic-mainnet.chainstacklabs.com",
      "https://rpc-mainnet.maticvigil.com",
      "https://rpc-mainnet.matic.quiknode.pro",
      "https://matic-mainnet-full-rpc.bwarelabs.com",
      "https://polygon-bor.publicnode.com",
      "wss://polygon-bor.publicnode.com",
      "https://polygon.gateway.tenderly.co",
      "wss://polygon.gateway.tenderly.co",
    ],
    apiURL: "https://api.polygonscan.com/api",
    browserURL: "https://polygonscan.com",
    faucets: [],
    nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
    infoURL: "https://polygon.technology/",
    shortName: "matic",
    chainId: 137,
    networkId: 137,
    slip44: 966,
    explorers: [
      {
        name: "polygonscan",
        url: "https://polygonscan.com",
        standard: "EIP3091",
      },
      {
        name: "dexguru",
        url: "https://polygon.dex.guru",
        icon: "dexguru",
        standard: "EIP3091",
      },
    ],
  },
  {
    name: "Klaytn Mainnet Cypress",
    chain: "KLAY",
    rpc: ["https://klaytn-pokt.nodies.app"],
    faucets: [],
    nativeCurrency: { name: "KLAY", symbol: "KLAY", decimals: 18 },
    infoURL: "https://www.klaytn.com/",
    shortName: "Cypress",
    chainId: 8217,
    networkId: 8217,
    slip44: 8217,
    explorers: [
      {
        name: "Klaytnscope",
        url: "https://scope.klaytn.com",
        standard: "none",
      },
    ],
  },
  {
    name: "Klaytn Testnet Baobab",
    chain: "KLAY",
    rpc: ["https://public-en-baobab.klaytn.net"],
    faucets: ["https://baobab.wallet.klaytn.com/access?next=faucet"],
    nativeCurrency: { name: "KLAY", symbol: "KLAY", decimals: 18 },
    infoURL: "https://www.klaytn.com/",
    shortName: "Baobab",
    chainId: 1001,
    networkId: 1001,
    explorers: [
      {
        name: "klaytnscope",
        url: "https://baobab.klaytnscope.com/",
        standard: "EIP3091",
      },
    ],
  },
  {
    name: "Mint Mainnet",
    chain: "ETH",
    rpc: ["https://rpc.mintchain.io"],
    faucets: [],
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    infoURL: "https://www.mintchain.io/",
    shortName: "Mint",
    chainId: 185,
    networkId: 185,
    slip44: 185,
    explorers: [
      {
        name: "Block Explorer",
        url: "https://explorer.mintchain.io",
        standard: "none",
      },
    ],
  },
  {
    name: "Mint Sepolia Testnet",
    chain: "ETH",
    rpc: ["https://sepolia-testnet-rpc.mintchain.io"],
    faucets: [],
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    infoURL: "https://www.mintchain.io/",
    shortName: "MintSepolia",
    chainId: 1687,
    networkId: 1687,
    explorers: [
      {
        name: "Block Explorer",
        url: "https://sepolia-testnet-explorer.mintchain.io",
        standard: "EIP3091",
      },
    ],
  },
  {
    name: "Holesky",
    chain: "ETH",
    rpc: [
      "https://rpc.holesky.ethpandaops.io",
      "https://ethereum-holesky.publicnode.com",
      "wss://ethereum-holesky.publicnode.com",
    ],
    faucets: [
      "https://faucet.holesky.ethpandaops.io",
      "https://holesky-faucet.pk910.de",
    ],
    nativeCurrency: { name: "Testnet ETH", symbol: "ETH", decimals: 18 },
    infoURL: "https://holesky.ethpandaops.io",
    shortName: "holesky",
    chainId: 17000,
    networkId: 17000,
    icon: "ethereum",
    status: "incubating",
    explorers: [
      {
        name: "Holesky Explorer",
        url: "https://holesky.beaconcha.in",
        icon: "ethereum",
        standard: "EIP3091",
      },
      {
        name: "otterscan-holesky",
        url: "https://holesky.otterscan.io",
        icon: "ethereum",
        standard: "EIP3091",
      },
      {
        name: "Holesky Etherscan",
        url: "https://holesky.etherscan.io",
        icon: "ethereum",
        standard: "EIP3091",
      },
    ],
  },
  {
    name: "Mantle",
    chain: "ETH",
    icon: "mantle",
    rpc: [
      "https://rpc.mantle.xyz",
      "https://mantle.publicnode.com",
      "wss://mantle.publicnode.com",
    ],
    faucets: [],
    nativeCurrency: { name: "Mantle", symbol: "MNT", decimals: 18 },
    infoURL: "https://mantle.xyz",
    shortName: "mantle",
    chainId: 5000,
    networkId: 5000,
    explorers: [
      {
        name: "Mantle Explorer",
        url: "https://explorer.mantle.xyz",
        standard: "EIP3091",
      },
    ],
    parent: {
      type: "L2",
      chain: "eip155-1",
      bridges: [{ url: "https://bridge.mantle.xyz" }],
    },
  },
  {
    name: "Mantle Sepolia Testnet",
    chain: "ETH",
    rpc: ["https://rpc.sepolia.mantle.xyz"],
    faucets: ["https://faucet.sepolia.mantle.xyz"],
    nativeCurrency: { name: "Sepolia Mantle", symbol: "MNT", decimals: 18 },
    infoURL: "https://mantle.xyz",
    shortName: "mnt-sep",
    chainId: 5003,
    networkId: 5003,
    explorers: [
      {
        name: "blockscout",
        url: "https://explorer.sepolia.mantle.xyz",
        standard: "EIP3091",
      },
    ],
  },
  {
    name: "Base",
    chain: "ETH",
    rpc: [
      "https://mainnet.base.org/",
      "https://developer-access-mainnet.base.org/",
      "https://base.gateway.tenderly.co",
      "wss://base.gateway.tenderly.co",
      "https://base.publicnode.com",
      "wss://base.publicnode.com",
    ],
    apiURL: "https://api.basescan.org/api",
    browserURL: "https://basescan.org/",
    faucets: [],
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    infoURL: "https://base.org",
    shortName: "base",
    chainId: 8453,
    networkId: 8453,
    icon: "base",
    explorers: [
      { name: "basescan", url: "https://basescan.org", standard: "none" },
      {
        name: "basescout",
        url: "https://base.blockscout.com",
        icon: "blockscout",
        standard: "EIP3091",
      },
      {
        name: "dexguru",
        url: "https://base.dex.guru",
        icon: "dexguru",
        standard: "EIP3091",
      },
    ],
    status: "active",
  },
  {
    name: "Base Sepolia Testnet",
    chain: "ETH",
    rpc: ["https://sepolia.base.org"],
    faucets: [],
    nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
    infoURL: "https://base.org",
    shortName: "basesep",
    chainId: 84532,
    networkId: 84532,
    icon: "baseTestnet",
    explorers: [
      {
        name: "basescout",
        url: "https://base-sepolia.blockscout.com",
        icon: "blockscout",
        standard: "EIP3091",
      },
    ],
  },
];
