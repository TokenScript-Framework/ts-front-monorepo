"use client"
import { useAccount } from "wagmi";
import { TokenCollection, TokenType } from "@/lib/tokenStorage"
import { Separator } from "@/components/shadcn/ui/separator";
import { addressPipe } from "@/lib/utils";
import { useAtomValue, useSetAtom } from "jotai";
import { getTokenTypeAtom, getTokenAtom, tokenListAtom, setTokenAtom, getDevModeAtom, setImportContractAtom, setTokenTypeAtom } from "@/lib/store";
import { useEffect } from "react";
import { TokenIdSwitcher } from "@/components/tokenid-switcher";
import { TabsList, TabsTrigger, Tabs, TabsContent } from "@/components/shadcn/ui/tabs";
import { TokenCard } from "@/components/token-kit/token-card";
import { NEXT_PUBLIC_VIEWER_ROOT } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { ScriptIframe } from "@/components/script-Iframe";
import EmptyToken from "@/components/empty-token";
import { ShareToTg } from '@/components/share-to-tg';
import { ImportButton } from "@/components/import-button";

export default function TokenIdPage({
    params,
}: {
    params: { type: string; chain: number, contract: string; tokenId: string };
}) {
    console.log('params', params)
    const { address, chainId } = useAccount();
    const { type, contract, tokenId, chain } = params

    let tokenType = useAtomValue(getTokenTypeAtom);
    const setTokenType = useSetAtom(setTokenTypeAtom);
    let selectedToken = useAtomValue(getTokenAtom);
    const tokenListMap = useAtomValue(tokenListAtom);
    const setToken = useSetAtom(setTokenAtom);
    const router = useRouter()
    let devMode = useAtomValue(getDevModeAtom);
    const setImportContract = useSetAtom(setImportContractAtom);

    useEffect(() => {
        if (tokenId === 'import') {
            setTokenType(type)
            setImportContract({
                chain,
                contract,
                tokenId,
                type: type
            })
        }

        // if (type === 'ERC20' && tokenId !== 'import') {
        //     console.log('import-- replace', tokenType, chainId, contract)
        //     router.replace(`/${tokenType}/${chainId}/${contract}`)
        // }
    }, [chain, chainId, contract, router, setImportContract, setTokenType, tokenId, tokenType, type])

    useEffect(() => {
        if (tokenType && tokenId !== 'import') {
            let tokenList: TokenCollection[] = tokenListMap[tokenType as TokenType];
            if (tokenList.length > 0) {
                if (address && (!selectedToken || selectedToken.address !== contract)) {
                    const filterResult = tokenList.filter((token) => Number(token.chainId) === (chainId) && token.signed === !devMode);
                    if (filterResult.length === 1) {
                        setToken(filterResult[0])
                    }
                }
            } else {
                console.log('replace-- tokenidtpage', tokenType, chainId)
                router.replace(`/${tokenType}/${chainId}`)
            }
            console.log('tokenList-----', tokenList)

        }
    }, [address, chainId, contract, devMode, router, selectedToken, setToken, tokenId, tokenListMap, tokenType])


    if (!address || !selectedToken.address) {
        return (
            <EmptyToken />
        )
    }
    return (selectedToken && selectedToken.address && tokenId !== 'import' && <>
        <div className="flex h-full flex-col">
            <div className="flex flex-1 flex-col">
                <div className="flex justify-between px-4 pl-2 h-[52px]">
                    <div className="flex items-center gap-4 text-sm">
                        {/* <Avatar className="w-8 h-8">
                            <AvatarImage src={selectedToken.logoURI} alt="token" />
                            <AvatarFallback className="bg-primary-100/20">
                                T
                            </AvatarFallback>
                        </Avatar> */}
                        <div className="grid gap-1">
                            <div className="font-semibold">{selectedToken.name}</div>
                            <div className="font-semibold text-sm opacity-50">{selectedToken?.address ? addressPipe(selectedToken.address) : ''}</div>
                        </div>

                    </div>
                    <div className="flex items-center gap-2">
                        <ImportButton contract={selectedToken.address} tokenId={tokenId} chain={chainId?.toString() ?? ''} title={'S'}  cssClass={'rounded-full min-w-6 h-6 p-0'} />
                        <ShareToTg />
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
                                    <TokenCard
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
