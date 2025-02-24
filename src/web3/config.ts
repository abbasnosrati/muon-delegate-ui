import "@rainbow-me/rainbowkit/styles.css";
// import { supportedChains } from "./chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { HttpTransport, http } from "viem";
import { getCurrentChainId } from "./chains";
import { bscTestnet, bsc } from "wagmi/chains";

export const projectId = import.meta.env.VITE_APP_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

const transports: { [key: string]: HttpTransport } = {};

transports[getCurrentChainId()] = http();

const chains = getCurrentChainId() == 97 ? bscTestnet : bsc;

export const config = getDefaultConfig({
  appName: "Muon Delegation",
  projectId,
  chains: [chains],
  transports,
});
