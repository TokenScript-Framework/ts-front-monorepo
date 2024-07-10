"use client";

import { ReactNode } from "react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./shadcn/ui/tooltip";

export function STETooltip({ trigger, content }: { trigger: ReactNode, content: ReactNode }) {


    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>{trigger}</TooltipTrigger>
                <TooltipContent>
                    {content}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
