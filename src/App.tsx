import Header from "./components/Header/Header";
import { Web3ModalProvider } from "./web3ModalProvider";

import { PIONProvider } from "./context/PionContext";
import { RefreshProvider } from "./context/Refresh/RefreshContext";
import { DelegateActionProvider } from "./context/DelegateAction/DelegateActionContext";
import Home from "./components/Home/Home";
function App() {
  document.getElementsByTagName("body")[0].className = "pion";
  return (
    <div className="app relative overflow-x-hidden max-md:pt-[calc(5*4px)] no-scrollbar page__bg">
      <Web3ModalProvider>
        <RefreshProvider>
          <PIONProvider>
            <DelegateActionProvider>
              <Header />
              <div className="w-full">
                <Home />
              </div>
            </DelegateActionProvider>
          </PIONProvider>
        </RefreshProvider>
      </Web3ModalProvider>
    </div>
  );
}

export default App;
