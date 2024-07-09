'use client'
import { ListIcon, SettingsIcon } from "lucide-react";
import Logo from "./logo";
import ThemeSwitch from "./shadcn/ThemeSwitch";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from 'wagmi'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./shadcn/ui/tooltip";


export default function Header() {
    const { address } = useAccount()
    return (
        <section className="p-3 w-full">
            <div className="max-w-full  container-wide flex justify-between mx-auto">
                <Logo />
                <div className="gap-3 flex items-center">
                    <div className="mt-2 gap-3 flex items-center">
                        <a className="nav-link hidden sm:block font-bold " href="http://outer">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger><ListIcon /></TooltipTrigger>
                                    <TooltipContent>
                                        <p>Token list</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>

                        </a>

                        {address ? (<a className="nav-link hidden sm:block font-bold" href="/setting">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger><SettingsIcon /></TooltipTrigger>
                                    <TooltipContent>
                                        Setting
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </a>) : (<></>)}

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger><ThemeSwitch /></TooltipTrigger>
                                <TooltipContent>
                                    <b>Switch theme</b>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
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
