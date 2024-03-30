import { useNavigate } from "react-router-dom";
import "../styles/header.css";

const Header = () => {
  const nav = useNavigate();

  return (
    <div className="header">
      <p className="header__logo" onClick={() => nav("/")}>
        SP
      </p>

      <div className="header__group">
        <p onClick={() => nav("/")}>HOME</p>
        <p onClick={() => nav("/about")}>ABOUT</p>
        <p onClick={() => nav("/auth")}>REGISTER</p>
      </div>
    </div>
  );
};

export default Header;
