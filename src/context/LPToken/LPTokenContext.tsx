import { createContext, ReactNode, useEffect, useState } from "react";
import { useAccount, useContractRead } from "wagmi";
import { LP_TOKEN_ADDRESS } from "../../constants/addresses.ts";
import LP_TOKEN_ABI from "../../abis/LPToken.ts";
import { W3bNumber } from "../../types/wagmi.ts";
import { w3bNumberFromBigint } from "../../utils/web3.ts";
// import { useLpTokenDecimals } from "../abis/types/generated.ts";
import { SupportedChainId } from "../../web3/chains.ts";

const LPTokenContext = createContext<{
  LPTokenBalanceIsFetched: boolean;
  LPTokenBalanceIsLoading: boolean;
  LPTokenBalance: W3bNumber | null;
  LPTokenDecimals: number | undefined;
}>({
  LPTokenBalanceIsFetched: false,
  LPTokenBalanceIsLoading: false,
  LPTokenBalance: null,
  LPTokenDecimals: undefined,
});

const LPTokenProvider = ({ children }: { children: ReactNode }) => {
  const { address: walletAddress } = useAccount();
  const [LPTokenBalance, setLPTokenBalance] = useState<W3bNumber | null>(null);

  const LPTokenDecimals = 18;
  const {
    data: LPTokenBalanceData,
    isFetched: LPTokenBalanceIsFetched,
    isLoading: LPTokenBalanceIsLoading,
  } = useContractRead({
    abi: LP_TOKEN_ABI,
    address: LP_TOKEN_ADDRESS,
    functionName: "balanceOf",
    args: walletAddress ? [walletAddress] : undefined,
    chainId: SupportedChainId.bscTestnet,
  });

  useEffect(() => {
    if (LPTokenBalanceIsFetched && LPTokenBalanceData !== undefined) {
      setLPTokenBalance(
        w3bNumberFromBigint(LPTokenBalanceData, LPTokenDecimals)
      );
    }
  }, [LPTokenBalanceIsFetched, LPTokenBalanceData, LPTokenDecimals]);

  return (
    <LPTokenContext.Provider
      value={{
        LPTokenBalanceIsFetched,
        LPTokenBalanceIsLoading,
        LPTokenBalance,
        LPTokenDecimals: LPTokenDecimals,
      }}
    >
      {children}
    </LPTokenContext.Provider>
  );
};

export { LPTokenProvider, LPTokenContext };
