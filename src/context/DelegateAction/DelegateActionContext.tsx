import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

import { BonMUON, RewardStatus } from "../../types/index.ts";
import { useAccount } from "wagmi";
import { MUON } from "../../constants/strings.ts";
import Delegation_ABI from "../../abis/Delegation.ts";
import PION_ABI from "../../abis/Token.ts";
// import BONPION_ABI from "../../abis/NFT.ts";

import { writeContract } from "@wagmi/core";
import {
  BON_MUON_TOKEN_ADDRESS,
  DELEGATOR_MUON_ADDRESS,
  MUON_TOKEN_ADDRESS,
} from "../../constants/addresses.ts";
import { config } from "../../web3/config.ts";
import { w3bNumberFromString } from "../../utils/web3.ts";
import { W3bNumber } from "../../types/wagmi.ts";
import { waitForTransactionReceipt } from "wagmi/actions";
import useAllowance from "../../hooks/useAllowance.ts";
import useDelegateBalances from "../../hooks/useDelegateBalances.ts";
import useGetApproved from "../../hooks/useGetApproved.ts";
import useReadRewardStatus from "../../hooks/useReadRewardStatus.ts";
import { getCurrentChainId } from "../../web3/chains.ts";
import useGetTotalReward from "../../hooks/useGetTotalReward.ts";
import useGetTotalDelegated from "../../hooks/useGetTotalDelegate.ts";
import { useMuon } from "../MuonContext.tsx";

const DelegateActionContext = createContext<{
  isTransferModalOpen: boolean;
  openTransferModal: () => void;
  closeTransferModal: () => void;
  isSelectedTransferBonALICE: (bonALICE: BonMUON) => boolean;
  handleTransferModalItemClicked: (bonALICE: BonMUON) => void;
  selectedTransferBonALICE: BonMUON | null;
  unselectTransferModalSelectedBonALICE: () => void;
  muonDelegateAmount: W3bNumber;
  setMuonDelegateAmount: (amount: W3bNumber) => void;
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
  isMetaMaskLoadingUnDelegate: boolean;
  MuonAllowanceForDelegator: W3bNumber | null;
  muonAllowance: boolean;
  userDelegateBalances: W3bNumber | null;
  isBonMuonApproved: boolean | null;
  rewardStatus: boolean | null;
  handleSwitchRewardStatus: () => void;
  isLoadingMetamaskSwitchReward: boolean;
  totalDelegated: W3bNumber | null;
  userReward: W3bNumber | null;
  unDelegateAmount: W3bNumber;
  setUnDelegateAmount: (amount: W3bNumber) => void;
  handleUnDelegate: () => void;
}>({
  isTransferModalOpen: false,
  openTransferModal: () => {},
  closeTransferModal: () => {},
  isSelectedTransferBonALICE: () => false,
  handleTransferModalItemClicked: () => {},
  selectedTransferBonALICE: null,
  unselectTransferModalSelectedBonALICE: () => {},
  muonDelegateAmount: w3bNumberFromString(""),
  setMuonDelegateAmount: () => {},
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
  isMetaMaskLoadingUnDelegate: false,
  MuonAllowanceForDelegator: null,
  muonAllowance: false,
  userDelegateBalances: null,
  isBonMuonApproved: false,
  rewardStatus: null,
  handleSwitchRewardStatus: () => {},
  isLoadingMetamaskSwitchReward: false,
  totalDelegated: null,
  userReward: null,
  unDelegateAmount: w3bNumberFromString(""),
  setUnDelegateAmount: () => {},
  handleUnDelegate: () => {},
});

