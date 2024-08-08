import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

const ForgotPassword = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const port = process.env.REACT_APP_API || "http://localhost:8080";
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${port}/api/v1/auth/forgot-password`, {
        newPassword,
        email,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong.");
    }
    console.log(process.env.REACT_APP_API);
  };
  return (
    <Layout title={"Login - ValoCart"}>
      <div className="register">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              placeholder="Enter email"
            />
          </div>

          <div className="mb-3">
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              class="form-control"
              id="exampleInputNewPassword"
              placeholder="New Password"
            />
          </div>
          <div className="mb-3">
            <input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              type="text"
              class="form-control"
              id="exampleInputAnswer"
              placeholder="Enter you Answer"
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <button type="submit" className="btn btn-primary mb-3">
              Submit
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
