import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f4f4f4;
`;

const Card = styled.div`
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 300px;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  width: 100%;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #0056b3;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const Login = () => {
  const [storeName, setStoreName] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (storeName) navigate("/invoices");
  };

  return (
    <Container>
      <Card>
        <Title>Store Login</Title>
        <Input
          type="text"
          placeholder="Enter Store Name"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
        />
        <Button onClick={handleLogin} disabled={!storeName}>
          Login
        </Button>
      </Card>
    </Container>
  );
};

export default Login;
