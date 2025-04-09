import { MUON } from "../../constants/strings";
import useDelegateAction from "../../context/DelegateAction/useDelegateAction";
import { w3bNumberFromBigint, w3bNumberFromString } from "../../utils/web3";
import { getCurrentChainId } from "../../web3/chains";
import { useSwitchChain, useAccount } from "wagmi";
import { config } from "../../web3/config";
import useUnDelegateDuration from "../../hooks/useUnDelegateDuration";
import { useEffect, useState } from "react";

export const UserDetails = () => {
  const {
    userDelegateBalances,
    rewardStatus,
    handleSwitchRewardStatus,
    isLoadingMetamaskSwitchReward,
    userReward,
    unDelegateAmount,
    setUnDelegateAmount,
    isMetamaskLoadingForClaim,
    handleClaimPendingUnstakeAmount,
  } = useDelegateAction();

  const { exitPeriodTime, userUnStakeReqTime, pendingUnstakes } =
    useUnDelegateDuration();

  const [userClaimTime, setUserClaimTime] = useState("");
  const [canClaim, setCanClaim] = useState(false);

  useEffect(() => {
    if (userUnStakeReqTime && exitPeriodTime) {
      const now = BigInt(Math.floor(Date.now() / 1000));
      const claimableTime = userUnStakeReqTime + exitPeriodTime;

      let remaining = claimableTime - now;

      setCanClaim(remaining <= 0n);

      if (remaining <= 0n) {
        setCanClaim(remaining <= 0n);
      } else {
        const claimDate = new Date(Number(claimableTime) * 1000);
        const datePart = claimDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });

        const timePart = claimDate.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });

        const formattedDate = `${datePart} - ${timePart}`;
        setUserClaimTime(formattedDate);
      }
    } else if (userUnStakeReqTime && exitPeriodTime == 0n) {
      setCanClaim(true);
    }
  }, [exitPeriodTime, userUnStakeReqTime, pendingUnstakes]);

  return (
    <div className="flex items-center justify-center relative w-full ">
      <div className="flex flex-col gap-5 sm:gap-10 relative w-full mt-2 sm:mt-0 bg-sectionBg max-w-[510px] 2xl:min-h-[510px] min-h-[500px] md:min-h-[528px] md:max-h-[528px]">
        <div className="flex items-center z-[200] px-4 font-medium font-azeretMono absolute h-[56px] -top-8 bg-textBackGround text-lightDarkText tracking-[2px]">
          Delegate Status
        </div>
        <div
          className={`${
            !userDelegateBalances ||
            (!userDelegateBalances.dsp &&
              "bg-gray absolute top-0 bottom-0 right-0 left-0 z-[100] opacity-80")
          }`}
        ></div>
        <div
          className={`my-0 px-4 ${
            !userDelegateBalances || (!userDelegateBalances.dsp && "")
          }`}
        >
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
              className={`btn btn--action text-sm md:text-[12px] xl:text-sm text-nowrap ${
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
          {pendingUnstakes || pendingUnstakes == 0n ? (
            <div className="border-b pb-2">
              <div className="h-[40px] flex justify-between text-[12px] mt-2">
                <p>Requested Un Delegate:</p>{" "}
                <p>{w3bNumberFromBigint(pendingUnstakes!).dsp}</p>
              </div>

              <div className="flex items-center w-full justify-between">
                {!userClaimTime ? (
                  <p className="text-[12px] w-full">
                    Un Delegate Time: {userClaimTime}
                  </p>
                ) : (
                  ""
                )}

                <div className="flex justify-end  w-full">
                  {isMetamaskLoadingForClaim ? (
                    <button
                      className="btn btn--action text-[10px] 3xl:text-base text-nowrap "
                      disabled
                    >
                      {isMetamaskLoadingForClaim
                        ? "Waiting for Metamask..."
                        : "Waiting for Tx..."}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleClaimPendingUnstakeAmount()}
                      className="btn btn--action btn--small text-[10px] 3xl:text-sm"
                      disabled={!canClaim}
                    >
                      Claim
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="w-full text-xs xl:text-sm transition-all action-sidebar flex flex-col justify-center text-lightDarkText bg-sectionBg  ">
            <div className="flex justify-between items-center py-4 border-b border-lightDarkText px-3">
              <p>$MUON Staked Amount</p>
              <div className="font-normal ">
                {userDelegateBalances
                  ? `${userDelegateBalances.dsp} $MUON`
                  : "0"}
              </div>
            </div>
            <div className="flex justify-between py-4 items-center  px-3">
              <div>Reward</div>
              <div className="font-normal ">
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

  const { chainId } = useAccount({ config });
  const { switchChain } = useSwitchChain();

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
      ) : chainId && chainId != getCurrentChainId() ? (
        <button
          onClick={() => switchChain({ chainId: getCurrentChainId() })}
          className="btn btn--action  cursor-auto text-sm md:text-[12px] xl:text-sm"
        >
          Switch Network
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
