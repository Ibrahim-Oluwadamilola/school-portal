import paymentRoute from "./routes/paymentRoute.js";
import express from "express";
const app = express();
import cors from "cors";
const port = 3005;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

app.use("/api/payment", paymentRoute);
