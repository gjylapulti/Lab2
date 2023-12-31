import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });

        localStorage.setItem("auth", JSON.stringify(res.data));

        setTimeout(() => {
          navigate(location.state || "/");
        }, 1800); // Delay in milliseconds (e.g., 2000ms = 2 seconds)
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };
  return (
    <Layout title="Fleur Necessities - LogIn">
      <div className="  register">
        <h1 className="text-center" style={{ fontSize: "29px" }}>
          Log In
        </h1>
        <div className="pink-lines">
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Enter Your Email"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Enter Your Password"
              required
            />
          </div>

          <div className="mb-3">
            <button
              type="button"
              onClick={() => {
                navigate("/forgot-password");
              }}
              className="btn btn-pink w-100"
              style={{
                background: "pink",
              }}
            >
              Forgot Password ?
            </button>
          </div>

          <button
            type="submit"
            className="btn btn-pink w-100"
            style={{
              background: "pink",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
