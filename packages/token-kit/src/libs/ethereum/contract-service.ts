import { createPublicClient, extractChain, http, PublicClient } from "viem";
import * as chains from "viem/chains";
import { erc5169ABI } from "./abi/erc5169";
import {
  getERC5169ScriptURICache,
  setERC5169ScriptURICache,
} from "./erc5169-scriptURI-cache";

export async function getERC5169ScriptURISingle(
  chainId: number,
  contract: `0x${string}`,
): Promise<string[] | "not implemented"> {
  let cachedValue = getERC5169ScriptURICache(contract, chainId);
  if (cachedValue !== null) {
    return cachedValue;
  }
  try {
    const onChain = await getERC5169ScriptURI(chainId, contract);
    const result = onChain === null ? "not implemented" : onChain;
    setERC5169ScriptURICache(contract, chainId, result);
    return result;
  } catch {
    setERC5169ScriptURICache(contract, chainId, "not implemented");
    return "not implemented";
  }
}

export async function getERC5169ScriptURIBatched(
  chainId: number,
  contractAddresses: `0x${string}`[],
): Promise<Record<string, string[] | "not implemented">> {
  const cachedScriptURIs: Record<string, string[] | "not implemented"> = {};
  for (const each of contractAddresses) {
    const cachedValue = getERC5169ScriptURICache(each, chain.id);
    if (cachedValue !== null) {
      cachedScriptURIs[each] = cachedValue;
    }
  }
  const uniqueContracts = Array.from(new Set(contractAddresses));
  const scriptURIPromises = uniqueContracts.map((each) => {
    return {
      contract: each,
      scriptURI:
        cachedScriptURIs[each] !== undefined
          ? cachedScriptURIs[each]
          : getERC5169ScriptURI(chainId, each),
    };
  });
  let scriptURIs: Record<string, string[] | "not implemented"> = {};
  for (const each of scriptURIPromises) {
    if (each.scriptURI instanceof Promise) {
      try {
        const result = await each.scriptURI;
        scriptURIs[each.contract] =
          result === null ? "not implemented" : result;
      } catch {
        scriptURIs[each.contract] = "not implemented";
      }
    } else {
      scriptURIs[each.contract] = each.scriptURI;
    }
  }
  for (const [eachContract, eachScriptURI] of Object.entries(scriptURIs)) {
    if (cachedScriptURIs[eachContract] === undefined) {
      setERC5169ScriptURICache(eachContract, chainId, eachScriptURI);
    }
  }
  return scriptURIs;
}

async function getERC5169ScriptURI(
  chainId: number,
  contractAddress: `0x${string}`,
) {
  try {
    const client = getBatchClient(chainId);

    return client
      .readContract({
        address: contractAddress,
        abi: erc5169ABI,
        functionName: "scriptURI",
      })
      .catch((e) => {
        console.log(e);
        return "not implemented";
      }) as Promise<string[] | null | "not implemented">;
  } catch {
    return null;
  }
}

const clientCache: Record<number, PublicClient> = {};
function getBatchClient(chainId: any) {
  if (!clientCache[chainId]) {
    clientCache[chainId] = createPublicClient({
      chain: extractChain({
        chains: Object.values(chains),
        id: chainId,
      }),
      transport: http(),
      batch: {
        // Apply the same config as ethers.js batch provider
        multicall: {
          batchSize: 100,
          wait: 10,
        },
      },
    }) as any;
  }

  return clientCache[chainId];
}
