"use client";
import { getDevModeAtom, getTokenAtom, setTokenAtom, tokenListAtom } from "@/lib/store";
import { TokenCollection, TokenType } from "@/lib/tokenStorage";
import { useAtomValue, useSetAtom } from "jotai";
import { query } from "smart-token-list";
import CollectionCard from "./collection-card";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./shadcn/ui/scroll-area";
import { useAccount, useChainId } from "wagmi";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import EmptyListToken from "./empty-token-list";
import { EMPTY_TOKEN } from "@/lib/constants";

interface TokenProps {
    type: TokenType;
}

export default function MyTokenList({ type }: TokenProps) {


    const tokenListMap = useAtomValue(tokenListAtom);
    const { chainId } = useAccount()
    const devMode = useAtomValue(getDevModeAtom);
    const router = useRouter()
    const setToken = useSetAtom(setTokenAtom);
    let selectedToken = useAtomValue(getTokenAtom);


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

    const redirectToToken = useCallback((token: TokenCollection | null, tokenId?: string) => {
        if (token) {
            console.log('import--after---', token, token.tokenIds, tokenId)
            setToken(token)
            if (token.tokenIds && tokenId) {
                console.log('import--tokenId', token.tokenIds[0], tokenId, token.tokenIds.includes(tokenId))
            }
            const redirectTokenId = token.tokenIds ? (tokenId && token.tokenIds.includes(tokenId) ? tokenId : token.tokenIds[0]) : ''

            console.log('import--redirectTokenId', redirectTokenId)
            router.replace(`/${type}/${chainId}/${token.address}${redirectTokenId ? '/' + redirectTokenId : ""}`)
        } else {
            setToken(EMPTY_TOKEN)

            router.replace(`/${type}/${chainId}`)
        }

    }, [setToken, router, type, chainId])

    useEffect(() => {
        const path = window.location.pathname.split('/')
        const contract = path[3]
        const tokenId = path[4]
        if (tokenId !== 'import') {
            if (tokenData.length > 0 && !selectedToken.address) {
                if (contract) {
                    const token = tokenData.find((token) => token.address === contract)
                    console.log('import-- find--', token, tokenId)
                    if (token) {
                        redirectToToken(token, tokenId)
                    } else {
                        redirectToToken(tokenData[0], tokenId)
                    }
                } else {
                    redirectToToken(tokenData[0], tokenId)
                }

            } else {
                if (tokenData.length === 0) {
                    redirectToToken(null)
                }
            }
        }
    }, [chainId, redirectToToken, router, selectedToken, setToken, tokenData])

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
                        <CollectionCard
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
