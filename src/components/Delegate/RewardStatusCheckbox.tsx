import useDelegateAction from "../../context/TransferAction/useDelegateAction";

export const RewardStatusCheckbox = () => {
  const { selectedRewardStatus, handleCheckboxChange } = useDelegateAction();

  return (
    <div>
      <p className="balance flex text-sm max-md:text-sm max-md:font-semibold text-xyz-2 dark:text-alice-gray">
        Select Status
      </p>
      <div className="mt-2 bg-input-bg rounded-xl px-5 py-4">
        <div className="flex gap-5 text-white text-sm">
          <label className="cursor-pointer">
            <input
              type="checkbox"
              checked={selectedRewardStatus === "ReStake Reward"}
              onChange={() => handleCheckboxChange("ReStake Reward")}
              className="mr-1"
            />
            ReStake
          </label>

          <label className="cursor-pointer">
            <input
              type="checkbox"
              checked={selectedRewardStatus === "Transfer Reward"}
              onChange={() => handleCheckboxChange("Transfer Reward")}
              className="mr-1"
            />
            Transfer
          </label>
        </div>
        <p className="text-sm mt-3">Selected: {selectedRewardStatus || ""}</p>
      </div>
    </div>
  );
};
