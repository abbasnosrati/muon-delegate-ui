import { useEffect } from "react";
import { PION_ADDRESS } from "../../constants/addresses";
import { PION } from "../../constants/strings";
import { usePion } from "../../context/PionContext";
import useDelegateAction from "../../context/DelegateAction/useDelegateAction";

export const DelegatePion = () => {
  const { PionBalance, refetchPionBalance } = usePion();
  const {
    handleChangeDelegateAmount,
    pionDelegateAmount,
    isMetaMaskLoadingDelegate,
  } = useDelegateAction();

  useEffect(() => {
    refetchPionBalance();
  }, [isMetaMaskLoadingDelegate]);

  return (
    <div>
      <div className="mb-2">
        <p className="balance flex text-sm max-md:text-sm max-md:font-semibold text-xyz-2 dark:text-alice-gray">
          Balance:{" "}
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
          onChange={(e) => handleChangeDelegateAmount(e.target.value)}
        />
        <div className="amount-input__token-name group font-semibold max-md:text-sm min-w-fit text-gray10 dark:text-black1 mr-5">
          {PION.token}
        </div>
      </div>
      {PionBalance && PionBalance.dsp < Number(pionDelegateAmount) && (
        <div className="text-red-400 font-bold text-xs -mt-4">
          You don't have sufficient amount of $PION.{" "}
          <span
            onClick={() =>
              window.open(
                `https://thena.fi/swap?inputCurrency=BNB&outputCurrency=${PION_ADDRESS}&swapType=1`,
                "_blank"
              )
            }
            className="underline cursor-pointer"
          >
            Buy ${PION.token} here.
          </span>
        </div>
      )}
    </div>
  );
};
