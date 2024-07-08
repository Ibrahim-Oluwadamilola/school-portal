import { useEffect, useState } from "react";
import { collection, getDoc, getDocs, getFirestore } from "firebase/firestore";
import userData from "../../../utils/userData.js";
import firebaseConfig from "../../../config/firebaseConfig";
import { initializeApp } from "firebase/app";
import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "semantic-ui-react";

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
        <h1>Payment List</h1>
        {console.log("paymentData: ", paymentData)}

        <Table striped>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Student</TableHeaderCell>
              <TableHeaderCell>Amount</TableHeaderCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paymentData?.map(({ user, amount }, id) => (
              <TableRow key={id}>
                <TableCell>{user}</TableCell>
                <TableCell>{amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Payment;
