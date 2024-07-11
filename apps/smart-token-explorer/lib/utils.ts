import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function addressPipe(address: string, start: number = 38) {
  return `${address.slice(0, 6)}...${address.slice(start)}`
}

export function rewriteUrlIfIFPSUrl(url:string){
    if (!url) {
    return '';
  } else if (url.toLowerCase().startsWith('https://ipfs.io/ipfs')) {
    return url.replace(
      'https://ipfs.io/ipfs',
      'https://gateway.pinata.cloud/ipfs'
    );
  } else if (url.toLowerCase().startsWith('ipfs://ipfs')) {
    return url.replace('ipfs://ipfs', 'https://gateway.pinata.cloud/ipfs');
  } else if (url.toLowerCase().startsWith('ipfs://')) {
    return url.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/');
  } else {
    return url;
  } 
}
