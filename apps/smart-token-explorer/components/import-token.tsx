"use client";

import { SpinIcon } from "@/components/icons/SpinIcon";
import { TOKENTYPE_LIST } from "@/lib/constants";
import { getSymbol, validateToken } from "@/lib/etherService";
import { getDevModeAtom, getTokenTypeAtom, tokenListAtom } from "@/lib/store";
import { addToken, loadTokenList, Token, TokenType } from "@/lib/tokenStorage";
import { useAtomValue, useSetAtom } from "jotai";
import React, { useState } from "react";
import { useAccount, useChainId } from "wagmi";
import { Button } from "./shadcn/ui/button";
import {
    Dialog,
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


export default function ImportToken() {
    const [token, setToken] = useState<`0x${string}`>("0x0");
    const [tokenId, setTokenId] = useState<string | undefined>('');
    const [open, setOpen] = React.useState(false);
    const devMode = useAtomValue(getDevModeAtom);
    const [loading, setLoading] = React.useState(false);
    let tokenType = useAtomValue(getTokenTypeAtom);
    const [type, setType] = useState<TokenType>(tokenType as TokenType);
    const [error, setError] = useState("");
    const { address } = useAccount();
    const chainId = useChainId();
    const { toast } = useToast();
    const setTokenList = useSetAtom(tokenListAtom);

    const confirmHandler = async () => {
        try {
            if (!token || (type !== "ERC20" && !tokenId)) {
                return;
            }

            setLoading(true);
            if (address) {
                console.log(chainId)
                const validate: any = await validateToken(
                    devMode,
                    chainId,
                    address,
                    type,
                    token,
                    tokenId,
                );
                if (validate.error) {
                    setLoading(false);
                    setError(validate.message);
                } else {
                    //to import
                    setOpen(false);

                    if (!address) return;
                    if (type === "ERC20") {
                        addToken(address, type, {
                            signed: validate.signed,
                            chainId,
                            address: token,
                            name: await getSymbol(token, chainId.toString())
                        });
                    } else {
                        addToken(address, type, {
                            signed: validate.signed,
                            chainId,
                            address: token,
                            tokenId: tokenId,
                            name: 'imported' //todo
                        });
                    }

                    setTokenList(loadTokenList(address));

                    toast({
                        title: "Import token",
                        description: "you've import token successfully!",
                        className: "bg-secondary-500 text-black",
                    });
                }
            }
        } catch (e: any) {
            console.log(e.message)
            setError(e.message);
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
        setOpen(!open);
        setError("");
        // setToken("0x0");
        // setTokenId("");
        setLoading(false);
    };

    return (
        <>
            <Dialog open={open} onOpenChange={openHandler}>
                <DialogTrigger asChild>
                    <Button className="bg-secondary-500 hover:bg-secondary-300 font-bold text-white w-full">
                        + Import
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
                                        placeholder="Token Id (optional)"
                                        className="col-span-4"
                                    />
                                </div>
                            </>
                        )}

                        {error && <div className="text-center text-red-500">{error}</div>}
                    </div>
                    <DialogFooter>
                        <Button
                            className="bg-primary-500 font-bold text-white"
                            onClick={confirmHandler}
                        >
                            {loading && (
                                <SpinIcon className="mr-2 h-5 w-5 animate-spin text-white" />
                            )}
                            Confirm
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
