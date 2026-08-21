import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import API_URL from "../api";

import "../styles/shop.css";

const Shop = () => {
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const categories = ["All", "Electronics", "Fashion", "Shoes"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
const res = await fetch(
  `${API_URL}/api/products`
);

        const data = await res.json();

        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) =>
            product.category === selectedCategory
        );

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));

    alert(`${product.name} added to cart 🛒`);
  };

  if (loading) {
    return <h2>Loading products...</h2>;
  }

  return (
    <div className="shop-page">

      <div className="shop-header">
        <h1>ShopNest Store</h1>
        <p>Find the products you love</p>
      </div>

      <div className="category-buttons">

        {categories.map((category) => (
          <button
            key={category}
            onClick={() =>
              setSelectedCategory(category)
            }
            className={
              selectedCategory === category
                ? "category-btn active"
                : "category-btn"
            }
          >
            {category}
          </button>
        ))}

      </div>

      <div className="products-grid">

        {filteredProducts.map((product) => (

          <div
            className="product-card"
            key={product._id}
          >

            <img
              src={product.imageUrl}
              alt={product.name}
              className="product-image"
            />

            <div className="product-info">

              <span className="product-category">
                {product.category}
              </span>

              <h2>{product.name}</h2>

              <p className="product-price">
                Rs. {Number(product.price).toFixed(2)}
              </p>

              <div className="product-actions">

                <Link
                  to={`/products/${product._id}`}
                  className="view-btn"
                >
                  View Details
                </Link>

                <button
                  className="cart-btn"
                  onClick={() =>
                    handleAddToCart(product)
                  }
                >
                  Add to Cart
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Shop;