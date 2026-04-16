const pool = require("../db");

exports.createInvoice = async (req, res) => {
  try {
    const { customerName, amount } = req.body;

    const gst = amount * 0.18;
    const total = amount + gst;

    const result = await pool.query(
      "INSERT INTO invoices (customer_name, amount, gst, total) VALUES ($1, $2, $3, $4) RETURNING *",
      [customerName, amount, gst, total]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
