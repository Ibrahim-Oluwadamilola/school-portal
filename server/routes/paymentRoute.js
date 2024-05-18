import express from "express";
import {
  handlePayment,
  verifyPayment,
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/", handlePayment);
router.post("/verify", verifyPayment);

export default router;
