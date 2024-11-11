import { createContext, ReactNode, useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { readContracts } from "wagmi/actions";

import BONPION_ABI from "../../abis/NFT.ts";
import { PION_ADDRESS, BONPION_ADDRESS } from "../../constants/addresses.ts";
import { USER_BON_PIONS } from "../../apollo/queries.ts";
import { useQuery } from "@apollo/client";
import { BonPION, RawBonPion } from "../../types/index.ts";
import useRefresh from "../Refresh/useRefresh.ts";
import { w3bNumberFromBigint } from "../../utils/web3.ts";
import { SupportedChainId } from "../../web3/chains.ts";
import { config } from "../../web3/config.ts";

const BonPIONContext = createContext<{
  bonPIONs: BonPION[];
}>({
  bonPIONs: [],
});

const BonPIONProvider = ({ children }: { children: ReactNode }) => {
  const { address: walletAddress } = useAccount();
  const [bonPIONs, setBonPIONs] = useState<BonPION[]>([]);
  const { fastRefresh } = useRefresh();

  const { refetch: BonALICERefetch } = useQuery(USER_BON_PIONS, {
    variables: { account: walletAddress },
  });

  useEffect(() => {
    if (walletAddress) {
      BonALICERefetch({ account: walletAddress }).then(({ data }) => {
        const rawBonPIONs: RawBonPion[] = data.accountTokenIds ?? [];
        const contracts: any = rawBonPIONs.map((bonALICE: RawBonPion) => ({
          abi: BONPION_ABI,
          address: BONPION_ADDRESS,
          functionName: "getLockedOf",
          args: [bonALICE.tokenId, [PION_ADDRESS]],
          chainId: SupportedChainId.chainId,
          enabled: !!walletAddress && !!bonALICE.tokenId,
        }));

        readContracts(config, { contracts }).then((getLockedOfData: any) => {
          const bonPIONs: BonPION[] = [];
          getLockedOfData.map((lockedOf: any, index: number) => {
            bonPIONs.push({
              ...rawBonPIONs[index],
              ALICELockAmount: w3bNumberFromBigint(lockedOf.result[0]),
              LPTokenLockAmount: w3bNumberFromBigint(BigInt(0)),
              nodePower:
                w3bNumberFromBigint(lockedOf.result[0]).dsp +
                w3bNumberFromBigint(BigInt(0)).dsp,
            });
          });
          setBonPIONs(bonPIONs);
        });
      });
    }
  }, [fastRefresh, BonALICERefetch, walletAddress]);

  return (
    <BonPIONContext.Provider
      value={{
        bonPIONs,
      }}
    >
      {children}
    </BonPIONContext.Provider>
  );
};

export { BonPIONProvider, BonPIONContext };
