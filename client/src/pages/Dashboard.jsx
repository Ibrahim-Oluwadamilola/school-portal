import { useState } from "react";
import toast from "react-hot-toast";
import Header from "../components/Header";

import "../styles/dashboard.css";
import DataTable from "../components/DataTable";
import { collectionGroup } from "firebase/firestore";
import { convertLength } from "@mui/material/styles/cssUtils";

const Dashboard = () => {
  const BASE_URL = "http://localhost:3005";

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [buttonText, setButtonText] = useState("Create Payment Link");
  const [indx, setIndx] = useState(0);

  const data = [
    {
      id: 1,
      name: "Dami Ibrahim",
      paymentStatus: "unpaid",
      outstandingPayment: "5,000",
      date: "2022-03-28",
    },
    {
      id: 2,
      name: "Ezekiel Akinola",
      paymentStatus: "paid",
      outstandingPayment: "0",
      date: "2022-03-28",
    },
    {
      id: 3,
      name: "Guy David",
      paymentStatus: "unpaid",
      outstandingPayment: "500,000",
      date: "2022-03-28",
    },
  ];

  async function handleClick() {
    if (!loading || !success) {
      setLoading(true);
      setButtonText("Creating Link...");

      const res = await fetch(`${BASE_URL}/api/payment`, {
        method: "POST",
        // body: , //!TO-DO: Collect form data
      });
      const data = await res.json();

      if (data) {
        setLoading(false);
        setButtonText("Failed. Retry?");

        if (data.code) {
          console.log("code: ", data.code);
          // an error has occured
          setFailure(true);
          toast.error("An error occurred");
          return;
        } else {
          const {
            data: { link },
            message,
            status,
          } = data;

          if (status === "success") {
            setButtonText("Done");
            setSuccess(true);
            toast(message);
            window.location = link;
            // nav(link, { replace: true });
          } else {
            setFailure(true);
          }
        }
      } else {
        setFailure(true);
      }
    }
  }

  const divisions = [
    { id: 1, title: "Junior Secondary" },
    { id: 2, title: "Senior Secondary" },
  ];

  const classObj = {
    1: ["JSS1", "JSS2", "JSS3"],
    2: ["SSS1", "SS2", "SSS3"],
  };

  const displayClass = (id) => {
    setIndx(id);
  };

  return (
    <div className="dashboard">
      <Header />

      <div className="dashboard__wrapper">
        <h1 className="dashboard__wrapper__heading">Payment History</h1>

        <div className="dashboard__wrapper__list">
          {divisions.map(({ title, id }) => (
            <div key={id} className="dashboard__wrapper__list__group">
              <div className="dashboard__wrapper__list__group__item">
                <span className="circle" />
                <p onClick={() => displayClass(id)}>{title}</p>
              </div>

              {indx == id &&
                classObj[id]?.map((el, id) => {
                  return (
                    <div key={id} className="data-group">
                      <p className="">{el}</p>
                      <DataTable data={data} />
                    </div>
                  );
                })}
            </div>
          ))}
        </div>

        {/* <button onClick={handleClick} className="dashboard__wrapper__button">
          Get payment link
        </button> */}
      </div>
    </div>
  );
};

export default Dashboard;
