import { atom } from "jotai"
import { DEFAULT_CHAINS } from "./constants"
export const chainsAtom = atom<any>([])
export const getChainsAtom = atom((get) => get(chainsAtom))

export const setChainsAtom = atom(
  null,
  async (get, set, chains: [] ) => {
        set(chainsAtom, chains)
  }
)
