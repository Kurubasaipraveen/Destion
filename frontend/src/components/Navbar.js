import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// Styled components
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #007bff;
  padding: 15px 20px;
  color: white;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  transition: color 0.3s;

  &:hover {
    color: #f8f9fa;
  }
`;

const LogoutButton = styled.button`
  background: #ff4d4d;
  border: none;
  color: white;
  padding: 8px 12px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s;

  &:hover {
    background: #cc0000;
  }
`;

const Navbar = ({ setUser }) => {
  const handleLogout = () => {
    navigate('/')

  };
  const navigate=useNavigate()

  return (
    <Nav>
      <NavLinks>
        <StyledLink to="/">Dashboard</StyledLink>
        <StyledLink to="/invoices">Invoices</StyledLink>
        <StyledLink to="/products">Products</StyledLink>
      </NavLinks>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </Nav>
  );
};

export default Navbar;
