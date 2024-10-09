import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { API_KEY, COMMON_API_ROOT } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function addressPipe(address: string, start: number = 38) {
  return `${address.slice(0, 6)}...${address.slice(start)}`;
}

export function valuePipe(value: string) {
  return value.indexOf("0x") === 0 ? addressPipe(value) : value;
}

export function urlPipe(url: string) {
  return `${url.slice(0, 10)}...${url.slice(-4)}`;
}

export function rewriteUrlIfIFPSUrl(url: string) {
  if (!url) {
    return "";
  } else if (url.toLowerCase().startsWith("https://ipfs.io/ipfs")) {
    return url.replace(
      "https://ipfs.io/ipfs",
      "https://gateway.pinata.cloud/ipfs",
    );
  } else if (url.toLowerCase().startsWith("ipfs://ipfs")) {
    return url.replace("ipfs://ipfs", "https://gateway.pinata.cloud/ipfs");
  } else if (url.toLowerCase().startsWith("ipfs://")) {
    return url.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
  }
  return url;
}

// TODO: add new networks
export function chainPipe(chain: number) {
  switch (chain) {
    case 1:
      return "Ethereum";
    case 137:
      return "Polygon";
    case 10:
      return "OP Mainnet";
    case 8453:
      return "Base";
    case 11155111:
      return "Sepolia";
    case 84532:
      return "Base Sepolia";
    default:
      return `Chain ${chain}`;
  }
}

export function networkPipe(chain: number | string) {
  switch (Number(chain)) {
    case 1:
      return "mainnet";
    case 137:
      return "matic";
    case 10:
      return "optimism";
    case 8453:
      return "base";
    case 11155111:
      return "sepolia";
    case 84532:
      return "baseSepolia";
    default:
      return "network";
  }
}

export function firstUppercasePipe(value: string | undefined) {
  return value
    ? value.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
    : "";
}

export function splitPath(path: string) {
  const pathArray = path.split("/");
  return {
    type: pathArray[1],
    chainId: pathArray[2],
    contract: pathArray[3],
    tokenId: pathArray[4],
  };
}

export async function getTokenscriptMetadata(
    chain: string,
    contract: `0x${string}`,
    tokenId?: string,
  ) {
    const response = await fetch(
      `${COMMON_API_ROOT}/token-view/${chain}/${contract}${tokenId ? "?tokenId=" + tokenId : ""}`,
      {
        headers: {
          "x-stl-key": API_KEY,
        },
      },
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch token metadata: ${response.status} ${response.statusText}`,
      );
    }
    const { tokenMetadata, tsMetadata, explorerUrl } = await response.json();

    console.log(JSON.stringify({ tokenMetadata, tsMetadata, explorerUrl }))
    return {
      actions: tsMetadata.actions,
      name: tsMetadata.name,
      description: tsMetadata.meta.description,
      aboutUrl: tsMetadata.meta.aboutUrl || explorerUrl,
      tokenMetadata: tokenMetadata || {},
      signed: tsMetadata.signed,
    };
  }
