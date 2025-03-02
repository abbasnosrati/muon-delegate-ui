import useDelegateAction from "../../context/DelegateAction/useDelegateAction";
import ConvertPionToMuon from "../ConvertPionToMuon/ConvertPionToMuon";
import Delegate from "../Delegate/Delegate";
import { UserDetails } from "../Delegate/UserDetails";

const Home = () => {
  const { userDelegateBalances } = useDelegateAction();
  return (
    <div className=" flex items-center justify-center page gap-16">
      <div className="flex flex-col lg:flex-row  gap-20 lg:gap-4 xl:gap-10 max-w-[1520px] ">
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
