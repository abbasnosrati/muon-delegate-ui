// import { MUON_TOKEN_ADDRESS } from "../../constants/addresses";
import { useState } from "react";
import { MUON_TOKEN_ADDRESS } from "../../constants/addresses";
import useDelegateAction from "../../context/DelegateAction/useDelegateAction";
import { getCurrentChainId } from "../../web3/chains";
import { ConnectWalletButton } from "../common/ConnectWalletButton";
import numeral from "numeral";
import { footerItems } from "../Footer/Footer";
const menuItems = [
  {
    id: 0,
    title: "Homepage",
    src: "https://www.muon.net/",
  },
  {
    id: 1,
    title: "Node Dashboard",
    src: "https://app.muon.net/",
  },
  {
    id: 2,
    title: "Run a Node",
    src: "https://docs.muon.net/muon-protocol/running-a-muon-node",
  },
  { id: 3, title: "Docs", src: "https://docs.muon.net/muon-protocol" },
  {
    id: 4,
    title: "Buy $MUON",

    src: `https://lfj.gg/avalanche/swap?inputCurrency=${
      MUON_TOKEN_ADDRESS[getCurrentChainId()]
    }&outputCurrency=AVAX`,
  },
  {
    id: 5,
    title: "Support",
    src: `https://discord.com/channels/830888887253073920/1351862250217934860`,
  },
  // { id: 0, title: "GitHub", src: "https://Github.com/muon-protocol" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  return (
    <div className="sm:pt-10 z-[2000] relative px-4 md:px-10 mt-5 sm:mt-0">
      <div className=" z-[2000] w-full navbar justify-between 2xl:items-center xl:flex">
        <div className="flex flex-col gap-5 relative mt-3 2xl:mt-0 ">
          <div className="flex items-center gap-[18px] ">
            <div
              className="flex lg:hidden flex-col gap-[6px] cursor-pointer"
              onClick={() => {
                setIsMenuOpen(true);
              }}
            >
              <div className="w-[18px] h-[2px] bg-lightDarkText"></div>
              <div className="w-[18px] h-[2px] bg-lightDarkText"></div>
              <div className="w-[18px] h-[2px] bg-lightDarkText"></div>
            </div>
            <img
              onClick={() => window.open("https://www.muon.net/", "_blank")}
              src="/assets/images/muonLogo.svg"
              className="cursor-pointer"
            />
            <div className="lg:flex gap-[15px] sm:gap-[32px] border-b pb-1 hidden">
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
        </div>

        <div
          className={`${
            !isMenuOpen && "hidden"
          }  flex-col gap-[15px] sm:gap-[32px] !font-normal pt-28  pb-1 fixed top-0 right-0 left-0 bottom-0 bg-menuBgColor`}
        >
          <div className="flex items-center gap-2 absolute top-9 left-4">
            <img
              className="cursor-pointer w-[15px] h-[15px]"
              src="/assets/images/navbar/closeMenu.svg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
            <img
              className="cursor-pointer w-[34px] h-[29px]"
              onClick={() => window.open("https://www.muon.net/", "_blank")}
              src="/assets/images/muonLogo.svg"
            />
          </div>

          <div className="flex flex-col border-l pl-3 ml-[36px] gap-40">
            <div className="flex flex-col gap-3">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  className="text-[12px] cursor-pointer"
                  onClick={() => window.open(item.src, "_blank")}
                >
                  {item.title}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {footerItems.map((item, index) => (
                <div className="">
                  <div
                    key={index}
                    className="text-[12px] cursor-pointer"
                    onClick={() => window.open(item.src, "_blank")}
                  >
                    {item.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center mt-10 absolute bottom-10 left-0 right-0">
            <img
              className="w-[134px] h-[20px]"
              src="/assets/images/navbar/menuLogo.svg"
              alt=""
            />
          </div>
        </div>

        <div className=" flex flex-col-reverse 2xl:flex-row gap-4 mt-4 items-end">
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
    <button className="btn btn--action sm:btn--action !cursor-default !px-4">
      <p className=" font-normal text-[10px] md:text-base text-nowrap">
        {`Total Delegated: ${
          totalDelegated?.dsp ? formatNumber(totalDelegated.dsp) : "0"
        }`}{" "}
        $MUON
      </p>
    </button>
  );
};

export default Header;
