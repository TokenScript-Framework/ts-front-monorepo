
"use client"

import { Label } from "./shadcn/ui/label";
import { Switch } from "./shadcn/ui/switch"

interface DevModeProps {
    mode: boolean
    onChange: (value: boolean) => void
}
export default function DevMode({ mode, onChange }: DevModeProps) {



    return (
        <>
            <div className="flex items-center space-x-2">
                <Switch id="dev-mode" aria-label="Dev mode" checked={mode}
                    onCheckedChange={() => onChange(!mode)} />
                <Label htmlFor="dev-mode">Dev Mode</Label>
            </div>
        </>
    );
}
