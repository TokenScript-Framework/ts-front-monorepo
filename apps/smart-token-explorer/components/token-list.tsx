"use client";
import { getDevModeAtom, getTokenAtom, setTokenAtom, tokenListAtom } from "@/lib/store";
import { TokenCollection, TokenType } from "@/lib/tokenStorage";
import { useAtomValue, useSetAtom } from "jotai";
import { query } from "smart-token-list";
import TokenCard from "./token-card";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./shadcn/ui/scroll-area";
import { useAccount, useChainId } from "wagmi";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import EmptyListToken from "./empty-token-list";

interface TokenProps {
    type: TokenType;
}

export default function MyTokenList({ type }: TokenProps) {


    const tokenListMap = useAtomValue(tokenListAtom);
    const chainId = useChainId()
    const devMode = useAtomValue(getDevModeAtom);
    const router = useRouter()
    const setToken = useSetAtom(setTokenAtom);
    let selectedToken = useAtomValue(getTokenAtom);
    const { connector: activeConnector } = useAccount()


    let tokenList: TokenCollection[] = tokenListMap[type]?.filter((token: any) => Number(token.chainId) === (chainId));


    if (!devMode) {
        tokenList = tokenList.filter((token) => token.signed);
    }

    const tokenData: any[] = tokenList.map((token) => {
        const results = query({ chainId: token.chainId, address: token.address, name: token.name });
        return {
            ...token,
            ...(results[0] ? results[0] : { notFound: true }),
        };
    });

    const redirectToToken = useCallback((token: TokenCollection | null) => {
        if (token) {
            setToken(token)
            router.replace(`/${type}/${chainId}/${token.address}${token.tokenIds ? '/' + token.tokenIds[0] : ""}`)
        } else {
            router.replace(`/${type}/${chainId}`)
        }

    }, [setToken, router, type, chainId])

    useEffect(() => {
        if (tokenData.length > 0 && !selectedToken.address) {
            redirectToToken(tokenData[0])
        } else {
            if (tokenData.length === 0) {
                redirectToToken(null)
            }
        }
    }, [redirectToToken, router, selectedToken, setToken, tokenData])

    const selectHanlder = (event: TokenCollection) => {
        redirectToToken(event)
    }

    return (
        <ScrollArea className="h-full">
            <div className="flex flex-col">
                {tokenData.length === 0 && (
                    <EmptyListToken type={type} chainId={chainId} />
                )}
                {tokenData.map((token) => (
                    < div className={
                        cn(
                            "p-3 text-left text-sm transition-all",
                        )} key={`${type}-${token.chainId}-${token.address}`}>
                        <TokenCard
                            key={`${type}-${token.chainId}-${token.address}`}
                            type={type}
                            token={token}
                            onSelect={selectHanlder}
                        />
                    </div>
                ))
                }
            </div >
        </ScrollArea>
    );
}
