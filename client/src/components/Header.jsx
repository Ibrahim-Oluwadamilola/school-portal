import { useNavigate } from "react-router-dom";
import "../styles/header.css";

const Header = () => {
  const nav = useNavigate();

  function handleClick() {
    nav("/login");
  }

  return (
    <div className="header">
      <p className="header__logo">SP</p>
      <div className="header__group">
        <p onClick={() => nav("/")}>HOME</p>
        <p onClick={() => nav("/about")}>ABOUT</p>
        <p onClick={handleClick}>LOGIN</p>
      </div>
    </div>
  );
};

export default Header;
