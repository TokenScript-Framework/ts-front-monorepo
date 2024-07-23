// This is a temporary storage before the storage package is ready
export function addToken(address: string, type: TokenType, tokenInfo: Token) {
  const tokenList = loadTokenList(address);
  tokenList[type] = [...tokenList[type], tokenInfo];

  localStorage.setItem(`ste_tokenList_${address}`, JSON.stringify(tokenList));
}

export function loadTokenList(address: string): Record<TokenType, Token[]> {
  const tokenList = localStorage.getItem(`ste_tokenList_${address}`);
  return tokenList
    ? JSON.parse(tokenList)
    : { ERC20: [], ERC721: [], ERC1155: [] };
}

export type TokenType = "ERC20" | "ERC721" | "ERC1155";

export type Token = {
  signed: boolean;
  chainId: number;
  address: string;
  tokenId?: string;
};
