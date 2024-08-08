import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
const Profile = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const port = process.env.REACT_APP_API || "http://localhost:8080";
  const [name, setName] = useState("");
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const { name, email, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${port}/api/v1/auth/profile`,
        {
          password,
          email,
          name,
          address,
          phone,
        },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong.");
    }
    console.log(process.env.REACT_APP_API);
  };
  return (
    <Layout title={"Update Profile - ValoCart"}>
      <div className="register">
        <h1>User Profile</h1>
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
              disabled
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
          <button type="submit" class="btn btn-primary">
            Update
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Profile;
