import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { W3bNumber } from "../types/wagmi";
import { useAccount, useBalance, useReadContract } from "wagmi";
import {
  MIGRATION_PION_SRC_ADDRESS,
  PION_TOKEN_ADDRESS,
} from "../constants/addresses";
import { getConvertChainId, getCurrentChainId } from "../web3/chains";
import { w3bNumberFromBigint, w3bNumberFromString } from "../utils/web3";
import { waitForTransactionReceipt, writeContract } from "wagmi/actions";
import { config } from "../web3/config";
import MIGRATION_ABI from "../abis/Migration";
import useAllowance from "../hooks/useAllowance";
import PION_ABI from "../abis/Token.ts";
import { useMuon } from "./MuonContext.tsx";
import toast from "react-hot-toast";

const ConvertContext = createContext<{
  pionBalance: W3bNumber | null;
  refetchPionBalance: () => void;
  isMetamaskLoading: boolean;
  handleConvert: () => void;
  migrateAmount: W3bNumber;
  setMigrateAmount: (amount: W3bNumber) => void;
  handleApprove: () => void;
  migrateAllowance: W3bNumber | null;
  multiplier: bigint | undefined;
  isApproveModalOpen: boolean;
  setIsApproveModalOpen: (isOpen: boolean) => void;
}>({
  pionBalance: null,
  refetchPionBalance: () => {},
  isMetamaskLoading: false,
  handleConvert: () => {},
  migrateAmount: w3bNumberFromString(""),
  setMigrateAmount: () => {},
  handleApprove: () => {},
  migrateAllowance: null,
  multiplier: 0n,
  isApproveModalOpen: false,
  setIsApproveModalOpen: () => {},
});

const ConvertProvider = ({ children }: { children: ReactNode }) => {
  const { address: walletAddress } = useAccount();
  const [pionBalance, setPionBalance] = useState<W3bNumber | null>(null);
  const [isMetamaskLoading, setIsMetamaskLoading] = useState(false);
  const [migrateAmount, setMigrateAmount] = useState(w3bNumberFromString(""));
  const [isApproveModalOpen, setIsApproveModalOpen] = useState<boolean>(false);

  const { refetchMuonBalance } = useMuon();

  const { allowance: migrateAllowance, refetch: refetchMigrateAllowance } =
    useAllowance(
      PION_TOKEN_ADDRESS[getConvertChainId()],
      MIGRATION_PION_SRC_ADDRESS[getConvertChainId()]
    );

  const {
    data: pionBalanceData,
    isFetched: pionBalanceIsFetched,
    refetch: refetchPionBalance,
  } = useBalance({
    address: walletAddress,
    token: PION_TOKEN_ADDRESS[getConvertChainId()],
    chainId: getConvertChainId(),
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
        address: MIGRATION_PION_SRC_ADDRESS[getCurrentChainId()],
        abi: MIGRATION_ABI,
        functionName: "migrate",
        args: [migrateAmount.big],
        chainId: getCurrentChainId() as any,
      });

      const ts = waitForTransactionReceipt(config, {
        hash: result,
      });

      await toast.promise(ts, {
        loading: "Converting...",
        success: "Converted!",
        error: "Failed to Convert.",
      });
    } finally {
      setIsMetamaskLoading(false);
      refetchPionBalance();
      refetchMigrateAllowance();
      refetchMuonBalance();
      setMigrateAmount(w3bNumberFromString(""));
    }
  };

  const handleApprove = async () => {
    try {
      setIsApproveModalOpen(true);
      setIsMetamaskLoading(true);
      const result = await writeContract(config, {
        address: PION_TOKEN_ADDRESS[getConvertChainId()],
        abi: PION_ABI,
        functionName: "approve",
        args: [
          MIGRATION_PION_SRC_ADDRESS[getConvertChainId()],
          migrateAmount!.big,
        ],
      });
      const ts = waitForTransactionReceipt(config, {
        hash: result,
      });

      await toast.promise(ts, {
        loading: "Approving...",
        success: "Approved!",
        error: "Failed to Approve.",
      });

      refetchMigrateAllowance();
    } finally {
      setIsMetamaskLoading(false);
    }
  };

  const { data: multiplier } = useReadContract({
    abi: MIGRATION_ABI,
    address: MIGRATION_PION_SRC_ADDRESS[getConvertChainId()],
    functionName: "multiplier",
    chainId: getConvertChainId(),
  });

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
        multiplier,
        isApproveModalOpen,
        setIsApproveModalOpen,
      }}
    >
      {children}
    </ConvertContext.Provider>
  );
};

export const useConvert = () => useContext(ConvertContext);

export { ConvertProvider, ConvertContext };
