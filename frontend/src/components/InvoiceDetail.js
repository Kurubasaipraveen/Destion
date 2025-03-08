import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import InvoiceItem from "./InvoiceItem";
import PdfGenerator from "./PdfGenerator";

const Container = styled.div`
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 20px auto;
`;

const Title = styled.h2`
  color: #333;
  text-align: center;
`;

const Text = styled.p`
  font-size: 16px;
  color: #555;
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
`;

const InvoiceDetail = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/invoices.json") 
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch invoices.");
        }
        return response.json();
      })
      .then((data) => {
        const selectedInvoice = data.find((inv) => inv.id.toString() === id);
        if (!selectedInvoice) {
          setError("Invoice not found.");
        }
        setInvoice(selectedInvoice);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <Text>Loading invoice details...</Text>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <Container>
      <Title>Invoice Detail</Title>
      <Text><strong>Customer:</strong> {invoice.customer}</Text>
      <Text><strong>Total:</strong> ${invoice.total}</Text>
      <PdfGenerator invoice={invoice} />
      <h3>Items</h3>
      {invoice.items?.length > 0 ? (
        <ul>
          {invoice.items.map((item, index) => (
            <InvoiceItem key={index} item={item} />
          ))}
        </ul>
      ) : (
        <Text>No items found.</Text>
      )}
    </Container>
  );
};

export default InvoiceDetail;
