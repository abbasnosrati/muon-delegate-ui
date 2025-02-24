import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { W3bNumber } from "../types/wagmi";
import { useAccount, useBalance } from "wagmi";
import {
  MIGRATION_PION_ADDRESS,
  MUON_TOKEN_ADDRESS,
  PION_TOKEN_ADDRESS,
} from "../constants/addresses";
import { getCurrentChainId } from "../web3/chains";
import { w3bNumberFromBigint, w3bNumberFromString } from "../utils/web3";
import { waitForTransactionReceipt, writeContract } from "wagmi/actions";
import { config } from "../web3/config";
import MIGRATION_ABI from "../abis/Migration";
import useAllowance from "../hooks/useAllowance";
import PION_ABI from "../abis/Token.ts";

const ConvertContext = createContext<{
  pionBalance: W3bNumber | null;
  refetchPionBalance: () => void;
  isMetamaskLoading: boolean;
  handleConvert: () => void;
  migrateAmount: W3bNumber;
  setMigrateAmount: (amount: W3bNumber) => void;
  handleApprove: () => void;
  migrateAllowance: W3bNumber | null;
}>({
  pionBalance: null,
  refetchPionBalance: () => {},
  isMetamaskLoading: false,
  handleConvert: () => {},
  migrateAmount: w3bNumberFromString(""),
  setMigrateAmount: () => {},
  handleApprove: () => {},
  migrateAllowance: null,
});

const ConvertProvider = ({ children }: { children: ReactNode }) => {
  const { address: walletAddress } = useAccount();
  const [pionBalance, setPionBalance] = useState<W3bNumber | null>(null);
  const [isMetamaskLoading, setIsMetamaskLoading] = useState(false);
  const [migrateAmount, setMigrateAmount] = useState(w3bNumberFromString(""));

  const { allowance: migrateAllowance, refetch: refetchMigrateAllowance } =
    useAllowance(
      PION_TOKEN_ADDRESS[getCurrentChainId()],
      MIGRATION_PION_ADDRESS[getCurrentChainId()]
    );

  const {
    data: pionBalanceData,
    isFetched: pionBalanceIsFetched,
    refetch: refetchPionBalance,
  } = useBalance({
    address: walletAddress,
    token: PION_TOKEN_ADDRESS[getCurrentChainId()],
    chainId: getCurrentChainId(),
  });

  useEffect(() => {
    if (pionBalanceIsFetched && pionBalanceData) {
      setPionBalance(w3bNumberFromBigint(pionBalanceData.value));
    } else {
      setPionBalance(null);
    }
  }, [pionBalanceIsFetched, pionBalanceData]);

  const handleConvert = async () => {
    try {
      setIsMetamaskLoading(true);
      const result = await writeContract(config, {
        address: MIGRATION_PION_ADDRESS[getCurrentChainId()],
        abi: MIGRATION_ABI,
        functionName: "migrate",
        args: [migrateAmount.big],
        chainId: getCurrentChainId() as any,
      });

      await waitForTransactionReceipt(config, {
        hash: result,
      });
    } finally {
      setIsMetamaskLoading(false);
      refetchPionBalance();
      refetchMigrateAllowance();
    }
  };

  const handleApprove = async () => {
    try {
      setIsMetamaskLoading(true);
      const result = await writeContract(config, {
        address: MUON_TOKEN_ADDRESS[getCurrentChainId()],
        abi: PION_ABI,
        functionName: "approve",
        args: [MIGRATION_PION_ADDRESS[getCurrentChainId()], migrateAmount!.big],
      });
      await waitForTransactionReceipt(config, {
        hash: result,
      });
      refetchMigrateAllowance();
    } finally {
      setIsMetamaskLoading(false);
    }
  };

  return (
    <ConvertContext.Provider
      value={{
        pionBalance,
        refetchPionBalance,
        isMetamaskLoading,
        handleConvert,
        migrateAmount,
        setMigrateAmount,
        handleApprove,
        migrateAllowance,
      }}
    >
      {children}
    </ConvertContext.Provider>
  );
};

export const useConvert = () => useContext(ConvertContext);

export { ConvertProvider, ConvertContext };
