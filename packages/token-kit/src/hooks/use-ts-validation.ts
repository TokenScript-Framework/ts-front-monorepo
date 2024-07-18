import { isTokenscriptValid } from "../libs";
import { useEffect, useState } from "react";

export const useTsValidation = (v: {
  chainId: number;
  contract: `0x${string}`;
}) => {
  const { chainId, contract } = v;

  const [isValid, setIsValid] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    (async function check() {
      setIsValid(await isTokenscriptValid(chainId, contract));
      setIsChecking(false);
    })();
  }, []);

  return { isValid, isChecking };
};
