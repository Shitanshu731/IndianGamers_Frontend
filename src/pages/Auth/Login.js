import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const port = process.env.REACT_APP_API || "http://localhost:8080";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${port}/api/v1/auth/login`, {
        password,
        email,
      });
      if (res && res.data.success) {
        toast.success(res && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <button
              type="button"
              className="btn btn-primary mb-3"
              onClick={() => navigate("/forgot-password")}
            >
              Forget Password
            </button>
            <button type="submit" className="btn btn-primary mb-3">
              Submit
            </button>
            <h5>Create a new acount?</h5>
            <NavLink to="/register" className="nav-link">
              SignUp
            </NavLink>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
