import { useEffect, useState } from "react";
import { collection, getDoc, getDocs, getFirestore } from "firebase/firestore";
import userData from "../../../utils/userData.js";
import firebaseConfig from "../../../config/firebaseConfig";
import { initializeApp } from "firebase/app";

import "../../../styles/payment.css";

const Payment = () => {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const [paymentData, setPaymentData] = useState([]);

  useEffect(() => {
    const call = async () => {
      const querySnapshot = await getDocs(collection(db, "transactions"));
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    };
    let res = call();
    res.then((dt) => {
      console.log("dt: ", dt);
      setPaymentData(dt);
    });
  }, []);

  return (
    <div className="payment">
      <div className="payment__group">
        <h1>Student List</h1>
        {console.log("paymentData: ", paymentData)}

        {paymentData?.map(({ user, amount }, id) => (
          <div key={id} className="payment__group__list">
            <p className="payment__group__list__name">{user}</p>
            <p className="payment__group__list__fee">{amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payment;
