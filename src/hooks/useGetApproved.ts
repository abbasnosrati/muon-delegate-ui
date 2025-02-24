import { useEffect, useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import BONPION_ABI from "../abis/NFT.ts";
import { DELEGATOR_MUON_ADDRESS } from "../constants/addresses.ts";
import { getCurrentChainId } from "../web3/chains.ts";

const useGetApproved = (contractAddress: `0x${string}`, tokenId?: number) => {
  const [isBonMuonApproved, setIsBonMuonApproved] = useState<boolean | null>(
    null
  );

  const { address: walletAddress } = useAccount();
  const { data, isFetched, refetch } = useReadContract({
    abi: BONPION_ABI,
    address: contractAddress,
    functionName: "getApproved",
    args: walletAddress && tokenId ? [BigInt(tokenId)] : undefined,
    chainId: getCurrentChainId(),
  });

  useEffect(() => {
    if (isFetched && data !== undefined && data !== null) {
      setIsBonMuonApproved(
        data.toLowerCase() ==
          DELEGATOR_MUON_ADDRESS[getCurrentChainId()].toLocaleLowerCase()
      );
    }
  }, [isFetched, data]);

  return { isBonMuonApproved, refetch };
};

export default useGetApproved;
