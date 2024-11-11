import { PION } from "../../constants/strings";
import useBonPION from "../../context/BonPION/useBonPION";
import useDelegateAction from "../../context/DelegateAction/useDelegateAction";
import BonALICEModalBody from "../common/BonALICEModalBody";
import SelectButtonWithModal from "../common/SelectButtonWithModal";

export const DelegateBonPion = () => {
  const { bonPIONs } = useBonPION();
  const {
    isTransferModalOpen,
    openTransferModal,
    closeTransferModal,
    handleTransferModalItemClicked,
    selectedTransferBonALICE,
    isSelectedTransferBonALICE,
  } = useDelegateAction();

  return (
    <div className="mb-3">
      <SelectButtonWithModal
        title={`Select ${PION.nft}`}
        onClick={() => openTransferModal()}
        isModalOpen={isTransferModalOpen}
        closeModalHandler={() => closeTransferModal()}
        modalTitle={`Select ${PION.nft}`}
        removeItem={() => {}}
        selectedItems={
          selectedTransferBonALICE ? [selectedTransferBonALICE] : []
        }
      >
        <BonALICEModalBody
          bonPIONs={bonPIONs}
          handleUpgradeModalItemClicked={handleTransferModalItemClicked}
          isSelectedUpgradeBonALICE={isSelectedTransferBonALICE}
        />
      </SelectButtonWithModal>
    </div>
  );
};
