"use client";

import {
    Card,
    CardContent,
} from "@/components/shadcn/ui/card"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import { TokenCollection, TokenType } from "@/lib/tokenStorage";
import { addressPipe } from "@/lib/utils";
import { ShieldCheck, ShieldX } from "lucide-react";
import { Badge } from "./shadcn/ui/badge";
import { getTokenAtom } from "@/lib/store";
import { useAtomValue } from "jotai";
import { cn } from "@/lib/utils";
import Image from 'next/image';

interface TokenCardProps {
    type: TokenType;
    token: TokenCollection;
    onSelect: (token: TokenCollection) => void;
}

export default function TokenCard({ type, token, onSelect }: TokenCardProps) {
    let selectedToken = useAtomValue(getTokenAtom);
    return (
        <Card
            className={cn(
                selectedToken.address === token.address && "bg-accent", "cursor-pointer text-left dark:bg-gray-900  hover:bg-accent w-full")}
            onClick={() => onSelect(token)}
        >
            <CardContent>
                <div className="flex justify-between items-center m-0">
                    <div className="flex justify-start items-center">
                        {token.logoURI && (<Image src={token.logoURI} alt={token.name} width={48} height={48} />)}
                        <div className="ml-4">
                            <div className="font-bold">
                                <span>{token.name}</span>
                            </div>
                            <div className="mt-2">
                                <a className="hover:text-primary-500 text-[12px] text-gray-500 underline ">
                                    {addressPipe(token.address)}
                                </a>
                            </div>
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

