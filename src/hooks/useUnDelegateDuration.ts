import { useAccount, useReadContract } from "wagmi";
import Delegation from "../abis/Delegation";
import { DELEGATOR_MUON_ADDRESS } from "../constants/addresses";
import { getCurrentChainId } from "../web3/chains";

const useUnDelegateDuration = () => {
  const { address: walletAddress } = useAccount();

  const { data: exitPeriodTime } = useReadContract({
    abi: Delegation,
    address: DELEGATOR_MUON_ADDRESS[getCurrentChainId()],
    functionName: "exitPendingPeriod",
    chainId: getCurrentChainId(),
  });

  const { data: userUnStakeReqTime } = useReadContract({
    abi: Delegation,
    address: DELEGATOR_MUON_ADDRESS[getCurrentChainId()],
    args: walletAddress ? [walletAddress] : undefined,
    functionName: "unstakeReqTimes",
    chainId: getCurrentChainId(),
  });

  const { data: pendingUnstakes } = useReadContract({
    abi: Delegation,
    address: DELEGATOR_MUON_ADDRESS[getCurrentChainId()],
    args: walletAddress ? [walletAddress] : undefined,
    functionName: "pendingUnstakes",
    chainId: getCurrentChainId(),
  });

  return { exitPeriodTime, userUnStakeReqTime, pendingUnstakes };
};

export default useUnDelegateDuration;
