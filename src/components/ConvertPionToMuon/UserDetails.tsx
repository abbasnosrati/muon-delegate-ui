import { PION_ADDRESS } from "../../constants/addresses";
import { MUON } from "../../constants/strings";
import useDelegateAction from "../../context/DelegateAction/useDelegateAction";

export const UserDetails = () => {
  const {
    userDelegateBalances,
    rewardStatus,
    handleSwitchRewardStatus,
    isLoadingMetamaskSwitchReward,
    userReward,
  } = useDelegateAction();

  return (
    <div className="max-w-[768px] w-full">
      <div
        className="flex items-center w-full justify-end mb-2 cursor-pointer"
        onClick={() =>
          window.open(
            `https://thena.fi/swap?inputCurrency=BNB&outputCurrency=${PION_ADDRESS}&swapType=1`,
            "_blank"
          )
        }
      >
        <p className="text-sm w-[150px] font-medium font-azeretMono underline ">
          Buy ${MUON.token}
        </p>
      </div>
      <div className="flex flex-col gap-5 sm:gap-5 sm:flex-row sm:h-[170px] h-auto mt-5 sm:mt-0">
        <div className="w-full text-xs md:text-sm  transition-all  action-sidebar flex flex-col justify-center gap-3 px-3 py-3  bg-sectionBg md:px-6 md:py-4">
          <div className="flex justify-between items-center">
            <p>Staked Amount</p>
            <div className="font-semibold sm:text-lg text-md">
              {userDelegateBalances
                ? `${userDelegateBalances.dsp} MUON`
                : "..."}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>Reward</div>
            <div className="font-semibold text-md sm:text-lg">
              {userReward ? `${userReward} ${MUON.token}` : "..."}
            </div>
          </div>
        </div>
        <div className="w-full text-xs md:text-sm  transition-all  action-sidebar  flex flex-col justify-center gap-3 px-3 py-3  bg-sectionBg md:px-6 md:py-4">
          <div className="flex items-center justify-between">
            <p>Status</p>
            <p className="text-md sm:text-lg font-semibold">
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
            className={`btn btn--action ${
              !userDelegateBalances?.dsp && " cursor-auto"
            }`}
          >
            {rewardStatus ? (
              <span>
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
      </div>
    </div>
  );
};
