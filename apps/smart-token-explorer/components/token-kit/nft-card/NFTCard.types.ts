export interface NFTCardProps {
  type: "ERC721" | "ERC1155";
  chainId: number;
  contract: `0x${string}`;
  tokenId: string;
  onClick?: () => void;
}
