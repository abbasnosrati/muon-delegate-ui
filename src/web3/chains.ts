import { bsc, bscTestnet } from "wagmi/chains";

export enum SupportedChainId {
  BSCMAINNET = bsc.id,
  BSCTESTNET = bscTestnet.id,
}

export const CHAIN_IDS_TO_NAMES = {
  [SupportedChainId.BSCMAINNET]: "bscmainnet",
  [SupportedChainId.BSCTESTNET]: "bsctestnet",
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
