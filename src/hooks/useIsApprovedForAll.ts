import { useEffect, useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import BONPION_ABI from "../abis/NFT.ts";
import { BONPION_ADDRESS } from "../constants/addresses.ts";
import { SupportedChainId } from "../web3/chains.ts";

const useIsApprovedForAll = (
  contractAddress: `0x${string}`,
  spenderAddress: `0x${string}`
) => {
  const [isApprovedForAll, setIsApprovedForAll] = useState<boolean | null>(
    null
  );

  const { address: walletAddress } = useAccount();

  const { data, isFetched, refetch } = useReadContract({
    abi: BONPION_ABI,
    address: contractAddress,
    functionName: "isApprovedForAll",
    args: walletAddress
      ? [walletAddress, spenderAddress ? spenderAddress : BONPION_ADDRESS]
      : undefined,
    chainId: SupportedChainId.bscTestnet,
  });

  useEffect(() => {
    if (isFetched && data !== undefined && data !== null) {
      setIsApprovedForAll(data);
    }
  }, [isFetched, data]);

  return { isApprovedForAll, refetch };
};

export default useIsApprovedForAll;
