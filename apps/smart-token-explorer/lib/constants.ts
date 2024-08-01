import { TokenType } from "./tokenStorage";

export const TOKENTYPE_LIST: TokenType[] = ["ERC20", "ERC721", "ERC1155"];
export const getTokenListRoot = (href: string) => {
  return href.includes("localhost")
    ? "https://smart-token-list-website.vercel.app/"
    : "https://tokens.tokenscript.org/";
};
