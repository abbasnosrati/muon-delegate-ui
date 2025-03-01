import { useEffect } from "react";
import { useConvert } from "../../context/ConvertContext";
import { w3bNumberFromBigint, w3bNumberFromString } from "../../utils/web3";

export const ConvertPion = () => {
  const {
    pionBalance,
    refetchPionBalance,
    isMetamaskLoading,
    migrateAmount,
    setMigrateAmount,
    multiplier,
  } = useConvert();

  useEffect(() => {
    refetchPionBalance();
  }, [isMetamaskLoading]);

  useEffect(() => {
    console.log(multiplier);
  }, [multiplier]);

  return (
    <div>
      <div className=" flex items-center justify-between border-b border-lightDarkText my-10">
        <div className=" px-2 flex justify-between items-center border-t border-l border-r border-lightDarkText w-full max-w-[200px] h-[42px]">
          <p className="balance flex text-sm md:text-[12px] xl:text-sm  items-center">
            Balance:
          </p>
          <span className="text-sm md:text-[12px] xl:text-sm">
            {pionBalance?.dsp ?? 0} $PION
          </span>
        </div>
        <div className="ext-sm md:text-[12px] xl:text-sm">
          Convert rate:{" "}
          <mark className="bg-textBackGround p-[2px] ">
            {multiplier ? w3bNumberFromBigint(multiplier).dsp : "..."}
          </mark>
        </div>
      </div>

      <div className="mb-5 amount-input__input-wrapper relative flex justify-between items-center w-full gap-3 border border-lightDarkText h-12 md:h-14 px-3">
        <div className="flex gap-2">
          <p className="text-sm md:text-[12px] xl:text-sm">Enter amount:</p>
          <input
            className="amount-input__input text-lightDarkText bg-boxBg flex-1 xl:max-w-[200px] w-full pl-2 outline-none text-[10px]"
            type="number"
            value={migrateAmount?.hStr ?? ""}
            onChange={(e) =>
              setMigrateAmount(w3bNumberFromString(e.target.value))
            }
          />
        </div>
        <div className="amount-input__token-name group font-normal text-sm md:text-[12px] xl:text-sm min-w-fit">
          $PION
        </div>

        <div className="amount-input__balance-and-actions flex items-center absolute -right-[1px] -bottom-5">
          <div className="flex gap-1.5 max-md:items-end h-full">
            <button
              onClick={() =>
                pionBalance && pionBalance.dsp && !!pionBalance
                  ? setMigrateAmount(pionBalance)
                  : null
              }
              className="btn--secondary-tag  !font-normal"
            >
              Max
            </button>
          </div>
        </div>
      </div>
      {pionBalance && pionBalance.big < migrateAmount.big && (
        <div className="text-errorText  text-[10px] -mt-4 ml-[14px]">
          Insufficient $PION amount.{" "}
        </div>
      )}
    </div>
  );
};
