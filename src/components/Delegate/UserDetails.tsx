import { PionContractAddress } from "../../constants/addresses";
import { PION } from "../../constants/strings";

export const UserDetails = () => {
  return (
    <div className="max-w-[768px] w-full mt-5 sm:mt-0">
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
