"use client";

import { getDevModeAtom, setDevModeAtom, tokenListAtom, getTokenTypeAtom, setTokenAtom } from "@/lib/store";
import { useAtomValue, useSetAtom } from "jotai";
import { Switch } from "./shadcn/ui/switch";
import { TokenCollection, TokenType } from "@/lib/tokenStorage";
import { useChainId } from "wagmi";
import { useRouter } from "next/navigation";
import { EMPTY_TOKEN } from "@/lib/constants";

export default function DevMode() {
    const setDevMode = useSetAtom(setDevModeAtom);
    let devMode = useAtomValue(getDevModeAtom);
    const tokenListMap = useAtomValue(tokenListAtom);
    const setToken = useSetAtom(setTokenAtom);
    const chainId = useChainId()
    const router = useRouter()

    let tokenType = useAtomValue(getTokenTypeAtom);

    const changeHandler = (mode: boolean) => {
        setDevMode(mode);
        let tokenList: TokenCollection[] = tokenListMap[tokenType as TokenType]?.filter((token: any) => Number(token.chainId) === (chainId) && token.signed === !mode);
        if (tokenList.length === 0) {
            setToken(EMPTY_TOKEN)
            router.replace(`/${tokenType}/${chainId}`)
        }
    };
    return (
        <>
            <div className="mb-1 flex items-center space-x-2">
                <span className="mr-2 font-bold">Dev Mode</span>
                <Switch
                    id="dev-mode"
                    aria-label="Dev mode"
                    checked={devMode}
                    onCheckedChange={() => changeHandler(!devMode)}
                />

            </div>
        </>
    );
}
