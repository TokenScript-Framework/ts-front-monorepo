"use client";

import { getDevModeAtom, setDevModeAtom } from "@/lib/store";
import { useAtomValue, useSetAtom } from "jotai";
import { Switch } from "./shadcn/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "./shadcn/ui/tabs";

export default function DevMode() {
    const setDevMode = useSetAtom(setDevModeAtom);
    let devMode = useAtomValue(getDevModeAtom);

    const changeHandler = (mode: boolean) => {
        setDevMode(mode);
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
