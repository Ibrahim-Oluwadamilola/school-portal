import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import Header from "../components/Header";

import "../styles/auth.css";

const Auth = () => {
  const [bottomText, setBottomText] = useState("Already registered? Log in");
  const location = useLocation();
  const nav = useNavigate();

  const currentScreen = location.pathname.split("/").at(-1);
  const header = currentScreen[0].toUpperCase() + currentScreen.slice(1);

  useEffect(() => {
    if (currentScreen.toLowerCase() === "login") {
      setBottomText("Haven't registered? Register");
    } else {
      setBottomText("Already registered? Log in");
    }
  }, [currentScreen]);

  const handleBottomText = () => {
    if (currentScreen === "register") {
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
