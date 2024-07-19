"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/ui/avatar";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";

import { Skeleton } from "@/components/shadcn/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import { TokenType } from "@/lib/tokenStorage";
import { addressPipe, rewriteUrlIfIFPSUrl } from "@/lib/utils";
import { OctagonAlert, ShieldCheck, ShieldX } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTsValidation } from "token-kit";

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

  const { isValid, isChecking } = useTsValidation({
    chainId: token.chainId,
    contract: token.address,
  });

  if (isChecking) {
    return (
      <Card>
        <CardHeader className="relative space-y-0 p-0">
          <Skeleton className="w-full rounded-xl pb-[40%]" />
        </CardHeader>
        <CardContent className="p-4">
          <div className="relative flex w-full items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-36" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className="cursor-pointer text-center dark:bg-gray-900"
      onClick={() => loadNFTHandler(token.address, token.tokenId)}
    >
      <CardTitle>
        <div className="relative flex flex-col gap-4 p-8">
          <div className="absolute right-2 top-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  {isValid ? (
                    <ShieldCheck color="#16a34a" />
                  ) : (
                    <ShieldX color="#aa3131" />
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  {isValid ? "Secure Tokenscript" : "Insecure Tokenscript"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Avatar>
              <AvatarImage
                src={
                  token.logoURI
                    ? token.logoURI
                    : rewriteUrlIfIFPSUrl(token.image)
                }
                alt="token"
              />
              <AvatarFallback className="bg-primary-100/20">T</AvatarFallback>
            </Avatar>

            <span>{token.name}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
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
