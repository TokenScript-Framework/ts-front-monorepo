"use client";

import { SpinIcon } from "@/components/icons/SpinIcon";
import { TOKENTYPE_LIST } from "@/lib/constants";
import { validateToken } from "@/lib/etherService";
import { getDevModeAtom, getTokenTypeAtom, setImportContractAtom, setTokenAtom, tokenListAtom } from "@/lib/store";
import { addToken, loadTokenList, TokenType } from "@/lib/tokenStorage";
import { useAtomValue, useSetAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { useAccount, useChainId, useSwitchChain } from "wagmi";
import { Button } from "./shadcn/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./shadcn/ui/dialog";
import { Input } from "./shadcn/ui/input";
import { Label } from "./shadcn/ui/label";
import { RadioGroup, RadioGroupItem } from "./shadcn/ui/radio-group";
import { useToast } from "./shadcn/ui/use-toast";
import { isERC20, getSymbol } from "@/lib/erc20Service";
import { Plus } from "lucide-react";
import { useChainModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { WalletButton } from "./wallet-button";
import { useRouter } from "next/navigation";

interface ImportProps {
    importContract?: Record<string, any>;
}

export default function ImportToken({ importContract }: ImportProps) {
    const [token, setToken] = useState<`0x${string}`>("0x0");
    const [tokenId, setTokenId] = useState<string | undefined>('');
    const [open, setOpen] = React.useState(false);
    const devMode = useAtomValue(getDevModeAtom);
    const [loading, setLoading] = React.useState(false);
    const tokenType = useAtomValue(getTokenTypeAtom);
    const [type, setType] = useState<TokenType>(tokenType as TokenType);
    const [error, setError] = useState("");
    const { address, chainId } = useAccount();
    const { toast } = useToast();
    const setTokenList = useSetAtom(tokenListAtom);
    const setImportContract = useSetAtom(setImportContractAtom);
    const setSelectedToken = useSetAtom(setTokenAtom);
    const { chainModalOpen, openChainModal } = useChainModal();
    const { openConnectModal } = useConnectModal();
    const router = useRouter()


    useEffect(() => {
        if (importContract?.contract && chainId !== undefined) {
            console.log('import---', new Date().getTime())
            const isCorrectChain = importContract.chain.toString() === chainId.toString()
            if (!isCorrectChain) {
                if (openChainModal && !chainModalOpen) {
                    openChainModal()
                }
            } else {
                setToken(importContract.contract)
                setType(importContract.type)
                setOpen(true)
            }
        }



    }, [chainId, chainModalOpen, importContract?.chain, importContract?.contract, importContract?.type, openChainModal])

    const confirmHandler = async () => {
        try {
            if (!token || (type !== "ERC20" && !tokenId)) {
                setError("Please input correct tokenId or token address");
                return;
            }

            if (address && chainId) {
                setLoading(true);
                const validate: any = await validateToken(
                    devMode,
                    chainId,
                    address,
                    type,
                    token,
                    tokenId,
                    type === "ERC20" ? await isERC20(token, chainId) : false
                );
                console.log(validate);
                if (validate.error) {
                    setLoading(false);
                    setError(validate.message);
                } else {
                    if (!address) return;

                    if (type === "ERC20") {
                        const newToken = {
                            signed: validate.signed,
                            chainId,
                            address: token,
                            tokenId: tokenId,
                            name: validate.name,
                            logoURI: validate.image
                        }
                        addToken(address, type, newToken);
                        setSelectedToken(newToken)

                    } else {
                        const newToken = {
                            signed: validate.signed,
                            chainId,
                            address: token,
                            tokenId: tokenId,
                            name: validate.name,
                            logoURI: validate.image
                        }
                        addToken(address, type, newToken);
                        setSelectedToken(newToken)
                    }


                    setTokenList(loadTokenList(address));

                    router.replace(`/${tokenType}/${chainId}/${token}${tokenId ? `/${tokenId}` : ''}`)
                    toast({
                        title: "Import token",
                        description: "you've import token successfully!",
                        className: "bg-secondary-500 text-black",
                    });

                    setImportContract({})
                    setOpen(false)
                }
            }
        } catch (e: any) {
            console.log(e.message)
            setError(e.message);
        } finally {
            setLoading(false);
        }

    };

    const changeTokenHandler = (e: any) => {
        setToken(e.target.value);
        setError("");
    };

    const changeTokenIdHandler = (e: any) => {
        setTokenId(e.target.value);
        setError("");
    };

    const checkedChangeHandler = (type: TokenType) => {
        setType(type);
        setError("");
    };
    const openHandler = () => {
        console.log('openHandler', open)
        setOpen(!open);
        setToken("0x0");
        setTokenId("");
        setError("");
        setLoading(false);
        if (open && importContract?.contract) {
            setImportContract({})
            router.replace(`/${tokenType}/${chainId}`)
        }
    };

    const connectHandler = () => {
        console.log('connectHandler', openConnectModal)
        if (openConnectModal) {
            setOpen(false);
            openConnectModal();
        }
    }

    return (
        <>
            <Dialog open={open} onOpenChange={openHandler} >
                <DialogTrigger asChild>
                    <Button className="bg-secondary-500 hover:bg-secondary-300 font-bold text-white w-full text-base gap-1">
                        <div><Plus className="w-5 h-5" /></div> Import
                    </Button>
                </DialogTrigger>
                <DialogContent className="bg-white sm:max-w-[600px] dark:text-black">
                    <DialogHeader>
                        <DialogTitle>Import token</DialogTitle>
                        <DialogDescription>
                            Input token address. Click save when done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <RadioGroup
                            defaultValue={tokenType}
                            className="itemx-center flex justify-center gap-10"
                        >
                            {TOKENTYPE_LIST.map((type, index) => (
                                <div
                                    className="flex items-center space-x-2"
                                    key={`${type}-` + index}
                                >
                                    <RadioGroupItem
                                        value={type}
                                        id={type}
                                        className="border-black"
                                        onClick={() => checkedChangeHandler(type)}
                                    />
                                    <Label htmlFor={type}>{type}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                        <div className="grid grid-cols-5 items-center gap-4">
                            <Label htmlFor="token" className="text-right">
                                Token
                            </Label>
                            <Input
                                id={token}
                                defaultValue={token}
                                onChange={changeTokenHandler}
                                placeholder="Token Address"
                                className="col-span-4"
                            />
                        </div>
                        {type !== "ERC20" && (
                            <>
                                <div className="grid grid-cols-5 items-center gap-4">
                                    <Label htmlFor="tokenId" className="text-right">
                                        Token Id
                                    </Label>
                                    <Input
                                        id={tokenId}
                                        defaultValue={tokenId}
                                        onChange={changeTokenIdHandler}
                                        placeholder="Token Id"
                                        className="col-span-4"
                                    />
                                </div>
                            </>
                        )}

                        {error && <div className="text-center text-red-500">{error}</div>}
                    </div>
                    <DialogFooter>
                        {address ? (<Button
                            className="bg-primary-500 font-bold text-white"
                            onClick={confirmHandler}
                        >
                            {loading && (
                                <SpinIcon className="mr-2 h-5 w-5 animate-spin text-white" />
                            )}
                            Confirm
                        </Button>) : (<Button onClick={connectHandler} className="text-white font-bold  p-2 text-base bg-primary-500 hover:bg-primary-300">
                            Connect Wallet
                        </Button>)}

                    </DialogFooter>
                </DialogContent>
            </Dialog >
        </>
    );
}
