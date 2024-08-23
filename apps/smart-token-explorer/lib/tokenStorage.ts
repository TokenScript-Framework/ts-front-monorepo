// This is a temporary storage before the storage package is ready
export function addToken(
  address: `0x${string}`,
  type: TokenType,
  tokenInfo: Token,
) {
  const tokenList = loadTokenList(address);
  const collection = tokenList[type].find(
    (c) => c.chainId === tokenInfo.chainId && c.address === tokenInfo.address,
  );
  if (collection) {
    if (tokenInfo.tokenId) {
      collection.tokenIds = collection.tokenIds || [];
      if (!collection.tokenIds.includes(tokenInfo.tokenId)) {
        collection.tokenIds.push(tokenInfo.tokenId);
      }
    }
  } else {
    const { tokenId, ...rest } = tokenInfo;
    tokenList[type] = [
      ...tokenList[type],
      { ...rest, tokenIds: tokenId ? [tokenId] : undefined },
    ];
  }

  localStorage.setItem(`ste_tokenList_${address}`, JSON.stringify(tokenList));
  return collection ? collection.tokenIds : [tokenInfo.tokenId];
}

export function loadTokenList(
  address: `0x${string}`,
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
  address: `0x${string}`;
  name: string;
  tokenIds?: string[];
  logoURI?: string;
};

export type Token = {
  signed: boolean;
  chainId: number;
  address: `0x${string}`;
  tokenId?: string;
  name: string;
  image?: string;
  logoURI?: string;
  balance?: number;
  decimals?: number;
  symbol?: string;
  notFound?: boolean;
};
