import { DelegateMuon } from "./DelegateMuon";
import { RewardStatusCheckbox } from "./RewardStatusCheckbox";
import { ConnectWalletModal } from "../common/ConnectWalletModal";
import useDelegateAction from "../../context/DelegateAction/useDelegateAction";
import { useMuon } from "../../context/MuonContext";
import { WrongNetworkModal } from "../common/WrongNetworkModal";

const Delegate = () => {
  const { userDelegateBalances } = useDelegateAction();
  return (
    <div className="w-full flex items-center justify-center mt-40  md:mt-14 lg:mt-0">
      <ConnectWalletModal />
      <WrongNetworkModal />

      <div className="w-full max-w-[768px] bg-sectionBg relative">
        <div className="flex items-center px-4 font-medium font-azeretMono absolute h-[56px] -top-8 bg-textBackGround text-lightDarkText tracking-[2px]">
          Delegate $MUON
        </div>
        <div className="pion actions-content relative dark:bg-alice-body-background dark:shadow-lg w-full px-4 py-3  min-h-[400px] md:min-h-[428px] md:max-h-[424px] overflow-hidden flex flex-col">
          <DelegateMuon />
          {!userDelegateBalances?.dsp && <RewardStatusCheckbox />}
          <DelegateMuonButton />
        </div>
      </div>
    </div>
  );
};

const DelegateMuonButton = () => {
  const {
    handleDelegate,
    handleApprove,
    muonDelegateAmount,
    isMetaMaskLoadingApprove,
    isMetaMaskLoadingDelegate,
    muonAllowance,
  } = useDelegateAction();

  const { muonBalance } = useMuon();

  const { selectedRewardStatus, userDelegateBalances } = useDelegateAction();

  return (
    <div className="flex flex-row absolute bottom-6 sm:bottom-10 items-center justify-center right-0  w-full">
      {muonDelegateAmount &&
      muonBalance &&
      muonDelegateAmount.big > muonBalance?.big ? (
        <button disabled={true} className={`btn btn--action text-[12px]`}>
          Insufficient Funds
        </button>
      ) : muonAllowance && muonDelegateAmount.big ? (
        <button
          disabled={
            !muonDelegateAmount ||
            !muonBalance?.dsp ||
            muonDelegateAmount.big > muonBalance.big
          }
          onClick={() => handleApprove("MUON")}
          className={`btn btn--action ${
            (!muonDelegateAmount || !muonBalance?.dsp) && " cursor-auto"
          }`}
        >
          {isMetaMaskLoadingApprove ? "Approving..." : "Approve"}
        </button>
      ) : (
        <button
          disabled={
            !muonDelegateAmount.big ||
            isMetaMaskLoadingDelegate ||
            !muonBalance?.dsp ||
            (!selectedRewardStatus && userDelegateBalances?.dsp == 0)
          }
          onClick={() => handleDelegate("MUON")}
          className={`btn btn--action ${
            (!muonDelegateAmount.big ||
              isMetaMaskLoadingDelegate ||
              !muonBalance?.dsp ||
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
