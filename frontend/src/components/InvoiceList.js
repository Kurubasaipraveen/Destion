import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get("https://run.mocky.io/v3/94808046-ffc1-4929-b74b-7645aaebb645");
        setInvoices(response.data);
      } catch (error) {
        setError("Failed to fetch invoices.");
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  if (loading) return <p>Loading invoices...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="invoice-list">
      <h2>Invoices</h2>
      {invoices.map(invoice => (
        <div key={invoice.id} className="invoice-item">
          <p>{invoice.store} - ${invoice.total}</p>
          <Link to={`/invoices/${invoice.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default InvoiceList;
