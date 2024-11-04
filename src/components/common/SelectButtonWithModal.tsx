import Modal from "./Modal.tsx";
import { ReactNode } from "react";
import { BonPION } from "../../types";
import { FadeIn } from "../../animations";
import { PION } from "../../constants/strings.ts";

const SelectButtonWithModal = ({
  title = "",
  multiple,
  children,
  isModalOpen,
  closeModalHandler,
  modalTitle,
  onClick,
  selectedItems,
  removeItem,
  errorMessage,
}: {
  title?: string;
  multiple?: boolean;
  children: ReactNode;
  isModalOpen: boolean;
  closeModalHandler: () => void;
  modalTitle: string;
  onClick: () => void;
  selectedItems: BonPION[];
  removeItem: (item: BonPION) => void;
  errorMessage?: string;
}) => {
  return (
    <div className="select-button-with-modal mb-2 w-full">
      <div className="flex flex-col w-full gap-2" onClick={onClick}>
        {title && (
          <div className="text-sm max-md:text-sm max-md:font-semibold text-xyz-2 dark:text-alice-gray">
            {title}
          </div>
        )}
        <div className="select-button-with-modal__button flex items-center justify-between bg-input-bg dark:bg-alice-xyz-75 rounded-xl pl-3 md:pl-5 pr-4 h-12 md:h-14 cursor-pointer">
          <span className="flex gap-1.5 md:gap-2.5 items-center">
            <img
              className="w-7"
              src={"/assets/images/pion-nft-logo.svg"}
              alt=""
            />
            {multiple ? (
              <>
                {selectedItems.length > 0 ? (
                  selectedItems.map((selectedItem) => (
                    <span
                      key={selectedItem.tokenId}
                      className="rounded-lg bg-algo px-2 text-black md:px-3 py-2 flex gap-2 md:gap-3 items-center justify-between"
                    >
                      <p className="text-xs md:text-sm text-black">
                        {`${PION.nft} #` + selectedItem.tokenId}
                      </p>
                      <img
                        onClick={(e) => {
                          e.stopPropagation();
                          removeItem(selectedItem);
                        }}
                        className="w-2 h-2 md:w-[14px] md:h-[14px]"
                        src="/assets/images/actions/x.svg"
                        alt=""
                      />
                    </span>
                  ))
                ) : (
                  <p className="text-white font-medium max-md:text-sm">
                    Select
                  </p>
                )}
              </>
            ) : (
              <>
                {selectedItems.length > 0 ? (
                  <p className="font-medium max-md:text-sm">
                    {`${PION.nft} #` +
                      selectedItems[0].tokenId +
                      " | Amount: " +
                      selectedItems[0].nodePower}
                  </p>
                ) : (
                  <p className="text-white font-medium max-md:text-sm">
                    Select
                  </p>
                )}
              </>
            )}
          </span>
          <img
            className="w-3 h-3 md:w-[14px] md:h-[14px]"
            src="/assets/images/select-button/down-arrow.svg"
            alt=""
          />
        </div>
      </div>
      {errorMessage && (
        <FadeIn duration={0.3} className="mt-2">
          <p className="text-red-400 dark:text-red-600 font-bold text-xs">
            {errorMessage}
          </p>
        </FadeIn>
      )}

      <Modal
        title={modalTitle}
        isOpen={isModalOpen}
        closeModalHandler={closeModalHandler}
        className="select-button-with-modal__modal"
      >
        {children}
      </Modal>
    </div>
  );
};

export default SelectButtonWithModal;
