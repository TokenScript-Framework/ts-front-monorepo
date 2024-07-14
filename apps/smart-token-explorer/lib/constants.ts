import { sepolia, baseSepolia, mainnet, polygon, base, optimism } from "wagmi/chains"

export const TOKENTYPE_LIST = ['ERC20', 'ERC721', 'ERC1155']
export const TEST_CHAINS = [sepolia, baseSepolia]
export const MAIN_CHAINS = [mainnet, polygon, base, optimism]
export const getTokenListRoot = (href: string) => {
    return href.includes('localhost') ? 'https://smart-token-list-website.vercel.app/' : 'https://tokens.tokenscript.org/'
}
