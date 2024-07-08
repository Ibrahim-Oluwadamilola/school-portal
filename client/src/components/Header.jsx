import { useNavigate } from "react-router-dom";
import "../styles/header.css";
import { auth, logout } from "../config/firebase";

const Header = () => {
  const nav = useNavigate();
  // const user = onAuthStateChanged(auth);
  const user = auth.currentUser;

  function handleLogOut() {
    logout();
    setTimeout(() => {
      nav("/");
    }, 1000);
  }

  return (
    <div className="header">
      <p className="header__logo" onClick={() => nav("/")}>
        BMS
      </p>

      <div className="header__group">
        <p onClick={() => nav("/")}>HOME</p>
        <p onClick={() => nav("/about")}>ABOUT</p>
        {user ? (
          <p onClick={handleLogOut}>LOG OUT</p>
        ) : (
          <p onClick={() => nav("/auth/register")}>REGISTER</p>
        )}
      </div>
    </div>
  );
};

export default Header;
