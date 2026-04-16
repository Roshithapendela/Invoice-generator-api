const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Invoice API is running 🚀");
});

//GST cal
app.post("/create-invoice", (req, res) => {
  const { customerName, amount, stateType } = req.body;
  if (!customerName || !amount || !stateType) {
  return res.status(400).json({ error: "All fields required" });
}
  const gstRate = 0.18;
  const gstAmount = amount * gstRate;

  let taxDetails;

  if (stateType === "same") {
    taxDetails = {
      CGST: gstAmount / 2,
      SGST: gstAmount / 2
    };
  } else {
    taxDetails = {
      IGST: gstAmount
    };
  }

  const total = amount + gstAmount;

  const invoice = {
    customerName,
    amount,
    ...taxDetails,
    total,
    date: new Date()
  };

  res.json(invoice);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});