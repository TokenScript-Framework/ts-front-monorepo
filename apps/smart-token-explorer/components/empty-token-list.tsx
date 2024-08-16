'use client'

import { TokenType } from "@/lib/tokenStorage";
import ImportToken from "./import-token";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { getTokenTypeAtom } from "@/lib/store";
import { useChainId } from "wagmi";


interface TokenProps {
    type: TokenType;
    chain: number
}
export default function EmptyListToken({ type, chain
}: TokenProps) {
    const router = useRouter()
    let tokenType = useAtomValue(getTokenTypeAtom);

    useEffect(() => {
    }, [router, tokenType, type, chain])

    return (<>
        <div className="text-center mt-8">
            <div className="text-2xl font-bold mb-2"> No {type} tokens,<br /> Please import</div>
            <div className="w-[200px] mx-auto"><ImportToken /></div>
        </div>
    </>
    );
}
