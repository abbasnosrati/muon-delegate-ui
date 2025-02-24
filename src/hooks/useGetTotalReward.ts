import { useEffect, useState } from "react";
import { W3bNumber } from "../types/wagmi.ts";
import { useAccount, useReadContract } from "wagmi";
import STAKING_ABI from "../abis/MuonNodeStaking.ts";
import {
  DELEGATOR_NODE_STAKER_WALLET_ADDRESS,
  MUON_NODES_STAKER_ADDRESS,
  DELEGATOR_MUON_ADDRESS,
} from "../constants/addresses.ts";
import { w3bNumberFromBigint } from "../utils/web3.ts";
import { getCurrentChainId } from "../web3/chains.ts";
import { readContract } from "wagmi/actions";
import { config } from "../web3/config.ts";
import DELEGATION_ABI from "../abis/Delegation.ts";

const useGetTotalReward = () => {
  const { address: walletAddress } = useAccount();
  const [totalReward, setTotalReward] = useState<W3bNumber | null>(null);
  const [totalEarned, setTotalEarned] = useState<W3bNumber | null>(null);
  const [userIndex, setUserIndex] = useState<bigint | null>(null);

  const decimals = 18;
  const { data, isFetched, refetch } = useReadContract({
    abi: STAKING_ABI,
    address: MUON_NODES_STAKER_ADDRESS[getCurrentChainId()],
    functionName: "earned",
    args: [DELEGATOR_NODE_STAKER_WALLET_ADDRESS[getCurrentChainId()]],

    chainId: getCurrentChainId(),
  });

  const handleGetUserIndex = async () => {
    const result = await readContract(config, {
      abi: DELEGATION_ABI,
      address: DELEGATOR_MUON_ADDRESS[getCurrentChainId()],
      functionName: "userIndexes",
      args: [walletAddress],
      chainId: getCurrentChainId() as any,
    });
    if (result) setUserIndex(result as bigint);
  };

  const handleCalcAmount = async () => {
    const timestampInSeconds = Math.floor(Date.now() / 1000);
    const multiplier = 0.9;
    const res = (
      BigInt(totalEarned!.big * BigInt(multiplier * 10)) / 10n
    ).toString();

    const result: any = await readContract(config, {
      abi: DELEGATION_ABI,
      address: DELEGATOR_MUON_ADDRESS[getCurrentChainId()],
      functionName: "calcAmounts",
      args: [res, timestampInSeconds],
      chainId: getCurrentChainId() as any,
    });
    setTotalReward(w3bNumberFromBigint(result[Number(userIndex) - 1]));
  };

  useEffect(() => {
    if (isFetched && data !== undefined && data !== null) {
      if (walletAddress) handleGetUserIndex();
      setTotalEarned(w3bNumberFromBigint(data, decimals));
    }
  }, [isFetched, data, walletAddress]);

  useEffect(() => {
    if (userIndex) handleCalcAmount();
  }, [userIndex]);

  return { totalReward, refetch };
};

export default useGetTotalReward;
