import axios from "axios"
import {DSigValidator} from "./DSigValidator"
import {TrustedKeyResolver} from "./TrustedKeyResolver";

const TEST_TSML = 'https://d2r984ic4ow4wn.cloudfront.net/assets/tokenscripts/charityconnect-pass.tsml'
// const TEST_TSML = 'https://viewer.tokenscript.org/assets/tokenscripts/smart-cat-loot-prod.tsml'

export async function isTokenscriptValid(chainId: number, contract: string) {
  const tsXml = (await axios.get(TEST_TSML)).data
  const result = await (new DSigValidator()).getSignerKey(tsXml);

  if (result === false) return false

  const keyResolver = new TrustedKeyResolver();
  const trustedKey = keyResolver.getTrustedPublicKey(result.authoritiveKey, result.signingKey);

  return !!trustedKey
}