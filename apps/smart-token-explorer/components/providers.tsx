"use client";

import {
    RainbowKitProvider,
    connectorsForWallets,
    darkTheme,
    getDefaultConfig,
} from "@rainbow-me/rainbowkit";

import "@rainbow-me/rainbowkit/styles.css";
import { useEffect, useState, type ReactNode } from "react";
import { Config, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { getDevModeAtom } from "@/lib/store";
import { MAIN_CHAINS, TEST_CHAINS } from "@/lib/constants";

const client = new QueryClient();
export function Providers({ children }: { children: ReactNode }) {
    let devMode = useAtomValue(getDevModeAtom)
    const [config, setConfig] = useState<Config>()
    useEffect(() => {
        let chainList = []
        if (devMode) {
            chainList = [...TEST_CHAINS, ...MAIN_CHAINS]
        } else {
            chainList = MAIN_CHAINS
        }
        setConfig(getDefaultConfig({
            appName: "Smart Token Explorer",
            projectId: "759fe092b9c9d2bbdc592d38a1486a73",
            chains: chainList,
            ssr: true,
        }));

    }, [devMode, setConfig])


    return (<>
        {config &&
            <WagmiProvider config={config}>
                <QueryClientProvider client={client}>
                    <RainbowKitProvider>{children}</RainbowKitProvider>
                </QueryClientProvider>
            </WagmiProvider>
        }
    </>
    );
}

