import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [storeFilter, setStoreFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const stores = ["All", 1, 2, 3];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/products.json"); // Ensure `products.json` is in `public/`
        if (!response.ok) {
          throw new Error("Failed to load products.");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

// Filter products based on search input and selected store
const filteredProducts = products.filter(
  (product) =>
    product.name.toLowerCase().includes(search.toLowerCase()) &&
    (storeFilter === "All" || product.store === Number(storeFilter)) // Convert storeFilter to Number for comparison
);


  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Product List</h2>

      <div style={filterContainer}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={inputStyle}
        />
        <select onChange={(e) => setStoreFilter(e.target.value)} style={selectStyle}>
          {stores.map((store, index) => (
            <option key={index} value={store}>
              {store}
            </option>
          ))}
        </select>
      </div>

      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && filteredProducts.length === 0 && <p>No products found.</p>}

      <ul style={listStyle}>
        {filteredProducts.map((product) => (
          <li key={product.id} style={listItemStyle}>
            <Link to={`/products/${product.id}`} style={linkStyle}>
              {product.name} - ${product.price}
            </Link>
          </li>
        ))}
      </ul>

      <Link to="/products/new">
        <button style={buttonStyle}>Add Product</button>
      </Link>
    </div>
  );
};

// 🎨 Basic Styling
const containerStyle = {
  padding: "20px",
  maxWidth: "600px",
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

const filterContainer = {
  display: "flex",
  gap: "10px",
  marginBottom: "10px",
};

const inputStyle = {
  flex: 1,
  padding: "8px",
  fontSize: "16px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const selectStyle = {
  padding: "8px",
  fontSize: "16px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const listStyle = {
  listStyle: "none",
  padding: 0,
};

const listItemStyle = {
  padding: "8px",
  backgroundColor: "#fff",
  borderRadius: "5px",
  margin: "5px 0",
  boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.1)",
};

const linkStyle = {
  textDecoration: "none",
  color: "#007bff",
  fontWeight: "bold",
};

const buttonStyle = {
  display: "block",
  width: "100%",
  padding: "10px",
  fontSize: "16px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginTop: "10px",
};

export default ProductList;
