
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import API_URL from "../api";
import "../styles/adminSales.css";

const AdminSales = () => {
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH ORDERS
  // =========================

  useEffect(() => {
    const loadOrders = async () => {
      if (!user?.token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/api/orders`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        const data = await response.json();

        console.log("Sales Orders:", data);

        if (response.ok) {
          setOrders(data);
        } else {
          console.error(
            "Fetch Orders Error:",
            data
          );
        }
      } catch (error) {
        console.error(
          "Sales Error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [user]);

  // =========================
  // TOTAL SALES
  // =========================

  const totalSales = orders.reduce(
    (total, order) =>
      total + Number(order.totalAmount || 0),
    0
  );

  // =========================
  // AVERAGE ORDER
  // =========================

  const averageOrder =
    orders.length > 0
      ? totalSales / orders.length
      : 0;

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="admin-sales-loading">
        Loading Sales...
      </div>
    );
  }

  // =========================
  // PAGE
  // =========================

  return (
    <div className="admin-sales">

      {/* HEADER */}

      <div className="admin-sales-header">

        <div>
          <h1>Total Sales</h1>

          <p>
            Track your store sales and orders
          </p>
        </div>

      </div>


      {/* SALES STATS */}

      <div className="sales-stats">

        {/* TOTAL SALES */}

        <div className="sales-stat-card">

          <div className="sales-stat-icon">
            💰
          </div>

          <div>
            <span>Total Sales</span>

            <h2>
              Rs. {totalSales.toLocaleString()}
            </h2>
          </div>

        </div>


        {/* TOTAL ORDERS */}

        <div className="sales-stat-card">

          <div className="sales-stat-icon">
            🛒
          </div>

          <div>
            <span>Total Orders</span>

            <h2>
              {orders.length}
            </h2>
          </div>

        </div>


        {/* AVERAGE ORDER */}

        <div className="sales-stat-card">

          <div className="sales-stat-icon">
            📊
          </div>

          <div>
            <span>Average Order</span>

            <h2>
              Rs. {averageOrder.toFixed(0)}
            </h2>
          </div>

        </div>

      </div>


      {/* ORDERS */}

      <div className="sales-section">

        <div className="sales-section-header">

          <h2>
            Sales History
          </h2>

          <span>
            {orders.length} Orders
          </span>

        </div>


        {/* NO ORDERS */}

        {orders.length === 0 ? (

          <div className="no-sales">
            <p>No sales found.</p>
          </div>

        ) : (

          <div className="sales-table">

            {/* TABLE HEADER */}

            <div className="sales-table-header">

              <span>Order ID</span>
              <span>Customer</span>
              <span>Amount</span>
              <span>Status</span>
              <span>Date</span>

            </div>


            {/* ORDERS */}

            {orders.map((order) => (

              <div
                className="sales-table-row"
                key={order._id}
              >

                <span>
                  #{order._id.slice(-8)}
                </span>


                <span>
                  {order.user?.name || "Customer"}
                </span>


                <span className="sale-amount">
                  Rs.{" "}
                  {Number(
                    order.totalAmount || 0
                  ).toLocaleString()}
                </span>


                <span
                  className={`sale-status ${
                    order.status || ""
                  }`}
                >
                  {order.status || "Pending"}
                </span>


                <span className="sale-date">
                  {order.createdAt
                    ? new Date(
                        order.createdAt
                      ).toLocaleDateString()
                    : "N/A"}
                </span>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default AdminSales;


