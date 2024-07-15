import { ethers, Network } from "ethers";

import { TokenKit } from "../..";
import { erc165ABI } from "./abi/erc165";
import { erc20ABI } from "./abi/erc20";
import { erc5169ABI } from "./abi/erc5169";
import { erc721ABI } from "./abi/erc721";
import { chainsData } from "./chainsData";
import {
  getERC5169ScriptURICache,
  setERC5169ScriptURICache,
} from "./erc5169ScriptURICache";

export function getERC721Contract(chainId: number, contractAddress: string) {
  const provider = getInfuraBatchedRPCProvider(chainId);

  return new ethers.Contract(contractAddress, erc721ABI, provider);
}

export function getERC20Contract(chainId: number, contractAddress: string) {
  const provider = getInfuraBatchedRPCProvider(chainId);

  return new ethers.Contract(contractAddress, erc20ABI, provider);
}

export async function isInterfaceSupported(
  chainId: number,
  contractAddress: string,
  interfaceHash: string,
): Promise<Boolean> {
  let provider = getInfuraBatchedRPCProvider(chainId);
  try {
    const contract = new ethers.Contract(contractAddress, erc165ABI, provider);
    return contract.supportsInterface(interfaceHash).catch(() => false);
  } catch {
    return false;
  }
}

export async function getERC5169ScriptURISingle(
  chainId: number,
  contract: string,
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
  contractAddresses: string[],
): Promise<Record<string, string[] | "not implemented">> {
  const cachedScriptURIs: Record<string, string[] | "not implemented"> = {};
  for (const each of contractAddresses) {
    const cachedValue = getERC5169ScriptURICache(each, chainId);
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
  contractAddress: string,
): Promise<string[] | null | "not implemented"> {
  let provider = getInfuraBatchedRPCProvider(chainId);
  try {
    const contract = new ethers.Contract(contractAddress, erc5169ABI, provider);
    return contract.scriptURI().catch(() => "not implemented");
  } catch {
    return null;
  }
}

const UNSUPPORTED_BY_INFURA = [
  8217, // Klaytn Cypress
  1001, // Klaytn Baobab
  17000, // Holesky
  185, // Mint Blockchain
  1687, // Mint Sepolia Blockchain
  // TODO: Infura supports Mantle & Base but ethers.js InfuraProvider does not contain hostname mappings yet
  5000, // Mantle
  5003, // Mantle Sepolia
  8453, // Base
  84532, // Base Sepolia
];

const batchedRPCProviders: Record<number, ethers.JsonRpcProvider> = {};

function getInfuraBatchedRPCProvider(chainId: number): ethers.JsonRpcProvider {
  let provider = batchedRPCProviders[chainId];
  if (provider) {
    return provider;
  } else {
    if (UNSUPPORTED_BY_INFURA.includes(chainId)) {
      // To avoid redundant RPC calls to get chain ID
      const staticNetwork = Network.from(chainId);
      provider = new ethers.JsonRpcProvider(
        getRPCbyChainId(chainId)[0],
        staticNetwork,
        { staticNetwork },
      );
    } else {
      provider = new ethers.InfuraProvider(chainId, TokenKit.infuraApiKey);
    }
    batchedRPCProviders[chainId] = provider;
    return provider;
  }
}

function getRPCbyChainId(chainId: number) {
  if (chainId == 31337) {
    return ["http://localhost:8545"];
  } else {
    try {
      const chains = chainsData;
      const currentChain = chains.filter((c) => c.chainId == chainId);
      if (currentChain.length) {
        return currentChain[0].rpc;
      }
    } catch (e) {
      console.log("Fetch chains failed.", e);
    }
  }
  throw new Error(`Unknown chainId (${chainId})`);
}
