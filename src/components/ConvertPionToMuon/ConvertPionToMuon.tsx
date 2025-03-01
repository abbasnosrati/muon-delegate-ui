import { ConvertPion } from "./ConvertPion";
import { ConnectWalletModal } from "../common/ConnectWalletModal";
import { WrongNetworkModal } from "../common/WrongNetworkModal";
import { useConvert } from "../../context/ConvertContext";
import { useAccount, useSwitchChain } from "wagmi";
import { config } from "../../web3/config";
import { getCurrentChainId } from "../../web3/chains";

const ConvertPionToMuon = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <ConnectWalletModal />
      <WrongNetworkModal />
      <div className="w-full max-w-[510px] bg-sectionBg relative 2xl:min-h-[510px]">
        <div className="flex items-center px-4 font-medium font-azeretMono absolute h-[56px] -top-8 bg-textBackGround text-lightDarkText tracking-[1px]">
          Convert $PION to $MUON
        </div>
        <div className="pion actions-content  w-full px-4 py-8 min-h-[400px] md:min-h-[428px] md:max-h-[424px] overflow-hidden flex flex-col">
          <ConvertPion />
          <CovertPionButton />
        </div>
      </div>
    </div>
  );
};

const CovertPionButton = () => {
  const {
    pionBalance,
    migrateAmount,
    isMetamaskLoading,
    handleConvert,
    handleApprove,
    migrateAllowance,
  } = useConvert();

  const { chainId } = useAccount({ config });
  const { switchChain } = useSwitchChain();

  const displayAllowance =
    !migrateAllowance ||
    (migrateAllowance && migrateAllowance.big < migrateAmount.big);

  return (
    <div className="flex flex-row gap-2 sm:gap-3 absolute bottom-6 sm:bottom-10 w-full justify-center right-0">
      {migrateAmount && pionBalance && migrateAmount.big > pionBalance.big ? (
        <button
          disabled={true}
          onClick={() => handleApprove()}
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
      ) : displayAllowance && migrateAmount.big && pionBalance ? (
        <button
          disabled={!migrateAmount || !pionBalance?.dsp}
          onClick={() => handleApprove()}
          className={`btn btn--action ${
            (!migrateAmount || !pionBalance?.dsp) && " cursor-auto"
          }`}
        >
          {isMetamaskLoading ? "Approving..." : "Approve"}
        </button>
      ) : (
        <button
          disabled={
            isMetamaskLoading || !pionBalance?.dsp || !migrateAmount.big
          }
          onClick={() => handleConvert()}
          className={`btn btn--action ${
            (isMetamaskLoading || !pionBalance?.dsp || !migrateAmount.big) &&
            " cursor-auto text-sm md:text-[12px] xl:text-sm"
          }`}
        >
          {isMetamaskLoading ? "Converting..." : "Convert"}
        </button>
      )}
    </div>
  );
};

export default ConvertPionToMuon;
