import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const port = process.env.REACT_APP_API || "http://localhost:8080";
  const [relatedProducts, setRelatedProducts] = useState([]);
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${port}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProducts(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${port}/api/v1/product/related-products/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (params?.slug) getSingleProduct();
  }, [params?.slug]);
  return (
    <Layout title={`Product - ${params.slug}`}>
      <h1 className="text-center">Product Details</h1>
      <div className="p-4 singleProductContainer">
        <div className="p-3 sm:w-96 img">
          <img
            src={`${port}/api/v1/product/product-photo/${product._id}`}
            alt={product.name}
            width={"100%"}
            height={"300px"}
          />
        </div>
        <div className="details">
          <h3>Name : {product.name}</h3>
          <h3>description : {product.description}</h3>
          <h3>Price : ${product.price}</h3>
          <h3>Category : {product?.category?.name}</h3>
          <h3>Quantity : {product.quantity}</h3>
        </div>
      </div>
      <hr />
      <div className="SimilarProductsContainer">
        <h1>Similar Products</h1>
        {relatedProducts.length === 0 && <h4>No Similar Products Found</h4>}
        <div className="SimilarProducts">
          {relatedProducts?.map((p) => (
            <div key={p._id} className="card m-2" style={{ width: "18rem" }}>
              <img
                src={`${port}/api/v1/product/product-photo/${p._id}`}
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

export default ProductDetails;
