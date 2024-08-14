"use client";
import { getDevModeAtom, getTokenAtom, setTokenAtom, tokenListAtom } from "@/lib/store";
import { TokenCollection, TokenType } from "@/lib/tokenStorage";
import { useAtomValue, useSetAtom } from "jotai";
import { query } from "smart-token-list";
import TokenCard from "./token-card";
import { cn } from "@/lib/utils";
import ImportToken from "@/components/import-token"
import { useEffect, useState } from "react";
import { ScrollArea } from "./shadcn/ui/scroll-area";

interface TokenProps {
    type: TokenType;
    tokenList: TokenCollection[]
}

export default function MyTokenList({ type, tokenList }: TokenProps) {
    const tokenData: any[] = tokenList.map((token) => {
        const results = query({ chainId: token.chainId, address: token.address, name: token.name });
        return {
            ...token,
            ...(results[0] ? results[0] : { notFound: true }),
        };
    });

    return (
        <ScrollArea className="h-full">
            <div className="flex flex-col">
                {tokenData.length === 0 && (<div className="text-center mt-8">
                    <div className="text-2xl font-bold mb-2"> No tokens, Please import</div>
                    <div className="w-[200px] mx-auto"><ImportToken /></div>
                </div>)}
                {tokenData.map((token) => (
                    < div className={
                        cn(
                            "p-3 text-left text-sm transition-all",
                        )} key={`${type}-${token.chainId}-${token.address}`}>
                        <TokenCard
                            key={`${type}-${token.chainId}-${token.address}`}
                            type={type}
                            token={token}
                        />
                    </div>
                ))
                }
            </div >
        </ScrollArea>
    );
}
