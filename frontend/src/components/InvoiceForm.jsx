import { useState } from "react";
import axios from "axios";

export default function InvoiceForm() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [invoice, setInvoice] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setInvoice(null);

    if (!name.trim()) {
      setError("Please enter customer name.");
      return;
    }

    const numericAmount = Number(amount);
    if (Number.isNaN(numericAmount) || numericAmount <= 0) {
      setError("Please enter a valid amount greater than 0.");
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post("http://localhost:3000/api/invoice", {
        customerName: name.trim(),
        amount: numericAmount,
      });
      setInvoice(res.data);
      setName("");
      setAmount("");
    } catch (requestError) {
      setError(
        requestError.response?.data?.error ||
          "Unable to create invoice. Check backend and DB.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="card" aria-label="Invoice form">
      <form className="invoice-form" onSubmit={handleSubmit}>
        <label className="field">
          <span>Customer Name</span>
          <input
            value={name}
            placeholder="e.g. Roshita Sharma"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="field">
          <span>Invoice Amount (INR)</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={amount}
            placeholder="e.g. 2500"
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Invoice"}
        </button>
      </form>

      {error && <p className="status error">{error}</p>}

      {invoice && (
        <article className="invoice-preview" aria-live="polite">
          <h2>Invoice Created</h2>
          <div className="preview-row">
            <span>ID</span>
            <strong>{invoice.id}</strong>
          </div>
          <div className="preview-row">
            <span>Customer</span>
            <strong>{invoice.customer_name}</strong>
          </div>
          <div className="preview-row">
            <span>Amount</span>
            <strong>Rs. {Number(invoice.amount).toFixed(2)}</strong>
          </div>
          <div className="preview-row">
            <span>GST (18%)</span>
            <strong>Rs. {Number(invoice.gst).toFixed(2)}</strong>
          </div>
          <div className="preview-row total">
            <span>Total</span>
            <strong>Rs. {Number(invoice.total).toFixed(2)}</strong>
          </div>
        </article>
      )}
    </section>
  );
}
