import axios from "axios";
import { getERC5169ScriptURISingle } from "../ethereum";
import { TokenScript } from "./engine-lite/tokenscript";
import { getTsCache, setTsCache } from "./ts-cache";

export type MetdataOptions = {
  actions?: boolean;
  checkSignature?: boolean;
};

export type TsMetadata = {
  actions?: string[];
  signed?: boolean;
};

const defaultOptions = { actions: true, checkSignature: true };

export async function getTokenscriptMetadata(
  chainId: number,
  contract: `0x${string}`,
  options: MetdataOptions = defaultOptions,
  index = 0,
): Promise<TsMetadata> {
  const scriptURIs = await getERC5169ScriptURISingle(chainId, contract);
  const scriptURI = scriptURIs[index];
  if (scriptURIs === "not implemented" || !scriptURI)
    throw new Error("Script URI not exist");

  let tokenscript = getTsCache(scriptURI);
  if (!tokenscript) {
    const xmlStr = (await axios.get(scriptURI)).data;
    tokenscript = new TokenScript(xmlStr);
    setTsCache(scriptURI, tokenscript);
  }

  const result: any = {};

  if (options.actions) {
    result.actions = tokenscript.getCards().map((card) => card.name);
  }

  if (options.checkSignature) {
    result.signed = !!(await tokenscript.getSecurityInfo().getInfo())
      .trustedKey;
  }

  return result;
}
