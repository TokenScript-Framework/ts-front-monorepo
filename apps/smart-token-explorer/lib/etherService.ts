"use server";
//import BigNumber from "bignumber.js";
import axios from "axios";
import { ethers, formatEther, InfuraProvider } from "ethers";
import * as sha3 from "js-sha3";
import { getTokenscriptMetadata } from "token-kit";
import { ERC1155_ABI, ERC20_ABI, ERC5169_ABI, ERC721_ABI } from "./abi";
import { chainPipe, networkPipe, rewriteUrlIfIFPSUrl } from "./utils";

const ERC721_INTERFACE_ID = "0x80ac58cd";
const ERC1155_INTERFACE_ID = "0xd9b67a26";
function getProvider(chain: string | number) {
  return new ethers.InfuraProvider(
    networkPipe(chain),
    "6e1527648cc24374bbb19680d506bce8",
  );
}

export async function isERC721(address: string, provider: InfuraProvider) {
  const contract = new ethers.Contract(address, ERC721_ABI, provider);
  try {
    return await contract.supportsInterface(ERC721_INTERFACE_ID);
  } catch (err: unknown) {
    return false;
  }
}

export async function isERC1155(address: string, provider: InfuraProvider) {
  const contract = new ethers.Contract(address, ERC1155_ABI, provider);
  try {
    return await contract.supportsInterface(ERC1155_INTERFACE_ID);
  } catch (err: unknown) {
    return false;
  }
}

export async function isERC5169(address: string, provider: InfuraProvider) {
  const contract = new ethers.Contract(address, ERC5169_ABI, provider);
  try {
    await contract.scriptURI();
    return true;
  } catch (err: unknown) {
    console.log(err);
    return false;
  }
}

export async function allowanceERC20(
  ERC20: string,
  owner: string,
  amount: string,
  chain: string,
) {
  let provider = getProvider(chain);
  let balance = 0;
  try {
    balance = await new ethers.Contract(ERC20, ERC20_ABI, provider).balanceOf(
      owner,
    );
    return Number(formatEther(balance)) > Number(amount);
  } catch (err) {
    return false;
  }
}

export async function allowanceERC721(
  ERC721: string,
  tokenId: string,
  spender: string,
  provider: InfuraProvider,
) {
  let owner = "";
  try {
    owner = await new ethers.Contract(ERC721, ERC721_ABI, provider).ownerOf(
      tokenId,
    );
    return owner.toLowerCase() === spender.toLowerCase();
  } catch (err) {
    return false;
  }
}

export async function allowanceERC1155(
  ERC1155: string,
  tokenId: string,
  owner: string,
  provider: InfuraProvider,
) {
  let balance = 0;
  try {
    balance = await new ethers.Contract(
      ERC1155,
      ERC1155_ABI,
      provider,
    ).balanceOf(owner, tokenId);
    return Number(formatEther(balance)) > 0;
  } catch (err) {
    return false;
  }
}

export async function isValidAddress(address: string) {
  if (!/^0x[0-9a-fA-F]{40}$/.test(address)) {
    return false;
  }

  if (/^0x[0-9a-f]{40}$/.test(address) || /^0x?[0-9A-F]{40}$/.test(address)) {
    return true;
  }
  return verifyChecksum(address);
}

function verifyChecksum(address: string): boolean {
  address = address.replace("0x", "");

  const addressHash = sha3.keccak256(address.toLowerCase());

  for (let i = 0; i < 40; i++) {
    if (
      (parseInt(addressHash[i], 16) > 7 &&
        address[i].toUpperCase() !== address[i]) ||
      (parseInt(addressHash[i], 16) <= 7 &&
        address[i].toLowerCase() !== address[i])
    ) {
      return false;
    }
  }

  return true;
}

export async function isValidInteger(tokenId: string) {
  return /^[1-9]\d*$/.test(tokenId);
}

export async function isValidTokenId(tokenId: string) {
  return /^[0-9a-zA-Z]\d*$/.test(tokenId);
}

export async function validateToken(
  devMode: boolean,
  chain: number,
  owner: `0x${string}`,
  type: string,
  token: `0x${string}`,
  tokenId?: string,
  isERC20?: boolean,
) {
  let provider = getProvider(chain);
  if (!(await isValidAddress(token))) {
    return { error: true, message: "Please input correct address" };
  }
  if (type !== "ERC20") {
    const result = await isERC5169(token, provider);

    if (!result) {
      return {
        error: true,
        message: `This token on ${chainPipe(chain)} is not a valid ERC5169 token.`,
      };
    }
  }
  let scriptMetadata;
  try {
    scriptMetadata =
      type !== "ERC20"
        ? await getTokenscriptMetadata(chain, token, {
            checkSignature: true,
          })
        : { signed: true };
  } catch (e) {
    return {
      error: true,
      message: "Script URI not exist",
    };
  }

  const metadata =
    type !== "ERC20"
      ? scriptMetadata
      : { name: "", meta: { description: "" }, signed: true };
  const { signed } = type !== "ERC20" ? metadata : { signed: true };

  if (!devMode && !signed) {
    return {
      error: true,
      message:
        "Tokenscript is not signed by a trusted party. Please open dev mode to import.",
    };
  }

  switch (type) {
    case "ERC20": {
      if (!isERC20) {
        return {
          error: true,
          message: `This token on ${chainPipe(chain)} is not a valid ERC20 token.`,
        };
      }

      break;
    }
    case "ERC721": {
      //   if (!(await isValidInteger(tokenId!))) {
      //     return { error: true, message: "Please input correct tokenId" };
      //   }

      const result = await isERC721(token, provider);
      if (!result) {
        return {
          error: true,
          message: `This token on ${chainPipe(chain)} is not a valid ERC721 token.`,
        };
      }

      const allowance = await allowanceERC721(token, tokenId!, owner, provider);
      if (!allowance) {
        return {
          error: true,
          message: "You aren't not the owner of this token.",
        };
      }

      break;
    }
    default: {
      //1155
      //   if (!(await isValidTokenId(tokenId!))) {
      //     return { error: true, message: "Please input correct tokenId" };
      //   }

      const result = await isERC1155(token, provider);
      if (!result) {
        return {
          error: true,
          message: `This token on ${chainPipe(chain)} is not a valid ERC1155 token.`,
        };
      }

      const allowance = await allowanceERC1155(
        token,
        tokenId!,
        owner,
        provider,
      );
      if (!allowance) {
        return {
          error: true,
          message: "You aren't not the owner of this token.",
        };
      }

      break;
    }
  }

  return {
    error: false,
    signed,
    name: metadata.name,
    description: metadata.meta?.description,
  };
}

