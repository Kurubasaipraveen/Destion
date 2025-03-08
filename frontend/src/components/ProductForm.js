import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductForm = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  // State for form fields
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // Fetch product details if editing
  useEffect(() => {
    if (isEditing) {
      const fetchProduct = async () => {
        try {
          const response = await fetch("/products.json"); // Ensure `products.json` is in `public/`
          const data = await response.json();
          const product = data.find((prod) => prod.id.toString() === id);
          if (product) {
            setName(product.name);
            setPrice(product.price);
          }
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      };
      fetchProduct();
    }
  }, [id, isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !price.trim() || isNaN(price) || Number(price) <= 0) {
      alert("Please enter a valid name and price.");
      return;
    }

    console.log({ id, name, price });
    navigate("/products");
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>{isEditing ? "Edit Product" : "New Product"}</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>
          {isEditing ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

// Basic Styling
const containerStyle = {
  padding: "20px",
  maxWidth: "400px",
  margin: "20px auto",
  border: "1px solid #ddd",
  borderRadius: "8px",
  boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#f9f9f9",
};

const titleStyle = {
  textAlign: "center",
  color: "#007bff",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const inputStyle = {
  padding: "10px",
  fontSize: "16px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  padding: "10px",
  fontSize: "16px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default ProductForm;
