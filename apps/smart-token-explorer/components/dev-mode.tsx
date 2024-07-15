"use client";

import { getDevModeAtom, setDevModeAtom } from "@/lib/store";
import { useAtomValue, useSetAtom } from "jotai";
import { Switch } from "./shadcn/ui/switch";

export default function DevMode() {
  const setDevMode = useSetAtom(setDevModeAtom);
  let devMode = useAtomValue(getDevModeAtom);

  const changeHandler = (mode: boolean) => {
    setDevMode(mode);
  };
  return (
    <>
      <div className="mb-1 flex items-center space-x-2">
        <Switch
          id="dev-mode"
          aria-label="Dev mode"
          checked={devMode}
          onCheckedChange={() => changeHandler(!devMode)}
        />
      </div>
    </>
  );
}
