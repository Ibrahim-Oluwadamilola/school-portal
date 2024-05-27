import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
  Table,
  Button,
} from "semantic-ui-react";

import "../../../styles/details.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../../../config/firebaseConfig";

const fees = [
  { fee: "School Fees", cost: "20,000" },
  { fee: "PTA Levy", cost: "5,000" },
  { fee: "Books", cost: "15,000" },
];

const Details = () => {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const nav = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState({});

  const BASE_URL = "http://localhost:3005";

  const form = [
    {
      name: "Dami Ibrahim",
      amount: 40000,
      email: "ibrahimblessing202@gmail.com",
      phoneNumber: "08012345678",
    },
  ];

  const generateLink = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/payment`, {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const response = await res.json();
      console.log("response: ", response);
      if (response?.error) {
        setIsError(true);
        setError(response?.message);
      }
      if (response?.success) {
        setIsSuccess(true);
        setData(response?.data[0]);
        // save transaction details in database
        const docRef = await addDoc(collection(db, "transactions"), {
          amount: form[0]?.amount,
          user: form[0]?.name,
        });
        console.log("Document written with ID: ", docRef.id);
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  let button = (
    <Button
      primary
      onClick={generateLink}
      disabled={isLoading}
      loading={isLoading}
      className="details__button"
    >
      Generate Payment Link
    </Button>
  );

  if (isSuccess) {
    toast.success("Payment link generated.");
    if (data) {
      console.log("data: ", data);
      const {
        data: { link },
      } = data;
      button = (
        <Button
          primary
          onClick={() => (window.location.href = link)}
          className="details__button"
        >
          Make Payment Now
        </Button>
      );
    }
  }

  if (isError) {
    toast.error("An error occurred.");
    <Button onClick={generateLink}>Retry</Button>;
  }

  return (
    <div className="details">
      <h1 className="details__heading">
        Details for student: <span>{form[0]?.name}</span>
      </h1>

      <Table celled>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Fee</TableHeaderCell>
            <TableHeaderCell>Cost</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {fees.map(({ fee, cost }, id) => (
            <TableRow key={id}>
              <TableCell>{fee}</TableCell>
              <TableCell>{cost}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {button}
    </div>
  );
};

export default Details;
