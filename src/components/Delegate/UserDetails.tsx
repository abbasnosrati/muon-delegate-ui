import { MUON } from "../../constants/strings";
import useDelegateAction from "../../context/DelegateAction/useDelegateAction";
import { w3bNumberFromString } from "../../utils/web3";

export const UserDetails = () => {
  const {
    userDelegateBalances,
    rewardStatus,
    handleSwitchRewardStatus,
    isLoadingMetamaskSwitchReward,
    userReward,
    unDelegateAmount,
    setUnDelegateAmount,
  } = useDelegateAction();

  return (
    <div className="flex items-center justify-center relative w-full">
      <div className="flex flex-col gap-5 sm:gap-10 relative w-full mt-5 sm:mt-0 bg-sectionBg max-w-[768px] min-h-[400px] md:min-h-[428px] md:max-h-[424px]">
        <div className="flex items-center px-4 font-medium font-azeretMono absolute h-[56px] -top-8 bg-textBackGround text-lightDarkText tracking-[2px]">
          Delegate Status
        </div>
        <div className="my-8 px-4">
          <div className="w-full border-b border-lightDarkText text-xs md:text-sm transition-all  action-sidebar  flex flex-col justify-center gap-3 px-3 py-3  bg-sectionBg  md:py-4">
            <div className="flex items-center justify-between">
              <p>Status</p>
              <p className="text-sm md:text-[12px] xl:text-sm font-medium">
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
                  Switch to <span className="font-medium">"Transfer"</span>
                </span>
              ) : (
                <span>
                  Switch to <span className="font-medium">"ReStake"</span>
                </span>
              )}
              {isLoadingMetamaskSwitchReward ? "..." : ""}
            </button>
          </div>
          <div className="w-full text-xs xl:text-sm transition-all action-sidebar flex flex-col justify-center  bg-sectionBg  ">
            <div className="flex justify-between items-center py-4 border-b border-lightDarkText px-3">
              <p>$MUON Staked Amount</p>
              <div className="font-medium ">
                {userDelegateBalances
                  ? `${userDelegateBalances.dsp} $MUON`
                  : "0"}
              </div>
            </div>
            <div className="flex justify-between py-4 items-center  px-3">
              <div>Reward</div>
              <div className="font-medium ">
                {userReward ? `${userReward.dsp} ` : "0"} ${MUON.token}
              </div>
            </div>
          </div>

          <div className="mb-5 amount-input__input-wrapper relative flex justify-between items-center w-full gap-3 border border-lightDarkText h-12 md:h-14 px-3">
            <div className="flex gap-2">
              <p className="text-sm md:text-[12px] xl:text-sm">Enter amount:</p>
              <input
                className="amount-input__input text-lightDarkText bg-boxBg flex-1 xl:max-w-[200px] w-full pl-2 outline-none text-[10px]"
                type="number"
                value={unDelegateAmount?.hStr ?? ""}
                onChange={(e) =>
                  setUnDelegateAmount(w3bNumberFromString(e.target.value))
                }
              />
            </div>
            <div className="amount-input__token-name group font-medium text-sm md:text-[12px] xl:text-sm min-w-fit">
              $MUON
            </div>

            <div className="amount-input__balance-and-actions flex items-center absolute -right-[1px] -bottom-5">
              <div className="flex gap-1.5 max-md:items-end h-full">
                <button
                  onClick={() =>
                    userDelegateBalances
                      ? setUnDelegateAmount(userDelegateBalances)
                      : null
                  }
                  className="btn--secondary-tag  !font-normal"
                >
                  Max
                </button>
              </div>
            </div>
          </div>

          {userDelegateBalances &&
            unDelegateAmount &&
            userDelegateBalances.big < unDelegateAmount.big && (
              <div className="text-errorText  text-[10px] -mt-4 ml-[14px]">
                Insufficient Staked Balance.
              </div>
            )}
        </div>
      </div>
      <UnDelegateMUON />
    </div>
  );
};

const UnDelegateMUON = () => {
  const {
    isMetaMaskLoadingUnDelegate,
    unDelegateAmount,
    handleUnDelegate,
    userDelegateBalances,
  } = useDelegateAction();

  return (
    <div className="flex flex-row absolute bottom-6 sm:bottom-10 items-center justify-center right-0 w-full">
      {userDelegateBalances &&
      unDelegateAmount &&
      userDelegateBalances.big < unDelegateAmount.big ? (
        <button
          disabled={true}
          onClick={() => handleUnDelegate()}
          className={`btn btn--action text-[12px]`}
        >
          Insufficient Funds
        </button>
      ) : (
        <button
          disabled={
            !unDelegateAmount.big ||
            !userDelegateBalances ||
            userDelegateBalances.big < unDelegateAmount.big
          }
          onClick={() => handleUnDelegate()}
          className={`btn btn--action ${
            (!unDelegateAmount.big || !userDelegateBalances) &&
            " cursor-auto text-sm md:text-[12px] xl:text-sm"
          }`}
        >
          {isMetaMaskLoadingUnDelegate ? "Un Delegating..." : "Un Delegate"}
        </button>
      )}
    </div>
  );
};
