import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";

import "../styles/auth.css";

const Auth = () => {
  const [header, setHeader] = useState("Register");
  const [currentScreen, setCurrentScreen] = useState("register");
  const [bottomText, setBottomText] = useState("Already registered? Log in");
  const nav = useNavigate();

  useEffect(() => {
    if (currentScreen === "login") {
      setHeader("Login");
      setBottomText("Haven't registered? Register");
    } else {
      setHeader("Register");
      setBottomText("Already registered? Log in");
    }
  }, [currentScreen]);

  const handleBottomText = () => {
    if (currentScreen === "register") {
      setCurrentScreen("login");
    } else {
      setCurrentScreen("register");
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
            {currentScreen === "register" ? <RegisterForm /> : <LoginForm />}
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
