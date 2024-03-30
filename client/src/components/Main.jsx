import { useNavigate } from "react-router-dom";

import "../styles/main.css";

const Main = () => {
  const nav = useNavigate();

  const handleClick = () => {
    // ! TO-DO: navigate to dashboard if already logged-in
    nav("/auth");
  };

  return (
    <div className="main">
      <div className="main__content">
        <div className="main__content__group">
          <p className="main__content__group__text">
            Welcome to the payment portal.
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
