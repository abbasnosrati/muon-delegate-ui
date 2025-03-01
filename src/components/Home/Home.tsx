import useDelegateAction from "../../context/DelegateAction/useDelegateAction";
import ConvertPionToMuon from "../ConvertPionToMuon/ConvertPionToMuon";
import Delegate from "../Delegate/Delegate";
import { UserDetails } from "../Delegate/UserDetails";

const Home = () => {
  const { userDelegateBalances } = useDelegateAction();
  return (
    <div className="w-full flex flex-col items-center justify-center page gap-16 ">
      <div className="flex flex-col lg:flex-row w-full gap-20 lg:gap-4 xl:gap-10 max-w-[1520px] mt-40  md:mt-14 xl:mt-0">
        <Delegate />
        {userDelegateBalances && userDelegateBalances.dsp ? (
          <UserDetails />
        ) : (
          ""
        )}
        <ConvertPionToMuon />
      </div>
    </div>
  );
};

export default Home;
