"use client"

import { Button } from "./shadcn/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./shadcn/ui/tabs";
import MyTokenList from "./token-list";


export default function DashboardPage() {
    const TABLIST = ['ERC20', 'ERC721', 'ERC1155']

    return (<>
        <section className="min-h-screen fancy-overlay bg-primary-100/20 dark:bg-primary-900/10 pt-8">
            <div className="container-wide mx-auto">
                <div className="flex justify-between items-base">
                    <h1 className="uppercase">Your tokens</h1>
                    <Button variant='secondary' className="text-white font-bold">Import</Button>
                </div>
                <Tabs defaultValue={TABLIST[0]} className="w-full mt-2">
                    <TabsList className="w-full  justify-start  ">
                        {TABLIST.map((tab) => (
                            <>
                                <TabsTrigger value={tab}>{tab}</TabsTrigger>
                            </>))}
                    </TabsList>
                    {TABLIST.map((tab) => (
                        <>
                            <TabsContent value={tab}>
                                <MyTokenList type={tab}/>

                            </TabsContent>
                        </>))}
                </Tabs>

            </div>

        </section>
    </>
    );
}
