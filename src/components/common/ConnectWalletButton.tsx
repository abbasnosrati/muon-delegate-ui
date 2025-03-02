import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useMuon } from "../../context/MuonContext";
import { MUON } from "../../constants/strings";

export const ConnectWalletButton = ({
  size,
  withIcon,
  light,
}: {
  size?: "sm" | "md" | "lg";
  withIcon?: boolean;
  light?: boolean;
}) => {
  const { muonBalance } = useMuon();

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                if (withIcon) {
                  return (
                    <button
                      className="btn btn--small"
                      onClick={openConnectModal}
                    >
                      <img
                        className="h-6 md:h-8 w-auto"
                        src="/assets/images/migration/wallet-icon.svg"
                        alt=""
                      />
                      <p className="text-inherit">Connect Wallet</p>
                    </button>
                  );
                } else {
                  return (
                    <button
                      onClick={openConnectModal}
                      className="btn btn--small"
                    >
                      Connect Wallet
                    </button>
                  );
                }
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} className="btn btn--small">
                    Wrong Network
                  </button>
                );
              }

              return (
                <button
                  onClick={openAccountModal}
                  className={`btn  btn--action}`}
                >
                  {account.displayName} | {muonBalance?.dsp} {MUON.token}
                </button>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
