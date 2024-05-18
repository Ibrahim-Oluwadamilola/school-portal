import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./pages/Auth.jsx";
import Home from "./pages/Home.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import { Toaster } from "react-hot-toast";
import Payment from "./pages/Dashboard/components/Payment.jsx";
import History from "./pages/Dashboard/components/History.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import LoginForm from "./components/LoginForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      { path: "register", element: <RegisterForm /> },
      { path: "login", element: <LoginForm /> },
    ],
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      { path: "payment", element: <Payment /> },
      { path: "history", element: <History /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster toastOptions={{ duration: 4000 }} />
    <RouterProvider router={router} />
  </React.StrictMode>
);
