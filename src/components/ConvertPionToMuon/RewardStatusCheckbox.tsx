import useDelegateAction from "../../context/DelegateAction/useDelegateAction";
import { RewardStatus } from "../../types";

export const RewardStatusCheckbox = () => {
  const { selectedRewardStatus, handleCheckboxChange } = useDelegateAction();
  return (
    <div>
      <div className="mt-2 border border-lightDarkText text-lightDarkText px-5 py-4">
        <div className="flex gap-5  text-sm">
          <label className="cursor-pointer">
            <input
              type="checkbox"
              checked={selectedRewardStatus === RewardStatus.ReStakeReward}
              onChange={() => handleCheckboxChange(RewardStatus.ReStakeReward)}
              className="mr-1"
            />
            ReStake Reward
          </label>

          <label className="cursor-pointer">
            <input
              type="checkbox"
              checked={selectedRewardStatus === RewardStatus.TransferReward}
              onChange={() => handleCheckboxChange(RewardStatus.TransferReward)}
              className="mr-1"
            />
            Transfer Reward
          </label>
        </div>
      </div>
    </div>
  );
};
