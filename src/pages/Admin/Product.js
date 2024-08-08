import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { Link } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);
  const port = process.env.REACT_APP_API || "http://localhost:8080";
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${port}/api/v1/product/get-product`);
      if (data?.success) {
        setProducts(data?.products);
      }
    } catch (error) {
      console.log("Something Went Wrong");
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center"> All products List</h1>
          <div className="d-flex">
            {products?.map((p) => (
              <Link key={p._id} to={`/dashboard/admin/products/${p.slug}`}>
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
