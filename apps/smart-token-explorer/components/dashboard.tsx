"use client"

import { TOKENTYPE_LIST } from "@/lib/constants";
import ImportToken from "./import-token";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./shadcn/ui/tabs";
import MyTokenList from "./token-list";
import { useCallback } from "react";
import { useToast } from "./shadcn/ui/use-toast";
import { useAtomValue } from "jotai";
import { getTokenTypeAtom } from "@/lib/store"


export default function DashboardPage() {
    const { toast } = useToast()
    let tokenType = useAtomValue(getTokenTypeAtom)
    const importTokenHandler = useCallback(
        (type: string, address: string, tokenId?: string) => {
            console.log(type, address, tokenId);
            toast({
                title: "Import token",
                description: "you've import token successfully!",
                className: "bg-secondary-500 text-black"
            })
        },
        [toast]
    )

    return (
        <section className="min-h-screen fancy-overlay bg-primary-100/20 dark:bg-primary-900/10 pt-8">
            <div className="container-wide mx-auto">
                <div className="flex justify-between items-base">
                    <h1 className="uppercase">Your tokens</h1>
                    <ImportToken onConfirm={importTokenHandler} />
                </div>
                <Tabs defaultValue={tokenType} className="w-full mt-2">
                    <TabsList className="w-full  justify-start  ">
                        {TOKENTYPE_LIST.map((tab, index) => (

                            <TabsTrigger value={tab} key={`${tab}-h` + index}>{tab}</TabsTrigger>
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