const DelegateActionProvider = ({ children }: { children: ReactNode }) => {
  const { address: walletAddress, chainId } = useAccount();
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [muonDelegateAmount, setMuonDelegateAmount] = useState<W3bNumber>(
    w3bNumberFromString("")
  );

  const [isLoadingMetamaskSwitchReward, setIsLoadingMetamaskSwitchReward] =
    useState(false);

  const { userDelegateBalances, refetch: refetchUserDelegateBalance } =
    useDelegateBalances();

  const [isMetaMaskLoadingApprove, setIsMetamaskLoadingApprove] =
    useState(false);

  const [isMetaMaskLoadingDelegate, setIsMetamaskLoadingDelegate] =
    useState(false);

  const [isMetaMaskLoadingUnDelegate, setIsMetamaskLoadingUnDelegate] =
    useState(false);

  const [isConnectWalletModalOpen, setIsConnectWalletModalOpen] = useState(
    !walletAddress
  );

  const [unDelegateAmount, setUnDelegateAmount] = useState<W3bNumber>(
    w3bNumberFromString("")
  );

  const { refetchMuonBalance } = useMuon();

  useEffect(() => {
    setIsConnectWalletModalOpen(!walletAddress);
  }, [walletAddress]);

  const [isWrongNetworkModalOpen, setIsWrongNetworkModalOpen] = useState(false);

  useEffect(() => {
    if (chainId && walletAddress)
      setIsWrongNetworkModalOpen(chainId !== getCurrentChainId());
  }, [chainId]);

  const checkMetamaskChain = () => {
    if (walletAddress) {
      setIsWrongNetworkModalOpen(chainId !== getCurrentChainId());
      return chainId == getCurrentChainId();
    }
  };

  const [selectedRewardStatus, setSelectedRewardStatus] = useState(null);

  const [muonAllowance, setMuonAllowance] = useState(false);

  const [userReward, setUserReward] = useState<W3bNumber | null>(null);

  const [transferModalSelectedBonALICE, setTransferModalSelectedBonALICE] =
    useState<BonMUON | null>(null);

  const { totalReward, refetchTotalReward } = useGetTotalReward();

  const {
    totalDelegated,

    handleGetTotalDelegated,
  } = useGetTotalDelegated();

  useEffect(() => {
    if (totalReward && totalReward.hStr) {
      setUserReward(totalReward);
    }
  }, [totalReward, userDelegateBalances]);

  const {
    allowance: MuonAllowanceForDelegator,
    refetch: refetchMuonAllowance,
  } = useAllowance(
    MUON_TOKEN_ADDRESS[getCurrentChainId()],
    DELEGATOR_MUON_ADDRESS[getCurrentChainId()]
  );

  const { isBonMuonApproved, refetch: refetchIsBonApproved } = useGetApproved(
    BON_MUON_TOKEN_ADDRESS[getCurrentChainId()],
    transferModalSelectedBonALICE?.tokenId
  );

  const { rewardStatus, refetch: refetchRewardStatus } = useReadRewardStatus();

  useEffect(() => {
    if (MuonAllowanceForDelegator && muonDelegateAmount) {
      setMuonAllowance(MuonAllowanceForDelegator.big < muonDelegateAmount.big);
    }
  }, [MuonAllowanceForDelegator, muonDelegateAmount]);

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

  // const handleChangeDelegateAmount = (amount: string) => {
  //   if (!checkIsWalletConnect()) return;
  //   console.log(amount);
  //   setMuonDelegateAmount(w3bNumberFromString(amount));
  // };

  const openTransferModal = useCallback(() => {
    setIsTransferModalOpen(true);
  }, []);

  const closeTransferModal = useCallback(
    () => setIsTransferModalOpen(false),
    []
  );

  const handleDelegate = async (delegateType: string) => {
    if (!checkMetamaskChain()) {
      return;
    }
    if (!checkIsWalletConnect()) return;
    if (delegateType === MUON.token) {
      await handleDelegateToken();
    }

    refetchRewardStatus();
  };

  useEffect(() => {
    if (transferModalSelectedBonALICE?.tokenId) {
      refetchIsBonApproved();
    }
  }, [transferModalSelectedBonALICE]);

  const handleDelegateToken = async () => {
    try {
      setIsMetamaskLoadingDelegate(true);
      const result = await writeContract(config, {
        address: DELEGATOR_MUON_ADDRESS[getCurrentChainId()],
        abi: Delegation_ABI,
        functionName: "delegateToken",
        args: [
          muonDelegateAmount!.big,
          walletAddress!,
          selectedRewardStatus == RewardStatus.ReStakeReward,
        ],
        chainId: getCurrentChainId() as any,
      });

      await waitForTransactionReceipt(config, {
        hash: result,
      });
    } finally {
      setIsMetamaskLoadingDelegate(false);
      refetchUserDelegateBalance();
      refetchMuonAllowance();
      setMuonDelegateAmount(w3bNumberFromString(""));
      handleGetTotalDelegated();
    }
  };

  const handleUnDelegate = async () => {
    try {
      setIsMetamaskLoadingUnDelegate(true);
      const result = await writeContract(config, {
        address: DELEGATOR_MUON_ADDRESS[getCurrentChainId()],
        abi: Delegation_ABI,
        functionName: "unstake",
        args: [unDelegateAmount!.big],
        chainId: getCurrentChainId() as any,
      });

      await waitForTransactionReceipt(config, {
        hash: result,
      });
    } finally {
      setIsMetamaskLoadingUnDelegate(false);
      handleGetTotalDelegated();
      refetchUserDelegateBalance();
      refetchMuonAllowance();
      refetchTotalReward();
      refetchMuonBalance();
      setUnDelegateAmount(w3bNumberFromString(""));
    }
  };

  const handleApprove = (delegateType: string) => {
    if (!checkMetamaskChain()) {
      return;
    }
    if (delegateType === MUON.token) {
      handleApproveMuon();
    }
    // else {
    //   handleApproveBonMuon();
    // }
  };

  const handleApproveMuon = async () => {
    try {
      setIsMetamaskLoadingApprove(true);
      const result = await writeContract(config, {
        address: MUON_TOKEN_ADDRESS[getCurrentChainId()],
        abi: PION_ABI,
        functionName: "approve",
        args: [
          DELEGATOR_MUON_ADDRESS[getCurrentChainId()],
          muonDelegateAmount!.big,
        ],
      });
      await waitForTransactionReceipt(config, {
        hash: result,
      });
      refetchMuonAllowance();
    } finally {
      setIsMetamaskLoadingApprove(false);
    }
  };

  // const handleApproveBonMuon = async () => {
  //   try {
  //     setIsMetamaskLoadingApprove(true);
  //     const result = await writeContract(config, {
  //       address: BON_MUON_TOKEN_ADDRESS[getCurrentChainId()],
  //       abi: BONPION_ABI,
  //       functionName: "approve",
  //       args: [
  //         DELEGATOR_MUON_ADDRESS[getCurrentChainId()],
  //         transferModalSelectedBonALICE!.tokenId,
  //       ],
  //     });
  //     await waitForTransactionReceipt(config, {
  //       hash: result,
  //       confirmations: 2,
  //     });
  //     refetchIsBonApproved();
  //   } finally {
  //     setIsMetamaskLoadingApprove(false);
  //   }
  // };

  // const handleDelegateNFT = async () => {
  //   try {
  //     setIsMetamaskLoadingDelegate(true);
  //     const result = await writeContract(config, {
  //       address: DELEGATOR_MUON_ADDRESS[getCurrentChainId()],
  //       abi: Delegation_ABI,
  //       functionName: "delegateNFT",
  //       args: [
  //         transferModalSelectedBonALICE!.tokenId,
  //         walletAddress!,
  //         selectedRewardStatus == RewardStatus.ReStakeReward,
  //       ],
  //     });

  //     await waitForTransactionReceipt(config, {
  //       hash: result,
  //     });
  //   } finally {
  //     setIsMetamaskLoadingDelegate(false);
  //     refetchUserDelegateBalance();
  //     unselectTransferModalSelectedBonALICE();
  //   }
  // };

  const changeTransferModalSelectedBonALICE = useCallback(
    (bonALICE: BonMUON) => {
      setTransferModalSelectedBonALICE(bonALICE);
      closeTransferModal();
    },
    [closeTransferModal]
  );

  const unselectTransferModalSelectedBonALICE = useCallback(() => {
    setTransferModalSelectedBonALICE(null);
  }, []);

  const handleTransferModalItemClicked = useCallback(
    (bonALICE: BonMUON) => {
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
    (bonALICE: BonMUON) => {
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
        address: DELEGATOR_MUON_ADDRESS[getCurrentChainId()],
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
        muonDelegateAmount,
        unselectTransferModalSelectedBonALICE,
        setMuonDelegateAmount,
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
        MuonAllowanceForDelegator,
        muonAllowance,
        userDelegateBalances,
        isBonMuonApproved,
        rewardStatus,
        handleSwitchRewardStatus,
        isLoadingMetamaskSwitchReward,
        totalDelegated,
        userReward,
        unDelegateAmount,
        setUnDelegateAmount,
        handleUnDelegate,
        isMetaMaskLoadingUnDelegate,
      }}
    >
      {children}
    </DelegateActionContext.Provider>
  );
};

export { DelegateActionProvider, DelegateActionContext };
