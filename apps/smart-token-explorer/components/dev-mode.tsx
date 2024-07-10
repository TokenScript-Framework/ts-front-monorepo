
"use client"

import { useAtomValue, useSetAtom } from "jotai";
import { Switch } from "./shadcn/ui/switch"
import { getDevModeAtom, setDevModeAtom } from "@/lib/store";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "./shadcn/ui/tooltip";
import { STETooltip } from "./ste-tooltip";

export default function DevMode() {


    const setDevMode = useSetAtom(setDevModeAtom)
    let devMode = useAtomValue(getDevModeAtom)

    const changeHandler = (mode: boolean) => {
        setDevMode(mode)
    }
    return (
        <>
            <STETooltip trigger={(
                <div className="flex items-center space-x-2 mb-1">
                    <Switch id="dev-mode" aria-label="Dev mode" checked={devMode}
                        onCheckedChange={() => changeHandler(!devMode)} />
                </div>
            )} content={(<p>Dev mode</p>)}></STETooltip>


        </>
    );
}
