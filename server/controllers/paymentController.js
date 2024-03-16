import got from "got";
import generateRandomString from "../helper/generateRandomString.js";

export const handlePayment = async (req, res) => {
  const url = "https://api.flutterwave.com/v3/payments";

  const bodyData = {
    tx_ref: generateRandomString(10),
    amount: "100",
    currency: "NGN",
    redirect_url: "https://webhook.site/cd4e398d-5787-44dc-a4ca-408489a1d166",
    meta: {
      consumer_id: 23,
      consumer_mac: "92a3-912ba-1192a",
    },
    customer: {
      email: "user@gmail.com",
      phonenumber: "08012344528",
      name: "John Doe",
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
    return res.status(200).send(response);
  } catch (err) {
    return res.status(500).send({ message: err?.message, code: err?.code });
  }
};
