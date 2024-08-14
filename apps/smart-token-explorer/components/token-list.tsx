"use client";
import { getDevModeAtom, getTokenAtom, getTokenTypeAtom, setTokenAtom, tokenListAtom } from "@/lib/store";
import { TokenCollection, TokenType } from "@/lib/tokenStorage";
import { useAtomValue, useSetAtom } from "jotai";
import { query } from "smart-token-list";
import TokenCard from "./token-card";
import { cn } from "@/lib/utils";
import ImportToken from "@/components/import-token"
import { ScrollArea } from "./shadcn/ui/scroll-area";
import { useChainId } from "wagmi";
import { useRouter } from "next/navigation";

interface TokenProps {
    type: TokenType;
}

export default function MyTokenList({ type }: TokenProps) {


    const tokenListMap = useAtomValue(tokenListAtom);
    const chain = useChainId()
    const devMode = useAtomValue(getDevModeAtom);
    const router = useRouter()

    console.log("tokenListMap--", tokenListMap)

    let tokenList: TokenCollection[] = tokenListMap[type]?.filter((token: any) => Number(token.chainId) === (chain));


    if (!devMode) {
        tokenList = tokenList.filter((token) => token.signed);
    }

    if (tokenList.length === 0) {
        //router.push("/home")
    }

    const tokenData: any[] = tokenList.map((token) => {
        const results = query({ chainId: token.chainId, address: token.address, name: token.name });
        return {
            ...token,
            ...(results[0] ? results[0] : { notFound: true }),
        };
    });

    console.log('tokenData--', tokenData)
    return (
        <ScrollArea className="h-full">
            <div className="flex flex-col">
                {tokenData.length === 0 && (<div className="text-center mt-8">
                    <div className="text-2xl font-bold mb-2"> No tokens, Please import</div>
                    <div className="w-[200px] mx-auto"><ImportToken /></div>
                </div>)}
                {tokenData.map((token) => (
                    < div className={
                        cn(
                            "p-3 text-left text-sm transition-all",
                        )} key={`${type}-${token.chainId}-${token.address}`}>
                        <TokenCard
                            key={`${type}-${token.chainId}-${token.address}`}
                            type={type}
                            token={token}
                        />
                    </div>
                ))
                }
            </div >
        </ScrollArea>
    );
}
