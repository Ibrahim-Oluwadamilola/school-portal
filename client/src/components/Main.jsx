import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import "../styles/main.css";
import { auth } from "../config/firebase";

const Main = () => {
  const nav = useNavigate();
  let isUser = false;

  onAuthStateChanged(auth, (user) => {
    if (user) isUser = true;
  });

  const handleClick = () => {
    if (isUser) nav("/dashboard/payment");
    else nav("/auth/register");
  };

  return (
    <div className="main">
      <div className="main__content">
        <div className="main__content__group">
          <p className="main__content__group__text">
            Welcome to the Bursary Management System.
          </p>
          <button onClick={handleClick}>Get started</button>
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
