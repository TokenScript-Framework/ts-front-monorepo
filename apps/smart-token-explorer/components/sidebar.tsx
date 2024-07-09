import { cn } from "@/lib/utils"

import { Button } from "./shadcn/ui/button"

interface SidebarProps {
    type: string
    className?: string;
    onSelect: (type: string) => void
}

export function Sidebar({ type, className, onSelect }: SidebarProps) {

    return (
        <div className={cn("pb-12 text-black dark:text-white h-[500px]", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        Setting
                    </h2>
                    <div className="space-y-1">
                        <Button variant="ghost" className={cn("w-full justify-start", type === 'chain' ? 'bg-gray-100 dark:bg-gray-200 text-black' : '')} onClick={() => onSelect('chain')}>
                            Chain
                        </Button>
                        <Button variant="ghost" className={cn("w-full justify-start", type === 'mode' ? 'bg-gray-100  dark:bg-gray-200  text-black' : '')} onClick={() => onSelect("mode")}>
                            Dev Mode
                        </Button>
                    </div>
                </div>
            </div>
        </div >
    )
}
