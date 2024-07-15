# Token kit

## build

```sh
npm run rollup
```

## Components

TBC

## Libraries

### Ethereum

#### Validate Tokenscript File Digital Signature

```js
import {isTokenscriptValid} from "token-kit"

const isValid: boolean = await isTokenscriptValid(chain: viem.Chain, contract: string)
```
