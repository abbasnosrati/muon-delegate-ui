import { useContext } from "react";
import { BonPIONContext } from "./BonPionContext.tsx";

const useBonPION = () => {
  const context = useContext(BonPIONContext);

  if (!context) {
    throw new Error("useLPToken must be used within a ALICEContextProvider");
  }

  return context;
};

export default useBonPION;
