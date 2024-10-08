"use client"
import { useAccount, useChainId } from "wagmi";
import { TokenCollection, TokenType } from "@/lib/tokenStorage"
import { Separator } from "@/components/shadcn/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/shadcn/ui/avatar";
import { addressPipe } from "@/lib/utils";
import { useAtomValue, useSetAtom } from "jotai";
import { getTokenTypeAtom, getTokenAtom, tokenListAtom, setTokenAtom, getDevModeAtom } from "@/lib/store";
import { useEffect, useState } from "react";
import { erc20Abi } from "viem";
import { useRouter } from "next/navigation";
import { TokenCard } from "@/components/token-kit/token-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/ui/tabs";
import { ScriptIframe } from "@/components/script-Iframe";
import { NEXT_PUBLIC_VIEWER_ROOT } from "@/lib/constants";
import { ImportButton } from "@/components/import-button";

export default function ContractPage({
    params,
}: {
    params: { contract: `0x${string}`; };
}) {
    const { address } = useAccount();
    const { contract } = params

    let tokenType = useAtomValue(getTokenTypeAtom);
    let selectedToken = useAtomValue(getTokenAtom);
    const tokenListMap = useAtomValue(tokenListAtom);
    const setToken = useSetAtom(setTokenAtom);
    const router = useRouter()
    const chainId = useChainId()
    let devMode = useAtomValue(getDevModeAtom);




    useEffect(() => {

        if (address && (!selectedToken || selectedToken.address !== contract)) {

            let tokenList: TokenCollection[] = tokenListMap[tokenType as TokenType];
            const filterResult = tokenList?.filter((token) => Number(token.chainId) === (chainId) && token.signed === !devMode);
            if (filterResult?.length === 1) {
                setToken(filterResult[0])
            }
        }
        // if (tokenType !== 'ERC20') {
        //     router.replace(`/${tokenType}/${chainId}`)
        // }

    }, [address, chainId, contract, devMode, router, selectedToken, setToken, tokenListMap, tokenType])

    return (selectedToken && selectedToken.address && <>
        <div className="flex h-full flex-col">
            <div className="flex flex-1 flex-col">
                <div className="flex justify-between px-3flex-1 whitespace-pre-wrap text-sm p-3 py-2 h-[52px]">
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
                    <div className="flex items-center gap-2">
                        <ImportButton contract={selectedToken.address} chain={chainId?.toString()} title={'S'}  cssClass={'rounded-full min-w-6 h-6 p-0'} />
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
                            <div className="w-full mx-auto p-2 max-w-[500px]">
                                <TokenCard
                                    type={tokenType as any}
                                    chainId={selectedToken.chainId}
                                    contract={selectedToken.address}
                                    wallet={address}
                                />
                            </div>
                        </TabsContent>
                        <TabsContent value="script">
                            <ScriptIframe url={`${NEXT_PUBLIC_VIEWER_ROOT}/?viewType=sts-token&chain=${chainId}&contract=${selectedToken.address}`} />
                        </TabsContent>
                    </Tabs>

                </div>
            </div>

        </div>
    </>
    );

}

function contractsForErc20(chainId: number, constract: `0x${string}`, walletAddress: string) {

    const contractInfo = [
        {
            chainId: chainId,
            address: constract,
            abi: erc20Abi,
            functionName: "name",
        },
        {
            chainId: chainId,
            address: constract,
            abi: erc20Abi,
            functionName: "symbol",
        },
        {
            chainId: chainId,
            address: constract,
            abi: erc20Abi,
            functionName: "decimals",
        },
    ];
    const balanceInfo = {
        chainId: chainId,
        address: constract,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [walletAddress],
    };

    return [balanceInfo, ...contractInfo]
}
