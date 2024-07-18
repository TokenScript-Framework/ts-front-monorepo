import { ethers, formatEther } from "ethers";
import * as sha3 from "js-sha3";
import { ERC1155_ABI, ERC20_ABI, ERC5169_ABI, ERC721_ABI } from "./abi";
import { provider } from "./etherProvider";
import { chainPipe } from "./utils";

const ERC721_INTERFACE_ID = "0x80ac58cd";
const ERC1155_INTERFACE_ID = "0xd9b67a26";

export async function isERC20(address: string) {
  const contract = new ethers.Contract(address, ERC20_ABI, provider);
  try {
    await Promise.all([
      contract.totalSupply(),
      contract.balanceOf("0x0000000000000000000000000000000000000000"),
    ]);
    return true;
  } catch (err: unknown) {
    return false;
  }
}

export async function isERC721(address: string) {
  const contract = new ethers.Contract(address, ERC721_ABI, provider);
  try {
    return await contract.supportsInterface(ERC721_INTERFACE_ID);
  } catch (err: unknown) {
    return false;
  }
}

export async function isERC1155(address: string) {
  const contract = new ethers.Contract(address, ERC1155_ABI, provider);
  try {
    return await contract.supportsInterface(ERC1155_INTERFACE_ID);
  } catch (err: unknown) {
    return false;
  }
}

export async function isERC5169(address: string) {
  const contract = new ethers.Contract(address, ERC5169_ABI, provider);
  try {
    return await contract.scriptURI();
  } catch (err: unknown) {
    return false;
  }
}

export async function allowanceERC20(
  ERC20: string,
  owner: string,
  amount: string,
) {
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

export function isValidAddress(address: string) {
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

export function isValidInteger(tokenId: string) {
  return /^[1-9]\d*$/.test(tokenId);
}

export function isValidTokenId(tokenId: string) {
  return /^[0-9a-zA-Z]\d*$/.test(tokenId);
}

export async function validateToken(
  chain: number,
  owner: `0x${string}`,
  type: string,
  token: string,
  tokenId: string,
) {
  if (!isValidAddress(token)) {
    return { error: true, message: "Please input correct address" };
  }

  const result = await isERC5169(token);
  if (!result) {
    return {
      error: true,
      message: `This token on ${chainPipe(chain)} is not a valid ERC5169 token.`,
    };
  }

  switch (type) {
    case "ERC20": {
      const result = await isERC20(token);
      if (!result) {
        return {
          error: true,
          message: `This token on ${chainPipe(chain)} is not a valid ERC20 token.`,
        };
      }

      break;
    }
    case "ERC721": {
      if (!isValidInteger(tokenId)) {
        return { error: true, message: "Please input correct tokenId" };
      }

      const result = await isERC721(token);
      if (!result) {
        return {
          error: true,
          message: `This token on ${chainPipe(chain)} is not a valid ERC721 token.`,
        };
      }

      const allowance = await allowanceERC721(token, tokenId, owner);
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
      if (!isValidTokenId(tokenId)) {
        return { error: true, message: "Please input correct tokenId" };
      }

      const result = await isERC1155(token);
      if (!result) {
        return {
          error: true,
          message: `This token on ${chainPipe(chain)} is not a valid ERC1155 token.`,
        };
      }

      const allowance = await allowanceERC1155(token, tokenId, owner);
      if (!allowance) {
        return {
          error: true,
          message: "You aren't not the owner of this token.",
        };
      }

      break;
    }
  }

  return { error: false };
}
