import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
  } else {
    return url;
  }
}

export function chainPipe(chain: number) {
  switch (chain) {
    case 1:
      return "Ethereum Mainnet";
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
