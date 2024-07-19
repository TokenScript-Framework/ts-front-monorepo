import { CacheService } from "../../utils/cache";

const tsValidationCache = new CacheService<boolean>();

export function getTsValidationCache(scriptURI: string) {
  return tsValidationCache.get(cacheKey(scriptURI));
}

export function setTsValidationCache(scriptURI: string, isValid: boolean) {
  //with an additional randomness of ~0 to 60s to avoid cache stampede
  const ttl: number = (5 * 60 + Math.floor(Math.random() * 60)) * 1000; //5 = 5 minutes
  tsValidationCache.set(cacheKey(scriptURI), isValid, ttl);
}

export function invalidateTsValidationCache(scriptURI: string) {
  tsValidationCache.invalidate(cacheKey(scriptURI));
}

function cacheKey(scriptURI: string) {
  return `ts-validation-${scriptURI}`;
}
