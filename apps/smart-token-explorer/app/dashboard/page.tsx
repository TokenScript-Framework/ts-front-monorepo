"use client"
import React, { useState } from "react";
import { useAccount } from "wagmi";
import { getDevModeAtom, getTokenTypeAtom, tokenListAtom } from "@/lib/store";
import { useAtomValue, useSetAtom } from "jotai";
import { TokenCollection } from "@/lib/tokenStorage";
import EmptyList from "@/components/EmptyList";
import { useRouter } from "next/navigation";

export default function DashboardPage({
}: {
    }) {

    return (<>

    </>
    );
}
