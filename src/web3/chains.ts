import { bsc, bscTestnet } from "wagmi/chains";
import { Chain } from "wagmi/chains";

export const ChainsLogo = {
  97: "https://cryptologos.cc/logos/thumbs/bnb.png?v=032",
};

export const supportedChains: Chain[] = [bscTestnet];

export enum SupportedChainId {
  bscTestnet = 97,
}

export const SUPPORTED_CHAIN_IDS: SupportedChainId[] = Object.values(
  SupportedChainId
).filter((id) => typeof id === "number") as SupportedChainId[];
