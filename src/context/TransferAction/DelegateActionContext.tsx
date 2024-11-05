import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { BonPION, RewardStatus } from "../../types";
import { useAccount } from "wagmi";
import { PION } from "../../constants/strings";
import Delegation_ABI from "../../abis/Delegation";
import PION_ABI from "../../abis/Token.ts";
import BONPION_ABI from "../../abis/NFT.ts";

import { writeContract } from "@wagmi/core";
import {
  BONPION_ADDRESS,
  DELEGATION_ADDRESS,
  PionContractAddress,
} from "../../constants/addresses";
import { config } from "../../web3/config";
import { w3bNumberFromString } from "../../utils/web3.ts";
import { W3bNumber } from "../../types/wagmi.ts";
import { waitForTransactionReceipt } from "wagmi/actions";
import useAllowance from "../../hooks/useAllowance.ts";
import useDelegateBalances from "../../hooks/useDelegateBalances.ts";
import useGetApproved from "../../hooks/useGetApproved.ts";
import useReadRewardStatus from "../../hooks/useReadRewardStatus.ts";
import { SupportedChainId } from "../../web3/chains.ts";

const DelegateActionContext = createContext<{
  isTransferModalOpen: boolean;
  openTransferModal: () => void;
  closeTransferModal: () => void;
  isSelectedTransferBonALICE: (bonALICE: BonPION) => boolean;
  handleTransferModalItemClicked: (bonALICE: BonPION) => void;
  selectedTransferBonALICE: BonPION | null;
  unselectTransferModalSelectedBonALICE: () => void;
  pionDelegateAmount: string | null;
  handleChangeDelegateAmount: (amount: string) => void;
  selectedRewardStatus: null | string | undefined;
  handleCheckboxChange: (checkbox: any) => void;
  isConnectWalletModalOpen: boolean;
  setIsConnectWalletModalOpen: (isOpen: boolean) => void;
  isWrongNetworkModalOpen: boolean;
  setIsWrongNetworkModalOpen: (isOpen: boolean) => void;
  handleDelegate: (delegateType: string) => void;
  handleApprove: (delegateType: string) => void;
  isMetaMaskLoadingApprove: boolean;
  isMetaMaskLoadingDelegate: boolean;
  PionAllowanceForDelegator: W3bNumber | null;
  pionAllowance: boolean;
  userDelegateBalances: W3bNumber | null;
  isBonPionApproved: boolean | null;
  rewardStatus: boolean | null;
  handleSwitchRewardStatus: () => void;
  isLoadingMetamaskSwitchReward: boolean;
}>({
  isTransferModalOpen: false,
  openTransferModal: () => {},
  closeTransferModal: () => {},
  isSelectedTransferBonALICE: () => false,
  handleTransferModalItemClicked: () => {},
  selectedTransferBonALICE: null,
  unselectTransferModalSelectedBonALICE: () => {},
  pionDelegateAmount: null,
  handleChangeDelegateAmount: () => {},
  selectedRewardStatus: null,
  handleCheckboxChange: () => {},
  isConnectWalletModalOpen: false,
  setIsConnectWalletModalOpen: () => {},
  isWrongNetworkModalOpen: false,
  setIsWrongNetworkModalOpen: () => {},
  handleDelegate: () => {},
  handleApprove: () => {},
  isMetaMaskLoadingApprove: false,
  isMetaMaskLoadingDelegate: false,
  PionAllowanceForDelegator: null,
  pionAllowance: false,
  userDelegateBalances: null,
  isBonPionApproved: false,
  rewardStatus: null,
  handleSwitchRewardStatus: () => {},
  isLoadingMetamaskSwitchReward: false,
});

