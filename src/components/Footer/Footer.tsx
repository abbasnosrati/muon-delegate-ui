const footerItems = [
  { id: 0, title: "Github", src: "https://Github.com/muon-protocol" },
  { id: 1, title: "Medium", src: "https://medium.com/muon" },
  { id: 2, title: "Discord", src: "https://discord.gg/muonnetwork" },
  { id: 3, title: "X", src: "https://x.com/muon_net" },
  // { id: 3, title: 'Telegram', src: 'https://t.me/muon_net' },
];

export const Footer = () => {
  return (
    <footer className="content footer z-[3000] flex flex-col md:flex-row w-full items-center md:items-end gap-3 px-14 font-azeretMono bottom-8 pb-10 xl:pb-5  text-lightDarkText">
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
      <div className="w-full h-[1px] mb-[4px] hidden md:flex   bg-black"></div>

      <div className="flex items-end gap-2">
        <span className="text-sm text-lightDarkText flex text-nowrap">
          Powered By
        </span>
        <div className="flex w-[120px] mb-[2px]">
          <img
            src="./assets/images/footer/logo.svg"
            alt=""
            className="opacity-70 cursor-pointer w-full h-full"
            onClick={() => window.open("https://www.muon.net/", "_blank")}
          />
        </div>
      </div>
    </footer>
  );
};
