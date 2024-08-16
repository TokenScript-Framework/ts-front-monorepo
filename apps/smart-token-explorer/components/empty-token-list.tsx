'use client'

import { TokenType } from "@/lib/tokenStorage";
import ImportToken from "./import-token";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


interface TokenProps {
    type: TokenType;
}
export default function EmptyListToken({ type
}: TokenProps) {
    const router = useRouter()
    useEffect(() => {
        router.push(`/home`)
    }, [router])

    return (<>
        <div className="text-center mt-8">
            <div className="text-2xl font-bold mb-2"> No {type} tokens,<br /> Please import</div>
            <div className="w-[200px] mx-auto"><ImportToken /></div>
        </div>
    </>
    );
}
