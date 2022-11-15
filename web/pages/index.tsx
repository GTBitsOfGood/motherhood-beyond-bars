import LoginScreen from "@components/loginScreen";
import { UserContext } from "@lib/contexts/userContext";
import { useContext } from "react";

const Home = () => {
  const { admin, user } = useContext(UserContext);

  if (!admin) {
    return <LoginScreen />;
  }

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