const DelegateActionProvider = ({ children }: { children: ReactNode }) => {
  const { address: walletAddress, chainId } = useAccount();
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [pionDelegateAmount, setPionDelegateAmount] = useState<string | null>(
    null
  );

  const [isLoadingMetamaskSwitchReward, setIsLoadingMetamaskSwitchReward] =
    useState(false);

  const { userDelegateBalances, refetch: refetchUserDelegateBalance } =
    useDelegateBalances();

  const [isMetaMaskLoadingApprove, setIsMetamaskLoadingApprove] =
    useState(false);

  const [isMetaMaskLoadingDelegate, setIsMetamaskLoadingDelegate] =
    useState(false);

  const [isConnectWalletModalOpen, setIsConnectWalletModalOpen] = useState(
    !walletAddress
  );

  const [isWrongNetworkModalOpen, setIsWrongNetworkModalOpen] = useState(false);

  useEffect(() => {
    if (chainId)
      setIsWrongNetworkModalOpen(chainId !== SupportedChainId.bscTestnet);
  }, [chainId]);

  const checkMetamaskChain = () => {
    setIsWrongNetworkModalOpen(chainId !== SupportedChainId.bscTestnet);
    return chainId == SupportedChainId.bscTestnet;
  };

  const [selectedRewardStatus, setSelectedRewardStatus] = useState(null);

  const [pionAllowance, setPionAllowance] = useState(false);

  const [transferModalSelectedBonALICE, setTransferModalSelectedBonALICE] =
    useState<BonPION | null>(null);

  const {
    allowance: PionAllowanceForDelegator,
    refetch: refetchPionAllowance,
  } = useAllowance(PionContractAddress, DELEGATION_ADDRESS);

  const { isBonPionApproved, refetch: refetchIsBonPionApproved } =
    useGetApproved(BONPION_ADDRESS, transferModalSelectedBonALICE?.tokenId);

  const { rewardStatus, refetch: refetchRewardStatus } = useReadRewardStatus();

  useEffect(() => {
    if (PionAllowanceForDelegator && pionDelegateAmount) {
      setPionAllowance(
        PionAllowanceForDelegator.dsp >= Number(pionDelegateAmount)
      );
    }
  }, [PionAllowanceForDelegator, pionDelegateAmount]);

  const handleCheckboxChange = (checkbox: any) => {
    if (!checkIsWalletConnect()) return;
    setSelectedRewardStatus(
      checkbox === selectedRewardStatus ? null : checkbox
    );
  };

  const checkIsWalletConnect = () => {
    if (!walletAddress) {
      setIsConnectWalletModalOpen(true);
      return false;
    }
    return true;
  };

  const handleChangeDelegateAmount = (amount: string) => {
    if (!checkIsWalletConnect()) return;
    setPionDelegateAmount(amount);
  };

  const openTransferModal = useCallback(() => {
    setIsTransferModalOpen(true);
  }, []);

  const closeTransferModal = useCallback(
    () => setIsTransferModalOpen(false),
    []
  );

  const handleDelegate = (delegateType: string) => {
    if (!checkMetamaskChain()) {
      return;
    }
    if (!checkIsWalletConnect()) return;
    if (delegateType === PION.token) {
      handleDelegateToken();
    } else {
      handleDelegateNFT();
    }
  };

  useEffect(() => {
    if (transferModalSelectedBonALICE?.tokenId) {
      refetchIsBonPionApproved();
    }
  }, [transferModalSelectedBonALICE]);

  const handleDelegateToken = async () => {
    try {
      setIsMetamaskLoadingDelegate(true);
      const result = await writeContract(config, {
        address: DELEGATION_ADDRESS,
        abi: Delegation_ABI,
        functionName: "delegateToken",
        args: [
          w3bNumberFromString(pionDelegateAmount!).big,
          walletAddress,
          selectedRewardStatus == RewardStatus.ReStakeReward,
        ],
      });

      await waitForTransactionReceipt(config, {
        hash: result,
      });
    } finally {
      setIsMetamaskLoadingDelegate(false);
      refetchUserDelegateBalance();
    }
  };

  const handleApprove = (delegateType: string) => {
    if (!checkMetamaskChain()) {
      return;
    }
    if (delegateType === PION.token) {
      handleApprovePion();
    } else {
      handleApproveBonPION();
    }
  };

  const handleApprovePion = async () => {
    try {
      setIsMetamaskLoadingApprove(true);
      const result = await writeContract(config, {
        address: PionContractAddress,
        abi: PION_ABI,
        functionName: "approve",
        args: [
          DELEGATION_ADDRESS,
          w3bNumberFromString(pionDelegateAmount!).big,
        ],
      });
      await waitForTransactionReceipt(config, {
        hash: result,
      });
      refetchPionAllowance();
    } finally {
      setIsMetamaskLoadingApprove(false);
    }
  };

  const handleApproveBonPION = async () => {
    try {
      setIsMetamaskLoadingApprove(true);
      const result = await writeContract(config, {
        address: BONPION_ADDRESS,
        abi: BONPION_ABI,
        functionName: "approve",
        args: [DELEGATION_ADDRESS, transferModalSelectedBonALICE!.tokenId],
      });
      await waitForTransactionReceipt(config, {
        hash: result,
      });
      refetchIsBonPionApproved();
    } finally {
      setIsMetamaskLoadingApprove(false);
    }
  };

  const handleDelegateNFT = async () => {
    try {
      setIsMetamaskLoadingDelegate(true);
      const result = await writeContract(config, {
        address: DELEGATION_ADDRESS,
        abi: Delegation_ABI,
        functionName: "delegateNFT",
        args: [
          transferModalSelectedBonALICE!.tokenId,
          walletAddress,
          selectedRewardStatus == RewardStatus.ReStakeReward,
        ],
      });

      await waitForTransactionReceipt(config, {
        hash: result,
      });
    } finally {
      setIsMetamaskLoadingDelegate(false);
      refetchUserDelegateBalance();
    }
  };

  const changeTransferModalSelectedBonALICE = useCallback(
    (bonALICE: BonPION) => {
      setTransferModalSelectedBonALICE(bonALICE);
      closeTransferModal();
    },
    [closeTransferModal]
  );

  const unselectTransferModalSelectedBonALICE = useCallback(() => {
    setTransferModalSelectedBonALICE(null);
  }, []);

  const handleTransferModalItemClicked = useCallback(
    (bonALICE: BonPION) => {
      if (!transferModalSelectedBonALICE) {
        changeTransferModalSelectedBonALICE(bonALICE);
        return;
      }
      if (transferModalSelectedBonALICE.tokenId === bonALICE.tokenId) {
        unselectTransferModalSelectedBonALICE();
      } else {
        changeTransferModalSelectedBonALICE(bonALICE);
      }
    },
    [
      changeTransferModalSelectedBonALICE,
      transferModalSelectedBonALICE,
      unselectTransferModalSelectedBonALICE,
    ]
  );

  const isSelectedTransferBonALICE = useCallback(
    (bonALICE: BonPION) => {
      return (
        !!transferModalSelectedBonALICE &&
        transferModalSelectedBonALICE.tokenId === bonALICE.tokenId
      );
    },
    [transferModalSelectedBonALICE]
  );

  const handleSwitchRewardStatus = async () => {
    if (!checkMetamaskChain()) {
      return;
    }
    try {
      setIsLoadingMetamaskSwitchReward(true);
      const result = await writeContract(config, {
        address: DELEGATION_ADDRESS,
        abi: Delegation_ABI,
        functionName: "setRestake",
        args: [!rewardStatus],
      });
      await waitForTransactionReceipt(config, {
        hash: result,
      });
      refetchRewardStatus();
    } finally {
      setIsLoadingMetamaskSwitchReward(false);
    }
  };

  useEffect(() => {
    setTransferModalSelectedBonALICE(null);
  }, [walletAddress]);

  return (
    <DelegateActionContext.Provider
      value={{
        isTransferModalOpen,
        selectedTransferBonALICE: transferModalSelectedBonALICE,
        openTransferModal,
        closeTransferModal,
        isSelectedTransferBonALICE,
        handleTransferModalItemClicked,
        pionDelegateAmount,
        unselectTransferModalSelectedBonALICE,
        handleChangeDelegateAmount,
        handleCheckboxChange,
        selectedRewardStatus,
        isConnectWalletModalOpen,
        setIsConnectWalletModalOpen,
        isWrongNetworkModalOpen,
        setIsWrongNetworkModalOpen,
        handleDelegate,
        handleApprove,
        isMetaMaskLoadingApprove,
        isMetaMaskLoadingDelegate,
        PionAllowanceForDelegator,
        pionAllowance,
        userDelegateBalances,
        isBonPionApproved,
        rewardStatus,
        handleSwitchRewardStatus,
        isLoadingMetamaskSwitchReward,
      }}
    >
      {children}
    </DelegateActionContext.Provider>
  );
};

export { DelegateActionProvider, DelegateActionContext };
