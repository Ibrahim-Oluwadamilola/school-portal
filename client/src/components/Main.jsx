import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";

import "../styles/main.css";

const BASE_URL = "http://localhost:3005";

const Main = () => {
  const nav = useNavigate();

  return (
    <div className="main">
      <div className="main__content">
        <div className="main__content__group">
          <p className="main__content__group__text">
            Welcome to the payment portal.
          </p>
          <button onClick={()=>nav("/dashboard")}>Get Started</button>
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
