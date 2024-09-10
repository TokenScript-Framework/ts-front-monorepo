import { Card, Meta } from "@tokenscript/engine-js/lite";
import { Eip1193Provider } from "ethers";
import { getERC5169ScriptURISingle } from "../ethereum";
import { getTokenScriptEngine } from "./tokenscript";

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
  provider: Eip1193Provider,
  chainId: number,
  contract: `0x${string}`,
  context?: { tokenId: string; originIndex?: number },
  options: TsOptions = defaultTsOptions,
  index = 0,
): Promise<TsMetadata> {
  const scriptURIs = await getERC5169ScriptURISingle(chainId, contract);
  const scriptURI = scriptURIs[index];
  if (scriptURIs === "not implemented" || !scriptURI) {
    console.log("Script URI not exist");
    throw new Error("Some errors for import, please check the server log");
  }

  const tokenscript =
    await getTokenScriptEngine(provider).getTokenScriptFromUrl(scriptURI);
  const result = {} as TsMetadata;

  if (options.actions) {
    if (!context) throw new Error("context is required for parsing actions");

    tokenscript.setCurrentTokenContext(
      Object.keys(tokenscript.getOrigins())[context.originIndex ?? 0],
      null,
      context.tokenId,
    );
    result.actions = (
      await Promise.all(
        tokenscript
          .getCards()
          .getAllCards()
          .map(async (card: Card) =>
            (await card.isEnabledOrReason() === true) ? card.name : "",
          ),
      )
    ).filter(Boolean);
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
