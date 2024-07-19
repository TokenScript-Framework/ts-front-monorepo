# Token kit

## build

```sh
npm run rollup
```

## Components

### NFT Card

```tsx
import { NFTCard } from "token-kit";

<NFTCard
  chainId={137}
  contract="0xd5ca946ac1c1f24eb26dae9e1a53ba6a02bd97fe"
  tokenId="1202370524"
  onClick={() => void}
/>;
```

## React Hooks

### useTsValidation

Check tokenscript file digital signature

```ts
import { useTsValidation } from "token-kit";

const { isValid, isChecking } = useTsValidation({ chainId, contract });
```

## Libraries

### Ethereum

#### Validate Tokenscript File Digital Signature

```ts
import { isTokenscriptValid } from "token-kit";

const isValid: boolean = await isTokenscriptValid(
  137,
  "0xd5ca946ac1c1f24eb26dae9e1a53ba6a02bd97fe",
);
```
