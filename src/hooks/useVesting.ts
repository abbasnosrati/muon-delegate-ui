import { useEffect, useState } from "react";
import Papa from "papaparse";
import { useAccount } from "wagmi";

const useVestedMuon = () => {
  const [vestedAmount, setVestedAmount] = useState<any>(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const { address: walletAddress } = useAccount();
  useEffect(() => {
    if (!walletAddress) return;
    fetch("/assets/files/pionVesting.csv")
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          complete: (result: any) => {
            const data = result.data;
            const userData = data.find(
              (entry: any) =>
                entry.address.toLowerCase() === walletAddress.toLowerCase()
            );
            if (userData) {
              setVestedAmount(parseFloat(userData["Vested MUON"]));
            } else {
              setVestedAmount(0);
            }
            setDataLoaded(true);
          },
        });
      });
  }, [walletAddress]);

  return { vestedAmount, dataLoaded };
};

export default useVestedMuon;
