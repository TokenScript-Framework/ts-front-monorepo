"use client"
import { useAccount, useChainId, useReadContracts } from "wagmi";
import { TokenCollection, TokenType } from "@/lib/tokenStorage"
import { Separator } from "@/components/shadcn/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/shadcn/ui/avatar";
import { addressPipe } from "@/lib/utils";
import { useAtomValue, useSetAtom } from "jotai";
import { getTokenTypeAtom, getTokenAtom, tokenListAtom, setTokenAtom } from "@/lib/store";
import { useEffect, useState } from "react";
import { SpinIcon } from "@/components/icons/SpinIcon";
import { erc20Abi } from "viem";
import BigNumber from "bignumber.js";

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
    const chain = useChainId()
    let token: any = { balance: 0, name: '', symbol: "", decimals: 0 }
    const { data: erc20Data, isFetching: isFetchingERC20Info } = useReadContracts(
        {
            contracts: contractsForErc20(chain, contract, address!),
            query: {
                enabled: !!address,
            },
        },
    );


    token.name = erc20Data?.[1]?.result;
    token.symbol = erc20Data?.[2]?.result;
    token.decimals = erc20Data?.[3]?.result;

    token.balance = erc20Data?.[0]?.result && token.decimals ? new BigNumber(erc20Data?.[0]?.result.toString())
        .dividedBy(new BigNumber(10 ** Number(token.decimals)))
        .toString() : 0

    useEffect(() => {

        console.log(address && (!selectedToken || selectedToken.address !== contract))
        if (address && (!selectedToken || selectedToken.address !== contract)) {

            let tokenList: TokenCollection[] = tokenListMap[tokenType];
            const filterResult = tokenList.filter((token) => token.signed);
            if (filterResult.length === 1) {
                setToken(filterResult[0])
            }
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
                    {isFetchingERC20Info ? (<>
                        <SpinIcon className="mr-2 h-5 w-5 animate-spin text-black" />
                    </>) : (<><div>Balance: {token.balance}</div>
                        <div>Decimals: {token.decimals}</div></>)}

                </div>
            </div>

        </div>
    </>
    );

}

function contractsForErc20(chainId: number, constract: `0x${string}`, walletAddress: string) {

    console.log('contractsForErc20--', constract, walletAddress)
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
