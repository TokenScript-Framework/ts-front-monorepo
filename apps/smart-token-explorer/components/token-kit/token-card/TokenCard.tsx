import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { erc721Abi } from "viem";
import { useReadContract } from "wagmi";
import { OpenseaIcon } from "../../icons/opensea-icon";
import { Card, CardContent, CardHeader } from "../../shadcn/ui/card";
import { ScrollArea, ScrollBar } from "../../shadcn/ui/scroll-area";
import { Skeleton } from "../../shadcn/ui/skeleton";
import { TokenCardProps } from "./TokenCard.types";

export const TokenCard: React.FC<TokenCardProps> = ({
  chainId,
  contract,
  tokenId,
}) => {
  const { data: tokenURI } = useReadContract({
    chainId: chainId,
    address: contract,
    abi: erc721Abi,
    functionName: "tokenURI",
    args: [BigInt(tokenId)],
  });

  const { data: metadata } = useQuery({
    queryKey: ["metadata", chainId, contract, tokenId],
    queryFn: async () => {
      const res = await axios.get(tokenURI!);
      return res.data;
    },
    enabled: !!tokenURI,
  });

  if (!metadata) {
    return (
      <Card>
        <CardHeader className="relative space-y-0 p-0">
          <Skeleton className="w-full rounded-xl pb-[100%]" />
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

  return (
    <Card>
      <CardHeader className="relative space-y-0 p-0">
        <a
          href="https://opensea.io/assets/matic/0xd5ca946ac1c1f24eb26dae9e1a53ba6a02bd97fe/1202370524"
          target="_blank"
        >
          <OpenseaIcon className="absolute right-2 top-2" />
        </a>
        <img className="rounded-lg" src={metadata?.image} />
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col gap-4">
          <div className="w-full">
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
                {metadata?.attributes?.map(
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
                        <div>{value}</div>
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
