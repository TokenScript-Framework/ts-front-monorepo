"use client";

import {
    RainbowKitProvider,
    connectorsForWallets,
    getDefaultConfig,
} from "@rainbow-me/rainbowkit";

import "@rainbow-me/rainbowkit/styles.css";
import { useEffect, type ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import {
    arbitrum,
    base,
    baseSepolia,
    mainnet,
    optimism,
    polygon,
    sepolia,
} from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
    injectedWallet,
    rainbowWallet,
    safeWallet,
    coinbaseWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { useAtomValue, useSetAtom } from "jotai";
import { getChainsAtom, setChainsAtom } from "@/lib/store";
import { DEFAULT_CHAINS } from "@/lib/constants";
const connectors = connectorsForWallets(
    [
        {
            groupName: "Popular",
            wallets: [rainbowWallet, safeWallet, coinbaseWallet, injectedWallet],
        },
    ],
    {
        appName: "My RainbowKit App",
        projectId: "759fe092b9c9d2bbdc592d38a1486a73",
    }
);
// console.log(process.env.NEXT_PUBLIC_ENABLE_TESTNETS)
// const config = getDefaultConfig({
//     appName: "My RainbowKit App",
//     projectId: "759fe092b9c9d2bbdc592d38a1486a73",
//     connectors,
//     chains: process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
//         ? [sepolia, baseSepolia]
//         : [mainnet,
//             polygon,
//             optimism,
//             arbitrum,
//             base],

//     ssr: true,
// });

const client = new QueryClient();
export function Providers({ children }: { children: ReactNode }) {
    let chainList = useAtomValue(getChainsAtom)



    console.log('chainList', chainList)
    chainList = chainList.length == 0 ? DEFAULT_CHAINS : chainList
    const config = getDefaultConfig({
        appName: "My RainbowKit App",
        projectId: "759fe092b9c9d2bbdc592d38a1486a73",
        connectors,
        chains: chainList,

        ssr: true,
    });

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={client}>
                <RainbowKitProvider modalSize="compact">{children}</RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}
