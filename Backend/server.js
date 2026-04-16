require("dotenv").config();
const express = require("express");
const app = express();

const invoiceRoutes = require("./routes/invoiceRoutes");

app.use(express.json());
app.use("/api", invoiceRoutes);

app.listen(3000, () => console.log("Server running 🚀"));