"use client"
import { SpinIcon } from "@/components/icons/SpinIcon";
import { Button } from "@/components/shadcn/ui/button";
import { useToast } from "@/components/shadcn/ui/use-toast";
import Image from 'next/image';
import { getSymbol, isERC20 } from "@/lib/erc20Service";
import { fetchTokenIds, validateContract, validateToken } from "@/lib/etherService";
import { getDevModeAtom, setTokenTypeAtom, tokenListAtom } from "@/lib/store";
import { addToken, loadTokenList, TokenType } from "@/lib/tokenStorage";
import { addressPipe } from "@/lib/utils";
import { useChainModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { useAtomValue, useSetAtom } from "jotai";
import { Plus } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { useAccount, useChainId } from "wagmi";

export default function ImportPage({
    params,
}: {
    params: { type: TokenType; chain: number, contract: `0x${string}` };
}) {
    const { type, chain, contract } = params

    const currentChainId = useChainId()
    const setTokenType = useSetAtom(setTokenTypeAtom);
    const { openChainModal } = useChainModal();
    const { address } = useAccount()
    let devMode = useAtomValue(getDevModeAtom);
    const { toast } = useToast();
    const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
    const setTokenList = useSetAtom(tokenListAtom);
    const [error, setError] = useState("");
    const [fetching, setFetching] = useState(false);
    const [contractMetada, setContractMetada] = useState<{ [key: string]: any }>({});
    const [tokenIdsWithMetadata, setTokenIdsWithMetadata] = useState<unknown[]>([]);

    useEffect(() => {
        if (type) {
            setTokenType(type as TokenType)
        }

    }, [setTokenType, type])

    if (Number(chain) !== currentChainId && openChainModal) {
        openChainModal()
    }

    const isImported = useCallback((owner: `0x${string}`, tokenId?: string) => {
        const tokenList = loadTokenList(owner)[type];
        console.log("tokenList", tokenList, type, owner, loadTokenList(owner))
        const filterResult = tokenList.filter((token) => Number(token.chainId) === Number(chain)
            && token.address === contract
            && (tokenId ? token.tokenIds?.includes(tokenId) : true)
        );
        console.log('filterResult', contract, filterResult)
        return filterResult.length > 0;
    }, [chain, contract, type])

    const getERC20Symbol = useCallback(async () => {
        let symbol = await getSymbol(contract, chain.toString())
        console.log('symbol', symbol)
        setContractMetada({ symbol, imported: address ? isImported(address) : false }
        )
        setFetching(false);
    }, [address, chain, contract, isImported])

    useEffect(() => {
        const initTokenIds = async (address: `0x${string}`) => {
            console.log(currentChainId, chain, chain === currentChainId)
            const validate: any = await validateContract(
                devMode,
                Number(chain),
                type,
                contract,
                type === "ERC20" ? await isERC20(contract, chain) : false
            );
            console.log("validate", validate)
            if (validate.error) {
                setFetching(false);
                setError(validate.message);
            } else {
                setContractMetada(validate)
                try {

                    fetchTokenIds(contract, address, chain, type).then(async (list) => {
                        const results = list.map((token: any) => ({ ...token, imported: isImported(address, token.tokenId) }));
                        console.log("tokenIdsWithMetadata", results)

                        setTokenIdsWithMetadata(results);
                        setFetching(false);
                    })
                } catch (error) {
                    console.log('error', error)
                    setFetching(false);
                }
            }

        }



        if (contract && address) {
            setFetching(true);
            if (type !== 'ERC20') {
                initTokenIds(address);
            } else {
                getERC20Symbol()
            }
        }
    }, [address, chain, contract, currentChainId, devMode, getERC20Symbol, isImported, type]);


    const importHandler = async (tokenId?: string) => {
        console.log("import", address)
        try {
            if (address) {
                setError("")
                setLoading({
                    ...loading,
                    [`${tokenId}`]: true
                });
                const validate: any = await validateToken(
                    devMode,
                    Number(chain),
                    address,
                    type,
                    contract,
                    tokenId,
                    type === "ERC20" ? await isERC20(contract, chain) : false
                );
                if (validate.error) {
                    setLoading({
                        ...loading,
                        [`${tokenId}`]: false
                    });
                    setError(validate.message);

                } else {

                    if (type === "ERC20") {
                        addToken(address, type, {
                            signed: validate.signed,
                            chainId: chain,
                            address: contract,
                            name: await getSymbol(contract, chain.toString())
                        });
                    } else {
                        console.log("validate", validate)
                        addToken(address, type, {
                            signed: validate.signed,
                            chainId: chain,
                            address: contract,
                            tokenId: tokenId,
                            name: validate.name,
                            logoURI: validate.image
                        });
                    }


                    setTokenList(loadTokenList(address));
                    if (type !== 'ERC20') {
                        const results = tokenIdsWithMetadata.map((token: any) => ({ ...token, imported: isImported(address, token.tokenId) }));
                        setTokenIdsWithMetadata(results);
                    } else {
                        getERC20Symbol()
                    }
                    toast({
                        title: "Import token",
                        description: "you've import token successfully!",
                        className: "bg-secondary-500 text-black",
                    });
                }
            }
        } catch (error) {
            console.log("error", error)
            setError("Error importing token");
        } finally {
            setLoading({
                ...loading,
                [`${tokenId}`]: false
            });
        }
    }

    return (<>
        <div className="w-full px-8 max-h-[100vh] overflow-y-auto">
            <h1 className="text-2xl font-bold">Import Token</h1>
            {contractMetada?.image &&
                <div className="flex justify-start items-center">
                    <Image
                        src={contractMetada.image}
                        alt="SmartCat"
                        objectFit="contain"
                        width="100" height="100"
                    />

                    <div className="ml-2">
                        <div><b>Contract:</b> {addressPipe(contract)}</div>
                        <div><b>Name: </b> {contractMetada?.name}</div>
                        {!fetching &&
                            <div><b>Tokens: </b> {tokenIdsWithMetadata.length}</div>
                        }
                    </div>
                </div>
            }
            {type === 'ERC20' && (<>
                <div><b>Contract:</b> {addressPipe(contract)}</div>
                <div><b>Symbol:</b> {contractMetada?.symbol}</div>
                {contractMetada?.imported && (<div><b>Imported</b></div>)}
            </>)}
            {address && (
                <>
                    {fetching && <div className="text-center text-gray-500 flex justify-center items-center mt-20">
                        <SpinIcon className="mr-2 h-5 w-5 animate-spin text-black" /> Validating token ...</div>}

                    <div className="grid grid-cols-3 gap-20 my-8 text-center">
                        {tokenIdsWithMetadata.map((token: any) => (
                            <div key={token.tokenId} className="border border-gray-300 rounded-md p-2">
                                <div className="">
                                    <Image
                                        src={token.metadata.image}
                                        alt={token.metadata.name || "Token image"}
                                        width="100" height="100"
                                        objectFit="contain"
                                        className="w-full"
                                    />
                                </div>
                                <div className="text-sm my-2 text-left font-bold">#{token.tokenId}</div>
                                <div className="text-sm my-2 text-left">{token.metadata.name}</div>

                                {token.imported ? (<>
                                    <a href={`/${type}/${chain}/${contract}/${token.tokenId}`} className="underline  hover:text-blue-500 cursor-pointer" target="_blank">View Token</a>
                                </>) : (
                                    <Button className="bg-secondary-500 hover:bg-secondary-300 font-bold text-white w-full text-base gap-1 w-[120px]" onClick={() => importHandler(token.tokenId)} disabled={loading[token.tokenId]}>
                                        {loading[token.tokenId] ? (
                                            <SpinIcon className="mr-2 h-5 w-5 animate-spin text-white" />
                                        ) : (
                                            <Plus className="w-5 h-5" />
                                        )}
                                        Import
                                    </Button>)}

                            </div>
                        ))}

                    </div>
                    {type === 'ERC20' && !fetching && (<>
                        <div className="text-center">
                            {!contractMetada?.imported && (<Button className="bg-secondary-500 hover:bg-secondary-300 font-bold text-white w-full text-base gap-1 w-[120px]" onClick={() => importHandler('0')}>
                                {loading["0"] ? (
                                    <SpinIcon className="mr-2 h-5 w-5 animate-spin text-white" />
                                ) : (
                                    <Plus className="w-5 h-5" />
                                )}
                                Import
                            </Button>)}

                        </div>
                    </>)}



                    {error && <div className="text-center text-red-500 mt-4">{error}</div>}
                </>)}

        </div>
    </>
    );
}
