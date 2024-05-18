import Header from "../../components/Header";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import "../../styles/dashboard.css";

const Dashboard = () => {
  const nav = useNavigate();
  const location = useLocation();
  const currentRoute = location.pathname.split("/").at(-1);

  return (
    <div className="dashboard">
      <Header />

      <div className="dashboard__main">
        <div className="dashboard__main__group">
          <h1 className="dashboard__main__group__heading">
            Welcome to the Dashboard
          </h1>

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
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
