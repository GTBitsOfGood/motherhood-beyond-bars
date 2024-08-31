import { UserContext } from "@lib/contexts/userContext";
import { useContext } from "react";

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="text-lg m-auto font-bold font-opensans text-center">
        Welcome
        <br />
        {user?.displayName}!
        <br />
      </div>

      <div className="text-lg m-auto font-opensans text-center">
        Please use the tabs on the left to navigate.
      </div>
    </div>
  );
};

export default Home;
