import { bscTestnet } from "wagmi/chains";
// import { bsc } from "wagmi/chains";
import { Chain } from "wagmi/chains";

export const supportedChains: Chain[] = [bscTestnet];
// export const supportedChains: Chain[] = [bsc];

export enum SupportedChainId {
  chainId = bscTestnet.id,
  // chainId = bsc.id,
}

export const SUPPORTED_CHAIN_IDS: SupportedChainId[] = Object.values(
  SupportedChainId
).filter((id) => typeof id === "number") as SupportedChainId[];
