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
import ThemeSwitch from "@/components/shadcn/ThemeSwitch"
import { defaultLayout } from "@/lib/constants"
import { Separator } from "@/components/shadcn//ui/separator";
import { WalletButton } from "@/components/wallet-button";
export default function TypeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
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
                <a href="/" className="w-full px-2 font-bold text-lg my-3">
                    Smart Token Explorer
                </a>

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
                            href: 'https://smart-token-list-website.vercel.app/'  //todo: change to https://tokens.tokenscript.org/
                        },

                    ]}
                />
                <div className="flex items-center text-sm font-medium hover:bg-accent hover:text-accent-foreground h-9 rounded-md justify-start mx-2 mb-2 px-3"><ThemeSwitch position={'left'} /> </div>

                <Separator />
                <footer className="absolute bottom-4 left-0  w-full">
                    <div className="w-full px-2">
                        <WalletButton />
                    </div>
                </footer>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={995}>
                {children}
            </ResizablePanel >
        </ResizablePanelGroup>
    )
}


