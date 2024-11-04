import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAccount, useBalance } from "wagmi";
import { SupportedChainId } from "../web3/chains.ts";
import { PionContractAddress } from "../constants/addresses";
import { W3bNumber } from "../types/wagmi.ts";
import { w3bNumberFromBigint } from "../utils/web3.ts";

const PionContext = createContext<{
  PionBalanceIsFetched: boolean;
  PionBalanceIsLoading: boolean;
  PionBalance: W3bNumber | null;
}>({
  PionBalanceIsFetched: false,
  PionBalanceIsLoading: false,
  PionBalance: null,
});

const PIONProvider = ({ children }: { children: ReactNode }) => {
  const { address: walletAddress } = useAccount();
  const [PionBalance, setPionBalance] = useState<W3bNumber | null>(null);

  const {
    data: PionBalanceData,
    isFetched: PionBalanceIsFetched,
    isLoading: PionBalanceIsLoading,
  } = useBalance({
    address: walletAddress,
    token: PionContractAddress,
    chainId: SupportedChainId.bscTestnet,
  });

  useEffect(() => {
    if (PionBalanceIsFetched && PionBalanceData) {
      setPionBalance(w3bNumberFromBigint(PionBalanceData.value));
    } else {
      setPionBalance(null);
    }
  }, [PionBalanceIsFetched, PionBalanceData]);

  return (
    <PionContext.Provider
      value={{
        PionBalanceIsFetched,
        PionBalanceIsLoading,
        PionBalance,
      }}
    >
      {children}
    </PionContext.Provider>
  );
};

export const usePion = () => useContext(PionContext);

export { PIONProvider, PionContext };