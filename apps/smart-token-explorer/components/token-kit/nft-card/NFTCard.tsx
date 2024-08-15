import { Card, CardContent, CardHeader } from "@/components/shadcn/ui/card";
import { ScrollArea, ScrollBar } from "@/components/shadcn/ui/scroll-area";
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import { erc1155Abi } from "@/lib/abi";
import { rewriteUrlIfIFPSUrl, urlPipe, valuePipe } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { erc721Abi } from "viem";
import { useReadContract } from "wagmi";
import { NFTCardProps } from "./NFTCard.types";

export const NFTCard: React.FC<NFTCardProps> = ({
    type,
    chainId,
    contract,
    tokenId,
    onClick,
}) => {

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
        abi: erc1155Abi,
        functionName: "uri",
        args: [BigInt(tokenId)],
        query: {
            enabled: type === "ERC1155",
        },
    });

    const { data: erc1155Metadata } = useQuery({
        queryKey: ["metadata", chainId, contract, tokenId],
        queryFn: async () => {
            if (erc1155TokenURI) {
                const res = await axios.get(rewriteUrlIfIFPSUrl(erc1155TokenURI as string));
                return res.data;
            } else {
                return null
            }

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

    if (!metadata) {
        return (
            <Card>
                <CardHeader className="relative space-y-0 p-0">
                    <Skeleton className="w-full rounded-lg pb-[100%]" />
                </CardHeader>
                <CardContent className="p-3">
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
            <CardHeader className="relative space-y-0 p-0  cursor-pointer" onClick={onClick}>
                <img
                    className="rounded-lg"
                    src={rewriteUrlIfIFPSUrl(metadata?.image)}
                />
            </CardHeader>
            <CardContent className="p-3">
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
                                                className="bg-primary-100/10 flex w-full flex-col items-center rounded-md border px-2"
                                            >
                                                <div className="font-semibold">{trait_type}</div>
                                                {value.toString().indexOf('https://') === 0 ? (<a href={value} target="_blank" className="underline text-primary-500 cursor-pointer">{urlPipe(value)}</a>) : (<div>{valuePipe(value.toString())}</div>)}

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
