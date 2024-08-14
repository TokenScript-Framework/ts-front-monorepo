"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/shadcn/ui/select"
import { getTokenAtom, getTokenIdAtom, setTokenIdAtom } from "@/lib/store"
import { useAtomValue, useSetAtom } from "jotai"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface TokenIdSwitcherProps {
    tokenIds: string[]
    tokenId: string
}

export function TokenIdSwitcher({
    tokenIds, tokenId
}: TokenIdSwitcherProps) {

    const [options, setOptions] = useState<string[]>([]);
    let selectedToken = useAtomValue(getTokenAtom);

    const router = useRouter()

    React.useEffect(() => {
        if (tokenIds?.length > 0) {
            setOptions(tokenIds);
        } else {
            router.push(`/home/${selectedToken.address}`)
        }

    }, [router, selectedToken.address, selectedToken.chainId, tokenIds]);



    const valueChangeHandler = (event: string) => {
        // setTokenId(event)
        router.push(`/home/${selectedToken.address}/${event}`)

    }

    return (
        <Select defaultValue={tokenId} onValueChange={(event) => valueChangeHandler(event)} >
            <SelectTrigger
                className={cn(
                    "flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0"
                )}
                aria-label="Select tokenId"
            >
                <SelectValue placeholder="Select an tokenId">
                    <span className={cn("ml-2")}>
                        {tokenId}
                    </span>
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                {options.map((option, index) => (
                    <SelectItem key={`${option}-${index}`} value={option}>
                        <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">

                            {option}
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>

    )
}
