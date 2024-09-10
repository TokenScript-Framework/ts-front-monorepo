import { CacheService } from "@/utils/cache";
import { ITokenScript } from "@tokenscript/engine-js/lite";

const tsCache = new CacheService<ITokenScript>();

export function getTsCache(scriptURI: string) {
  return tsCache.get(cacheKey(scriptURI));
}

export function setTsCache(scriptURI: string, ts: ITokenScript) {
  //with an additional randomness of ~0 to 60s to avoid cache stampede
  const ttl: number = (5 * 60 + Math.floor(Math.random() * 60)) * 1000; //5 = 5 minutes
  tsCache.set(cacheKey(scriptURI), ts, ttl);
}

export function invalidateTsCache(scriptURI: string) {
  tsCache.invalidate(cacheKey(scriptURI));
}

function cacheKey(scriptURI: string) {
  return `ts-${scriptURI}`;
}
