"use client";
import { decodeFromSafeBase64 } from "@/lib/encodeAndDecode";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const RedirectInTg = () => {
  const searchParams = useSearchParams();
  const tgWebAppStartParam = searchParams.get("tgWebAppStartParam");
  const router = useRouter();

  useEffect(() => {
    if (tgWebAppStartParam) {
      const query = decodeFromSafeBase64(tgWebAppStartParam);
      if (query) {
        router.push(query);
      }
    }
  }, [router, tgWebAppStartParam]);

  return null;
};
