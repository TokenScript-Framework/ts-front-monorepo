"use client";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/shadcn/ui/avatar";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/shadcn/ui/card";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/shadcn/ui/drawer";

import { Skeleton } from "@/components/shadcn/ui/skeleton";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import { TokenType } from "@/lib/tokenStorage";
import { addressPipe, rewriteUrlIfIFPSUrl } from "@/lib/utils";
import { ShieldCheck, ShieldX } from "lucide-react";
import { useRouter } from "next/navigation";
import { erc20Abi } from "viem";
import { useAccount, useReadContracts } from "wagmi";
import { Badge } from "./shadcn/ui/badge";
import { Button } from "./shadcn/ui/button";
import { NFTCard } from "./token-kit/nft-card";

interface TokenCardProps {
    type: TokenType;
    token: any;
    chain: number;
}

export default function TokenCard({ type, chain, token }: TokenCardProps) {
    const { address: walletAddress } = useAccount();
    const router = useRouter();

    const isERC20 = type === "ERC20";

    const loadNFTHandler = (address: string, tokenId?: string) => {
        if (tokenId) {
            router.push(`/${chain}/${address}/${tokenId}`);
        } else if (isERC20) {
            router.push(`/${chain}/${address}`);
        }
    };

    const { data: erc20Data, isFetching: isFetchingERC20Info } = useReadContracts(
        {
            contracts: contractsForErc20(token, walletAddress!),
            query: {
                enabled: isERC20 && !!walletAddress,
            },
        },
    );

    if (isERC20) {
        token.balance = Number(erc20Data?.[0]?.result);
    }

    if (token.notFound) {
        if (isERC20) {
            token.name = erc20Data?.[1]?.result;
            token.symbol = erc20Data?.[2]?.result;
            token.decimals = erc20Data?.[3]?.result;
        }
    }

    if (isFetchingERC20Info) {
        return (
            <Card>
                <CardHeader className="relative space-y-0 p-0">
                    <Skeleton className="w-full rounded-lg pb-[40%]" />
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

    const cardView = (
        <Card
            className="cursor-pointer text-center dark:bg-gray-900"
            onClick={() => loadNFTHandler(token.address)}
        >
            <CardTitle>
                <div className="relative flex flex-col gap-4 p-8">
                    {token.tokenIds && (
                        <Badge variant="outline" className="absolute left-2 top-2">
                            {token.tokenIds.length}
                        </Badge>
                    )}
                    <div className="absolute right-2 top-2">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div>
                                        {token.signed ? (
                                            <ShieldCheck color="#16a34a" />
                                        ) : (
                                            <ShieldX color="#aa3131" />
                                        )}
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {token.signed ? "Secure Tokenscript" : "Insecure Tokenscript"}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <Avatar>
                            <AvatarImage
                                src={
                                    token.logoURI
                                        ? token.logoURI
                                        : rewriteUrlIfIFPSUrl(token.image)
                                }
                                alt="token"
                            />
                            <AvatarFallback className="bg-primary-100/20">T</AvatarFallback>
                        </Avatar>

                        <span>{token.name}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <a className="hover:text-primary-500 text-sm text-gray-500 underline">
                            {addressPipe(token.address)}
                        </a>
                    </div>
                </div>
            </CardTitle>
            <CardContent>
                {isERC20 ? (
                    <>
                        <div className="flex justify-between text-gray-500 dark:text-[#B3B3B3]">
                            <div>ChainId</div>
                            <div>Symbol</div>
                        </div>
                        <div className="flex justify-between font-bold">
                            <div>{token.chainId}</div>
                            <div>{token.symbol}</div>
                        </div>
                        <br />
                        <div className="opacity-7 flex justify-between text-gray-500 dark:text-[#B3B3B3]">
                            <div>Balance</div>
                            <div>Decimals</div>
                        </div>
                        <div className="flex justify-between font-bold">
                            <div>{token.balance}</div>
                            <div>{token.decimals}</div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="text-center">
                            <div className="mt-2">
                                <div>{token.description}</div>
                            </div>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );

    const cardViewWithDrawer = (
        <Drawer>
            <DrawerTrigger> {cardView}</DrawerTrigger >
            <DrawerContent className="bg-white dark:bg-black">
                <DrawerHeader>
                    <DrawerTitle>Imported Smart Tokens</DrawerTitle>
                    <DrawerDescription>
                        Click on the Smart Token to experience
                    </DrawerDescription>
                </DrawerHeader>
                <div className="flex justify-center gap-4">
                    {token.tokenIds?.map((tokenId: string) => (
                        <div key={tokenId} className="max-w-[320px]">
                            <NFTCard
                                type={type as any}
                                chainId={token.chainId}
                                contract={token.address}
                                tokenId={tokenId}
                                onClick={() => loadNFTHandler(token.address, tokenId)}
                            />
                        </div>
                    ))}
                </div>
                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button className="w-[120px] mx-auto bg-gray-500 dark:bg-gray-500 text-white hover:bg-gray-300 dark:hover:bg-gray-300">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer >
    );

    return isERC20 ? cardView : cardViewWithDrawer;
}

function contractsForErc20(token: any, walletAddress: string) {
    const contractInfo = [
        {
            chainId: token.chainId,
            address: token.address,
            abi: erc20Abi,
            functionName: "name",
        },
        {
            chainId: token.chainId,
            address: token.address,
            abi: erc20Abi,
            functionName: "symbol",
        },
        {
            chainId: token.chainId,
            address: token.address,
            abi: erc20Abi,
            functionName: "decimals",
        },
    ];
    const balanceInfo = {
        chainId: token.chainId,
        address: token.address,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [walletAddress],
    };

    return token.notFound ? [balanceInfo, ...contractInfo] : [balanceInfo];
}
