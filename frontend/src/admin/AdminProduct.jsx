
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import API_URL from "../api";
import "../styles/adminProducts.css";

const AdminProducts = () => {
  const { user } = useAuth();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // =========================
  // FORM STATES
  // =========================

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  // =========================
  // EDIT STATE
  // =========================

  const [editingProduct, setEditingProduct] = useState(null);

  // =========================
  // SHOW / HIDE FORM
  // =========================

  const [showForm, setShowForm] = useState(false);

  // =========================
  // FETCH PRODUCTS
  // =========================

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/products`
      );

      const data = await response.json();

      if (response.ok) {
        setProducts(data);
      } else {
        console.error("Fetch Products Error:", data);
      }
    } catch (error) {
      console.error("Fetch Products Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // =========================
  // RESET FORM
  // =========================

  const resetForm = () => {
    setName("");
    setPrice("");
    setStock("");
    setCategory("");
    setDescription("");
    setImage(null);
    setEditingProduct(null);
    setShowForm(false);
  };

  // =========================
  // ADD / UPDATE PRODUCT
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.token) {
      alert("Please login again.");
      return;
    }

    try {
      setSubmitting(true);

      const formData = new FormData();

      formData.append("name", name);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("category", category);
      formData.append("description", description);

      if (image) {
        formData.append("image", image);
      }

      // =========================
      // EDIT PRODUCT
      // =========================

      if (editingProduct) {
        const response = await fetch(
          `${API_URL}/api/products/${editingProduct._id}`,
          {
            method: "PUT",

            headers: {
              Authorization: `Bearer ${user.token}`,
            },

            body: formData,
          }
        );

        const data = await response.json();

        if (response.ok) {
          alert("Product updated successfully!");

          await fetchProducts();

          resetForm();
        } else {
          alert(
            data.message || "Failed to update product"
          );
        }
      }

      // =========================
      // ADD PRODUCT
      // =========================

      else {
        const response = await fetch(
          `${API_URL}/api/products`,
          {
            method: "POST",

            headers: {
              Authorization: `Bearer ${user.token}`,
            },

            body: formData,
          }
        );

        const data = await response.json();

        if (response.ok) {
          alert("Product added successfully!");

          await fetchProducts();

          resetForm();
        } else {
          alert(
            data.message || "Failed to add product"
          );
        }
      }
    } catch (error) {
      console.error(
        "Product Submit Error:",
        error
      );

      alert(
        "Something went wrong. Check the browser console."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // =========================
  // EDIT PRODUCT
  // =========================

  const handleEdit = (product) => {
    setEditingProduct(product);

    setName(product.name || "");
    setPrice(product.price || "");
    setStock(product.stock || "");
    setCategory(product.category || "");
    setDescription(product.description || "");

    setImage(null);

    setShowForm(true);
  };

  // =========================
  // DELETE PRODUCT
  // =========================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    if (!user?.token) {
      alert("Please login again.");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/products/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Product deleted successfully!");

        setProducts(
          products.filter(
            (product) => product._id !== id
          )
        );
      } else {
        alert(
          data.message || "Failed to delete product"
        );
      }
    } catch (error) {
      console.error(
        "Delete Product Error:",
        error
      );

      alert(
        "Something went wrong while deleting."
      );
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="admin-products-loading">
        Loading Products...
      </div>
    );
  }

  // =========================
  // PAGE
  // =========================

  return (
    <div className="admin-products">

      {/* HEADER */}

      <div className="admin-products-header">

        <div>
          <h1>Products</h1>

          <p>
            Manage your store products
          </p>
        </div>

        <button
          className="add-product-btn"
          onClick={() => {
            if (showForm) {
              resetForm();
            } else {
              setShowForm(true);
            }
          }}
        >
          {showForm
            ? "Close"
            : "+ Add Product"}
        </button>

      </div>


      {/* ADD / EDIT FORM */}

      {showForm && (
        <div className="product-form-container">

          <h2>
            {editingProduct
              ? "Edit Product"
              : "Add New Product"}
          </h2>

          <form onSubmit={handleSubmit}>

            {/* NAME */}

            <div className="form-group">

              <label>
                Product Name
              </label>

              <input
                type="text"
                value={name}
                placeholder="Enter product name"
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
              />

            </div>


            {/* PRICE */}

            <div className="form-group">

              <label>
                Price
              </label>

              <input
                type="number"
                value={price}
                placeholder="Enter price"
                onChange={(e) =>
                  setPrice(e.target.value)
                }
                required
              />

            </div>


            {/* STOCK */}

            <div className="form-group">

              <label>
                Stock
              </label>

              <input
                type="number"
                value={stock}
                placeholder="Enter stock quantity"
                onChange={(e) =>
                  setStock(e.target.value)
                }
                required
              />

            </div>


            {/* CATEGORY */}

            <div className="form-group">

              <label>
                Category
              </label>

              <input
                type="text"
                value={category}
                placeholder="Enter category"
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                required
              />

            </div>


            {/* DESCRIPTION */}

            <div className="form-group">

              <label>
                Description
              </label>

              <textarea
                value={description}
                placeholder="Enter product description"
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                required
              />

            </div>


            {/* IMAGE */}

            <div className="form-group">

              <label>
                Product Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImage(e.target.files[0])
                }
              />

            </div>


            {/* BUTTONS */}

            <div className="form-buttons">

              <button
                type="submit"
                className="save-product-btn"
                disabled={submitting}
              >
                {submitting
                  ? "Saving..."
                  : editingProduct
                  ? "Update Product"
                  : "Add Product"}
              </button>


              <button
                type="button"
                className="cancel-product-btn"
                onClick={resetForm}
                disabled={submitting}
              >
                Cancel
              </button>

            </div>

          </form>

        </div>
      )}


      {/* PRODUCTS SECTION */}

      <div className="products-section">

        <div className="products-section-header">

          <h2>
            All Products
          </h2>

          <span>
            {products.length} Products
          </span>

        </div>


        {/* NO PRODUCTS */}

        {products.length === 0 ? (

          <div className="no-products">

            <p>
              No products found.
            </p>

          </div>

        ) : (

          <div className="admin-products-grid">

            {products.map((product) => (

              <div
                className="admin-product-card"
                key={product._id}
              >

                {/* IMAGE */}

                <div className="product-image">

                  {product.imageUrl ? (

                    <img
                      src={product.imageUrl}
                      alt={product.name}
                    />

                  ) : (

                    <div className="no-image">
                      No Image
                    </div>

                  )}

                </div>


                {/* PRODUCT INFO */}

                <div className="product-info">

                  <div className="product-title-row">

                    <h3>
                      {product.name}
                    </h3>

                    <span className="product-category">
                      {product.category}
                    </span>

                  </div>


                  <p className="product-description">
                    {product.description}
                  </p>


                  {/* PRICE + STOCK */}

                  <div className="product-details">

                    <div>

                      <span>
                        Price
                      </span>

                      <strong>
                        Rs. {product.price}
                      </strong>

                    </div>


                    <div>

                      <span>
                        Stock
                      </span>

                      <strong
                        className={
                          Number(product.stock) <= 5
                            ? "low-stock"
                            : ""
                        }
                      >
                        {product.stock}
                      </strong>

                    </div>

                  </div>


                  {/* ACTION BUTTONS */}

                  <div className="product-actions">

                    <button
                      className="edit-product-btn"
                      onClick={() =>
                        handleEdit(product)
                      }
                    >
                      ✏️ Edit
                    </button>


                    <button
                      className="delete-product-btn"
                      onClick={() =>
                        handleDelete(
                          product._id
                        )
                      }
                    >
                      🗑️ Delete
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default AdminProducts;

