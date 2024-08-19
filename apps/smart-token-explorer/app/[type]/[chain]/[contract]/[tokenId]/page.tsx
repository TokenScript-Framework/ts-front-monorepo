"use client"
import { useAccount, useChainId } from "wagmi";
import { TokenCollection, TokenType } from "@/lib/tokenStorage"
import { Separator } from "@/components/shadcn/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/shadcn/ui/avatar";
import { addressPipe } from "@/lib/utils";
import { useAtomValue, useSetAtom } from "jotai";
import { getTokenTypeAtom, getTokenAtom, tokenListAtom, setTokenAtom, getDevModeAtom } from "@/lib/store";
import { useEffect } from "react";
import { TokenIdSwitcher } from "@/components/tokenid-switcher";
import { TabsList, TabsTrigger, Tabs, TabsContent } from "@/components/shadcn/ui/tabs";
import { NFTCard } from "@/components/token-kit/nft-card";
import { NEXT_PUBLIC_VIEWER_ROOT } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { ScriptIframe } from "@/components/script-Iframe";
import EmptyToken from "@/components/empty-token";

export default function TokenIdPage({
    params,
}: {
    params: { contract: string; tokenId: string };
}) {
    const { address } = useAccount();
    const { contract, tokenId } = params

    let tokenType = useAtomValue(getTokenTypeAtom);
    let selectedToken = useAtomValue(getTokenAtom);
    const tokenListMap = useAtomValue(tokenListAtom);
    const setToken = useSetAtom(setTokenAtom);
    const chainId = useChainId();
    const router = useRouter()
    let devMode = useAtomValue(getDevModeAtom);

    useEffect(() => {
        if (tokenType) {
            let tokenList: TokenCollection[] = tokenListMap[tokenType as TokenType];
            if (tokenList.length > 0) {
                if (address && (!selectedToken || selectedToken.address !== contract)) {
                    const filterResult = tokenList.filter((token) => Number(token.chainId) === (chainId) && token.signed === !devMode);
                    if (filterResult.length === 1) {
                        setToken(filterResult[0])
                    }
                }
            }

        }
    }, [address, chainId, contract, devMode, router, selectedToken, setToken, tokenListMap, tokenType])


    if (!address || !selectedToken.address) {
        return (
            <EmptyToken />
        )
    }
    return (selectedToken && selectedToken.address && <>
        <div className="flex h-full flex-col">
            <div className="flex flex-1 flex-col">
                <div className="flex justify-between px-4 pl-2 h-[52px]">
                    <div className="flex items-center gap-4 text-sm">
                        <Avatar className="w-8 h-8">
                            <AvatarImage src={selectedToken.logoURI} alt="token" />
                            <AvatarFallback className="bg-primary-100/20">
                                T
                            </AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                            <div className="font-semibold">{selectedToken.name}</div>
                            <div className="font-semibold text-sm opacity-50">{selectedToken?.address ? addressPipe(selectedToken.address) : ''}</div>
                        </div>

                    </div>
                    <div className="flex items-center">
                        <TokenIdSwitcher tokenIds={selectedToken.tokenIds} tokenId={tokenId} />
                    </div>
                </div>
                <Separator />
                <div className="flex-1 whitespace-pre-wrap text-sm p-3">
                    <Tabs defaultValue="token" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 dark:bg-transparent">
                            <TabsTrigger value="token">Token</TabsTrigger>
                            <TabsTrigger value="script">Script</TabsTrigger>
                        </TabsList>
                        <TabsContent value="token">
                            {tokenId != null && (
                                <div className="w-full mx-auto p-2 max-w-[500px]">
                                    <NFTCard
                                        type={tokenType as any}
                                        chainId={selectedToken.chainId}
                                        contract={selectedToken.address}
                                        tokenId={tokenId}
                                    />
                                </div>
                            )}
                        </TabsContent>
                        <TabsContent value="script">
                            <ScriptIframe url={`${NEXT_PUBLIC_VIEWER_ROOT}/?viewType=sts-token&chain=${chainId}&contract=${selectedToken.address}&tokenId=${tokenId}`} />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    </>
    );
}
