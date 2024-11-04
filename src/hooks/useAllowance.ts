import { useEffect, useState } from "react";
import { W3bNumber } from "../types/wagmi.ts";
import { useAccount, useContractRead } from "wagmi";
import ALICE_ABI from "../abis/Token.ts";
import { BONPION_ADDRESS } from "../constants/addresses.ts";
import { w3bNumberFromBigint } from "../utils/web3.ts";
import { SupportedChainId } from "../web3/chains.ts";

const useAllowance = (
  contractAddress: `0x${string}`,
  spenderAddress?: `0x${string}`,
  decimals = 18
) => {
  const [allowance, setAllowance] = useState<W3bNumber | null>(null);
  const { address: walletAddress } = useAccount();

  const { data, isFetched } = useContractRead({
    abi: ALICE_ABI,
    address: contractAddress,
    functionName: "allowance",
    args: walletAddress
      ? [walletAddress, spenderAddress ? spenderAddress : BONPION_ADDRESS]
      : undefined,
    chainId: SupportedChainId.bscTestnet,
  });

  useEffect(() => {
    if (isFetched && data !== undefined && data !== null) {
      setAllowance(w3bNumberFromBigint(data, decimals));
    }
  }, [isFetched, data, decimals]);

  return { allowance };
};

export default useAllowance;
