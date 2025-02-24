import useDelegateAction from "../../context/DelegateAction/useDelegateAction";
import ConvertPionToMuon from "../ConvertPionToMuon/ConvertPionToMuon";
import Delegate from "../Delegate/Delegate";
import { UserDetails } from "../Delegate/UserDetails";

const Home = () => {
  const { userDelegateBalances } = useDelegateAction();
  return (
    <div className="w-full flex flex-col items-center justify-center page gap-16 ">
      <UserDetails />
      {userDelegateBalances && userDelegateBalances.dsp ? <UserDetails /> : ""}
      <div className="w-full flex flex-col lg:flex-row gap-16 lg:gap-10">
        <Delegate />
        <ConvertPionToMuon />
      </div>
    </div>
  );
};

export default Home;
