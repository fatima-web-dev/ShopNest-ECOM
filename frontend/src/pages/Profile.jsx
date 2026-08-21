import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import API_URL from "../api";
import "../styles/profile.css";

const Profile = () => {
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const token = user?.token;

        if (!token) {
          setLoadingOrders(false);
          return;
        }

       const res = await fetch(
  `${API_URL}/api/orders/my-orders`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (res.ok) {
          setOrders(data);
        } else {
          console.error("Orders Error:", data.message);
        }
      } catch (error) {
        console.error("Fetch Orders Error:", error);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchMyOrders();
  }, [user]);

  return (
    <div className="profile-page">

      <div className="profile-container">

        {/* Profile Header */}
        <div className="profile-header">

          <div className="profile-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1>My Profile</h1>
            <p>Welcome back, {user?.name}</p>
          </div>

        </div>


        {/* Personal Information */}
        <div className="profile-section">

          <h2>Personal Information</h2>

          <div className="profile-info">

            <div className="info-item">
              <span>Name</span>
              <strong>{user?.name}</strong>
            </div>

            <div className="info-item">
              <span>Email</span>
              <strong>{user?.email}</strong>
            </div>

            <div className="info-item">
              <span>Account Type</span>
              <strong>
                {user?.role === "admin" ? "Admin" : "Customer"}
              </strong>
            </div>

          </div>

        </div>


        {/* My Orders */}
        <div className="profile-section">

          <h2>My Orders</h2>

          {loadingOrders ? (

            <div className="orders-empty">
              <h3>Loading orders...</h3>
            </div>

          ) : orders.length === 0 ? (

            <div className="orders-empty">

              <div className="orders-icon">
                🛍️
              </div>

              <h3>No orders yet</h3>

              <p>
                You haven't placed any orders yet.
              </p>

            </div>

          ) : (

            <div className="orders-list">

              {orders.map((order) => (

                <div
                  className="order-card"
                  key={order._id}
                >

                  {/* Order Header */}
                  <div className="order-header">

                    <div>
                      <span>Order ID</span>
                      <strong>
                        #{order._id.slice(-8)}
                      </strong>
                    </div>

                    <div>
                      <span>Status</span>

                      <strong
                        className={`order-status ${order.status}`}
                      >
                        {order.status}
                      </strong>
                    </div>

                  </div>


                  {/* Products */}
                  <div className="order-products">

                    {order.products?.map((item, index) => (

                      <div
                        className="order-product"
                        key={index}
                      >

                        <div className="order-product-image">

                          {item.product?.imageUrl ? (

                            <img
                              src={item.product.imageUrl}
                              alt={item.product.name}
                            />

                          ) : (

                            <span>🛍️</span>

                          )}

                        </div>


                        <div className="order-product-info">

                          <h3>
                            {item.product?.name || "Product"}
                          </h3>

                          <p>
                            Quantity: {item.quantity}
                          </p>

                          <p>
                            Price: Rs. {item.price}
                          </p>

                        </div>

                      </div>

                    ))}

                  </div>


                  {/* Order Footer */}
                  <div className="order-footer">

                    <div>
                      <span>Order Date</span>

                      <strong>
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString()}
                      </strong>
                    </div>

                    <div>
                      <span>Total</span>

                      <strong className="order-total">
                        Rs. {order.totalAmount}
                      </strong>
                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default Profile;