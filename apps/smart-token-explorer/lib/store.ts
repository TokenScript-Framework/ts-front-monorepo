import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { TokenCollection, TokenType } from "./tokenStorage";
export const chainsAtom = atom<any>([]);
export const getChainsAtom = atom((get) => get(chainsAtom));

export const setChainsAtom = atom(null, async (get, set, chains: []) => {
  set(chainsAtom, chains);
});

export const tokenTypeAtom = atom<string>("ERC20");
export const getTokenTypeAtom = atom((get) => get(tokenTypeAtom));

export const setTokenTypeAtom = atom(null, async (get, set, type: string) => {
  set(tokenTypeAtom, type);
});

export const devModeAtom = atomWithStorage<boolean>("devMode", true);
export const getDevModeAtom = atom((get) => get(devModeAtom));
export const setDevModeAtom = atom(null, async (get, set, mode: boolean) => {
  set(devModeAtom, mode);
});

export const tokenListAtom = atom<Record<TokenType, TokenCollection[]>>({
  ERC20: [],
  ERC721: [],
  ERC1155: [],
});
