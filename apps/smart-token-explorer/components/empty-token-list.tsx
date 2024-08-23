'use client'

import { TokenType } from "@/lib/tokenStorage";
import ImportToken from "./import-token";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { getImportContractAtom, getTokenTypeAtom } from "@/lib/store";


interface TokenProps {
    type: TokenType;
    chainId?: number
}
export default function EmptyListToken({ type, chainId
}: TokenProps) {
    const router = useRouter()
    let tokenType = useAtomValue(getTokenTypeAtom);
    let importContract = useAtomValue(getImportContractAtom);


    return (<>
        <div className="text-center mt-8">
            <div className="text-2xl font-bold mb-2"> No {type} tokens,<br /> Please import</div>
            {/* <div className="w-[200px] mx-auto"><ImportToken importContract={importContract} /></div> */}
        </div>
    </>
    );
}