export async function validateContract(
  devMode: boolean,
  chain: number,
  type: string,
  token: `0x${string}`,
  isERC20?: boolean,
) {
  console.log("isERC20", isERC20);

  let provider = getProvider(chain);
  if (!(await isValidAddress(token))) {
    return { error: true, message: "Please input correct address" };
  }
  if (type !== "ERC20") {
    const result = await isERC5169(token, provider);

    if (!result) {
      return {
        error: true,
        message: `This token on ${chainPipe(chain)} is not a valid ERC5169 token.`,
      };
    }
  }
  console.log("####", chain, token);
  const metadata =
    type !== "ERC20"
      ? await getTokenscriptMetadata(chain, token, {
          checkSignature: true,
        })
      : { name: "", meta: { description: "" }, signed: true };
  const { signed } = metadata;

  if (!devMode && !signed) {
    return {
      error: true,
      message:
        "Tokenscript is not signed by a trusted party. Please open dev mode to import.",
    };
  }

  switch (type) {
    case "ERC20": {
      if (!isERC20) {
        return {
          error: true,
          message: `This token on ${chainPipe(chain)} is not a valid ERC20 token.`,
        };
      }

      break;
    }
    case "ERC721": {
      const result = await isERC721(token, provider);
      if (!result) {
        return {
          error: true,
          message: `This token on ${chainPipe(chain)} is not a valid ERC721 token.`,
        };
      }

      break;
    }
    default: {
      const result = await isERC1155(token, provider);
      if (!result) {
        return {
          error: true,
          message: `This token on ${chainPipe(chain)} is not a valid ERC1155 token.`,
        };
      }

      break;
    }
  }

  return {
    error: false,
    signed,
    name: metadata.name,
    description: metadata.meta?.description,
  };
}

export async function fetchTokenIds(
  contractAddress: string,
  owner: string,
  chain: number,
  type: string,
) {
  console.log(new Date());
  let provider = getProvider(chain);
  const contract = new ethers.Contract(
    contractAddress,
    type === "ERC721" ? ERC721_ABI : ERC1155_ABI,
    provider,
  );
  let tokenIds: any[] = [];
  try {
    tokenIds = await getTokenIdsLogs(contract, owner);
  } catch (e) {
    console.log(e);
    tokenIds = await getTokenIdsEnumerable(contract, owner);
  }
  const tokenIdsWithMetadata = [];
  for (const tokenId of tokenIds) {
    const uri =
      type === "ERC721"
        ? await contract.tokenURI(tokenId)
        : await contract.uri(tokenId);
    const metadata = await getMetadata(uri);
    tokenIdsWithMetadata.push({ tokenId, metadata });
  }
  return tokenIdsWithMetadata;
}

async function getMetadata(tokenURI: string) {
  const res = await axios.get(rewriteUrlIfIFPSUrl(tokenURI!));
  return res.data;
}

//todo: 这个方法没有成功
async function getTokenIdsEnumerable(contract: ethers.Contract, owner: string) {
  const tokenIds = [];

  const balance = BigInt(await contract.balanceOf(owner));

  for (let i = 0; i < balance; i++) {
    tokenIds.push(BigInt(await contract.tokenOfOwnerByIndex(owner, i)));
  }

  return tokenIds;
}

async function getTokenIdsLogs(contract: ethers.Contract, owner: string) {
  const sentLogs = await contract.queryFilter(
    contract.filters.Transfer(owner, null),
  );
  const receivedLogs = await contract.queryFilter(
    contract.filters.Transfer(null, owner),
  );

  const logs = sentLogs
    .concat(receivedLogs)
    .sort(
      (a, b) =>
        a.blockNumber - b.blockNumber ||
        a.transactionIndex - b.transactionIndex,
    );

  const tokenIds = new Set();
  for (const log of logs) {
    if ("args" in log) {
      const { from, to, tokenId } = log.args;
      if (addressEqual(to, owner)) {
        tokenIds.add(tokenId.toString());
      } else if (addressEqual(from, owner)) {
        tokenIds.delete(tokenId.toString());
      }
    }
  }
  console.log("tokenIds", tokenIds);

  return Array.from(tokenIds.values());
}

function addressEqual(a: string, b: string) {
  return a.toLowerCase() === b.toLowerCase();
}
