import { stat } from "@repo/smart-token-list";
import erc20json from "@repo/smart-token-list/dist/chain/1/erc20.json";

export const getState = () => {
  const state = stat();
  return state;
};

export const getTokenList = () => {
  return erc20json;
};
