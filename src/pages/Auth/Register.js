import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const port = process.env.REACT_APP_API || "http://localhost:8080";
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(0);
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [answer, setAnswer] = useState("");
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
      console.log(error);
      toast.error("Something Went Wrong.");
    }
    console.log(process.env.REACT_APP_API);
  };
  return (
    <Layout title={"Register - ValoCart"}>
      <div className="register">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              class="form-control"
              id="exampleInputName"
              placeholder="Enter your Name"
            />
          </div>
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
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              class="form-control"
              id="exampleInputAddress"
              placeholder="Enter address"
            />
          </div>

          <div className="mb-3">
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="number"
              class="form-control"
              id="exampleInputPhone"
              placeholder="Enter Phone"
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
          <div className="mb-3">
            <input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              type="text"
              class="form-control"
              id="exampleInputquestion"
              placeholder="Enter your favourite sport"
            />
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
          <h5>Already have an account ?</h5>
          <NavLink to="/login" className="nav-link">
            Login
          </NavLink>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
