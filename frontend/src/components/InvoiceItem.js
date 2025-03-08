import React from "react";
import styled from "styled-components";

const ItemContainer = styled.li`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  color: #333;
`;

const ItemName = styled.span`
  font-weight: bold;
`;

const ItemDetails = styled.span`
  color: #666;
`;

const InvoiceItem = ({ item }) => {
  return (
    <ItemContainer>
      <ItemName>{item.name}</ItemName>
      <ItemDetails>
        Quantity: {item.quantity} | Price: ${item.price}
      </ItemDetails>
    </ItemContainer>
  );
};

export default InvoiceItem;
