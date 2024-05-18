import Header from "../../components/Header";
import { collectionGroup } from "firebase/firestore";
import { convertLength } from "@mui/material/styles/cssUtils";
import { Outlet, useNavigate } from "react-router-dom";

import "../../styles/dashboard.css";
import { useState } from "react";

const Dashboard = () => {
  const nav = useNavigate();
  const [currentRoute, setCurrentRoute] = useState("payment");

  return (
    <div className="dashboard">
      <Header />

      <div className="dashboard__main">
        <div className="dashboard__main__group">
          <h1 className="dashboard__main__group__heading">
            Welcome to the Dashboard
          </h1>

          <p
            onClick={() => {
              nav("/dashboard/payment");
              setCurrentRoute("payment");
            }}
            className={`dashboard__main__group__link ${
              currentRoute === "payment" ? "active" : "inactive"
            }`}
          >
            Manage payment
          </p>
          <p
            onClick={() => {
              nav("/dashboard/history");
              setCurrentRoute("history");
            }}
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
