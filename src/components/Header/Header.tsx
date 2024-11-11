import useDelegateAction from "../../context/DelegateAction/useDelegateAction";
import { ConnectWalletButton } from "../common/ConnectWalletButton";

const Header = () => {
  return (
    <div>
      <div className="  absolute w-full navbar justify-between items-center flex px-2 sm:px-4 sm:pt-10 ">
        <div className="flex flex-col gap-5 relative">
          <div className="flex items-center gap-2 pl-5 lg:pl-14">
            <img alt="bonPion" src="/assets/images/logo.svg" />
            <img alt="bonPion" src="/assets/images/logo-text.svg" />
          </div>
          <div className="absolute top-12 left-3 w-[200px] sm:hidden">
            <PriceTVLButton />
          </div>
        </div>

        <div className=" flex flex-col-reverse sm:flex-row gap-4 mr-3 sm:mr-10">
          <div className="hidden sm:flex">
            <PriceTVLButton />
          </div>
          <ConnectWalletButton />
        </div>
      </div>
    </div>
  );
};

const PriceTVLButton = () => {
  const { totalDelegated } = useDelegateAction();
  return (
    <button className="btn btn--small !py-[5px] !cursor-default">
      {/* <img src="/assets/images/pion-token-logo.svg" alt="" className="mr-2.5" /> */}
      <p className="!text-white text-[10px] font-bold sm:text-sm sm:font-medium">
        {`Total Delegated: ${totalDelegated?.dsp ? totalDelegated.dsp : "..."}`}{" "}
        PION
      </p>
    </button>
  );
};

export default Header;
