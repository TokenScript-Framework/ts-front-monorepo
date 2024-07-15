# Token kit

## build

```sh
npm run rollup
```

## Set up

```js
import { TokenKit } from "token-kit";

TokenKit.setInfuraApiKey("YOUR_INFURA_API_KEY");
```

## Components

## Libraries

### Ethereum

#### Validate Tokenscript File Digital Signature

```js
import {isTokenscriptValid} from "token-kit"

const isValid: boolean = await isTokenscriptValid(CHAIN_ID_NUMBER, CONTRACT_ADDRESS)
```

#### Get token contract

```js
import {getERC721Contract, getERC20Contract} from "token-kit"

const erc721Contract: ethers.Contract = getERC721Contract(CHAIN_ID_NUMBER, CONTRACT_ADDRESS)
const erc20Contract: ethers.Contract = getERC20Contract(CHAIN_ID_NUMBER, CONTRACT_ADDRESS)
```
