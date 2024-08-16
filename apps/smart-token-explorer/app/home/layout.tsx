"use client";
import * as React from "react"
import {
    Inbox,
    ListIcon,
} from "lucide-react"

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/shadcn/ui/resizable"
import { Nav } from "@/components/nav"
import DevMode from "@/components/dev-mode"
import { useAccount, useChainId, useConfig, useNetwork } from "wagmi";
import { getDevModeAtom, getTokenAtom, getTokenTypeAtom, setTokenAtom, tokenListAtom } from "@/lib/store"
import { useAtomValue, useSetAtom } from "jotai"
import ImportToken from "@/components/import-token"
import ThemeSwitch from "@/components/shadcn/ThemeSwitch"
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { defaultLayout, getTokenListRoot } from "@/lib/constants"
import { loadTokenList, TokenCollection, TokenType } from "@/lib/tokenStorage"
import { Separator } from "@/components/shadcn//ui/separator";
import { useRouter } from "next/navigation";
import MyTokenList from "@/components/token-list";
import { useEffect, useMemo } from "react";
import { WalletButton } from "@/components/wallet-button";
export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { address } = useAccount();
    const setTokenList = useSetAtom(tokenListAtom);
    const router = useRouter()

    const chain = useChainId()
    let tokenType = useAtomValue(getTokenTypeAtom);
    useEffect(() => {
        if (address) {
            setTokenList(loadTokenList(address));
        }


    }, [address, chain, router, setTokenList]);

    const config = useConfig();

    useEffect(() => {
        const unwatch = config.subscribe(
            (state) => state.chainId,
            (chainId) => {
                console.log('chain changed, router:', chainId);
                // 在这里处理链变更逻辑
                router.replace('/home')
            }
        );

        return () => {
            unwatch();
        };
    }, [config, router]);




    return (
        <ResizablePanelGroup
            direction="horizontal"
            onLayout={(sizes: number[]) => {
                document.cookie = `react-resizable-panels:layout=${JSON.stringify(
                    sizes
                )}`
            }}
            className="min-h-screen items-stretch"
        >
            <ResizablePanel
                defaultSize={defaultLayout[0]}
                collapsible={true}
                minSize={20}
                maxSize={20} className="relative"
            >
                <div className="w-full px-2 font-bold text-lg my-3">
                    Smart Token Explorer
                </div>

                <Separator />
                <Nav
                    links={[
                        {
                            title: "Token Types",
                            icon: Inbox,
                            variant: "ghost",
                            children: [{
                                title: "ERC20", variant: 'ghost'
                            },
                            { title: "ERC721", variant: 'ghost' },
                            { title: "ERC1155", variant: 'ghost' }]
                        },

                    ]
                    }
                />
                <Separator />
                <Nav
                    links={[
                        {
                            title: "Token List",
                            icon: ListIcon,
                            variant: "ghost",
                            href: 'https://tokens.tokenscript.org/'
                        },

                    ]}
                />
                <div className="flex items-center text-sm font-medium hover:bg-accent hover:text-accent-foreground h-9 rounded-md justify-start mx-2 mb-2 px-3"><ThemeSwitch position={'left'} /> </div>

                <Separator />
                <footer className="absolute bottom-4 left-0  w-full">
                    <div className="mb-2 px-2">
                        <ImportToken />
                    </div>

                    <div className="w-full px-2">
                        <WalletButton />
                    </div>
                </footer>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
                <div className="flex items-center px-3 py-2 h-[52px]">
                    <span className='font-bold'>
                        My Tokens
                    </span>
                    {address && (
                        <div className="ml-auto mt-2">
                            <DevMode />
                        </div>
                    )}
                </div>
                <Separator />
                <div className="m-0">
                    {address ? (<>{tokenType && (<MyTokenList type={tokenType as TokenType} key={`${tokenType}-t`} />)}</>) : (
                        <>
                            <div className="text-center mt-10 font-bold text-2xl text-muted-foreground">Please connect wallet</div>
                        </>
                    )}

                </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={defaultLayout[2]}>
                {children}
            </ResizablePanel >
        </ResizablePanelGroup>
    )
}


