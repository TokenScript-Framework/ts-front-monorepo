
"use client"

import { useCallback, useState } from "react";
import DevMode from "@/components/dev-mode";
import ChainList from '@/components/chain-list';
import { SETTING_LIST } from '@/lib/constants';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shadcn/ui/tabs';

export default function SettingPage() {
    const [mode, setMode] = useState(false)

    const changeModeHandler = useCallback(
        (value: boolean) => {
            setMode(value)
            console.log(mode)

        },
        [mode]
    )

    return (
        <section className="min-h-screen fancy-overlay bg-primary-100/20 dark:bg-primary-500/10 pt-8">

            <div className="container-wide mx-auto h-full">

                <Tabs defaultValue={SETTING_LIST[0]} className="w-full mt-2">
                    <TabsList className="w-full  justify-start  ">
                        {SETTING_LIST.map((tab, index) => (
                            <>
                                <TabsTrigger value={tab} key={index}>{tab}</TabsTrigger>
                            </>))}
                    </TabsList>
                    {SETTING_LIST.map((tab, index) => (
                        <>
                            <TabsContent value={tab} key={index}>
                                {tab === 'Chains' ? (<ChainList />) : (<DevMode mode={mode} onChange={changeModeHandler} />)}

                            </TabsContent>
                        </>))}
                </Tabs>
            </div>

        </section>
    );
}
