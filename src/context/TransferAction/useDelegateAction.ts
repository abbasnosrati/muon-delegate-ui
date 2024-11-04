import { useContext } from "react";
import { DelegateActionContext } from "./DelegateActionContext.tsx";

const useDelegateAction = () => {
  const context = useContext(DelegateActionContext);

  if (!context) {
    throw new Error(
      "useDelegateActions must be used within a TransferActionProvider"
    );
  }

  return context;
};

export default useDelegateAction;
