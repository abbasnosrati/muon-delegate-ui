import { bsc, bscTestnet, avalanche, avalancheFuji } from "wagmi/chains";

export enum SupportedChainId {
  BSCMAINNET = bsc.id,
  BSCTESTNET = bscTestnet.id,
  AVALANCHFUJI = avalancheFuji.id,
  AVALANCH = avalanche.id,
}

export const CHAIN_IDS_TO_NAMES = {
  [SupportedChainId.BSCMAINNET]: "bscmainnet",
  [SupportedChainId.BSCTESTNET]: "bsctestnet",
  [SupportedChainId.AVALANCHFUJI]: "avalancheFuji",
  [SupportedChainId.AVALANCH]: "avalanche",
};

export const supportedChains = [bsc, bscTestnet];

export const SUPPORTED_CHAIN_IDS: SupportedChainId[] = Object.values(
  SupportedChainId
).filter((id) => typeof id === "number") as SupportedChainId[];

export function isSupportedChain(
  chainId: number | null | undefined
): chainId is SupportedChainId {
  return !!chainId && !!SupportedChainId[chainId];
}

export function getCurrentChainId(): SupportedChainId {
  return Number(import.meta.env.VITE_APP_CHAIN_ID) as SupportedChainId;
}
