import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";

import "../styles/main.css";

const BASE_URL = "http://localhost:3005";

const Main = () => {
  const nav = useNavigate();
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
    <div className="main">
      <div className="main__content">
        <div className="main__content__group">
          <p className="main__content__group__text">
            Welcome to the payment portal.
          </p>
          <button onClick={handleClick}>{buttonText}</button>
        </div>

        <div className="main__content__image"></div>
      </div>
    </div>
  );
};

export default Main;
// admin at the end of the term can generate school fees for the student
// when parents are checking result, they can see the invoice/receipt
// unique invoice number for each student?
// invoice number will be used to check who has made
