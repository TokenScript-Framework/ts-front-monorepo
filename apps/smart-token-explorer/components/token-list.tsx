"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/ui/avatar";

import { Card, CardContent, CardTitle } from "@/components/shadcn/ui/card";

import { tokenListAtom } from "@/lib/store";
import { Token, TokenType } from "@/lib/tokenStorage";
import { addressPipe, rewriteUrlIfIFPSUrl } from "@/lib/utils";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { query, TokenInfo } from "smart-token-list";

interface TokenProps {
  type: TokenType;
}

export default function MyTokenList({ type }: TokenProps) {
  const tokenListMap = useAtomValue(tokenListAtom);

  let tokenList: Token[] = tokenListMap[type];

  const router = useRouter();

  if (tokenList.length == 0) {
    switch (type) {
      case "ERC20": {
        tokenList = [
          {
            address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
            chainId: 1,
          },
        ];
        break;
      }
      case "ERC721": {
        tokenList = [
          {
            address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
            chainId: 1,
            tokenId: "12344",
          },
        ];
        break;
      }
      default: {
        tokenList = [
          {
            address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
            chainId: 1,
            tokenId: "355",
          },
        ];

        break;
      }
    }
  }

  const tokenData: any[] = tokenList.map((token) => {
    const results = query({ chainId: token.chainId, address: token.address });
    return {
      ...token,
      ...(results[0] ? results[0] : { notFound: true }),
    };
  });

  const loadNFTHandler = (address: string, tokenId?: string) => {
    if (tokenId) {
      router.push(`/${type}/${address}/${tokenId}`);
    } else {
      router.push(`/${type}/${address}`);
    }
  };
  return (
    <section className="fancy-overlay min-h-screen pt-4">
      <div className="container-wide mx-auto grid grid-cols-3 gap-8" key={type}>
        {tokenData.map((token, index) => (
          <Card
            className="cursor-pointer p-8 text-center dark:bg-gray-900"
            onClick={() => loadNFTHandler(token.address, token.tokenId)}
            key={`${type}-c` + index}
          >
            <CardTitle>
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
                  <AvatarFallback className="bg-primary-100/20">
                    T
                  </AvatarFallback>
                </Avatar>

                <span>{token.name}</span>
              </div>
              <a className="hover:text-primary-500 text-sm text-gray-500 underline">
                {addressPipe(token.address)}
              </a>
            </CardTitle>
            <CardContent>
              {type === "ERC20" ? (
                <>
                  <div
                    className="flex justify-between text-gray-500 dark:text-[#B3B3B3]"
                    key={`${type}-20` + index}
                  >
                    <div>ChainId</div>
                    <div>Symbol</div>
                  </div>
                  <div
                    className="flex justify-between font-bold"
                    key={`${type}-label` + index}
                  >
                    <div>{token.chainId}</div>
                    <div>{token.symbol}</div>
                  </div>
                  <br />
                  <div
                    className="opacity-7 flex justify-between text-gray-500 dark:text-[#B3B3B3]"
                    key={`${type}-title` + index}
                  >
                    <div>Balance</div>
                    <div>Decimals</div>
                  </div>
                  <div
                    className="flex justify-between font-bold"
                    key={`${type}-balance` + index}
                  >
                    <div>{token.balance}</div>
                    <div>{token.decimals}</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center" key={`${type}` + index}>
                    <div className="mt-2">
                      <div>{token.description}</div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
