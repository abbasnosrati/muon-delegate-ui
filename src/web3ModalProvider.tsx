import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import { config, projectId } from "./web3/config";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";

type Props = {
  children: ReactNode;
};

if (!projectId) throw new Error("Project ID is not defined");

export function Web3ModalProvider({ children }: Props) {
  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#4D3E9E",
            accentColorForeground: "#FFFFFF",
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
