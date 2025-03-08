import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DateFilter from "./DateFilter";
import styled from "styled-components";

// Styled components
const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: auto;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
`;

const InvoiceListContainer = styled.ul`
  list-style: none;
  padding: 0;
`;

const InvoiceItem = styled.li`
  background: #f9f9f9;
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  
  a {
    text-decoration: none;
    color: #007bff;
    font-weight: bold;
  }

  &:hover {
    background: #eef;
  }
`;

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);

  // Fetch invoice data from JSON file
  useEffect(() => {
    fetch("/invoices.json") // Ensure `invoices.json` is placed in the `public` folder
      .then((response) => response.json())
      .then((data) => {
        setInvoices(data);
        setFilteredInvoices(data);
      })
      .catch((error) => console.error("Error fetching invoices:", error));
  }, []);

  // Filter invoices based on date range
  const handleFilter = (startDate, endDate) => {
    const filtered = invoices.filter(
      (invoice) => invoice.date >= startDate && invoice.date <= endDate
    );
    setFilteredInvoices(filtered);
  };

  return (
    <Container>
      <Title>Invoice List</Title>
      <DateFilter onFilter={handleFilter} />
      <InvoiceListContainer>
        {filteredInvoices.map((invoice) => (
          <InvoiceItem key={invoice.id}>
            <Link to={`/invoices/${invoice.id}`}>
              Invoice #{invoice.id} - {invoice.customer} - ${invoice.total}
            </Link>
          </InvoiceItem>
        ))}
      </InvoiceListContainer>
    </Container>
  );
};

export default InvoiceList;
