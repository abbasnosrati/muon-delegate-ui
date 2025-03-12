import Header from "./components/Header/Header";
import { Web3ModalProvider } from "./web3ModalProvider";
import { MUONProvider } from "./context/MuonContext";
import { RefreshProvider } from "./context/Refresh/RefreshContext";
import { DelegateActionProvider } from "./context/DelegateAction/DelegateActionContext";
import Home from "./components/Home/Home";
import { ConvertProvider } from "./context/ConvertContext";
import { Footer } from "./components/Footer/Footer";
import { Toaster } from "react-hot-toast";

function App() {
  document.getElementsByTagName("body")[0].className = "pion";
  return (
    <Web3ModalProvider>
      <RefreshProvider>
        <MUONProvider>
          <ConvertProvider>
            <DelegateActionProvider>
              <div className="app relative overflow-x-hidden  flex flex-col no-scrollbar page__bg">
                <Header />

                <div className="flex-1 flex py-20 px-5">
                  <Home />
                </div>
                <Footer />
              </div>
              <Toaster position="bottom-right" />
            </DelegateActionProvider>
          </ConvertProvider>
        </MUONProvider>
      </RefreshProvider>
    </Web3ModalProvider>
  );
}

export default App;
