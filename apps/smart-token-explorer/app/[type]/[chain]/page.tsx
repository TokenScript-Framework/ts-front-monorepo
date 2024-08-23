"use client"
import EmptyToken from "@/components/empty-token";
import { setTokenTypeAtom } from "@/lib/store";
import { useSetAtom } from "jotai";
import React, { useEffect } from "react";

export default function TokenIdPage({
    params,
}: {
    params: { type: string; chain: number };
}) {
    const { type } = params
    const setTokenType = useSetAtom(setTokenTypeAtom);

    useEffect(() => {
        setTokenType(type)
    }, [setTokenType, type])

    return (<>
        <EmptyToken />
    </>
    );
}
