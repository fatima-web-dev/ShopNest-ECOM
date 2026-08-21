
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import API_URL from "../api";
import "../styles/adminOrders.css";

const AdminOrders = () => {
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/api/orders`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setOrders(data);
      } else {
        alert(data.message || "Failed to fetch orders");
      }
    } catch (error) {
      console.error("Fetch Orders Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchOrders();
    }
  }, [user]);

  const updateStatus = async (orderId, status) => {
    try {
      const res = await fetch(
        `${API_URL}/api/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId
              ? { ...order, status: data.status }
              : order
          )
        );
      } else {
        alert(data.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Update Status Error:", error);
    }
  };

  if (loading) {
    return (
      <div className="admin-orders-loading">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="admin-orders-page">

      <div className="admin-orders-header">
        <h1>Orders</h1>
        <p>Manage all customer orders</p>
      </div>

      {orders.length === 0 ? (
        <div className="no-orders">
          <h2>No Orders Found</h2>
          <p>There are currently no customer orders.</p>
        </div>
      ) : (
        <div className="orders-list">

          {orders.map((order) => (
            <div
              className="admin-order-card"
              key={order._id}
            >

              <div className="order-top">

                <div>
                  <h3>
                    Order #{order._id.slice(-6).toUpperCase()}
                  </h3>

                  <p>
                    Customer:{" "}
                    <strong>
                      {order.user?.name || "Unknown"}
                    </strong>
                  </p>

                  <p>
                    Email: {order.user?.email || "N/A"}
                  </p>
                </div>

                <div className="order-status">

                  <label>Status</label>

                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(
                        order._id,
                        e.target.value
                      )
                    }
                  >
                    <option value="pending">
                      Pending
                    </option>

                    <option value="processing">
                      Processing
                    </option>

                    <option value="shipped">
                      Shipped
                    </option>

                    <option value="delivered">
                      Delivered
                    </option>

                    <option value="cancelled">
                      Cancelled
                    </option>
                  </select>

                </div>

              </div>

              <div className="order-products">

                <h4>Products</h4>

                {order.products?.map((item, index) => (
                  <div
                    className="order-product"
                    key={index}
                  >

                    <span>
                      {item.product?.name || "Product"}
                    </span>

                    <span>
                      Qty: {item.quantity}
                    </span>

                    <span>
                      Rs. {item.price}
                    </span>

                  </div>
                ))}

              </div>

              <div className="order-bottom">

                <div>
                  <strong>Total:</strong>{" "}
                  Rs.{" "}
                  {Number(order.totalAmount).toFixed(2)}
                </div>

                <div>
                  <strong>City:</strong>{" "}
                  {order.address?.city || "N/A"}
                </div>

                <div>
                  <strong>Date:</strong>{" "}
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default AdminOrders;

