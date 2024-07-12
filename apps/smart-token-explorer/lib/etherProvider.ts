import { ethers } from "ethers"

export let provider: ethers.BrowserProvider
if (typeof window !== "undefined" && window.ethereum) {
  provider = new ethers.BrowserProvider(window.ethereum)
}
