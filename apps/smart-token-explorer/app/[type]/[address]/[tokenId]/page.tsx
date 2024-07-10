"use client"
import { Button } from "@/components/shadcn/ui/button"
import { Card, CardContent, CardTitle } from "@/components/shadcn/ui/card"
import { addressPipe } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/shadcn/ui/avatar"
import { useAccount } from "wagmi"
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useSetAtom } from "jotai"
import { setTokenTypeAtom } from "@/lib/store"



export default function ERC20Page({
    params,
}: {
    params: { address: string, type: string, tokenId: string }
}) {


    const { address } = useAccount()

    const setTokenType = useSetAtom(setTokenTypeAtom)

    const router = useRouter()
    console.log(params)
    const token = {
        "name": "COSCon’22 Collectible",
        "description": "We really appreciate your participation to COSCon’22 and hope to see you again the next year.",
        "image": "ipfs://bafybeicc4vygaek76mkbaywa53zbr35etjqodjfifqicycpfdnbupz4gem",
        "address": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        "chainId": 1,
        "tokenId": 12344
    }
    useEffect(() => {
        setTokenType(params.type)
    }, [setTokenType])
    return (
        <section className="min-h-screen fancy-overlay bg-primary-100/20 dark:bg-primary-900/10 pt-8">
            <div className="container-wide mx-auto">
                {!address ? (<>

                    <div className="font-bold text-2xl text-center mt-10">
                        Please connect wallet to view detail.
                    </div>
                </>) : (
                    <>
                        <Card className="w-1/3 mx-auto min-h-[500px] text-center">

                            <CardTitle className="relative" >
                                <div className="absolute top-2 left-2 cursor-pointer  hover:bg-primary-300 hover:rounded-full hover:text-white" onClick={() => router.back()}><ChevronLeftIcon /></div>
                                <div className="mt-8 flex justify-center gap-2 items-center">
                                    <Avatar>
                                        <AvatarImage src={token.logoURI} alt="token" />
                                        <AvatarFallback className="bg-primary-100/20">T</AvatarFallback>
                                    </Avatar>

                                    <span>{token.name}</span>
                                </div>
                                <a className="text-sm text-gray-500 underline hover:text-primary-500 cursor-pointer" >{addressPipe(token.address)}</a>
                            </CardTitle>

                            <CardContent>


                                <Button variant="outlinePrimary">Transfer</Button>
                            </CardContent>

                        </Card>
                    </>)}

            </div></section>
    )
}
