import { useConvert } from "../../context/ConvertContext.tsx";
import Modal from "./Modal.tsx";

export const ApproveModal = () => {
  const { isApproveModalOpen, setIsApproveModalOpen } = useConvert();

  return (
    <Modal
      closeModalHandler={() => setIsApproveModalOpen(false)}
      isOpen={isApproveModalOpen}
      size="sm"
    >
      <div className="pb-4 px-3 flex flex-col justify-center items-center">
        <img
          className="w-22 mb-12"
          src="/assets/images/connect-wallet-modal-icon.svg"
          alt=""
        />
        {/* <p className="text-center mb-6 text-black">
          please connect your wallet to continue.
        </p> */}
        <div>Approve and ...</div>
      </div>
    </Modal>
  );
};
