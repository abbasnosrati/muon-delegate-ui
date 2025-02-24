import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAccount, useBalance } from "wagmi";
import { getCurrentChainId } from "../web3/chains.ts";
import { MUON_TOKEN_ADDRESS } from "../constants/addresses.ts";
import { W3bNumber } from "../types/wagmi.ts";
import { w3bNumberFromBigint } from "../utils/web3.ts";

const MuonContext = createContext<{
  MuonBalanceIsFetched: boolean;
  MuonBalanceIsLoading: boolean;
  muonBalance: W3bNumber | null;
  refetchMuonBalance: () => void;
}>({
  MuonBalanceIsFetched: false,
  MuonBalanceIsLoading: false,
  muonBalance: null,
  refetchMuonBalance: () => {},
});

const MUONProvider = ({ children }: { children: ReactNode }) => {
  const { address: walletAddress } = useAccount();
  const [muonBalance, setMuonBalance] = useState<W3bNumber | null>(null);

  const {
    data: MuonBalanceData,
    isFetched: MuonBalanceIsFetched,
    isLoading: MuonBalanceIsLoading,
    refetch: refetchMuonBalance,
  } = useBalance({
    address: walletAddress,
    token: MUON_TOKEN_ADDRESS[getCurrentChainId()],
    chainId: getCurrentChainId(),
  });

  useEffect(() => {
    if (MuonBalanceIsFetched && MuonBalanceData) {
      setMuonBalance(w3bNumberFromBigint(MuonBalanceData.value));
    } else {
      setMuonBalance(null);
    }
  }, [MuonBalanceIsFetched, MuonBalanceData]);

  return (
    <MuonContext.Provider
      value={{
        MuonBalanceIsFetched,
        MuonBalanceIsLoading,
        muonBalance,
        refetchMuonBalance,
      }}
    >
      {children}
    </MuonContext.Provider>
  );
};

export const useMuon = () => useContext(MuonContext);

export { MUONProvider, MuonContext };
