import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout.js";
import AdminMenu from "../../components/Layout/AdminMenu.js";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/auth";
const { Option } = Select;
const UpdateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [photo, setPhoto] = useState(null); // Set initial state to null for photo
  const [auth] = useAuth(); // Destructured useAuth hook to get auth
  const port = process.env.REACT_APP_API || "http://localhost:8080";

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${port}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong In getting Category");
    }
  };

  const navigate = useNavigate();
  const params = useParams();

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setDescription(data.product.description);
      setId(data.product._id);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategory();
    getSingleProduct();
  }, []);

  const handleDelete = async () => {
    let answer = window.prompt(
      "Are you sure , you want to delete the product(Say yes else Cancel)"
    );
    if (!answer) return;
    try {
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${id}`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (data.success) {
        toast.success("Product Deleted Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("description", description);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axios.put(
        `/api/v1/product/update-product/${id}`,
        productData,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );

      if (data?.success) {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong", err);
    }
  };

  return (
    <Layout title={"Dashboard - Update Product"}>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1>Update Product</h1>
          <div className="w-75 m-1">
            <Select
              placeholder="Select a Category"
              size="large"
              showSearch
              className="form-select mb-3"
              onChange={(value) => {
                setCategory(value);
              }}
              value={category}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
            <div className="mb-3">
              <label className="btn btn-outline-secondary col-md-12">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <div className="mb-3">
              {photo ? (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="Product Photo"
                    className="img img-responsive"
                    height={"200px"}
                  />
                </div>
              ) : (
                <div className="text-center">
                  <img
                    src={`/api/v1/product/product-photo/${id}`}
                    alt="Product Photo"
                    className="img img-responsive"
                    height={"200px"}
                  />
                </div>
              )}
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={name}
                placeholder="Write a Name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <textarea
                type="text"
                value={description}
                placeholder="Write a description"
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                value={price}
                placeholder="Write Price"
                className="form-control"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                value={quantity}
                placeholder="Write a quantity"
                className="form-control"
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <Select
                placeholder="Select Shipping"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => setShipping(value)}
                value={shipping ? "Yes" : "No"}
              >
                {[
                  { name: "Yes", value: 1 },
                  { name: "No", value: 0 },
                ]?.map((c) => (
                  <Option key={c.value} value={c.value}>
                    {c.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="mb-3">
              <button className="btn btn-primary" onClick={handleUpdate}>
                Update Product
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
