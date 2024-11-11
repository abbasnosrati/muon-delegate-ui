import { ConnectWalletButton } from "./ConnectWalletButton.tsx";
import Modal from "./Modal.tsx";
import useDelegateAction from "../../context/DelegateAction/useDelegateAction.ts";

export const ConnectWalletModal = () => {
  const { isConnectWalletModalOpen, setIsConnectWalletModalOpen } =
    useDelegateAction();

  return (
    <Modal
      closeModalHandler={() => setIsConnectWalletModalOpen(false)}
      isOpen={isConnectWalletModalOpen}
      size="sm"
    >
      <div className="pb-4 px-3 flex flex-col justify-center items-center">
        <img
          className="w-22 mb-12"
          src="/assets/images/connect-wallet-modal-icon.svg"
          alt=""
        />
        <p className="text-center mb-6 text-black">
          please connect your wallet to continue.
        </p>
        <ConnectWalletButton size="md" />
      </div>
    </Modal>
  );
};
