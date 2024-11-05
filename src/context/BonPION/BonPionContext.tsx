import { createContext, ReactNode, useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { readContracts } from "wagmi/actions";

import BONPION_ABI from "../../abis/NFT.ts";
import {
  PionContractAddress,
  BONPION_ADDRESS,
  BOOSTER_ADDRESS,
  LP_TOKEN_ADDRESS,
  DELEGATION_ADDRESS,
} from "../../constants/addresses.ts";
import { W3bNumber } from "../../types/wagmi.ts";
import { USER_BON_PIONS } from "../../apollo/queries.ts";
import { useQuery } from "@apollo/client";
import { BonPION, RawBonPion } from "../../types/index.ts";
import useRefresh from "../Refresh/useRefresh.ts";
import { w3bNumberFromBigint } from "../../utils/web3.ts";
import useAllowance from "../../hooks/useAllowance.ts";
import useLPToken from "../LPToken/useLPToken.ts";
import { SupportedChainId } from "../../web3/chains.ts";
import { config } from "../../web3/config.ts";

const BonPIONContext = createContext<{
  bonPIONs: BonPION[];
  BONPIONAllowance: W3bNumber | null;
  LPTokenAllowanceForBooster: W3bNumber | null;
  ALICEAllowanceForBooster: W3bNumber | null;
  fetchBonALICEIsLoading: boolean;
}>({
  bonPIONs: [],
  BONPIONAllowance: null,
  LPTokenAllowanceForBooster: null,
  ALICEAllowanceForBooster: null,
  fetchBonALICEIsLoading: false,
});

const BonPIONProvider = ({ children }: { children: ReactNode }) => {
  const { address: walletAddress } = useAccount();
  const [bonPIONs, setBonPIONs] = useState<BonPION[]>([]);
  const { LPTokenDecimals } = useLPToken();

  const { allowance: BONPIONAllowance } = useAllowance(
    BONPION_ADDRESS,
    DELEGATION_ADDRESS
  );

  const { allowance: LPTokenAllowanceForBooster } = useAllowance(
    LP_TOKEN_ADDRESS,
    BOOSTER_ADDRESS,
    LPTokenDecimals
  );

  const { allowance: ALICEAllowanceForBooster } = useAllowance(
    PionContractAddress,
    BOOSTER_ADDRESS
  );

  const [fetchBonALICEIsLoading, setFetchBonALICEIsLoading] = useState(false);

  const { fastRefresh } = useRefresh();

  const { refetch: BonALICERefetch } = useQuery(USER_BON_PIONS, {
    variables: { account: walletAddress },
  });

  useEffect(() => {
    if (walletAddress) {
      setFetchBonALICEIsLoading(true);
      BonALICERefetch({ account: walletAddress }).then(({ data }) => {
        const rawBonPIONs: RawBonPion[] = data.accountTokenIds ?? [];
        const contracts: any = rawBonPIONs.map((bonALICE: RawBonPion) => ({
          abi: BONPION_ABI,
          address: BONPION_ADDRESS,
          functionName: "getLockedOf",
          args: [bonALICE.tokenId, [PionContractAddress]],
          chainId: SupportedChainId.bscTestnet,
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
          setFetchBonALICEIsLoading(false);
        });
      });
    }
  }, [fastRefresh, BonALICERefetch, walletAddress]);

  return (
    <BonPIONContext.Provider
      value={{
        bonPIONs,
        BONPIONAllowance,
        LPTokenAllowanceForBooster,
        fetchBonALICEIsLoading,
        ALICEAllowanceForBooster,
      }}
    >
      {children}
    </BonPIONContext.Provider>
  );
};

export { BonPIONProvider, BonPIONContext };
