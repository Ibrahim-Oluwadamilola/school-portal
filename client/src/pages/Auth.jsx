import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import Header from "../components/Header";

import "../styles/auth.css";

const Auth = () => {
  const [bottomText, setBottomText] = useState("Already registered? Log in");
  const location = useLocation();
  const nav = useNavigate();

  const currentRoute = location.pathname.split("/").at(-1);
  const header = currentRoute[0].toUpperCase() + currentRoute.slice(1);

  useEffect(() => {
    if (currentRoute.toLowerCase() === "login") {
      setBottomText("Haven't registered? Register");
    } else {
      setBottomText("Already registered? Log in");
    }
  }, [currentRoute]);

  const handleBottomText = () => {
    if (currentRoute === "register") {
      nav("login");
    } else {
      nav("register");
    }
  };

  return (
    <div className="auth">
      <Header />

      <div className="auth__main">
        <h1 className="auth__main__header">WELCOME TO THE PAYMENT PLATFORM</h1>

        <div className="form-wrapper">
          <h2 className="form-wrapper__header">{header}</h2>

          <div>
            <Outlet />
          </div>

          <p onClick={handleBottomText} className="form-wrapper__bottom-text">
            {bottomText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
