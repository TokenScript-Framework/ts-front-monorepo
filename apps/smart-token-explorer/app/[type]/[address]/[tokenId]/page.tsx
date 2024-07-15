"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/ui/avatar";
import { Button } from "@/components/shadcn/ui/button";
import { Card, CardContent, CardTitle } from "@/components/shadcn/ui/card";
import { setTokenTypeAtom } from "@/lib/store";
import { addressPipe, rewriteUrlIfIFPSUrl } from "@/lib/utils";
import { useSetAtom } from "jotai";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount } from "wagmi";

export default function ERC20Page({
  params,
}: {
  params: { address: string; type: string; tokenId: string };
}) {
  const { address } = useAccount();

  const setTokenType = useSetAtom(setTokenTypeAtom);

  const router = useRouter();
  console.log(params);
  const token = {
    name: "COSCon’22 Collectible",
    description:
      "We really appreciate your participation to COSCon’22 and hope to see you again the next year.",
    image: "ipfs://bafybeicc4vygaek76mkbaywa53zbr35etjqodjfifqicycpfdnbupz4gem",
    address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    chainId: 1,
    tokenId: 12344,
  };
  useEffect(() => {
    setTokenType(params.type);
  }, [setTokenType]);
  return (
    <section className="fancy-overlay bg-primary-100/20 dark:bg-primary-900/10 min-h-screen pt-8">
      <div className="container-wide mx-auto">
        {!address ? (
          <>
            <div className="mt-10 text-center text-2xl font-bold">
              Please connect wallet to view detail.
            </div>
          </>
        ) : (
          <>
            <Card className="mx-auto min-h-[500px] w-1/3 text-center">
              <CardTitle className="relative">
                <div
                  className="hover:bg-primary-300 absolute left-2 top-2 cursor-pointer hover:rounded-full hover:text-white"
                  onClick={() => router.back()}
                >
                  <ChevronLeftIcon />
                </div>
                <div className="mt-8 flex items-center justify-center gap-2">
                  <Avatar>
                    <AvatarImage
                      src={rewriteUrlIfIFPSUrl(token.image)}
                      alt="token"
                    />
                    <AvatarFallback className="bg-primary-100/20">
                      T
                    </AvatarFallback>
                  </Avatar>

                  <span>{token.name}</span>
                </div>
                <a className="hover:text-primary-500 cursor-pointer text-sm text-gray-500 underline">
                  {addressPipe(token.address)}
                </a>
              </CardTitle>

              <CardContent>
                <div className="mt-8">Token Id</div>

                <Button variant="outlinePrimary" className="mt-4">
                  Transfer
                </Button>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </section>
  );
}
