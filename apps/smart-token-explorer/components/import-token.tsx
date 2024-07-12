"use client"

import { useState } from "react";
import { Button } from "./shadcn/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./shadcn/ui/dialog";
import { Input } from "./shadcn/ui/input";
import { Label } from "./shadcn/ui/label";
import React from "react";
import { SpinIcon } from "@/components/icons/SpinIcon"
import { RadioGroupItem, RadioGroup } from "./shadcn/ui/radio-group";
import { TOKENTYPE_LIST } from "@/lib/constants";
import { validateToken } from "@/lib/etherService";
import { useAccount, useChainId } from "wagmi";

interface ImportTokenProps {
    onConfirm: (type: string, token: string, tokenId?: string) => void
}

export default function ImportToken({ onConfirm }: ImportTokenProps) {
    const [token, setToken] = useState("")
    const [tokenId, setTokenId] = useState("")
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [type, setType] = useState(TOKENTYPE_LIST[0])
    const [error, setError] = useState("")
    const { address } = useAccount()
    const chainId = useChainId()


    const confirmHandler = async () => {
        if (!token || (type !== 'ERC20' && !tokenId)) {
            return
        }

        console.log(token, tokenId, open)
        setLoading(true)
        if (address) {
            const validate: any = await validateToken(chainId, address, type, token, tokenId)
            if (validate.error) {
                setLoading(false)
                setError(validate.message)
            } else {
                //to import 
                setOpen(false)
                onConfirm(type, token, tokenId)
            }
        }
    }
    const changeTokenHandler = (e: any) => {
        setToken(e.target.value)
        setError("")
    }

    const changeTokenIdHandler = (e: any) => {
        setTokenId(e.target.value)
        setError("")
    }

    const checkedChangeHandler = (type: string) => {
        console.log(type)
        setType(type)
        setError("")
    }
    const openHandler = () => {
        setOpen(!open)
        setError("")
        setToken("")
        setTokenId("")
        setLoading(false)
    }

    return (<>
        <Dialog open={open} onOpenChange={openHandler} >
            <DialogTrigger asChild>
                <Button className="text-white font-bold bg-secondary-500 hover:bg-secondary-300">Import</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] bg-white dark:text-black">
                <DialogHeader>
                    <DialogTitle>Import token</DialogTitle>
                    <DialogDescription>
                        Input token address. Click save when  done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <RadioGroup defaultValue={TOKENTYPE_LIST[0]} className="flex itemx-center justify-center gap-10">
                        {TOKENTYPE_LIST.map((type, index) => (

                            <div className="flex items-center space-x-2" key={`${type}-` + index}>
                                <RadioGroupItem value={type} id={type} className="border-black" onClick={() => checkedChangeHandler(type)} />
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
                    {type !== 'ERC20' && (<>
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
                        </div></>)}

                    {error && (<div className="text-center text-red-500">
                        {error}
                    </div>)}

                </div>
                <DialogFooter>
                    <Button className="text-white font-bold bg-primary-500" onClick={confirmHandler}>
                        {loading && (
                            <SpinIcon
                                className="animate-spin h-5 w-5 text-white mr-2" />
                        )}
                        Confirm</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
    );
}
