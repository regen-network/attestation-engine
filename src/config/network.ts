export interface Chain {
  chainId: string
  name: string
  rpc: string
  metadataApiEndpoint: string
}

export const CHAINS: Chain[] = [
  {
    chainId: "regen-redwood-1",
    name: "Regen Redwood Testnet",
    rpc: "http://redwood.regen.network:26657/",
    metadataApiEndpoint: "https://api-staging.regen.network/data/v1/metadata-graph/"
  },
  {
    chainId: "regen-1",
    name: "Regen Mainnet",
    rpc: "http://mainnet.regen.network:26657/",
    metadataApiEndpoint: "https://api.regen.network/data/v1/metadata-graph/",
  }
]
