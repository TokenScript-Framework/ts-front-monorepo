"use client"
import { defaultLayout } from "@/lib/constants";
import { ResizableHandle, ResizablePanel } from "./shadcn/ui/resizable";
import { useAccount } from "wagmi";
import DevMode from "./dev-mode";
import { Separator } from "@radix-ui/react-select";
import ImportToken from "./import-token";

export default function EmptyList() {
    const { address } = useAccount();
    return (
        <><ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
            <div className="flex items-center px-3 py-2">
                <span className='font-bold'>
                    My Tokens
                </span>
                {address && (
                    <div className="ml-auto mt-2">
                        <DevMode />
                    </div>
                )}
            </div>
            <Separator />
            <div className="mx-auto font-bold">
                <div className="text-2xl font-bold mb-2 text-center"> No tokens, Please import</div>
                <div className="w-[200px] mx-auto"><ImportToken /></div>
            </div>
        </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={defaultLayout[2]}>
                <div className="mx-auto w-[100px] font-bold mt-10"> No token selected</div>

            </ResizablePanel>

        </>
    );
}
