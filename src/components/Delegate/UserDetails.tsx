import { MUON } from "../../constants/strings";
import useDelegateAction from "../../context/DelegateAction/useDelegateAction";
import { useMuon } from "../../context/MuonContext";

export const UserDetails = () => {
  const {
    userDelegateBalances,
    rewardStatus,
    handleSwitchRewardStatus,
    isLoadingMetamaskSwitchReward,
    userReward,
  } = useDelegateAction();

  return (
    <div className="flex items-center justify-center relative w-full">
      <div className="flex flex-col gap-5 sm:gap-10 relative w-full mt-5 sm:mt-0 bg-sectionBg max-w-[768px] min-h-[400px] md:min-h-[428px] md:max-h-[424px]">
        <div className="flex items-center px-4 font-medium font-azeretMono absolute h-[56px] -top-8 bg-textBackGround text-lightDarkText tracking-[2px]">
          Delegate Status
        </div>
        <div className="my-10 px-4">
          <div className="w-full border-b border-lightDarkText text-xs md:text-sm transition-all  action-sidebar  flex flex-col justify-center gap-3 px-3 py-3  bg-sectionBg  md:py-4">
            <div className="flex items-center justify-between">
              <p>Status</p>
              <p className="text-sm 2xl:text-lg font-semibold">
                {userDelegateBalances?.dsp && rewardStatus
                  ? "ReStake"
                  : userDelegateBalances?.dsp && !rewardStatus
                  ? "Transfer"
                  : "..."}
              </p>
            </div>
            <button
              disabled={!userDelegateBalances?.dsp}
              onClick={() => handleSwitchRewardStatus()}
              className={`btn btn--action text-sm md:text-[12px] xl:text-sm ${
                !userDelegateBalances?.dsp && " cursor-auto"
              }`}
            >
              {rewardStatus ? (
                <span className="">
                  Switch to <span className="font-bold">"Transfer"</span>
                </span>
              ) : (
                <span>
                  Switch to <span className="font-bold">"ReStake"</span>
                </span>
              )}
              {isLoadingMetamaskSwitchReward ? "..." : ""}
            </button>
          </div>
          <div className="w-full text-xs xl:text-sm transition-all action-sidebar flex flex-col justify-center  bg-sectionBg  ">
            <div className="flex justify-between items-center py-4 border-b border-lightDarkText px-3">
              <p>$MUON Staked Amount</p>
              <div className="font-semibold ">
                {userDelegateBalances
                  ? `${userDelegateBalances.dsp} $MUON`
                  : "..."}
              </div>
            </div>
            <div className="flex justify-between py-4 items-center border-b border-lightDarkText px-3">
              <div>Reward</div>
              <div className="font-semibold ">
                {userReward ? `${userReward} ${MUON.token}` : "..."}
              </div>
            </div>
          </div>
        </div>
      </div>
      <UnDelegateMUON />
    </div>
  );
};

const UnDelegateMUON = () => {
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
    <div className="flex flex-row absolute bottom-6 sm:bottom-10 items-center justify-center right-0   w-full">
      {!muonAllowance && muonDelegateAmount ? (
        <button
          disabled={!muonDelegateAmount || !muonBalance?.dsp}
          onClick={() => handleApprove("PION")}
          className={`btn btn--action ${
            (!muonDelegateAmount || !muonBalance?.dsp) && " cursor-auto"
          }`}
        >
          {isMetaMaskLoadingApprove ? "Approving..." : "Approve"}
        </button>
      ) : (
        <button
          disabled={
            !muonDelegateAmount ||
            isMetaMaskLoadingDelegate ||
            muonDelegateAmount.dsp == 0 ||
            !muonBalance?.dsp ||
            (!selectedRewardStatus && userDelegateBalances?.dsp == 0)
          }
          onClick={() => handleDelegate("PION")}
          className={`btn btn--action ${
            (!muonDelegateAmount ||
              muonDelegateAmount.dsp == 0 ||
              isMetaMaskLoadingDelegate ||
              !muonBalance?.dsp ||
              (!selectedRewardStatus && userDelegateBalances?.dsp == 0)) &&
            " cursor-auto text-sm md:text-[12px] xl:text-sm"
          }`}
        >
          {isMetaMaskLoadingDelegate ? "Un Delegating..." : "Un Delegating"}
        </button>
      )}
    </div>
  );
};
