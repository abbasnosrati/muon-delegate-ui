import { useEffect, useState } from "react";
import { W3bNumber } from "../types/wagmi.ts";
import { useReadContract } from "wagmi";
import STAKING_ABI from "../abis/MuonNodeStaking.ts";
import {
  DELEGATOR_NODE_STAKER,
  NODE_STAKER_ADDRESS,
} from "../constants/addresses.ts";
import { w3bNumberFromBigint } from "../utils/web3.ts";
import { SupportedChainId } from "../web3/chains.ts";

const useGetTotalReward = () => {
  const [totalReward, setTotalReward] = useState<W3bNumber | null>(null);
  const decimals = 18;
  const { data, isFetched, refetch } = useReadContract({
    abi: STAKING_ABI,
    address: NODE_STAKER_ADDRESS,
    functionName: "earned",
    args: [DELEGATOR_NODE_STAKER],

    chainId: SupportedChainId.chainId,
  });

  useEffect(() => {
    if (isFetched && data !== undefined && data !== null) {
      setTotalReward(w3bNumberFromBigint(data, decimals));
    }
  }, [isFetched, data]);

  return { totalReward, refetch };
};

export default useGetTotalReward;
