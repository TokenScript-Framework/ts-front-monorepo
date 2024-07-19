import axios from "axios";
import { getERC5169ScriptURISingle } from "../ethereum";
import { DSigValidator } from "./dsig-validator";
import { TrustedKeyResolver } from "./trusted-key-resolver";
import {
  getTsValidationCache,
  setTsValidationCache,
} from "./ts-validation-cache";

export async function isTokenscriptValid(
  chainId: number,
  contract: `0x${string}`,
  index = 0,
) {
  const scriptURIs = await getERC5169ScriptURISingle(chainId, contract);
  const scriptURI = scriptURIs[index];
  if (scriptURIs === "not implemented" || !scriptURI) return false;

  const cachedResult = getTsValidationCache(scriptURI);
  if (cachedResult !== null) return cachedResult;

  try {
    const tsXml = (await axios.get(scriptURI)).data;
    const result = await new DSigValidator().getSignerKey(tsXml);
    if (result === false) return false;

    const keyResolver = new TrustedKeyResolver();
    const trustedKey = keyResolver.getTrustedPublicKey(
      result.authoritiveKey,
      result.signingKey,
    );

    const isValid = !!trustedKey;
    setTsValidationCache(scriptURI, isValid);

    return isValid;
  } catch {
    return false;
  }
}
