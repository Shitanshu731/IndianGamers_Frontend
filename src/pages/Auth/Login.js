import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import styles from "../../styles/Login.module.css";


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
        toast.success(res.data.message);
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
  };

  return (
    <Layout title={"Login - ValoCart"}>
      <div className={styles.login}>
        <h1>Login</h1>
        <hr></hr>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter email"
              required
            />
          </div>

          <div className="mb-3">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              required
            />
          </div>
          <div>
            <div
              className={`${styles.ForgetPassword}`}
              onClick={() => navigate("/forgot-password")}
            >
              Forget Password
            </div>
            <div className={`${styles.cr}`}>
              <button type="submit" className={styles.loginButton}>
                Login
              </button>

              <NavLink to="/register" className="nav-link">
                <h6>
                  <span style={{ color: "red" }}>Create a new account?</span>{" "}
                  SignUp
                </h6>
              </NavLink>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
