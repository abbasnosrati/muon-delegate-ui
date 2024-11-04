import BonALICECard from "./BonALICECard.tsx";
import { BonPION } from "../../types";
import { getTier } from "../../utils";

const BonALICEModalBody = ({
  bonPIONs,
  handleUpgradeModalItemClicked,
  isSelectedUpgradeBonALICE,
}: {
  bonPIONs: BonPION[];
  handleUpgradeModalItemClicked: (item: BonPION) => void;
  isSelectedUpgradeBonALICE: (item: BonPION) => boolean;
}) => {
  return (
    <div className="flex flex-col gap-3">
      {bonPIONs.find((nft) => nft.nodePower > 0) ? (
        bonPIONs.map((item: BonPION) => {
          return (
            item.nodePower > 0 && (
              <BonALICECard
                key={item.tokenId}
                isNodeBonALICE={item.isNodeBonALICE}
                className="cursor-pointer"
                title={`bonPION #` + item.tokenId}
                subTitle1="Node Power"
                subValue1={item.nodePower}
                subTitle2="Tier"
                subValue2={getTier(item.nodePower)}
                onClick={() => handleUpgradeModalItemClicked(item)}
                compact
                selected={isSelectedUpgradeBonALICE(item)}
              />
            )
          );
        })
      ) : (
        <p className="text-center py-24 px-3 text-white">
          You have no bonPION NFTs to show.
        </p>
      )}
    </div>
  );
};

export default BonALICEModalBody;
