
import { Avatar, AvatarFallback, AvatarImage } from "@/components/shadcn/ui/avatar";

import Image from "@/components/shadcn/Image";
import { Card, CardHeader, CardTitle } from "@/components/shadcn/ui/card";

import { addressPipe } from "@/lib/utils";

interface TokenProps {
    type: string
}

export default function MyTokenList({ type }: TokenProps) {


    const TokenList = [
        {
            address: "0xf1731D81BC7be92DBD9b759a63ECAFaA569C7D0a",
            avatar: "/images/tokens/eth.svg",
            image: "https://resources.smartlayer.network/smartcat/reources/images/e5fd0c706c4eb3cc7f4295797f91e02e.png",
            tokenId: '#234567',
            balance: 2.001
        }, {
            address: "0xf1731D81BC7be92DBD9b759a63ECAFaA569C7D0a",
            avatar: "/images/tokens/ens.png",
            image: "https://resources.smartlayer.network/smartcat/reources/images/e5fd0c706c4eb3cc7f4295797f91e02e.png",
            tokenId: '#234567',
            balance: 2.001
        }, {
            address: "0xf1731D81BC7be92DBD9b759a63ECAFaA569C7D0a",
            avatar: "/images/tokens/ETH.svg",
            image: "https://resources.smartlayer.network/smartcat/reources/images/e5fd0c706c4eb3cc7f4295797f91e02e.png",
            tokenId: '#234567',
            balance: 2.001
        }, {
            address: "0xf1731D81BC7be92DBD9b759a63ECAFaA569C7D0a",
            avatar: "/images/tokens/ETH.svg",
            image: "https://resources.smartlayer.network/smartcat/reources/images/e5fd0c706c4eb3cc7f4295797f91e02e.png",
            tokenId: '#234567',
            balance: 2.001
        }, {
            address: "0xf1731D81BC7be92DBD9b759a63ECAFaA569C7D0a",
            avatar: "/images/tokens/ETH.svg",
            image: "https://resources.smartlayer.network/smartcat/reources/images/e5fd0c706c4eb3cc7f4295797f91e02e.png",
            tokenId: '#234567',
            balance: 2.001
        }, {
            address: "0xf1731D81BC7be92DBD9b759a63ECAFaA569C7D0a",
            avatar: "/images/tokens/ETH.svg",
            image: "https://resources.smartlayer.network/smartcat/reources/images/e5fd0c706c4eb3cc7f4295797f91e02e.png",
            tokenId: '#234567',
            balance: 2.001
        }]

    const loadNFTHandler = () => { }
    return (
        <section className="min-h-screen fancy-overlay pt-4">
            <div className="container-wide mx-auto grid grid-cols-3 gap-8">

                {TokenList.map((token, index) => (
                    <>
                        <Card className="text-center p-8 dark:bg-gray-900" onClick={loadNFTHandler} key={index}>
                            <CardTitle className="flex justify-center gap-2 items-center">
                                <Avatar>
                                    <AvatarImage src={token.avatar} alt="token" />
                                    <AvatarFallback className="bg-primary-100/20">T</AvatarFallback>
                                </Avatar>
                                {addressPipe(token.address)}</CardTitle>
                            <CardHeader>
                                {type === 'ERC20' ? (
                                    <>
                                        <div className="flex justify-between opacity-7 text-gray-500 dark:text-[#B3B3B3]" key={index}>

                                            <div>Balance</div>
                                            <div>Symbol</div>
                                        </div>
                                        <div className="flex justify-between font-bold">
                                            <div>{token.balance}</div>
                                            <div>ETH</div>
                                        </div>
                                    </>) : (<>
                                        <div className="text-center" key={index} >
                                            <Image src={token.image} className="mx-auto" width="250" height="250" alt="image" />
                                            <div className="font-bold flex justify-between items-center mt-2">
                                                <div>{token.tokenId}</div>
                                                <a href="https://opensea"><Image src="/images/tokens/opensea.svg" className="mx-auto" width="24" height="24" alt="image" /></a>
                                            </div>
                                        </div>
                                    </>)}

                            </CardHeader>
                        </Card>
                    </>
                ))}
            </div>

        </section>
    );
}
