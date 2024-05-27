import got from "got";
import generateRandomString from "../helper/generateRandomString.js";
import Flutterwave from "flutterwave-node-v3";

export const handlePayment = async (req, res) => {
  const url = "https://api.flutterwave.com/v3/payments";
  const data = req.body;

  if (!data?.length || !Array.isArray(data)) {
    res
      .status(400)
      .send({ error: true, message: "No data or improper data format." });
    return;
  }

  const responseList = await Promise.all(
    data?.map(async ({ amount, email, phoneNumber, name }) => {
      const bodyData = {
        tx_ref: generateRandomString(10),
        amount,
        currency: "NGN",
        redirect_url: "http://localhost:5173/success",
        meta: {
          consumer_id: 23,
          consumer_mac: "92a3-912ba-1192a",
        },
        customer: {
          email,
          phonenumber: phoneNumber,
          name,
        },
        customizations: {
          title: "Dami classic",
          logo: "http://www.piedpiper.com/app/themes/joystick-v27/images/logo.png",
        },
      };

      try {
        const response = await got
          .post("https://api.flutterwave.com/v3/payments", {
            headers: {
              Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
            },
            json: bodyData,
          })
          .json();

        return response;
      } catch (err) {
        return { message: err?.message, code: err?.code };
      }
    })
  );

  if (responseList.includes(null || undefined)) {
    res.status(400).send({
      error: true,
      message: "An error occurred while generating links",
    });
    return;
  }

  res.status(200).send({ success: true, data: responseList });
};

export const verifyPayment = async (req, res) => {
  const transactionId = req.body.id;

  const flw = new Flutterwave(
    process.env.FLW_PUBLIC_KEY,
    process.env.FLW_SECRET_KEY
  );

  const response = flw.Transaction.verify({ id: transactionId });

  if (
    response.data.status === "successful" &&
    response.data.amount === expectedAmount &&
    response.data.currency === expectedCurrency
  ) {
    // Success! Confirm the customer's payment
    res
      .status(200)
      .send({ success: true, message: "Payment verification succeeded." });
  } else {
    // Inform the customer their payment was unsuccessful
    res
      .status(400)
      .send({ error: true, message: "Payment verification failed." });
  }
};
