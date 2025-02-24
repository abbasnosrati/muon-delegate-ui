import { DelegatePion } from "./DelegatePion";
import { RewardStatusCheckbox } from "./RewardStatusCheckbox";
import { ConnectWalletModal } from "../common/ConnectWalletModal";
import useDelegateAction from "../../context/DelegateAction/useDelegateAction";
import { usePion } from "../../context/PionContext";
import { WrongNetworkModal } from "../common/WrongNetworkModal";

const Delegate = () => {
  const { userDelegateBalances } = useDelegateAction();
  return (
    <div className="w-full flex items-center justify-center  mt-40 md:mt-0">
      <ConnectWalletModal />
      <WrongNetworkModal />

      <div className="w-full max-w-[768px] bg-sectionBg relative">
        <div className="flex items-center px-4 font-medium font-azeretMono absolute h-[56px] -top-8 bg-textBackGround text-lightDarkText tracking-[2px]">
          Delegate $MUON
        </div>
        <div className="pion actions-content relative dark:bg-alice-body-background dark:shadow-lg w-full px-4 py-3  min-h-[400px] md:min-h-[428px] md:max-h-[424px] overflow-hidden flex flex-col">
          <DelegatePion />
          {!userDelegateBalances?.dsp && <RewardStatusCheckbox />}
          <DelegatePionButton />
        </div>
      </div>
    </div>
  );
};

const DelegatePionButton = () => {
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
    <div className="flex flex-row absolute bottom-6 sm:bottom-10 items-center justify-center right-0   w-full">
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
            " cursor-auto text-sm md:text-[12px] xl:text-sm"
          }`}
        >
          {isMetaMaskLoadingDelegate ? "Delegating..." : "Delegate"}
        </button>
      )}
    </div>
  );
};

export default Delegate;
