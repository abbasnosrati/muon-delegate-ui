import { useEffect, useState } from "react";
import { W3bNumber } from "../types/wagmi.ts";
import { useAccount, useReadContract } from "wagmi";
import DELEGATE_ABI from "../abis/Delegation.ts";
import { DELEGATOR_MUON_ADDRESS } from "../constants/addresses.ts";
import { w3bNumberFromBigint } from "../utils/web3.ts";
import { getCurrentChainId } from "../web3/chains.ts";

const useDelegateBalances = () => {
  const [userDelegateBalances, setUserDelegateBalances] =
    useState<W3bNumber | null>(null);
  const { address: walletAddress } = useAccount();

  const { data, isFetched, refetch } = useReadContract({
    abi: DELEGATE_ABI,
    address: DELEGATOR_MUON_ADDRESS[getCurrentChainId()],
    functionName: "balances",
    args: walletAddress ? [walletAddress] : undefined,
    chainId: getCurrentChainId(),
  });

  useEffect(() => {
    if (isFetched && data !== undefined && data !== null) {
      setUserDelegateBalances(w3bNumberFromBigint(data as any));
    }
  }, [isFetched, data]);

  return { userDelegateBalances, refetch };
};

export default useDelegateBalances;
