import { useEffect, useState } from "react";
import { W3bNumber } from "../types/wagmi.ts";
import { useAccount, useReadContract } from "wagmi";
import PION_ABI from "../abis/Token.ts";
import { PionContractAddress } from "../constants/addresses.ts";
import { w3bNumberFromBigint } from "../utils/web3.ts";
import { SupportedChainId } from "../web3/chains.ts";

const useAllowance = (
  contractAddress: `0x${string}`,
  spenderAddress?: `0x${string}`,
  decimals = 18
) => {
  const [allowance, setAllowance] = useState<W3bNumber | null>(null);
  const { address: walletAddress } = useAccount();

  const { data, isFetched, refetch } = useReadContract({
    abi: PION_ABI,
    address: contractAddress,
    functionName: "allowance",
    args: walletAddress
      ? [walletAddress, spenderAddress ? spenderAddress : PionContractAddress]
      : undefined,
    chainId: SupportedChainId.chainId,
  });

  useEffect(() => {
    if (isFetched && data !== undefined && data !== null) {
      setAllowance(w3bNumberFromBigint(data, decimals));
    }
  }, [isFetched, data, decimals]);

  return { allowance, refetch };
};

export default useAllowance;
