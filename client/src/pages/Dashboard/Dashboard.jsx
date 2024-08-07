import Header from "../../components/Header";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";

import "../../styles/dashboard.css";

const Dashboard = () => {
  const nav = useNavigate();
  const location = useLocation();
  const currentRoute = location.pathname.split("/").at(-1);

  const [user] = useAuthState(auth);

  const { state } = useLocation();

  return (
    <div className="dashboard">
      <Header />

      <div className="dashboard__main">
        <div className="dashboard__main__group">
          <h1 className="dashboard__main__group__heading">
            <span>Welcome,</span>
            <br />
            {`${user && user?.email}`}
          </h1>

          {state?.userType && state?.userType !== "parent" && (
            <>
              <p
                onClick={() => nav("payment")}
                className={`dashboard__main__group__link ${
                  currentRoute === "payment" ? "active" : "inactive"
                }`}
              >
                Manage payment
              </p>
              <p
                onClick={() => nav("history")}
                className={`dashboard__main__group__link ${
                  currentRoute === "history" ? "active" : "inactive"
                }`}
              >
                View history
              </p>
              <p
                onClick={() => nav("add")}
                className={`dashboard__main__group__link ${
                  currentRoute === "add" ? "active" : "inactive"
                }`}
              >
                Add student
              </p>
            </>
          )}
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
