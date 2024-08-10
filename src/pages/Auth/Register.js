import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "../../styles/Register.module.css";

const PasswordValidation = ({ password }) => {
  const requirements = [
    { regex: /[A-Z]/, label: "At least one uppercase letter" },
    { regex: /[a-z]/, label: "At least one lowercase letter" },
    { regex: /[0-9]/, label: "At least one number" },
    { regex: /[^A-Za-z0-9]/, label: "At least one special character" },
    { regex: /.{8,}/, label: "At least 8 characters long" },
  ];

  return (
    <div className={styles.validationContainer}>
      {requirements.map((req, index) => (
        <p
          key={index}
          className={
            req.regex.test(password) ? styles.valid : styles.invalid
          }
        >
          {req.label}
        </p>
      ))}
    </div>
  );
};

const Register = () => {
  const navigate = useNavigate();
  const port = process.env.REACT_APP_API || "http://localhost:8080";
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const [showValidation, setShowValidation] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${port}/api/v1/auth/register`, {
        password,
        email,
        name,
        address,
        phone,
        answer,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Registration error: ", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Layout title={"Register - ValoCart"}>
      <div className={styles.registerContainer}>
        <h1 className={styles.registerTitle}>Register</h1>
        <hr />
        <form className={styles.registerForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className={styles.formControl}
              id="name"
              placeholder="Enter your Name"
            />
          </div>
          <div className={styles.formGroup}>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className={styles.formControl}
              id="email"
              placeholder="Enter email"
            />
          </div>
          <div className={styles.formGroup}>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              className={styles.formControl}
              id="address"
              placeholder="Enter address"
            />
          </div>
          <div className={styles.formGroup}>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              className={styles.formControl}
              id="phone"
              placeholder="Enter Phone"
            />
          </div>
          <div className={styles.formGroup}>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className={styles.formControl}
              id="password"
              placeholder="Password"
              onFocus={() => setShowValidation(true)}
              onBlur={() => setShowValidation(false)}
            />
            {showValidation && <PasswordValidation password={password} />}
          </div>
          <div className={styles.formGroup}>
            <input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              type="text"
              className={styles.formControl}
              id="answer"
              placeholder="Enter your favourite sport"
            />
          </div>
          <button type="submit" className={styles.btnPrimary}>
            Register
          </button>
          <div className={styles.loginLink}>
            <NavLink to="/login" className={styles.navLink}>
              <h6>
                <span style={{ color: "red" }}>Already have an account? </span>
                Login
              </h6>
            </NavLink>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
