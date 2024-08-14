import { ethers } from "ethers";
import { ERC20_ABI } from "./abi";
import { networkPipe } from "./utils";
function getProvider(chain: string | number) {
  return new ethers.InfuraProvider(
    networkPipe(chain),
    "6e1527648cc24374bbb19680d506bce8",
  );
}
export async function isERC20(address: string, chain: number) {
  const provider = getProvider(chain);
  const contract = new ethers.Contract(address, ERC20_ABI, provider);
  try {
    await Promise.all([
      contract.totalSupply(),
      contract.balanceOf("0x0000000000000000000000000000000000000000"),
    ]);
    return true;
  } catch (err: any) {
    console.log(err.message);
    return false;
  }
}

export async function getSymbol(contract: `0x${string}`, chain: string) {
  let provider = getProvider(chain);
  try {
    return await new ethers.Contract(contract, ERC20_ABI, provider).symbol();
  } catch (err) {
    console.log(err);
    return "No Symbol";
  }
}
