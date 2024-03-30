import { useState } from "react";
import toast from "react-hot-toast";

const Dashboard = () => {
  const BASE_URL = "http://localhost:3005";

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [buttonText, setButtonText] = useState("Create Payment Link");

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

  return (
    <div>
      <h1>Welcome to the dashboard</h1>

      <h1>Data</h1>
      {/* Display student data */}

      <button onClick={handleClick}>Get payment link</button>
    </div>
  );
};

export default Dashboard;
