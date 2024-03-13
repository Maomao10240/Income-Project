import AccountList from "./AccountList";
import AccountSummary from "./AccountSummary";
import { authContext } from "../context/AuthContext/AuthContext";
import { useContext, useEffect } from "react";

const AccountDashboard = () => {
  const { fetchProfileAction, profile, error } = useContext(authContext);
  console.log(profile?.accounts?.length);
  //dispatch
  useEffect(() => {
    fetchProfileAction();
  }, []);
  //console.log(profile);

  return (
    <>
      {error ? (
        <>
          <div
            className="bg-red-100 border text-center border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline ">Error here</span>
          </div>
        </>
      ) : (
        <>
          <AccountList accounts={profile?.accounts} />
          <AccountSummary />
        </>
      )}
    </>
  );
};

export default AccountDashboard;
