import { TokenCollection, TokenType } from "./tokenStorage";

export const TOKENTYPE_LIST: TokenType[] = ["ERC20", "ERC721", "ERC1155"];
export const getTokenListRoot = (href: string) => {
  return href.includes("localhost")
    ? "https://smart-token-list-website.vercel.app/"
    : "https://tokens.tokenscript.org/";
};

export const defaultLayout = [265, 340, 655];
export const NEXT_PUBLIC_VIEWER_ROOT = "https://viewer.tokenscript.org";

export const testList = {
  ERC20: [
    {
      signed: true,
      address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      chainId: 1,
      name: "USDC",
    },
    {
      signed: true,
      address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      chainId: 1,
      name: "USDT",
    },
  ],
  ERC721: [
    {
      signed: false,
      address: "0x3490ffc64a4e65abb749317f7860e722ba65a2b5" as `0x${string}`,
      chainId: 11155111,
      tokenIds: ["2665409553", "2665409554"],
      name: "SmartCat",
    },
    {
      signed: false,
      address: "0x3490ffc64a4e65abb749317f7860e722ba65a2b4" as `0x${string}`,
      chainId: 1,
      tokenIds: ["2665409554"],
      name: "SmartCat",
    },
  ],
  ERC1155: [
    {
      signed: false,
      address: "0x73da73ef3a6982109c4d5bdb0db9dd3e3783f313" as `0x${string}`,
      chainId: 1,
      tokenIds: ["1", "2"],
      name: "Test",
    },
  ],
};

export const EMPTY_TOKEN: TokenCollection = {
  signed: false,
  address: "" as `0x${string}`,
  chainId: 0,
  name: "",
};
