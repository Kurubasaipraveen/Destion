import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get("https://run.mocky.io/v3/ffdc1e7d-c4aa-4cc3-bfd2-97464d48972e");
        const foundProduct = response.data.find(prod => prod.id === parseInt(id, 10));

        if (!foundProduct) {
          setError("Product not found.");
        } else {
          setProduct(foundProduct);
        }
      } catch (error) {
        setError("Failed to fetch product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading product...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="product-detail">
      <h2>{product.name}</h2>
      <p>Description: {product.description || "No description available."}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
};

export default ProductDetail;
