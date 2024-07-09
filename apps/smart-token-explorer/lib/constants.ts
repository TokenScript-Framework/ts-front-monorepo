import { connectorsForWallets } from "@rainbow-me/rainbowkit"
import { coinbaseWallet, rainbowWallet, safeWallet } from "@rainbow-me/rainbowkit/wallets"
import { sepolia, baseSepolia, mainnet } from "wagmi/chains"

export const TOKENTYPE_LIST = ['ERC20', 'ERC721', 'ERC1155']
export const SETTING_LIST = ['Chains', 'Dev Mode']
export const DEFAULT_CHAINS = [sepolia, baseSepolia]
export const CHAINS_LIST = [sepolia, baseSepolia, mainnet]
