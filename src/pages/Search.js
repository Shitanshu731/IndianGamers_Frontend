import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";
import { Link } from "react-router-dom";

const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Produucts Found"
              : `Found${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap">
            {values?.results.map((p) => (
              <Link key={p._id} to={`/dashboard/admin/products/${p.slug}`}>
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    height={"150px"}
                    alt={p.name}
                  />
                  <div className="card-body shadow-lg">
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-title">${p.price}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 10)}...
                    </p>
                    <button className="btn btn-primary ms-1">
                      More Details
                    </button>
                    <button className="btn btn-secondary ms-1">
                      Add to Cart
                    </button>
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

export default Search;
