# Token kit

## build

```sh
npm run rollup
```

## Components

### Token Card

```tsx
import { TokenCard } from "token-kit";

<TokenCard
  chainId={137}
  contract="0xd5ca946ac1c1f24eb26dae9e1a53ba6a02bd97fe"
  tokenId="1202370524"
/>;
```

## Libraries

### Ethereum

1. Validate Tokenscript File Digital Signature

```ts
import { isTokenscriptValid } from "token-kit"

const isValid: boolean = await isTokenscriptValid(chain: viem.Chain, contract: string)
```
