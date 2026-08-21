import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import API_URL from "../api";
import "../styles/productDetail.css";

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products/${id}`);
        const data = await res.json();

        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="product-detail-loading">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-error">
        Product not found.
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    alert("Product added to cart!");
  };

  return (
    <div className="product-detail-page">

      <div className="product-detail-card">

        {/* Product Image */}
        <div className="product-detail-image">
          <img
            src={product.imageUrl}
            alt={product.name}
          />
        </div>

        {/* Product Information */}
        <div className="product-detail-info">

          <p className="product-detail-category">
            {product.category}
          </p>

          <h1>{product.name}</h1>

          <p className="product-detail-price">
            ${Number(product.price).toFixed(2)}
          </p>

          <p className="product-detail-description">
            {product.description}
          </p>

          <button
            className="add-cart-btn"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>

        </div>

      </div>

    </div>
  );
};

export default ProductDetail;