"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/shadcn/ui/avatar";

import Image from "@/components/shadcn/Image";
import { Card, CardTitle, CardContent } from "@/components/shadcn/ui/card";

import { addressPipe, rewriteUrlIfIFPSUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface TokenProps {
    type: string,
}

export default function MyTokenList({ type }: TokenProps) {
    let tokenList: any[] = []
    const router = useRouter()

    if (tokenList.length == 0) {
        switch (type) {
            case 'ERC20': {
                tokenList = [{
                    "name": "Wrapped Ether",
                    "address": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
                    "symbol": "WETH",
                    "decimals": 18,
                    "chainId": 1,
                    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
                    "balance": 0.002
                }]
                break
            }
            case 'ERC721': {
                tokenList = [{
                    "name": "COSCon’22 Collectible",
                    "description": "We really appreciate your participation to COSCon’22 and hope to see you again the next year.",
                    "image": "ipfs://bafybeicc4vygaek76mkbaywa53zbr35etjqodjfifqicycpfdnbupz4gem",
                    "address": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
                    "chainId": 1,
                    "tokenId": 12344
                }]
                break
            }
            default: {
                tokenList = [{
                    "name": "COSCon 11 Collectible",
                    "description": "We really appreciate your participation to COSCon’22 and hope to see you again the next year.",
                    "image": "ipfs://bafybeicc4vygaek76mkbaywa53zbr35etjqodjfifqicycpfdnbupz4gem",
                    "address": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
                    "chainId": 1,
                    "tokenId": 355
                }]

                break
            }
        }
    }


    const loadNFTHandler = (address: string, tokenId: string) => {
        if (tokenId) {
            router.push(`/${type}/${address}/${tokenId}`)
        } else {
            router.push(`/${type}/${address}`)
        }

    }
    return (
        <section className="min-h-screen fancy-overlay pt-4">
            <div className="container-wide mx-auto grid grid-cols-3 gap-8" key={type}>

                {tokenList.map((token, index) => (
                    <>
                        <Card className="text-center p-8 dark:bg-gray-900 cursor-pointer" onClick={() => loadNFTHandler(token.address, token.tokenId)} key={`${type}` + index}>
                            <CardTitle >
                                <div className="flex justify-center gap-2 items-center">
                                    <Avatar>
                                        <AvatarImage src={token.logoURI ? token.logoURI : rewriteUrlIfIFPSUrl(token.image)} alt="token" />
                                        <AvatarFallback className="bg-primary-100/20">T</AvatarFallback>
                                    </Avatar>

                                    <span>{token.name}</span>
                                </div>
                                <a className="text-sm text-gray-500 underline hover:text-primary-500" >{addressPipe(token.address)}</a>
                            </CardTitle>
                            <CardContent>
                                {type === 'ERC20' ? (
                                    <>
                                        <div className="flex justify-between text-gray-500 dark:text-[#B3B3B3]" key={`${type}` + index}>

                                            <div>ChainId</div>
                                            <div>Symbol</div>
                                        </div>
                                        <div className="flex justify-between font-bold">
                                            <div>{token.chainId}</div>
                                            <div>{token.symbol}</div>
                                        </div><br />
                                        <div className="flex justify-between opacity-7 text-gray-500 dark:text-[#B3B3B3]" key={index}>

                                            <div>Balance</div>
                                            <div>Decimals</div>
                                        </div>
                                        <div className="flex justify-between font-bold">
                                            <div>{token.balance}</div>
                                            <div>{token.decimals}</div>
                                        </div>

                                    </>) : (<>
                                        <div className="text-center" key={index} >
                                            <div className="mt-2">
                                                <div>{token.description}</div>

                                            </div>
                                        </div>
                                    </>)}

                            </CardContent>
                        </Card>
                    </>
                ))}
            </div>

        </section>
    );
}
