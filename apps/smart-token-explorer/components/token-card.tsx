"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/ui/avatar";

import { Card, CardContent, CardTitle } from "@/components/shadcn/ui/card";

import { TokenType } from "@/lib/tokenStorage";
import { addressPipe, rewriteUrlIfIFPSUrl } from "@/lib/utils";
import { OctagonAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./shadcn/ui/tooltip";

interface TokenCardProps {
  type: TokenType;
  token: any;
}

export default function TokenCard({ type, token }: TokenCardProps) {
  const router = useRouter();

  const loadNFTHandler = (address: string, tokenId?: string) => {
    if (tokenId) {
      router.push(`/${type}/${address}/${tokenId}`);
    } else {
      router.push(`/${type}/${address}`);
    }
  };

  return (
    <Card
      className="cursor-pointer p-8 text-center dark:bg-gray-900"
      onClick={() => loadNFTHandler(token.address, token.tokenId)}
    >
      <CardTitle>
        <div className="flex items-center justify-center gap-2">
          <Avatar>
            <AvatarImage
              src={
                token.logoURI ? token.logoURI : rewriteUrlIfIFPSUrl(token.image)
              }
              alt="token"
            />
            <AvatarFallback className="bg-primary-100/20">T</AvatarFallback>
          </Avatar>

          <span>{token.name}</span>
        </div>
        <div className="flex items-center justify-center gap-2 pt-4">
          <a className="hover:text-primary-500 text-sm text-gray-500 underline">
            {addressPipe(token.address)}
          </a>
          {!token.notFound && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <OctagonAlert size={20} color="#e3e633" />
                </TooltipTrigger>
                <TooltipContent>
                  Your token is not recognized, please register{" "}
                  <a
                    className="hover:text-primary-500 text-sm text-gray-500 underline"
                    target="_blank"
                    href="https://token-list.smarttokenlabs.com"
                  >
                    here
                  </a>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </CardTitle>
      <CardContent>
        {type === "ERC20" ? (
          <>
            <div className="flex justify-between text-gray-500 dark:text-[#B3B3B3]">
              <div>ChainId</div>
              <div>Symbol</div>
            </div>
            <div className="flex justify-between font-bold">
              <div>{token.chainId}</div>
              <div>{token.symbol}</div>
            </div>
            <br />
            <div className="opacity-7 flex justify-between text-gray-500 dark:text-[#B3B3B3]">
              <div>Balance</div>
              <div>Decimals</div>
            </div>
            <div className="flex justify-between font-bold">
              <div>{token.balance}</div>
              <div>{token.decimals}</div>
            </div>
          </>
        ) : (
          <>
            <div className="text-center">
              <div className="mt-2">
                <div>{token.description}</div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
