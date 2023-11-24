import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [regularUserCount, setRegularUserCount] = useState(0);

  // Get all users
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-users");
      setUsers(data);
      setTotalUsers(data.length);

      // Count users with role 1 (admin) and role 0 (regular user)
      const adminUsers = data.filter((user) => user.role === 1);
      const regularUsers = data.filter((user) => user.role === 0);

      setAdminCount(adminUsers.length);
      setRegularUserCount(regularUsers.length);

      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
      setLoading(false);
    }
  };

  // Lifecycle method
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Layout>
      <div className="row mt-3">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h4 className="text-left" style={{ marginLeft: "10px" }}>
            All Users
          </h4>
          <p className="m-3">Total Registered Users: {totalUsers}</p>
          <p className="m-3">Admin Users: {adminCount}</p>
          <p className="m-3">Regular Users: {regularUserCount}</p>
          <div className="d-flex flex-wrap">
            {users?.map((user) => (
              <div
                key={user._id}
                className="card m-2"
                style={{ width: "18rem" }}
              >
                <div className="card-body">
                  <h5 className="card-title">Username: {user.name}</h5>
                  <p className="card-text">Email: {user.email}</p>
                  <p className="card-text">Role: {user.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
