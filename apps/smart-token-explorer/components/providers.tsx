"use client";

import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import {
    base,
    baseSepolia,
    mainnet,
    optimism,
    polygon,
    sepolia,
} from "wagmi/chains";

const client = new QueryClient();
export function Providers({ children }: { children: ReactNode }) {
    const config = getDefaultConfig({
        appName: "Smart Token Explorer",
        projectId: "759fe092b9c9d2bbdc592d38a1486a73",
        chains: [mainnet, polygon, base, optimism, sepolia, baseSepolia],
        ssr: true,
    })

    return (
        <>
            {config && (
                <WagmiProvider config={config}>
                    <QueryClientProvider client={client}>
                        <RainbowKitProvider>{children}</RainbowKitProvider>
                    </QueryClientProvider>
                </WagmiProvider>
            )}
        </>
    );
}
