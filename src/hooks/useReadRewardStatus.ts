import { useEffect, useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import DELEGATION_ABI from "../abis/Delegation.ts";
import { DELEGATION_ADDRESS } from "../constants/addresses.ts";
import { SupportedChainId } from "../web3/chains.ts";

const useReadRewardStatus = () => {
  const [rewardStatus, setRewardStatus] = useState<boolean | null>(null);
  const { address: walletAddress } = useAccount();

  const { data, isFetched, refetch } = useReadContract({
    abi: DELEGATION_ABI,
    address: DELEGATION_ADDRESS,
    functionName: "restake",
    args: walletAddress ? [walletAddress] : undefined,
    chainId: SupportedChainId.chainId,
  });

  useEffect(() => {
    if (isFetched && data !== undefined && data !== null) {
      setRewardStatus(data as any);
    }
  }, [isFetched, data]);

  return { rewardStatus, refetch };
};

export default useReadRewardStatus;
