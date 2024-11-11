import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAccount, useBalance } from "wagmi";
import { SupportedChainId } from "../web3/chains.ts";
import { PION_ADDRESS } from "../constants/addresses";
import { W3bNumber } from "../types/wagmi.ts";
import { w3bNumberFromBigint } from "../utils/web3.ts";

const PionContext = createContext<{
  PionBalanceIsFetched: boolean;
  PionBalanceIsLoading: boolean;
  PionBalance: W3bNumber | null;
  refetchPionBalance: () => void;
}>({
  PionBalanceIsFetched: false,
  PionBalanceIsLoading: false,
  PionBalance: null,
  refetchPionBalance: () => {},
});

const PIONProvider = ({ children }: { children: ReactNode }) => {
  const { address: walletAddress } = useAccount();
  const [PionBalance, setPionBalance] = useState<W3bNumber | null>(null);

  const {
    data: PionBalanceData,
    isFetched: PionBalanceIsFetched,
    isLoading: PionBalanceIsLoading,
    refetch: refetchPionBalance,
  } = useBalance({
    address: walletAddress,
    token: PION_ADDRESS,
    chainId: SupportedChainId.chainId,
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
        refetchPionBalance,
      }}
    >
      {children}
    </PionContext.Provider>
  );
};

export const usePion = () => useContext(PionContext);

export { PIONProvider, PionContext };
