import { ConvertPion } from "./ConvertPion";

import { ConnectWalletModal } from "../common/ConnectWalletModal";
import useDelegateAction from "../../context/DelegateAction/useDelegateAction";
import { usePion } from "../../context/PionContext";
import { WrongNetworkModal } from "../common/WrongNetworkModal";

const ConvertPionToMuon = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <ConnectWalletModal />
      <WrongNetworkModal />
      <div className="w-full max-w-[768px] bg-sectionBg relative">
        <div className="2xl:text-[22px] flex items-center px-4 font-medium font-azeretMono absolute h-[56px] -top-8 bg-textBackGround text-lightDarkText tracking-[2px]">
          Covert $PION to $MUON
        </div>
        <div className="pion actions-content relative dark:bg-alice-body-background dark:shadow-lg w-full px-4 py-3 max-md:min-w-[90vw] min-h-[400px] md:min-h-[428px] md:max-h-[424px] overflow-hidden md:px-11 rounded-2xl flex flex-col">
          <ConvertPion />
          <CovertPionButton />
        </div>
      </div>
    </div>
  );
};

const CovertPionButton = () => {
  const {
    handleDelegate,
    handleApprove,
    pionDelegateAmount,
    isMetaMaskLoadingApprove,
    isMetaMaskLoadingDelegate,
    pionAllowance,
  } = useDelegateAction();

  const { PionBalance } = usePion();

  const { selectedRewardStatus, userDelegateBalances } = useDelegateAction();

  return (
    <div className="flex flex-row gap-2 sm:gap-3 absolute bottom-6 sm:bottom-10  ">
      {!pionAllowance && pionDelegateAmount ? (
        <button
          disabled={!pionDelegateAmount || !PionBalance?.dsp}
          onClick={() => handleApprove("PION")}
          className={`btn btn--action ${
            (!pionDelegateAmount || !PionBalance?.dsp) && " cursor-auto"
          }`}
        >
          {isMetaMaskLoadingApprove ? "Approving..." : "Approve"}
        </button>
      ) : (
        <button
          disabled={
            !pionDelegateAmount ||
            isMetaMaskLoadingDelegate ||
            pionDelegateAmount.dsp == 0 ||
            !PionBalance?.dsp ||
            (!selectedRewardStatus && userDelegateBalances?.dsp == 0)
          }
          onClick={() => handleDelegate("PION")}
          className={`btn btn--action ${
            (!pionDelegateAmount ||
              pionDelegateAmount.dsp == 0 ||
              isMetaMaskLoadingDelegate ||
              !PionBalance?.dsp ||
              (!selectedRewardStatus && userDelegateBalances?.dsp == 0)) &&
            " cursor-auto"
          }`}
        >
          {isMetaMaskLoadingDelegate ? "Converting..." : "Convert"}
        </button>
      )}
    </div>
  );
};

export default ConvertPionToMuon;
