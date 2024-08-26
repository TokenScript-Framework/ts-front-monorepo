// export * from "./components";
// export * from "./hooks";
export * from "./libs";
export * from "./utils";

let infuraApiKey: string | undefined;
export const TokenKit = {
  setInfuraApiKey: (apiKey: string) => {
    TokenKit.infuraApiKey = apiKey;
  },

  infuraApiKey,
};
