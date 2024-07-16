import axios from "axios";
import { getERC5169ScriptURISingle } from "../ethereum";
import { DSigValidator } from "./dsig-validator";
import { TrustedKeyResolver } from "./trusted-key-resolver";

export async function isTokenscriptValid(
  chainId: number,
  contract: `0x${string}`,
) {
  const scriptURIs = await getERC5169ScriptURISingle(chainId, contract);

  if (scriptURIs === "not implemented" || !scriptURIs[0]) return false;

  const tsXml = (await axios.get(scriptURIs[0])).data;
  const result = await new DSigValidator().getSignerKey(tsXml);

  if (result === false) return false;

  const keyResolver = new TrustedKeyResolver();
  const trustedKey = keyResolver.getTrustedPublicKey(
    result.authoritiveKey,
    result.signingKey,
  );

  return !!trustedKey;
}
