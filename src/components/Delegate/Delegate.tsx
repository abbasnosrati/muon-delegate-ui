import { useState } from "react";
import { PionContext, usePion } from "../../context/PionContext";
import useBonPION from "../../context/BonPION/useBonPION";
import SelectButtonWithModal from "../common/SelectButtonWithModal";
import BonALICEModalBody from "../common/BonALICEModalBody";
import useTransferAction from "../../context/TransferAction/useTransferAction";
enum Items {
  Pion = "pion",
  BonPion = "bonPion",
}

const Delegate = () => {
  const [selectedItem, setSelectedItem] = useState<Items>(Items.Pion);

  const [pionDelegateAmount, setPionDelegateAmount] = useState<string | null>();

  const onSelectItem = (item: Items) => {
    setSelectedItem(item);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center page ">
      <Details />
      <div className="w-full max-w-[768px]">
        <div className="sm:text-2xl text-lg font-medium font-tomorrow mb-5 text-white ">
          Delegate More
        </div>
        <div className="pion actions-content relative dark:bg-alice-body-background dark:shadow-lg w-full px-4 py-3 max-md:min-w-[90vw] min-h-[400px] md:min-h-[428px] md:max-h-[424px] overflow-hidden md:px-11 rounded-2xl flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <div
              className={`flex items-center py-5 border-b justify-center w-full cursor-pointer text-xs md:text-sm font-semibold transition-all text-gray3 ${
                selectedItem === Items.Pion &&
                "text-white font-bold border-white"
              }`}
              onClick={() => onSelectItem(Items.Pion)}
            >
              PION
            </div>
            <div
              className={`flex items-center py-5 border-b justify-center w-full cursor-pointer text-xs md:text-sm font-semibold transition-all text-gray3 ${
                selectedItem === Items.BonPion &&
                "text-white font-bold border-white "
              }`}
              onClick={() => onSelectItem(Items.BonPion)}
            >
              bonPION
            </div>
          </div>
          {selectedItem === Items.Pion ? (
            <DelegatePion
              setPionDelegateAmount={setPionDelegateAmount}
              pionDelegateAmount={pionDelegateAmount}
            />
          ) : (
            <DelegateBonPion />
          )}
        </div>
      </div>
    </div>
  );
};

export default Delegate;

interface DelegatePionProps {
  pionDelegateAmount: string | null | undefined;
  setPionDelegateAmount: (pionAmount: string | null) => void;
}

const DelegatePion = ({
  pionDelegateAmount,
  setPionDelegateAmount,
}: DelegatePionProps) => {
  const { PionBalance } = usePion();

  const handleChange = (pionAmount: string) => {
    setPionDelegateAmount(pionAmount);
  };

  return (
    <div>
      <div className="mb-2">
        <p className="balance flex text-sm max-md:text-sm max-md:font-semibold text-xyz-2 dark:text-alice-gray">
          PION Balance:{" "}
          <span className="ml-1 text-xyz-75 dark:text-black dark:font-semibold tracking-[1px]">
            {PionBalance?.dsp}
          </span>
        </p>
      </div>
      <div className="mb-5 amount-input__input-wrapper flex items-center w-full gap-3 bg-input-bg dark:bg-alice-xyz-75 rounded-xl h-12 md:h-14">
        <input
          className="tracking-[1px] amount-input__input text-white max-md:min-w-0 dark:text-black flex-1 font-medium h-full pl-4 md:pl-5 bg-transparent outline-none text-sm placeholder-white dark:placeholder-gray"
          placeholder="Enter amount"
          type="number"
          value={pionDelegateAmount ?? ""}
          onChange={(e) => handleChange(e.target.value)}
        />
        <div className="amount-input__token-name group font-semibold max-md:text-sm min-w-fit text-gray10 dark:text-black1 mr-5">
          PION
        </div>
      </div>
      {PionBalance && PionBalance.dsp < Number(pionDelegateAmount) && (
        <div className="text-red-400 font-bold text-xs -mt-4">
          You don't have sufficient amount of $PION.{" "}
          <span
            onClick={() =>
              window.open(
                `https://thena.fi/swap?inputCurrency=BNB&outputCurrency=${PionContext}&swapType=1`,
                "_blank"
              )
            }
            className="underline cursor-pointer"
          >
            Buy $PION here.
          </span>
        </div>
      )}
      <RewardStatusCheckbox />
      <div className="flex flex-row gap-2 sm:gap-3 absolute bottom-10 ">
        <button className="responsive-button  mx-auto ">Delegate</button>
        <button className="responsive-button mx-auto ">Claim</button>
      </div>
    </div>
  );
};

const DelegateBonPion = () => {
  const { bonPIONs } = useBonPION();
  const {
    isTransferModalOpen,
    openTransferModal,
    closeTransferModal,
    handleTransferModalItemClicked,
    selectedTransferBonALICE,
    isSelectedTransferBonALICE,
  } = useTransferAction();

  return (
    <div>
      <SelectButtonWithModal
        title={`Select bonPION`}
        onClick={() => openTransferModal()}
        isModalOpen={isTransferModalOpen}
        closeModalHandler={() => closeTransferModal()}
        modalTitle={`Select bonPION`}
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
      <div className="mt-5">
        <RewardStatusCheckbox />
      </div>

      <div className="flex flex-row gap-2 sm:gap-3 absolute bottom-10 ">
        <button className="responsive-button">Delegate</button>
        <button className="responsive-button">Claim</button>
      </div>
    </div>
  );
};

const Details = () => {
  return (
    <div className="max-w-[768px] w-full mt-5 sm:mt-0">
      <div
        className="flex items-center w-full justify-end mb-2 cursor-pointer"
        onClick={() =>
          window.open(
            `https://thena.fi/swap?inputCurrency=BNB&outputCurrency=${PionContext}&swapType=1`,
            "_blank"
          )
        }
      >
        <p className="text-sm font-medium font-tomorrow underline">Buy $PION</p>
      </div>
      <div className="w-full text-xs md:text-sm font-semibold  transition-all text-white action-sidebar rounded-2xl mb-10 flex flex-col gap-3 px-3 py-3 md:rounded-2xl  bg-so-dark-gray md:px-6 md:py-4">
        <div>STAKED AMOUNT:</div>

        <div>REWARD:</div>
        <div className="flex gap-2">
          STATUS: Transfer
          <div>Switch to StakeReward</div>
        </div>
      </div>
    </div>
  );
};

const RewardStatusCheckbox = () => {
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);

  const handleCheckboxChange = (checkbox: any) => {
    setSelectedCheckbox(checkbox === selectedCheckbox ? null : checkbox);
  };

  return (
    <div>
      <p className="balance flex text-sm max-md:text-sm max-md:font-semibold text-xyz-2 dark:text-alice-gray">
        Select REWARD status
      </p>
      <div className="mt-2 bg-input-bg rounded-xl px-3 py-2">
        <div className="flex gap-5 text-white text-sm">
          <label className="cursor-pointer">
            <input
              type="checkbox"
              checked={selectedCheckbox === "ReStake"}
              onChange={() => handleCheckboxChange("ReStake")}
              className="mr-1"
            />
            ReStake
          </label>

          <label className="cursor-pointer">
            <input
              type="checkbox"
              checked={selectedCheckbox === "Transfer"}
              onChange={() => handleCheckboxChange("Transfer")}
              className="mr-1"
            />
            Transfer
          </label>
        </div>
        <p className="text-sm mt-5">Selected: {selectedCheckbox || ""}</p>
      </div>
    </div>
  );
};
