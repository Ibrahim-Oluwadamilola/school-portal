import Header from "../components/Header";
import "../styles/success.css";

const Success = () => {
  return (
    <div className="success">
      <Header />

      <div className="success__main">
        <p className="success__main__heading">Payment made successfully!</p>
        <p className="success__main__text">Thank you.</p>
      </div>
    </div>
  );
};

export default Success;
