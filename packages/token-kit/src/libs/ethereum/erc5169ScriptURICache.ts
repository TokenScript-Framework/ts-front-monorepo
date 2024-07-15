import { CacheService } from "../../utils/cache"

//We need the "not implemented" state to avoid too many cache misses because contracts don't implement ERC-5169
const eRC5169ScriptURICache = new CacheService<string[] | "not implemented">()

export function getERC5169ScriptURICache(contract: string, chainId: number) {
  return eRC5169ScriptURICache.get(cacheKey(contract, chainId))
}

export function setERC5169ScriptURICache(
  contract: string,
  chainId: number,
  scriptURI: string[] | "not implemented"
) {
  //with an additional randomness of ~0 to 60s to avoid cache stampede
  const ttl: number = (5 * 60 + Math.floor(Math.random() * 60)) * 1000 //5 = 5 minutes
  eRC5169ScriptURICache.set(cacheKey(contract, chainId), scriptURI, ttl)
}

export function invalidateERC5169ScriptURICache(
  contract: string,
  chainId: number
) {
  eRC5169ScriptURICache.invalidate(cacheKey(contract, chainId))
}

function cacheKey(contract: string, chainId: number) {
  return `is-erc5169-${contract.toLowerCase()}-${chainId}`
}