import useDelegateAction from "../../context/DelegateAction/useDelegateAction";
import { RewardStatus } from "../../types";

export const RewardStatusCheckbox = () => {
  const { selectedRewardStatus, handleCheckboxChange } = useDelegateAction();
  return (
    <div>
      {/* <p className="balance flex text-sm max-md:text-sm max-md:font-semibold text-xyz-2 dark:text-alice-gray">
        Select Status
      </p> */}
      <div className="mt-2 bg-input-bg rounded-xl px-5 py-4">
        <div className="flex gap-5 text-white text-sm">
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
        {/* <p className="text-sm mt-3">Selected: {selectedRewardStatus || ""}</p> */}
      </div>
    </div>
  );
};
