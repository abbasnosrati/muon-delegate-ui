import { PionContractAddress } from "../../constants/addresses";
import { PION } from "../../constants/strings";

export const UserDetails = () => {
  return (
    <div className="max-w-[768px] w-full mt-5 sm:mt-0 mb-5">
      <div
        className="flex items-center w-full justify-end mb-2 cursor-pointer"
        onClick={() =>
          window.open(
            `https://thena.fi/swap?inputCurrency=BNB&outputCurrency=${PionContractAddress}&swapType=1`,
            "_blank"
          )
        }
      >
        <p className="text-sm font-medium font-tomorrow underline">
          Buy ${PION.token}
        </p>
      </div>
      <div className="flex flex-col gap-5 sm:gap-5 sm:flex-row sm:h-[170px] h-auto mt-5 sm:mt-0">
        <div className="w-full text-xs md:text-sm  transition-all text-white action-sidebar rounded-2xl  flex flex-col justify-center gap-3 px-3 py-3 md:rounded-2xl  bg-so-dark-gray md:px-6 md:py-4">
          <div className="flex justify-between">
            <p>STAKED AMOUNT</p>
            <div className="font-semibold sm:text-lg text-md">125</div>
          </div>
          <div className="flex justify-between">
            <div>REWARD</div>
            <div className="font-semibold text-md sm:text-lg">1.215</div>
          </div>
        </div>
        <div className="w-full text-xs md:text-sm  transition-all text-white action-sidebar rounded-2xl flex flex-col justify-center gap-3 px-3 py-3 md:rounded-2xl  bg-so-dark-gray md:px-6 md:py-4">
          <p>
            Status:{" "}
            <span className="text-md sm:text-lg font-semibold">Transfer</span>
          </p>
          <button className="responsive-button">Switch to StakeReward</button>
        </div>
      </div>
    </div>
  );
};
