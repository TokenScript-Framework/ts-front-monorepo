'use client'
import { ListIcon, SettingsIcon } from "lucide-react";
import Logo from "./logo";
import ThemeSwitch from "./shadcn/ThemeSwitch";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from 'wagmi'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./shadcn/ui/tooltip";
import DevMode from "@/components/dev-mode";
import { getDevModeAtom, setDevModeAtom } from "@/lib/store";
import { useAtomValue, useSetAtom } from "jotai";
import { STETooltip } from "./ste-tooltip";


export default function Header() {
    const { address } = useAccount()
    let devMode = useAtomValue(getDevModeAtom)
    return (
        <section className="p-3 w-full">
            <div className="max-w-full  container-wide flex justify-between mx-auto">
                <Logo />
                <div className="gap-3 flex items-center">
                    <div className="mt-2 gap-3 flex items-center">
                        <a className="nav-link hidden sm:block font-bold " href="http://outer">
                            <STETooltip trigger={(<ListIcon />)} content={(<p>Token list</p>)}></STETooltip>
                        </a>

                        {address && (
                            <a className="nav-link hidden sm:block font-bold" href="/setting">
                                <STETooltip trigger={(<SettingsIcon />)} content={(<p>Setting</p>)}></STETooltip>

                            </a>
                        )}


                        <STETooltip trigger={(<ThemeSwitch />)} content={(<b>Switch theme</b>)}></STETooltip>
                        {address && (
                            <>
                                <DevMode />
                            </>

                        )}


                    </div>
                    <ConnectButton
                        showBalance={false}
                        accountStatus={{
                            smallScreen: "avatar",
                            largeScreen: "full",
                        }}
                    />
                </div>
            </div>
        </section>
    );
}
