import Header from "./components/Header/Header";
import { Web3ModalProvider } from "./web3ModalProvider";
import Footer from "./components/Footer/Footer";
import Delegate from "./components/Delegate/Delegate";
import { ApolloProvider } from "@apollo/client";
import { PIONProvider } from "./context/PionContext";
import { pionClient } from "./apollo/client";
import { RefreshProvider } from "./context/Refresh/RefreshContext";
import { LPTokenProvider } from "./context/LPToken/LPTokenContext";
import { BonPIONProvider } from "./context/BonPION/BonPionContext";
import { TransferActionProvider } from "./context/TransferAction/TransferActionContext";
function App() {
  document.getElementsByTagName("body")[0].className = "pion";
  return (
    <div className="app page__bg relative overflow-x-hidden no-scrollbar flex flex-col justify-center">
      <Web3ModalProvider>
        <ApolloProvider client={pionClient}>
          <RefreshProvider>
            <PIONProvider>
              <BonPIONProvider>
                <LPTokenProvider>
                  <TransferActionProvider>
                    <Header />
                    <Delegate />
                    <Footer />
                  </TransferActionProvider>
                </LPTokenProvider>
              </BonPIONProvider>
            </PIONProvider>
          </RefreshProvider>
        </ApolloProvider>
      </Web3ModalProvider>
    </div>
  );
}

export default App;
