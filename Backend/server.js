require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const invoiceRoutes = require("./routes/invoiceRoutes");

const allowedOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"];
app.use(
  cors({
    origin: allowedOrigins,
  }),
);
app.use(express.json());
app.use("/api", invoiceRoutes);

app.listen(3000, () => console.log("Server running 🚀"));
