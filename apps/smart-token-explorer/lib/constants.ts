import { TokenType } from "./tokenStorage";

export const TOKENTYPE_LIST: TokenType[] = ["ERC20", "ERC721", "ERC1155"];
export const getTokenListRoot = (href: string) => {
  return href.includes("localhost")
    ? "https://smart-token-list-website.vercel.app/"
    : "https://tokens.tokenscript.org/";
};

export const defaultLayout = [265, 340, 655];
export const NEXT_PUBLIC_VIEWER_ROOT = "https://viewer.tokenscript.org";
