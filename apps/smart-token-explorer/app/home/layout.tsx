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
import { useAccount, useChainId } from "wagmi";
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
export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { address } = useAccount();
    const setTokenList = useSetAtom(tokenListAtom);
    const router = useRouter()
    let tokenType = useAtomValue(getTokenTypeAtom);
    useEffect(() => {
        if (address) {
            setTokenList(loadTokenList(address));
        } else {
            //router.push('/')
        }
    }, [address, setTokenList]);

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
                maxSize={20}
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
                <footer className="fixed bottom-4 left-1">
                    <div className="mt-2 px-2">
                        <ImportToken />
                    </div>
                    <div className="my-2 w-full px-2">
                        <ConnectButton
                            showBalance={false}
                            accountStatus="full"
                            chainStatus="icon"
                        />
                    </div>
                </footer>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
                <div className="flex items-center px-4 py-2">
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
                    {tokenType && (<MyTokenList type={tokenType as TokenType} key={`${tokenType}-t`} />)}
                </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={defaultLayout[2]}>
                {children}
                {/* {tokenList?.length > 0 ? (<>{children}</>) : (<>
                    <div className="p-8 text-center text-muted-foreground">
                        No Token selected
                    </div>
                </>)} */}
            </ResizablePanel >
        </ResizablePanelGroup>
    )
}