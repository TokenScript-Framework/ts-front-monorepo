import { CacheService } from "../../utils/cache";

const tokenscriptCache = new CacheService<string>();

export function getTokenscriptCache(scriptURI: string) {
  return tokenscriptCache.get(cacheKey(scriptURI));
}

export function setTokenscriptCache(scriptURI: string, tokenscript: string) {
  //with an additional randomness of ~0 to 60s to avoid cache stampede
  const ttl: number = (5 * 60 + Math.floor(Math.random() * 60)) * 1000; //5 = 5 minutes
  tokenscriptCache.set(cacheKey(scriptURI), tokenscript, ttl);
}

export function invalidateERC5169ScriptURICache(scriptURI: string) {
  tokenscriptCache.invalidate(cacheKey(scriptURI));
}

function cacheKey(scriptURI: string) {
  return `tokenscript-${scriptURI}`;
}
