"use client";

import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";

import { MAIN_CHAINS, TEST_CHAINS } from "@/lib/constants";
import { getDevModeAtom } from "@/lib/store";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useEffect, useState, type ReactNode } from "react";
import { Config, WagmiProvider } from "wagmi";

const client = new QueryClient();
export function Providers({ children }: { children: ReactNode }) {
  let devMode = useAtomValue(getDevModeAtom);
  const [config, setConfig] = useState<Config>();
  useEffect(() => {
    let chainList = [];
    if (devMode) {
      chainList = [...TEST_CHAINS, ...MAIN_CHAINS];
    } else {
      chainList = MAIN_CHAINS;
    }
    setConfig(
      getDefaultConfig({
        appName: "Smart Token Explorer",
        projectId: "759fe092b9c9d2bbdc592d38a1486a73",
        chains: chainList,
        ssr: true,
      }),
    );
  }, [devMode, setConfig]);

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
