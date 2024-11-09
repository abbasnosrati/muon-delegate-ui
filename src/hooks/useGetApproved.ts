import { useEffect, useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import BONPION_ABI from "../abis/NFT.ts";
import { BONPION_ADDRESS } from "../constants/addresses.ts";
import { SupportedChainId } from "../web3/chains.ts";

const useGetApproved = (contractAddress: `0x${string}`, tokenId?: number) => {
  const [isBonPionApproved, setIsBonPionApproved] = useState<boolean | null>(
    null
  );

  const { address: walletAddress } = useAccount();
  const { data, isFetched, refetch } = useReadContract({
    abi: BONPION_ABI,
    address: contractAddress,
    functionName: "getApproved",
    args: walletAddress && tokenId ? [BigInt(tokenId)] : undefined,
    chainId: SupportedChainId.chainId,
  });

  useEffect(() => {
    if (isFetched && data !== undefined && data !== null) {
      setIsBonPionApproved(
        data.toLowerCase() == BONPION_ADDRESS.toLocaleLowerCase()
      );
    }
  }, [isFetched, data]);

  return { isBonPionApproved, refetch };
};

export default useGetApproved;
