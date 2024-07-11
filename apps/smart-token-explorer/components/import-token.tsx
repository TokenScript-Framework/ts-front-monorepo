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

interface ImportTokenProps {
    onConfirm: (type: string, address: string, tokenId?: string) => void
}

export default function ImportToken({ onConfirm }: ImportTokenProps) {
    const [address, setAddress] = useState("")
    const [tokenId, setTokenId] = useState("")
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [type, setType] = useState(TOKENTYPE_LIST[0])
    const confirmHandler = () => {

        if (!address || (type !== 'ERC20' && !tokenId)) {
            return
        }

        console.log(address, tokenId, open)
        setLoading(true)
        setTimeout(() => {
            setOpen(false)
            onConfirm(type, address, tokenId)
        }, 500);
    }
    const changeAddressHandler = (e: any) => {
        setAddress(e.target.value)
    }

    const changeTokenIdHandler = (e: any) => {
        setTokenId(e.target.value)
    }

    const checkedChangeHandler = (type: string) => {
        console.log(type)
        setType(type)
    }
    const openHandler = () => {
        console.log('#####')
        setOpen(!open)
        setAddress("")
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
                        <Label htmlFor="address" className="text-right">
                            Address
                        </Label>
                        <Input
                            id={address}
                            defaultValue={address}
                            onChange={changeAddressHandler}
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
