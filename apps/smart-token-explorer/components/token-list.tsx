"use client";
import { getDevModeAtom, tokenListAtom } from "@/lib/store";
import { TokenCollection, TokenType } from "@/lib/tokenStorage";
import { useAtomValue } from "jotai";
import { query } from "smart-token-list";
import TokenCard from "./token-card";

interface TokenProps {
  type: TokenType;
}

export default function MyTokenList({ type }: TokenProps) {
  const tokenListMap = useAtomValue(tokenListAtom);
  const devMode = useAtomValue(getDevModeAtom);

  let tokenList: TokenCollection[] = tokenListMap[type];

  if (tokenList.length == 0) {
    switch (type) {
      case "ERC20": {
        tokenList = [
          {
            signed: false,
            address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
            chainId: 1,
          },
        ];
        break;
      }
      case "ERC721": {
        tokenList = [
          {
            signed: false,
            address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
            chainId: 1,
            tokenIds: ["12344"],
          },
        ];
        break;
      }
      default: {
        tokenList = [
          {
            signed: false,
            address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
            chainId: 1,
            tokenIds: ["355"],
          },
        ];

        break;
      }
    }
  }

  if (!devMode) {
    tokenList = tokenList.filter((token) => token.signed);
  }

  const tokenData: any[] = tokenList.map((token) => {
    const results = query({ chainId: token.chainId, address: token.address });
    return {
      ...token,
      ...(results[0] ? results[0] : { notFound: true }),
    };
  });

  return (
    <section className="fancy-overlay min-h-screen pt-4">
      <div className="container-wide mx-auto grid grid-cols-3 gap-8" key={type}>
        {tokenData.map((token) => (
          <TokenCard
            key={`${type}-${token.chainId}-${token.address}`}
            type={type}
            token={token}
          />
        ))}
      </div>
    </section>
  );
}
