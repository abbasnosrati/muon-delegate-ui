import { Chain } from "wagmi/chains";

// import { bscTestnet } from "wagmi/chains";
import { bsc, bscTestnet } from "wagmi/chains";

// export const supportedChains: Chain[] = [bscTestnet];
export const supportedChains: Chain[] = [bsc];

export enum SupportedChainId {
  // chainId = bscTestnet.id,
  BSCMAINNET = bsc.id,
  BSCTESTNET = bscTestnet.id,
}

export const SUPPORTED_CHAIN_IDS: SupportedChainId[] = Object.values(
  SupportedChainId
).filter((id) => typeof id === "number") as SupportedChainId[];

export function getCurrentChainId(): SupportedChainId {
  return Number(import.meta.env.VITE_APP_CHAIN_ID) as SupportedChainId;
}
