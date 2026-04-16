import InvoiceForm from "./components/InvoiceForm";

function App() {
  return (
    <div className="page">
      <div className="aurora" aria-hidden="true" />
      <main className="shell">
        <header className="hero">
          <p className="eyebrow">Clear Tax Billing</p>
          <h1>Create GST Invoices In Seconds</h1>
          <p className="subtitle">
            Generate a clean invoice preview with GST breakdown and instant API
            response.
          </p>
        </header>
        <InvoiceForm />
      </main>
    </div>
  );
}

export default App;
