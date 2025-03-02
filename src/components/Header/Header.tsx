import { MUON_TOKEN_ADDRESS } from "../../constants/addresses";
import useDelegateAction from "../../context/DelegateAction/useDelegateAction";
import { ConnectWalletButton } from "../common/ConnectWalletButton";
import numeral from "numeral";
const menuItems = [
  { id: 0, title: "GitHub", src: "https://Github.com/muon-protocol" },
  { id: 1, title: "Docs", src: "" },
  {
    id: 2,
    title: "Run a Node",
    src: "https://docs.muon.net/muon-network/muon-nodes/pion",
  },
  {
    id: 3,
    title: "Buy $MUON",
    src: `https://thena.fi/swap?inputCurrency=BNB&outputCurrency=${MUON_TOKEN_ADDRESS}&swapType=1`,
  },
];

const Header = () => {
  return (
    <div className="sm:pt-10 z-[2000] relative px-4 md:px-10 mt-5 sm:mt-0">
      <div className=" z-[2000] w-full navbar justify-between items-center xl:flex ">
        <div className="flex flex-col gap-5 relative">
          <div className="flex items-center gap-[18px] ">
            <img
              onClick={() => window.open("https://www.muon.net/", "_blank")}
              src="/assets/images/muonLogo.svg"
            />
            <div className="flex gap-[15px] sm:gap-[32px] border-b pb-1">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  className=" text-[10px] sm:text-sm cursor-pointer text-nowrap"
                  onClick={() => window.open(item.src, "_blank")}
                >
                  {item.title}
                </div>
              ))}
            </div>
          </div>
          {/* <div className="absolute top-12 left-3 w-[200px] md:hidden">
            <PriceTVLButton />
          </div> */}
        </div>

        <div className=" flex flex-col-reverse sm:flex-row gap-4  mt-4 ">
          <div className="">
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

  const formatNumber = (num: number): string => {
    return numeral(num).format("0.00a").toUpperCase();
  };

  return (
    <button className="btn btn--small !py-[5px] !cursor-default">
      {/* <img src="/assets/images/pion-token-logo.svg" alt="" className="mr-2.5" /> */}
      <p className=" text-[10px] font-normal md:text-sm text-nowrap">
        {`Total Delegated: ${
          totalDelegated?.dsp ? formatNumber(totalDelegated.dsp) : "0"
        }`}{" "}
        $MUON
      </p>
    </button>
  );
};

export default Header;
