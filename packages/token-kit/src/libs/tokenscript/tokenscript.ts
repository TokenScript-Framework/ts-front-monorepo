import {
  EthersAdapter,
  LiteTokenScriptEngine,
  TrustedKey,
} from "@tokenscript/engine-js/lite";
import { BrowserProvider, Eip1193Provider, JsonRpcApiProvider } from "ethers";
import { getChainConfig } from "../ethereum/chain-config";
import { EIP1193ProviderWrapper } from "./eip1193-provider-wrapper";

const trustedKeys = [
  {
    issuerName: "Smart Token Labs",
    valueType: "ethAddress",
    value: "0x1c18e4eF0C9740e258835Dbb26E6C5fB4684C7a0",
  },
  {
    issuerName: "Smart Token Labs",
    valueType: "ethAddress",
    value: "0xf68b9DbfC6C3EE3323Eb9A3D4Ed8eb9d2Cb45A30",
  },
  {
    issuerName: "Smart Token Labs",
    valueType: "ethAddress",
    value: "0x8646DF47d7b16Bf9c13Da881a2D8CDacDa8f5490",
  },
] as TrustedKey[];

let engine: LiteTokenScriptEngine;
let providerInUse: Eip1193Provider;
export function getTokenScriptEngine(
  provider: Eip1193Provider | JsonRpcApiProvider,
) {
  if (!engine || providerInUse !== provider) {
    providerInUse =
      provider instanceof JsonRpcApiProvider
        ? new EIP1193ProviderWrapper(provider)
        : provider;
    engine = new LiteTokenScriptEngine(
      async () =>
        new EthersAdapter(
          () => Promise.resolve(new BrowserProvider(providerInUse)),
          getChainConfig(),
        ),
      {
        trustedKeys,
      },
    );
  }

  return engine;
}
