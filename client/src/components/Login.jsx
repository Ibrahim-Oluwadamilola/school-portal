import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
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

  function handleSubmit(event) {
    event.preventDefault();
    console.log(form);
  }

  return (
    <div className="login-container">
      <div className="login-container__section">
        <h1>WELCOME TO THE PAYMENT PLATFORM</h1>

        <div className="wrapper">
          <h2>LOGIN</h2>
          <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              onChange={handleChange}
              value={form.email}
            />

            <label>Password:</label>
            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={handleChange}
              value={form.password}
            />

            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
