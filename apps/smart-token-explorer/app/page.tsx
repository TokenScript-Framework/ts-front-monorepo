"use client";
import LandingPage from "@/components/landing";
import React, { useEffect } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { setTokenTypeAtom } from "@/lib/store";
import { useSetAtom } from "jotai";
import { TOKENTYPE_LIST } from "@/lib/constants";
import { loadTokenList } from "@/lib/tokenStorage";

export default function Home() {
    const { address } = useAccount();
    const setType = useSetAtom(setTokenTypeAtom)

    const router = useRouter()
    useEffect(() => {
        if (address) {
            console.log("#### dashboard", window.location.pathname, loadTokenList(address))
            //setType(TOKENTYPE_LIST[0])
            //router.push('/dashboard')
        }
    }, [address, router, setType])
    return (
        <main className="fancy-overlay min-h-screen">
            <LandingPage />
        </main>
    );
}
