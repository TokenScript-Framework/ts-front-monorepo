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
    const setToken = useSetAtom(setTokenAtom);
    let selectedToken = useAtomValue(getTokenAtom);
    const router = useRouter()
    const loadNFTHandler = (selected: TokenCollection) => {
        setToken(selected)
        // if (selected.tokenIds) {
        //     setTokenId(selected.tokenIds[0])
        // }
        console.log(`/home/${selected.address}${selected.tokenIds ? '/' + selected.tokenIds[0] : ""}`)
        router.push(`/home/${selected.address}${selected.tokenIds ? '/' + selected.tokenIds[0] : ""}`)

    };




    return (
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
}

