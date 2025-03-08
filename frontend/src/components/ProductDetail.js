import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Simulated API call (Replace this with actual API request)
    const fetchProduct = async () => {
      try {
        const response = await fetch("/products.json"); // Ensure this file is in `public/`
        const data = await response.json();
        const selectedProduct = data.find((prod) => prod.id.toString() === id);
        setProduct(selectedProduct);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Product Detail</h2>
      <p><strong>Name:</strong> {product.name}</p>
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Store:</strong> {product.store}</p>
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
  color: "#007bff",
};

export default ProductDetail;
