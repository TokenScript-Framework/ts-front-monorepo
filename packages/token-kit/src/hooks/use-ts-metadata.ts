import { useEffect, useState } from "react";
import { getTokenscriptMetadata, TsOptions, TsMetadata } from "../libs";
import {Eip1193Provider} from "ethers";

export const useTsMetadata = (v: {
  provider: Eip1193Provider;
  chainId: number;
  contract: `0x${string}`;
  context?: { tokenId: string; originIndex?: number };
  options?: TsOptions;
}) => {
  const { chainId, contract, options } = v;

  const [tsMetadata, setTsMetadata] = useState<TsMetadata | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let isMounted = true;

    (async function check() {
      if (isMounted) {
        setTsMetadata(await getTokenscriptMetadata(v.provider, chainId, contract, v.context, options));
        setIsChecking(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [chainId, contract]);

  return { tsMetadata, isChecking };
};
