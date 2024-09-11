import { Eip1193Provider, JsonRpcApiProvider } from "ethers";

export class EIP1193ProviderWrapper implements Eip1193Provider {
  private provider: JsonRpcApiProvider;

  constructor(provider: JsonRpcApiProvider) {
    this.provider = provider;
  }

  async request({
    method,
    params,
  }: {
    method: string;
    params?: unknown[];
  }): Promise<unknown> {
    return await this.provider.send(method, params || []);
  }
}
