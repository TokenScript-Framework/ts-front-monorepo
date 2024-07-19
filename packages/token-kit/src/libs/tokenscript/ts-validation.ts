import axios from "axios";
import { getERC5169ScriptURISingle } from "../ethereum";
import { DSigValidator } from "./dsig-validator";
import { getTokenscriptCache, setTokenscriptCache } from "./tokenscript-cache";
import { TrustedKeyResolver } from "./trusted-key-resolver";

export async function isTokenscriptValid(
  chainId: number,
  contract: `0x${string}`,
) {
  const scriptURIs = await getERC5169ScriptURISingle(chainId, contract);

  if (scriptURIs === "not implemented" || !scriptURIs[0]) return false;

  try {
    const tsXml = await fetchTokenscript(scriptURIs[0]);
    const result = await new DSigValidator().getSignerKey(tsXml);

    if (result === false) return false;

    const keyResolver = new TrustedKeyResolver();
    const trustedKey = keyResolver.getTrustedPublicKey(
      result.authoritiveKey,
      result.signingKey,
    );

    return !!trustedKey;
  } catch {
    return false;
  }
}

async function fetchTokenscript(scriptURI: string) {
  const tokenscript = getTokenscriptCache(scriptURI);
  if (tokenscript) return tokenscript;

  const result = (await axios.get(scriptURI)).data;
  setTokenscriptCache(scriptURI, result);

  return result;
}
