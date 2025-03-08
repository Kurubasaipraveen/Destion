import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";

const InvoiceDetail = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("https://run.mocky.io/v3/94808046-ffc1-4929-b74b-7645aaebb645")
      .then(response => {
        const foundInvoice = response.data.find(inv => inv.id === parseInt(id));
        setInvoice(foundInvoice);
      })
      .catch(() => setError("Failed to fetch invoice details."))
      .finally(() => setLoading(false));
  }, [id]);

  const generatePDF = () => {
    if (!invoice) return;
    const doc = new jsPDF();
    doc.text(`Invoice ID: ${invoice.id}`, 10, 10);
    doc.text(`Store: ${invoice.store}`, 10, 20);
    doc.text(`Total: $${invoice.total}`, 10, 30);
    doc.save(`invoice_${invoice.id}.pdf`);
  };

  if (loading) return <p>Loading invoice...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="invoice-detail">
      <h2>Invoice {invoice.id}</h2>
      <p>Store: {invoice.store}</p>
      <p>Total: ${invoice.total}</p>
      <button onClick={generatePDF}>Download PDF</button>
    </div>
  );
};

export default InvoiceDetail;
