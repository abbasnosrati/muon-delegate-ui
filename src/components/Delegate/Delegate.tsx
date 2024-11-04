import { useState } from "react";
import { PION } from "../../constants/strings";
import { DelegateBonPion } from "./DelegateBonPion";
import { UserDetails } from "./UserDetails";
import { DelegatePion } from "./DelegatePion";
import { RewardStatusCheckbox } from "./RewardStatusCheckbox";

enum Items {
  Pion = "pion",
  BonPion = "bonPion",
}

const Delegate = () => {
  const [selectedItem, setSelectedItem] = useState<Items>(Items.Pion);

  const onSelectItem = (item: Items) => {
    setSelectedItem(item);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center page ">
      <UserDetails />
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
              {PION.token}
            </div>
            <div
              className={`flex items-center py-5 border-b justify-center w-full cursor-pointer text-xs md:text-sm font-semibold transition-all text-gray3 ${
                selectedItem === Items.BonPion &&
                "text-white font-bold border-white "
              }`}
              onClick={() => onSelectItem(Items.BonPion)}
            >
              {PION.nft}
            </div>
          </div>
          {selectedItem === Items.Pion ? <DelegatePion /> : <DelegateBonPion />}
          <RewardStatusCheckbox />
          <div className="flex flex-row gap-2 sm:gap-3 absolute bottom-10 ">
            <button className="responsive-button">Delegate</button>
            <button className="responsive-button">Claim</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delegate;
