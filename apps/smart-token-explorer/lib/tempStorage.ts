// This is a temporary storage before the storage package is ready
export function addToken(
  address: string,
  type: TokenType,
  chainId: number,
  contract: string,
  tokenId?: string,
) {
  const tokenList = loadTokenList(address);
  tokenList[type] = [...tokenList[type], { chainId, contract, tokenId }];

  localStorage.setItem(`ste_tokenList_${address}`, JSON.stringify(tokenList));
}

export function loadTokenList(address: string) {
  const tokenList = localStorage.getItem(`ste_tokenList_${address}`);
  return tokenList
    ? JSON.parse(tokenList)
    : { ERC20: [], ERC721: [], ERC1155: [] };
}

export type TokenType = "ERC20" | "ERC721" | "ERC1155"