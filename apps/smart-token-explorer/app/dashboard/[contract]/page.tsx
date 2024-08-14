"use client"
import { useAccount, useChainId } from "wagmi";
import { TokenCollection, TokenType } from "@/lib/tokenStorage"
import { Separator } from "@/components/shadcn/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/shadcn/ui/avatar";
import { addressPipe } from "@/lib/utils";
import { useAtomValue, useSetAtom } from "jotai";
import { getTokenTypeAtom, getTokenAtom, tokenListAtom, setTokenAtom } from "@/lib/store";
import { useEffect, useState } from "react";
import { getTokenInfo } from "@/lib/etherService";
import { SpinIcon } from "@/components/icons/SpinIcon";

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
    const [tokenInfo, setTokenInfo] = useState({ balance: '0', decimals: '0' });
    const [loading, setLoading] = useState(false)
    const chain = useChainId()
    console.log('chain--', chain)

    useEffect(() => {
        const getBalanceValue = async () => {
            setLoading(true)
            const tokenInfo = await getTokenInfo(contract, address, chain)
            console.log(tokenInfo)
            setTokenInfo(tokenInfo)
            setLoading(false)
        }
        console.log(address && (!selectedToken || selectedToken.address !== contract))
        if (address && (!selectedToken || selectedToken.address !== contract)) {

            let tokenList: TokenCollection[] = tokenListMap[tokenType];
            const filterResult = tokenList.filter((token) => token.signed);
            if (filterResult.length === 1) {
                setToken(filterResult[0])
            }
        }
        if (address && chain) {
            getBalanceValue()
        }
    }, [address, chain, contract, selectedToken, setToken, tokenListMap, tokenType])

    return (selectedToken && selectedToken.address && <>
        <div className="flex h-full flex-col">
            <div className="flex flex-1 flex-col">
                <div className="flex justify-between px-4 pl-2">
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

                </div>
                <Separator />
                <div className="flex-1 whitespace-pre-wrap text-sm p-4">
                    {loading ? (<>
                        <SpinIcon className="mr-2 h-5 w-5 animate-spin text-black" />
                    </>) : (<><div>Balance: {tokenInfo.balance}</div>
                        <div>Decimals: {tokenInfo.decimals}</div></>)}

                </div>
            </div>

        </div>
    </>
    );
}
