import { Card, CardContent, CardHeader } from "@/components/shadcn/ui/card";
import { ScrollArea, ScrollBar } from "@/components/shadcn/ui/scroll-area";
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import { erc1155ABI, rewriteUrlIfIFPSUrl, urlPipe, valuePipe } from "@/libs"
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { erc721Abi, erc20Abi } from "viem";
import { useReadContract, useReadContracts } from "wagmi";
import BigNumber from "bignumber.js";

export interface TokenCardProps {
  type: "ERC20" | "ERC721" | "ERC1155";
  chainId: number;
  contract: `0x${string}`;
  tokenId?: string;
  wallet?: `0x${string}`;
  onClick?: () => void;
}

export const TokenCard: React.FC<TokenCardProps> = ({
  type,
  chainId,
  contract,
  tokenId = "0",
  wallet,
  onClick,
}) => {
  const { data: erc20Data } = useReadContracts({
    contracts: contractsForErc20(chainId, contract, wallet),
    query: {
        enabled: type === "ERC20",
    },
  });

  const { data: erc721TokenURI } = useReadContract({
    chainId: chainId,
    address: contract,
    abi: erc721Abi,
    functionName: "tokenURI",
    args: [BigInt(tokenId)],
    query: {
      enabled: type === "ERC721",
    },
  });

  const { data: erc721Metadata } = useQuery({
    queryKey: ["metadata", chainId, contract, tokenId],
    queryFn: async () => {
      const res = await axios.get(rewriteUrlIfIFPSUrl(erc721TokenURI!));
      return res.data;
    },
    enabled: !!erc721TokenURI,
  });

  const { data: erc1155TokenURI } = useReadContract({
    chainId: chainId,
    address: contract,
    abi: erc1155ABI,
    functionName: "uri",
    args: [BigInt(tokenId)],
    query: {
      enabled: type === "ERC1155",
    },
  });

  const { data: erc1155Metadata } = useQuery({
    queryKey: ["metadata", chainId, contract, tokenId],
    queryFn: async () => {
      const res = await axios.get(
        rewriteUrlIfIFPSUrl(erc1155TokenURI as string),
      );
      return res.data;
    },
    enabled: !!erc1155TokenURI,
  });

  const metadata = erc721Metadata || erc1155Metadata;
  const attributes =
    metadata?.attributes ||
    Object.entries(erc1155Metadata?.properties || {}).map(([key, value]) => ({
      trait_type: key,
      value,
    }));

  if (!metadata && !erc20Data) {
    return (
      <Card>
        <CardHeader className="relative space-y-0 p-0">
          <Skeleton className="w-full rounded-lg pb-[100%]" />
        </CardHeader>
        <CardContent className="p-4">
          <div className="relative flex w-full items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-36" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (type === "ERC20") {
    return (
      <Card>
        <CardContent className="p-4 cursor-pointer" onClick={onClick}>
          <div className="flex flex-col gap-4">
            <div className="relative w-full">
              <h3 className="mb-2 text-lg font-semibold leading-none">
                Name
              </h3>
              <p className="text-muted-foreground text-sm">
                {erc20Data?.[0]?.result?.toString()}
              </p>
            </div>
            <div className="relative w-full">
              <h3 className="mb-2 text-lg font-semibold leading-none">
                Symbol
              </h3>
              <p className="text-muted-foreground text-sm">
                {erc20Data?.[1]?.result?.toString()}
              </p>
            </div>
            {
              (!!erc20Data?.[2]?.result && !!erc20Data?.[3]?.result) && (
                <div className="relative w-full">
                  <h3 className="mb-2 text-lg font-semibold leading-none">
                    Balance
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {
                        new BigNumber(erc20Data?.[3]?.result.toString())
                            .dividedBy(new BigNumber(10 ** Number(erc20Data?.[2]?.result)))
                            .toString()
                    }
                  </p>
                </div>
              )
            }
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader
        className="relative cursor-pointer space-y-0 p-0"
        onClick={onClick}
      >
        <img
          className="rounded-lg"
          src={rewriteUrlIfIFPSUrl(metadata?.image)}
        />
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col gap-4">
          <div className="relative w-full">
            <h3 className="mb-2 text-lg font-semibold leading-none">
              Description
            </h3>
            <p className="text-muted-foreground text-sm">
              {metadata?.description}
            </p>
          </div>
          <div className="w-full">
            <h3 className="mb-2 text-lg font-semibold leading-none">Traits</h3>
            <ScrollArea className="w-full whitespace-nowrap rounded-md border p-2">
              <div className="flex w-full gap-2">
                {attributes?.map(
                  ({
                    trait_type,
                    value,
                  }: {
                    trait_type: string;
                    value: string;
                  }) => {
                    return (
                      <div
                        key={trait_type}
                        className="bg-primary-100/10 flex w-full flex-col items-center rounded-md border"
                      >
                        <div className="font-semibold">{trait_type}</div>
                        {value.toString().indexOf("https://") === 0 ? (
                          <a
                            href={value}
                            target="_blank"
                            className="text-primary-500 cursor-pointer underline"
                          >
                            {urlPipe(value)}
                          </a>
                        ) : (
                          <div>{valuePipe(value.toString())}</div>
                        )}
                      </div>
                    );
                  },
                )}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

function contractsForErc20(chainId: number, constract: `0x${string}`, walletAddress?: string) {
  const contractInfo = [
      {
          chainId: chainId,
          address: constract,
          abi: erc20Abi,
          functionName: "name",
      },
      {
          chainId: chainId,
          address: constract,
          abi: erc20Abi,
          functionName: "symbol",
      },
      {
          chainId: chainId,
          address: constract,
          abi: erc20Abi,
          functionName: "decimals",
      },
  ];
  const balanceInfo = {
      chainId: chainId,
      address: constract,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: [walletAddress],
  };

  return walletAddress ? [...contractInfo, balanceInfo] : contractInfo
}