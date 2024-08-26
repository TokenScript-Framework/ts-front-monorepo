import axios from "axios";
import { getERC5169ScriptURISingle } from "../ethereum";
import { TokenScript } from "./engine-lite/tokenscript";
import { Card } from "./engine-lite/tokenScript/Card";
import { Meta } from "./engine-lite/tokenScript/Meta";
import { getTsCache, setTsCache } from "./ts-cache";

export type MetdataOptions = {
  actions?: boolean;
  checkSignature?: boolean;
};

export type TsMetadata = {
  cards: Card[];
  meta: Meta;
  name: string;
  cssStr: string;
  actions?: string[];
  signed?: boolean;
};

const defaultOptions = {
  actions: true,
  checkSignature: true,
};

export async function getTokenscriptMetadata(
  chainId: number,
  contract: `0x${string}`,
  options: MetdataOptions = defaultOptions,
  index = 0,
): Promise<TsMetadata> {
  const scriptURIs = await getERC5169ScriptURISingle(chainId, contract);
  console.log(scriptURIs);
  const scriptURI = scriptURIs[index];
  if (scriptURIs === "not implemented" || !scriptURI) {
    console.log("Script URI not exist");
    throw new Error("Some errors for import, please check the server log");
  }

  const tokenscript = await loadTokenscript(scriptURI);

  const result = {} as TsMetadata;

  result.cards = tokenscript.getCards();
  result.cssStr = tokenscript.getCssStr();
  if (options.actions) {
    result.actions = tokenscript.getCards().map((card) => card.name ?? "");
  }

  if (options.checkSignature) {
    result.signed = !!(await tokenscript.getSecurityInfo().getInfo())
      .trustedKey;
  }

  result.meta = tokenscript.getMetadata();
  result.name = tokenscript.getName() ?? "";

  return result;
}

async function loadTokenscript(scriptURI: string) {
  let tokenscript = getTsCache(scriptURI);
  if (!tokenscript) {
    const xmlStr = (await axios.get(scriptURI)).data;

    let parser: DOMParser;
    if (typeof window === 'undefined') {
      const { JSDOM } = await import("jsdom");
      const jsdom = new JSDOM();
      parser = new jsdom.window.DOMParser();
    } else {
      parser = new DOMParser();
    }
    const xmlDoc = parser.parseFromString(xmlStr, "text/xml");
    tokenscript = new TokenScript(xmlStr, xmlDoc);
    setTsCache(scriptURI, tokenscript);
  }

  return tokenscript;
}
