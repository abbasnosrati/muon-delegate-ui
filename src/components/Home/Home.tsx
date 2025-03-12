import Delegate from "../Delegate/Delegate";
import { UserDetails } from "../Delegate/UserDetails";

const Home = () => {
  return (
    <div className=" flex items-center justify-center page gap-16">
      <div className="flex flex-col lg:flex-row  gap-20 lg:gap-4 xl:gap-10 max-w-[1520px] ">
        <Delegate />
        <UserDetails />
      </div>
    </div>
  );
};

export default Home;
