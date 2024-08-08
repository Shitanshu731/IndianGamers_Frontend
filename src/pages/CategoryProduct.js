import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CategoryProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const getProductByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProductByCat();
  }, [params.slug]);
  return (
    <Layout title={"All Products - Best Offers"}>
      <div className="col md-3">
        <h1 className="text-center">Category - {category.name}</h1>
        <h3 className="text-center">{products.length} Products Found</h3>
        <div className="d-flex flex-wrap productByCategories">
          {products?.map((p) => (
            <div key={p._id} className="card m-2" style={{ width: "18rem" }}>
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                height={"150px"}
                alt={p.name}
              />
              <div className="card-body shadow-lg">
                <Link to={`/dashboard/admin/products/${p.slug}`}>
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title">${p.price}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 10)}...
                  </p>
                </Link>
                <button
                  className="btn btn-primary ms-1"
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  More Details
                </button>
                <button className="btn btn-secondary ms-1">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
