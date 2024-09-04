import axios from "axios";
import { getERC5169ScriptURISingle } from "../ethereum";
import { TokenScript } from "./engine-lite/tokenscript";
import { Card } from "./engine-lite/tokenScript/Card";
import { Meta } from "./engine-lite/tokenScript/Meta";
import { getTsCache, setTsCache } from "./ts-cache";

export type TsOptions = {
  actions?: boolean;
  checkSignature?: boolean;
  css?: boolean;
  cards?: boolean;
};

export type TsMetadata = {
  meta: Meta;
  name: string;
  actions?: string[];
  signed?: boolean;
  cssStr?: string;
  cards?: Card[];
};

export const defaultTsOptions = {
  actions: false,
  checkSignature: false,
  css: false,
  cards: false,
};

export async function getTokenscriptMetadata(
  chainId: number,
  contract: `0x${string}`,
  options: TsOptions = defaultTsOptions,
  index = 0,
): Promise<TsMetadata> {
  const scriptURIs = await getERC5169ScriptURISingle(chainId, contract);
  const scriptURI = scriptURIs[index];
  if (scriptURIs === "not implemented" || !scriptURI) {
    console.log("Script URI not exist");
    throw new Error("Some errors for import, please check the server log");
  }

  const tokenscript = await loadTokenscript(scriptURI);

  const result = {} as TsMetadata;

  if (options.actions) {
    result.actions = tokenscript.getCards().map((card) => card.name ?? "");
  }

  if (options.checkSignature) {
    result.signed = !!(await tokenscript.getSecurityInfo().getInfo())
      .trustedKey;
  }

  if (options.css) {
    result.cssStr = tokenscript.getCssStr();
  }

  if (options.cards) {
    result.cards = tokenscript.getCards();
  }

  result.meta = tokenscript.getMetadata();
  result.name = tokenscript.getName() ?? "";

  return result;
}

async function loadTokenscript(scriptURI: string) {
  let tokenscript = getTsCache(scriptURI);
  if (!tokenscript) {
    const httpUrl = scriptURI.startsWith("ipfs://")
      ? `https://ipfs.io/ipfs/${scriptURI.slice(7)}`
      : scriptURI;

    const xmlStr = (await axios.get(httpUrl)).data;

    let parser: DOMParser;
    if (typeof window === "undefined") {
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
