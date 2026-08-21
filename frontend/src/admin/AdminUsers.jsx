
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import API_URL from "../api";
import "../styles/adminUsers.css";

const AdminUsers = () => {
  const { user } = useAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH USERS
  // =========================

  useEffect(() => {
    const loadUsers = async () => {
      if (!user?.token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/api/auth/users`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setUsers(data);
        } else {
          console.error(
            "Fetch Users Error:",
            data
          );
        }
      } catch (error) {
        console.error(
          "Users Error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [user]);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="admin-users-loading">
        Loading Users...
      </div>
    );
  }

  // =========================
  // PAGE
  // =========================

  return (
    <div className="admin-users">

      {/* HEADER */}

      <div className="admin-users-header">

        <div>
          <h1>Total Users</h1>

          <p>
            Manage registered users
          </p>
        </div>

        <div className="total-users-badge">
          {users.length} Users
        </div>

      </div>


      {/* USERS TABLE */}

      <div className="users-section">

        {users.length === 0 ? (

          <div className="no-users">
            <p>No users found.</p>
          </div>

        ) : (

          <div className="users-table">

            {/* TABLE HEADER */}

            <div className="users-table-header">

              <span>Name</span>
              <span>Email</span>
              <span>Role</span>
              <span>Joined</span>

            </div>


            {/* USERS */}

            {users.map((userItem) => (

              <div
                className="users-table-row"
                key={userItem._id}
              >

                <span className="user-name">
                  {userItem.name}
                </span>


                <span className="user-email">
                  {userItem.email}
                </span>


                <span>

                  <span
                    className={`user-role ${
                      userItem.role === "admin"
                        ? "admin-role"
                        : "user-role-normal"
                    }`}
                  >
                    {userItem.role}
                  </span>

                </span>


                <span className="user-date">

                  {userItem.createdAt
                    ? new Date(
                        userItem.createdAt
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

export default AdminUsers;

