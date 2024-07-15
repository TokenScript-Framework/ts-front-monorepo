import { Chain, createPublicClient, http, PublicClient } from "viem";
import { erc5169ABI } from "./abi/erc5169";
import {
  getERC5169ScriptURICache,
  setERC5169ScriptURICache,
} from "./erc5169ScriptURICache";

export async function getERC5169ScriptURISingle(
  chain: Chain,
  contract: `0x${string}`,
): Promise<string[] | "not implemented"> {
  let cachedValue = getERC5169ScriptURICache(contract, chain.id);
  if (cachedValue !== null) {
    return cachedValue;
  }
  try {
    const onChain = await getERC5169ScriptURI(chain, contract);
    const result = onChain === null ? "not implemented" : onChain;
    setERC5169ScriptURICache(contract, chain.id, result);
    return result;
  } catch {
    setERC5169ScriptURICache(contract, chain.id, "not implemented");
    return "not implemented";
  }
}

export async function getERC5169ScriptURIBatched(
  chain: Chain,
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
          : getERC5169ScriptURI(chain, each),
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
      setERC5169ScriptURICache(eachContract, chain.id, eachScriptURI);
    }
  }
  return scriptURIs;
}

async function getERC5169ScriptURI(
  chain: Chain,
  contractAddress: `0x${string}`,
) {
  try {
    const client = getBatchClient(chain);

    return client
      .readContract({
        address: contractAddress,
        abi: erc5169ABI,
        functionName: "scriptURI",
      })
      .catch((e) => {console.log(e); return "not implemented"}) as Promise<
      string[] | null | "not implemented"
    >;
  } catch {
    return null;
  }
}

const clientCache: Record<number, PublicClient> = {};
function getBatchClient(chain: Chain) {
  if (!clientCache[chain.id]) {
    clientCache[chain.id] = createPublicClient({
      chain,
      transport: http(),
      batch: {
        // Apply the same config as ethers.js batch provider
        multicall: {
          batchSize: 100,
          wait: 10,
        },
      },
    });
  }

  return clientCache[chain.id];
}
