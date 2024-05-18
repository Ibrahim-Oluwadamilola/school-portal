import { useState } from "react";
// import toast from "react-hot-toast";
// import nodemailer from "nodemailer";

import userData from "../../../utils/userData.js";

import "../../../styles/payment.css";

const Payment = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState([]);
  const BASE_URL = "http://localhost:3005";

  const formattedData = userData.map(({ name, fee, email, phoneNumber }) => ({
    name,
    amount: fee,
    email,
    phoneNumber,
  }));

  async function handleClick() {
    setIsLoading(true);

    const res = await fetch(`${BASE_URL}/api/payment`, {
      method: "POST",
      body: JSON.stringify(formattedData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (data) {
      setIsLoading(false);
      console.log("data: ", data);

      if (data?.error) {
        setIsError(true);
        setError(data?.message);
      }

      if (data?.success) {
        setIsSuccess(true);
        setData(data?.data?.map(({ data: { link } }) => link));
      }
    }
  }

  function handleSendEmail() {
    // userData.map(async ({ name, email, amount }, index) => {
    //   const transporter = nodemailer.createTransport({
    //     service: "gmail",
    //     secure: false,
    //     auth: {
    //       user: "ibrahimblessing202@gmail.com",
    //       pass: "classicdami123",
    //     },
    //   });
    //   const mailOptions = {
    //     from: "ibrahimblessing202@gmail.com",
    //     to: email,
    //     subject: `School payment link via Payment Portal`,
    //     text: `Hello ${name}. Kindly pay ${amount} using the attached payment link: ${data[index]}`,
    //   };
    //   try {
    //     const res = await transporter.sendMail(mailOptions);
    //     console.log("res: ", res);
    //     console.log("Email sent successfully");
    //   } catch (error) {
    //     console.error("Error sending email:", error);
    //   }
    // });
  }

  if (isError) {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          style={{ borderRadius: "10px", padding: "0.5rem 1rem" }}
        >
          Refresh page
        </button>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <p>Successfully generated payment links</p>
        {data.map((link, id) => (
          <a
            key={id}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "white",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            Link for student: {userData[id]?.name}
          </a>
        ))}
        <button
          onClick={() => handleSendEmail()}
          style={{
            borderRadius: "10px",
            padding: "0.5rem 1rem",
          }}
        >
          Send to students' emails
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p style={{ fontSize: "1.5rem", fontWeight: "300" }}>
          Generating payment links...
        </p>
      </div>
    );
  }

  return (
    <div className="payment">
      <button onClick={handleClick} className="payment__button">
        Generate payment link
      </button>

      <div className="payment__group">
        <h1>Student List</h1>

        {userData?.map(({ id, name, fee }) => (
          <div key={id} className="payment__group__list">
            <p className="payment__group__list__name">{name}</p>
            <p className="payment__group__list__fee">{fee}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payment;
