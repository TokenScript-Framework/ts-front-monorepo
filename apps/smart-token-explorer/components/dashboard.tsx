"use client";

import { TOKENTYPE_LIST } from "@/lib/constants";
import { getTokenTypeAtom, tokenListAtom } from "@/lib/store";
import { useAtomValue, useSetAtom } from "jotai";
import { useCallback, useEffect } from "react";
import { useAccount } from "wagmi";
import { addToken, loadTokenList, TokenType } from "../lib/tempStorage";
import ImportToken from "./import-token";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./shadcn/ui/tabs";
import { useToast } from "./shadcn/ui/use-toast";
import MyTokenList from "./token-list";

export default function DashboardPage() {
  const { toast } = useToast();
  let tokenType = useAtomValue(getTokenTypeAtom);
  const { address } = useAccount();
  const setTokenList = useSetAtom(tokenListAtom);

  useEffect(() => {
    if (address) {
      setTokenList(loadTokenList(address));
    }
  }, [address, setTokenList]);

  const importTokenHandler = useCallback(
    (type: TokenType, chainId: number, token: string, tokenId?: string) => {
      console.log(type, chainId, token, tokenId);
      if (!address) return;

      addToken(address, type, chainId, token, tokenId);
      setTokenList(loadTokenList(address));

      toast({
        title: "Import token",
        description: "you've import token successfully!",
        className: "bg-secondary-500 text-black",
      });
    },
    [address, setTokenList, toast],
  );

  return (
    <section className="fancy-overlay bg-primary-100/20 dark:bg-primary-900/10 min-h-screen pt-8">
      <div className="container-wide mx-auto">
        <div className="items-base flex justify-between">
          <h1 className="uppercase">Your tokens</h1>
          <ImportToken onConfirm={importTokenHandler} />
        </div>
        <Tabs defaultValue={tokenType} className="mt-2 w-full">
          <TabsList className="w-full justify-start">
            {TOKENTYPE_LIST.map((tab, index) => (
              <TabsTrigger value={tab} key={`${tab}-h` + index}>
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
          {TOKENTYPE_LIST.map((tab, index) => (
            <TabsContent value={tab} key={`${tab}-c` + index}>
              <MyTokenList type={tab} key={`${tab}-t` + index} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
