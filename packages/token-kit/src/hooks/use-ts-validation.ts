import { useEffect, useState } from "react";
import { isTokenscriptValid } from "../libs";

export const useTsValidation = (v: {
  chainId: number;
  contract: `0x${string}`;
}) => {
  const { chainId, contract } = v;

  const [isValid, setIsValid] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let isMounted = true;

    (async function check() {
      if (isMounted) {
        setIsValid(await isTokenscriptValid(chainId, contract));
        setIsChecking(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [chainId, contract]);

  return { isValid, isChecking };
};
