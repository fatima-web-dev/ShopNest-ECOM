import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API_URL from "../api";
import "../styles/adminDashboard.css";

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = user?.token;

        const [usersRes, productsRes, ordersRes] = await Promise.all([
         fetch(`${API_URL}/api/auth/users`,  {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),

         fetch(`${API_URL}/api/products`),

          fetch(`${API_URL}/api/orders`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        const usersData = await usersRes.json();
        const productsData = await productsRes.json();
        const ordersData = await ordersRes.json();

        if (usersRes.ok) setUsers(usersData);
        if (productsRes.ok) setProducts(productsData);
        if (ordersRes.ok) setOrders(ordersData);

      } catch (error) {
        console.error("Dashboard Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) {
      fetchDashboardData();
    }
  }, [user]);

  const totalSales = orders.reduce(
    (total, order) => total + Number(order.totalAmount || 0),
    0
  );

  const recentOrders = orders.slice(0, 5);

  if (loading) {
    return (
      <div className="admin-loading">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="admin-dashboard">

      {/* Header */}

      <div className="admin-dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Welcome back, {user?.name}</p>
        </div>
      </div>


      {/* Statistics */}

      <div className="admin-stats">

        <div className="admin-stat-card"
         onClick={() => navigate("/admin/users")}
         style={{ cursor: "pointer" }}>
          <div className="stat-icon">👥</div>

          <div>
            <span>Total Users</span>
            <h2>{users.length}</h2>
          </div>
        </div>


                        <div
                className="admin-stat-card"
                onClick={() => navigate("/admin/product")}
                style={{ cursor: "pointer" }}
                >
                <div className="stat-icon">📦</div>

                <div>
                    <span>Total Products</span>
                    <h2>{products.length}</h2>
                </div>
                </div>


        <div className="admin-stat-card"
        onClick={() => navigate("/admin/orders")}
        style={{ cursor: "pointer" }}>
          <div className="stat-icon">🛒</div>

          <div>
            <span>Total Orders</span>
            <h2>{orders.length}</h2>
          </div>
        </div>


        <div className="admin-stat-card"
          onClick={() => navigate("/admin/sales")}
        style={{ cursor: "pointer" }}>
          <div className="stat-icon">💰</div>

          <div>
            <span>Total Sales</span>
            <h2>Rs. {totalSales}</h2>
          </div>
        </div>

      </div>


      {/* Recent Orders */}

      <div className="admin-section">

        <div className="section-header">
          <h2>Recent Orders</h2>
        </div>


        {recentOrders.length === 0 ? (

          <div className="admin-empty">
            <p>No orders found.</p>
          </div>

        ) : (

          <div className="admin-orders-table">

            <div className="table-header">
              <span>Order ID</span>
              <span>Customer</span>
              <span>Total</span>
              <span>Status</span>
              <span>Date</span>
            </div>


            {recentOrders.map((order) => (

              <div
                className="table-row"
                key={order._id}
              >

                <span>
                  #{order._id.slice(-8)}
                </span>

                <span>
                  {order.user?.name || "Customer"}
                </span>

                <span>
                  Rs. {order.totalAmount}
                </span>

                <span
                  className={`order-status ${order.status}`}
                >
                  {order.status}
                </span>

                <span>
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </span>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default AdminDashboard;