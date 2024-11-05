import { ConnectWalletButton } from "./ConnectWalletButton.tsx";
import Modal from "./Modal.tsx";
import useDelegateAction from "../../context/TransferAction/useDelegateAction.ts";

export const WrongNetworkModal = () => {
  const { isWrongNetworkModalOpen, setIsWrongNetworkModalOpen } =
    useDelegateAction();

  return (
    <Modal
      closeModalHandler={() => setIsWrongNetworkModalOpen(false)}
      isOpen={isWrongNetworkModalOpen}
      size="sm"
    >
      <div className="pb-4 px-3 flex flex-col justify-center items-center">
        <img
          className="w-22 mb-12"
          src="/assets/images/connect-wallet-modal-icon.svg"
          alt=""
        />
        <p className="text-center mb-6 text-black">Wrong Network</p>
        <ConnectWalletButton size="md" />
      </div>
    </Modal>
  );
};
