import { cn } from "@/lib/utils";

import { Button } from "./shadcn/ui/button";

interface SidebarProps {
  type: string;
  className?: string;
  onSelect: (type: string) => void;
}

export function Sidebar({ type, className, onSelect }: SidebarProps) {
  return (
    <div
      className={cn("h-[500px] pb-12 text-black dark:text-white", className)}
    >
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Setting
          </h2>
          <div className="space-y-1">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start",
                type === "chain"
                  ? "bg-gray-100 text-black dark:bg-gray-200"
                  : "",
              )}
              onClick={() => onSelect("chain")}
            >
              Chain
            </Button>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start",
                type === "mode"
                  ? "bg-gray-100 text-black dark:bg-gray-200"
                  : "",
              )}
              onClick={() => onSelect("mode")}
            >
              Dev Mode
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
