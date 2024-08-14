import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { Token, TokenCollection, TokenType } from "./tokenStorage";
export const chainsAtom = atom<any>([]);
export const getChainsAtom = atom((get) => get(chainsAtom));

export const setChainsAtom = atom(null, async (get, set, chains: []) => {
  set(chainsAtom, chains);
});

export const tokenTypeAtom = atomWithStorage<string>("tokenType", "");
export const getTokenTypeAtom = atom((get) => get(tokenTypeAtom));

export const setTokenTypeAtom = atom(null, async (get, set, type: string) => {
  set(tokenTypeAtom, type);
});

export const devModeAtom = atomWithStorage<boolean>("devMode", true);
export const getDevModeAtom = atom((get) => get(devModeAtom));
export const setDevModeAtom = atom(null, async (get, set, mode: boolean) => {
  set(devModeAtom, mode);
});
export const TokenList = {
  ERC20: [],
  ERC721: [],
  ERC1155: [],
};

export const tokenListAtom =
  atom<Record<TokenType, TokenCollection[]>>(TokenList);

export const tokenAtom = atomWithStorage<any>("token", {});
export const getTokenAtom = atom((get) => get(tokenAtom));
export const setTokenAtom = atom(null, async (get, set, token: Token) => {
  set(tokenAtom, token);
});

export const tokenIdAtom = atomWithStorage<string>("tokenId", "");
export const getTokenIdAtom = atom((get) => get(tokenIdAtom));
export const setTokenIdAtom = atom(null, async (get, set, id: string) => {
  set(tokenIdAtom, id);
});
