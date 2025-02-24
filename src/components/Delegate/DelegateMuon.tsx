import { useEffect } from "react";
import { MUON_TOKEN_ADDRESS } from "../../constants/addresses";
import { MUON } from "../../constants/strings";
import { useMuon } from "../../context/MuonContext";
import useDelegateAction from "../../context/DelegateAction/useDelegateAction";
import { ethers } from "ethers";

export const DelegateMuon = () => {
  const { muonBalance, refetchMuonBalance } = useMuon();
  const {
    handleChangeDelegateAmount,
    muonDelegateAmount,
    isMetaMaskLoadingDelegate,
  } = useDelegateAction();

  useEffect(() => {
    refetchMuonBalance();
  }, [isMetaMaskLoadingDelegate]);

  const onValueChanged = (value: string) => {
    handleChangeDelegateAmount(value);
  };

  return (
    <div>
      <div className=" border-b border-lightDarkText my-10">
        <div className=" px-2 flex justify-between items-center border-t border-l border-r border-lightDarkText max-w-[200px] h-[42px]">
          <p className="balance flex text-sm md:text-[12px] xl:text-sm max-md:font-semibold  items-center">
            Balance:
          </p>
          <span className="text-sm md:text-[12px] xl:text-sm">
            {muonBalance?.dsp} ${MUON.token}
          </span>
        </div>
      </div>
      <div className="mb-5 amount-input__input-wrapper relative flex justify-between items-center w-full gap-3 border border-lightDarkText h-12 md:h-14 px-3">
        <div className="flex gap-2">
          <p className="text-sm md:text-[12px] xl:text-sm">Enter amount:</p>
          <input
            className="amount-input__input text-lightDarkText bg-boxBg  flex-1  max-w-[200px] w-full pl-2 outline-none text-[10px]"
            type="number"
            value={muonDelegateAmount?.hStr ?? ""}
            onChange={(e) => handleChangeDelegateAmount(e.target.value)}
          />
        </div>
        <div className="amount-input__token-name group font-semibold max-md:text-sm min-w-fit text-sm md:text-[12px] xl:text-sm">
          ${MUON.token}
        </div>

        <div className="amount-input__balance-and-actions flex items-center absolute -right-[1px] -bottom-5">
          <div className="flex gap-1.5 max-md:items-end h-full">
            <button
              onClick={() =>
                muonBalance && muonBalance.dsp && !!muonBalance
                  ? onValueChanged(ethers.formatEther(muonBalance.big))
                  : null
              }
              className="btn--secondary-tag  !font-normal"
            >
              Max
            </button>
          </div>
        </div>
      </div>
      {muonBalance &&
        muonDelegateAmount &&
        muonBalance.big < muonDelegateAmount.big && (
          <div className="text-errorText  text-[10px] -mt-4 ml-[14px]">
            Insufficient $MUON Balance.
            <span
              onClick={() =>
                window.open(
                  `https://thena.fi/swap?inputCurrency=BNB&outputCurrency=${MUON_TOKEN_ADDRESS}&swapType=1`,
                  "_blank"
                )
              }
              className="underline cursor-pointer"
            >
              Buy ${MUON.token} here.
            </span>
          </div>
        )}
    </div>
  );
};
