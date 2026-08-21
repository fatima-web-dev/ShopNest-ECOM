import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/products"
        );

        const data = await res.json();

        console.log("Products from DB:", data);

        setProducts(data.slice(0, 4));

      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <h2>Loading products...</h2>;
  }

  return (
    <div className="home">

      {/* Hero */}
      <section className="hero">
        <h1>Welcome to ShopNest</h1>

        <p>
          Discover the best products at unbeatable prices.
        </p>
      </section>


      {/* Featured Products */}
      <section className="featured-products">

        <h2>Featured Products</h2>

        <div className="products-grid">

          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}

        </div>

      </section>

    </div>
  );
};

export default Home;