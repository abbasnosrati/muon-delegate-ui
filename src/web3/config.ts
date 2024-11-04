import "@rainbow-me/rainbowkit/styles.css";
import { supportedChains } from "./chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { HttpTransport, http } from "viem";

export const projectId = import.meta.env.VITE_APP_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

const transports: { [key: string]: HttpTransport } = {};

for (const chain of supportedChains) {
  transports[chain.id] = http();
}

export const config = getDefaultConfig({
  appName: "Meta Bridge",
  projectId,
  chains: supportedChains as any,
  transports,
});
