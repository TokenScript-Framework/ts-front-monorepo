// This is a temporary storage before the storage package is ready
export function addToken(address: string, type: TokenType, tokenInfo: Token) {
  const tokenList = loadTokenList(address);
  const collection = tokenList[type].find(
    (c) => c.chainId === tokenInfo.chainId && c.address === tokenInfo.address,
  );
  if (collection) {
    if (tokenInfo.tokenId) {
      collection.tokenIds = collection.tokenIds || [];
      collection.tokenIds.push(tokenInfo.tokenId);
    }
  } else {
    const { tokenId, ...rest } = tokenInfo;
    tokenList[type] = [
      ...tokenList[type],
      { ...rest, tokenIds: tokenId ? [tokenId] : undefined },
    ];
  }

  localStorage.setItem(`ste_tokenList_${address}`, JSON.stringify(tokenList));
}

export function loadTokenList(
  address: string,
): Record<TokenType, TokenCollection[]> {
  const tokenList = localStorage.getItem(`ste_tokenList_${address}`);
  return tokenList
    ? JSON.parse(tokenList)
    : { ERC20: [], ERC721: [], ERC1155: [] };
}

export type TokenType = "ERC20" | "ERC721" | "ERC1155";

export type TokenCollection = {
  signed: boolean;
  chainId: number;
  address: string;
  tokenIds?: string[];
};

export type Token = {
  signed: boolean;
  chainId: number;
  address: string;
  tokenId?: string;
};
