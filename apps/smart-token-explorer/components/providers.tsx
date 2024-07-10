"use client";

import {
    RainbowKitProvider,
    connectorsForWallets,
    darkTheme,
    getDefaultConfig,
} from "@rainbow-me/rainbowkit";

import "@rainbow-me/rainbowkit/styles.css";
import { type ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
    rainbowWallet,
    safeWallet,
    coinbaseWallet, injectedWallet
} from "@rainbow-me/rainbowkit/wallets";
import { useAtomValue } from "jotai";
import { getChainsAtom } from "@/lib/store";
import { DEFAULT_CHAINS } from "@/lib/constants";
const connectors = connectorsForWallets(
    [
        {
            groupName: "Popular",
            wallets: [rainbowWallet, safeWallet, coinbaseWallet, injectedWallet],
        },
    ],
    {
        appName: "Smart Token Explorer",
        projectId: "759fe092b9c9d2bbdc592d38a1486a73",
    }
);
const config = getDefaultConfig({
    appName: "Smart Token Explorer",
    projectId: "759fe092b9c9d2bbdc592d38a1486a73",
    chains: DEFAULT_CHAINS,
    ssr: true,
});

const client = new QueryClient();
export function Providers({ children }: { children: ReactNode }) {
    // let chainList = useAtomValue(getChainsAtom)

    // chainList = chainList.length == 0 ? DEFAULT_CHAINS : chainList


    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={client}>
                <RainbowKitProvider>{children}</RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}
