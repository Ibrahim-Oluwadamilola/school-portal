import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../config/firebase";

import "../styles/form.css";

const RegisterForm = () => {
  const nav = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      console.log("user: ", user);
      nav("/dashboard/history");
    }
  }, [user]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  function handleRegister(event) {
    event.preventDefault();
    registerWithEmailAndPassword(form);
  }

  return (
    <form className="form">
      <div className="form__group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Damilola Ibrahim"
          onChange={handleChange}
          value={form.name}
        />
      </div>

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
        <button onClick={handleRegister} className="form-button primary">
          Register wih email
        </button>
        <button onClick={signInWithGoogle} className="form-button secondary">
          Register with Google
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
