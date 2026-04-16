const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");

const { createInvoice } = require("../controllers/invoiceController");
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

router.post("/create-order", async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to create order" });
  }
});
router.post("/invoice", createInvoice);

module.exports = router;
