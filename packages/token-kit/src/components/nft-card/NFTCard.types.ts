export interface NFTCardProps {
  chainId: number;
  contract: `0x${string}`;
  tokenId: string;
  onClick?: () => void;
}
