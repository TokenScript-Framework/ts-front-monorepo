"use client";

import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/shadcn/ui/card"

import { Skeleton } from "@/components/shadcn/ui/skeleton";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import { TokenCollection, TokenType } from "@/lib/tokenStorage";
import { addressPipe } from "@/lib/utils";
import { ShieldCheck, ShieldX } from "lucide-react";
import { erc20Abi } from "viem";
import { useAccount, useReadContracts } from "wagmi";
import { Badge } from "./shadcn/ui/badge";
import { getTokenAtom, setTokenAtom, setTokenIdAtom } from "@/lib/store";
import { useAtomValue, useSetAtom } from "jotai";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface TokenCardProps {
    type: TokenType;
    token: TokenCollection;
}

export default function TokenCard({ type, token }: TokenCardProps) {
    const { address: walletAddress } = useAccount();
    const setToken = useSetAtom(setTokenAtom);
    const setTokenId = useSetAtom(setTokenIdAtom);
    let selectedToken = useAtomValue(getTokenAtom);
    const router = useRouter()

    const isERC20 = type === "ERC20";

    const loadNFTHandler = (selected: TokenCollection) => {
        setToken(selected)
        // if (selected.tokenIds) {
        //     setTokenId(selected.tokenIds[0])
        // }
        console.log(`/dashboard/${selected.address}${selected.tokenIds ? '/' + selected.tokenIds[0] : ""}`)
        router.push(`/dashboard/${selected.address}${selected.tokenIds ? '/' + selected.tokenIds[0] : ""}`)

    };

    const { data: erc20Data, isFetching: isFetchingERC20Info } = useReadContracts(
        {
            contracts: contractsForErc20(token, walletAddress!),
            query: {
                enabled: isERC20 && !!walletAddress,
            },
        },
    );

    const skeletonView = (
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
    )


    const cardView = selectedToken === null ? skeletonView : (
        <Card
            className={cn(
                selectedToken.address === token.address && "bg-accent", "cursor-pointer text-left dark:bg-gray-900  hover:bg-accent w-full")}
            onClick={() => loadNFTHandler(token)}
        >
            <CardContent>
                <div className="flex justify-between items-center m-0">
                    <div>
                        <div className="font-bold">
                            <span>{token.name}</span>
                        </div>
                        <div className="mt-2">
                            <a className="hover:text-primary-500 text-[12px] text-gray-500 underline ">
                                {addressPipe(token.address)}
                            </a>
                        </div>
                    </div>
                    <div>
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
                        {token.tokenIds && (
                            <Badge variant="outline" className="text-primary-500 border-primary-500 mt-2">
                                {token.tokenIds.length}
                            </Badge>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
    return isFetchingERC20Info ? skeletonView : cardView;
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
