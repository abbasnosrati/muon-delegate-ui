import { useEffect, useState } from "react";
import { W3bNumber } from "../types/wagmi.ts";
import { useReadContract } from "wagmi";
import STAKING_ABI from "../abis/MuonNodeStaking.ts";
import BONPION_ABI from "../abis/NFT.ts";
import {
  BONPION_ADDRESS,
  DELEGATOR_NODE_STAKER,
  NODE_STAKER_ADDRESS,
  PionContractAddress,
} from "../constants/addresses.ts";
import { w3bNumberFromBigint } from "../utils/web3.ts";
import { SupportedChainId } from "../web3/chains.ts";
import { readContract } from "wagmi/actions";
import { config } from "../web3/config.ts";

const useGetTotalDelegated = () => {
  const [tokenId, setTokenId] = useState<bigint | null>(null);
  const [totalDelegated, setTotalDelegated] = useState<W3bNumber | null>(null);
  const decimals = 18;

  const { data, isFetched, refetch } = useReadContract({
    abi: STAKING_ABI,
    address: NODE_STAKER_ADDRESS,
    functionName: "users",
    args: [DELEGATOR_NODE_STAKER],

    chainId: SupportedChainId.chainId,
  });

  const handleGetTotalDelegated = async () => {
    const result = await readContract(config, {
      abi: BONPION_ABI,
      address: BONPION_ADDRESS,
      functionName: "lockedOf",
      args: [tokenId!, PionContractAddress],
      chainId: SupportedChainId.chainId,
    });
    setTotalDelegated(w3bNumberFromBigint(result, decimals));
  };

  useEffect(() => {
    if (isFetched && data !== undefined && data !== null) {
      setTokenId(data[4]);
    }
  }, [isFetched, data]);

  useEffect(() => {
    if (tokenId) {
      handleGetTotalDelegated();
    } else {
      setTotalDelegated(w3bNumberFromBigint(0n, decimals));
    }
  }, [tokenId, isFetched]);

  return { totalDelegated, refetch };
};

export default useGetTotalDelegated;
