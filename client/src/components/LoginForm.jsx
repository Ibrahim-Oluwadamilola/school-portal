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
  const nav = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  function handleLogin(event) {
    event.preventDefault();
    const res = logInWithEmailAndPassword(form);
    console.log("res: ", res);
  }

  useEffect(() => {
    if (user) {
      nav("/dashboard/history");
    }
  }, [user]);

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
        <button onClick={handleLogin} className="form-button primary">
          {loading ? "Logging you in..." : "Login"}
        </button>
        {/* <button onClick={signInWithGoogle} className="form-button secondary">
          Login with Google
        </button> */}
      </div>
    </form>
  );
};

export default LoginForm;
