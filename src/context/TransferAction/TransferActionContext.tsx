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

const TransferActionContext = createContext<{
  isTransferModalOpen: boolean;
  openTransferModal: () => void;
  closeTransferModal: () => void;
  isSelectedTransferBonALICE: (bonALICE: BonPION) => boolean;
  handleTransferModalItemClicked: (bonALICE: BonPION) => void;
  selectedTransferBonALICE: BonPION | null;
  handleTransferAddressChange: (address: string) => void;
  transferAddress: string;
  // transfer: () => void;
  unselectTransferModalSelectedBonALICE: () => void;
}>({
  isTransferModalOpen: false,
  openTransferModal: () => {},
  closeTransferModal: () => {},
  isSelectedTransferBonALICE: () => false,
  handleTransferModalItemClicked: () => {},
  selectedTransferBonALICE: null,
  handleTransferAddressChange: () => {},
  transferAddress: "",
  // transfer: () => {},
  unselectTransferModalSelectedBonALICE: () => {},
});

const TransferActionProvider = ({ children }: { children: ReactNode }) => {
  const { address: walletAddress } = useAccount();
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [transferModalSelectedBonALICE, setTransferModalSelectedBonALICE] =
    useState<BonPION | null>(null);
  const [transferAddress, setTransferAddress] = useState("");
  const handleTransferAddressChange = useCallback((address: string) => {
    setTransferAddress(address);
  }, []);

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
    setTransferAddress("");
  }, [walletAddress]);

  return (
    <TransferActionContext.Provider
      value={{
        isTransferModalOpen,
        transferAddress,
        handleTransferAddressChange,
        selectedTransferBonALICE: transferModalSelectedBonALICE,
        openTransferModal,
        closeTransferModal,
        isSelectedTransferBonALICE,
        handleTransferModalItemClicked,
        // transfer,
        unselectTransferModalSelectedBonALICE,
      }}
    >
      {children}
    </TransferActionContext.Provider>
  );
};

export { TransferActionProvider, TransferActionContext };
