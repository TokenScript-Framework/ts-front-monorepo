"use client";
import DevMode from "@/components/dev-mode";
import { getTokenListRoot } from "@/lib/constants";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ListIcon, SettingsIcon } from "lucide-react";
import { useAccount } from "wagmi";
import Logo from "./logo";
import ThemeSwitch from "./shadcn/ThemeSwitch";
import { STETooltip } from "./ste-tooltip";
import { WalletButton } from "./WalletButton";

export default function Header() {
    const { address } = useAccount();
    return (
        <section className="w-full p-3">
            <div className="container-wide mx-auto flex max-w-full justify-between">
                <Logo />
                <div className="flex items-center gap-3">
                    <div className="mt-2 flex items-center gap-3">
                        <a
                            className="nav-link hidden font-bold sm:block"
                            href={typeof window !== "undefined" ? getTokenListRoot(window?.location.href) : ''}
                            target="_blank"
                        >
                            <STETooltip
                                trigger={<ListIcon />}
                                content={<p>Token list</p>}
                            ></STETooltip>
                        </a>

                        {address && (
                            <a className="nav-link hidden font-bold sm:block" href="/setting">
                                <STETooltip
                                    trigger={<SettingsIcon />}
                                    content={<p>Setting</p>}
                                ></STETooltip>
                            </a>
                        )}

                        <STETooltip
                            trigger={<ThemeSwitch position={'head'} />}
                            content={<b>Switch theme</b>}
                        ></STETooltip>

                    </div>
                    {/* <ConnectButton
                        showBalance={false}
                        accountStatus={{
                            smallScreen: "avatar",
                            largeScreen: "full",
                        }}
                    /> */}
                    <WalletButton display="flex" />
                </div>
            </div>
        </section>
    );
}
