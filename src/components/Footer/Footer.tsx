const footerItems = [
  { id: 0, title: "X", src: "https://x.com/muon_net" },
  { id: 1, title: "Discord", src: "https://discord.gg/muonnetwork" },
  { id: 2, title: "Medium", src: "https://docs.muon.net/muon-network" },
  { id: 3, title: "Telegram", src: "https://t.me/muon_net" },
];

export const Footer = () => {
  return (
    <footer className="content footer z-[3000] flex flex-col md:flex-row w-full items-center gap-3 px-14 font-azeretMono bottom-8 pb-10 xl:pb-0 xl:absolute text-lightDarkText">
      <div className="flex w-full justify-between gap-4 max-w-[245px]">
        {footerItems.map((item, index) => (
          <div
            onClick={() => window.open(item.src, "_blank")}
            key={index}
            className="custom-1110:text-[12px] text-sm cursor-pointer text-lightDarkText"
          >
            {item.title}
          </div>
        ))}
      </div>
      <div className="w-full  h-[1px] mt-[11px] hidden md:flex items-end  bg-black"></div>

      <div className="flex w-full items-end max-w-[200px] gap-[6px]">
        <span className="text-sm text-lightDarkText flex ">Powered By</span>
        <img
          src="./assets/images/footer/logo.svg"
          alt=""
          className="opacity-70 "
          onClick={() => window.open("https://www.muon.net/", "_blank")}
        />
      </div>
    </footer>
  );
};
