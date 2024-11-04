import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { BonPION } from "../../types";
// import useTransfer from "../../hooks/useTransfer.ts";
// import { Address } from "viem";
import { useAccount } from "wagmi";

const DelegateActionContext = createContext<{
  isTransferModalOpen: boolean;
  openTransferModal: () => void;
  closeTransferModal: () => void;
  isSelectedTransferBonALICE: (bonALICE: BonPION) => boolean;
  handleTransferModalItemClicked: (bonALICE: BonPION) => void;
  selectedTransferBonALICE: BonPION | null;
  // transfer: () => void;
  unselectTransferModalSelectedBonALICE: () => void;
  pionDelegateAmount: string | null;
  handleChangeDelegateAmount: (amount: string) => void;
  selectedRewardStatus: null | string | undefined;
  handleCheckboxChange: (checkbox: any) => void;
}>({
  isTransferModalOpen: false,
  openTransferModal: () => {},
  closeTransferModal: () => {},
  isSelectedTransferBonALICE: () => false,
  handleTransferModalItemClicked: () => {},
  selectedTransferBonALICE: null,
  // transfer: () => {},
  unselectTransferModalSelectedBonALICE: () => {},
  pionDelegateAmount: null,
  handleChangeDelegateAmount: () => {},
  selectedRewardStatus: null,
  handleCheckboxChange: () => {},
});

const DelegateActionProvider = ({ children }: { children: ReactNode }) => {
  const { address: walletAddress } = useAccount();
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [pionDelegateAmount, setPionDelegateAmount] = useState<string | null>(
    null
  );

  const [selectedRewardStatus, setSelectedRewardStatus] = useState(null);

  const handleCheckboxChange = (checkbox: any) => {
    setSelectedRewardStatus(
      checkbox === selectedRewardStatus ? null : checkbox
    );
  };

  const handleChangeDelegateAmount = (amount: string) => {
    setPionDelegateAmount(amount);
  };

  const [transferModalSelectedBonALICE, setTransferModalSelectedBonALICE] =
    useState<BonPION | null>(null);

  const openTransferModal = useCallback(() => setIsTransferModalOpen(true), []);
  const closeTransferModal = useCallback(
    () => setIsTransferModalOpen(false),
    []
  );

  // const { transfer } = useTransfer(
  //   walletAddress,
  //   transferAddress as Address,
  //   transferModalSelectedBonALICE?.tokenId
  // );

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
        // transfer,
        unselectTransferModalSelectedBonALICE,
        handleChangeDelegateAmount,
        handleCheckboxChange,
        selectedRewardStatus,
      }}
    >
      {children}
    </DelegateActionContext.Provider>
  );
};

export { DelegateActionProvider, DelegateActionContext };
