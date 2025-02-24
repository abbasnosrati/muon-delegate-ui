import Header from "./components/Header/Header";
import { Web3ModalProvider } from "./web3ModalProvider";

import { MUONProvider } from "./context/MuonContext";
import { RefreshProvider } from "./context/Refresh/RefreshContext";
import { DelegateActionProvider } from "./context/DelegateAction/DelegateActionContext";
import Home from "./components/Home/Home";
import { ConvertProvider } from "./context/ConvertContext";
function App() {
  document.getElementsByTagName("body")[0].className = "pion";
  return (
    <div className="app relative overflow-x-hidden max-md:pt-[calc(5*4px)] no-scrollbar page__bg">
      <Web3ModalProvider>
        <RefreshProvider>
          <MUONProvider>
            <ConvertProvider>
              <DelegateActionProvider>
                <Header />
                <div className="w-full">
                  <Home />
                </div>
              </DelegateActionProvider>
            </ConvertProvider>
          </MUONProvider>
        </RefreshProvider>
      </Web3ModalProvider>
    </div>
  );
}

export default App;
