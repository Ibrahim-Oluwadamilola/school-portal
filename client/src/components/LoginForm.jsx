import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "../config/firebase";

import "../styles/form.css";

const LoginForm = () => {
  const [text, setText] = useState("Login");
  const [user, loading, error] = useAuthState(auth);
  const nav = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
    nav("/payment");
  }

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      // setText("Loading...");
      return;
    }
    if (user) nav("/dashboard");
  }, [user, loading]);

  return (
    <form className="form">
      <div className="form__group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="example@gmail.com"
          onChange={handleChange}
          value={form.email}
        />
      </div>

      <div className="form__group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
          value={form.password}
        />
      </div>

      <div className="button-group">
        <button
          onClick={() => logInWithEmailAndPassword(form)}
          className="form-button primary"
        >
          {text}
        </button>
        <button
          onClick={() => signInWithGoogle}
          className="form-button secondary"
        >
          Register with with Google
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
