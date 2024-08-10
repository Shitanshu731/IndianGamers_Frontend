import React from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../context/hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();
  const port = process.env.REACT_APP_API || "http://localhost:8080";
  return (
    <Layout title={"All Categories"}>
      <div className="container">
        <div className="row">
          {categories.map((c) => (
            <div className="col-md-6 mt-5 mb-3 gx-3 gy-3">
              <Link
                to={`${port}/category/${c.slug}`}
                className="btn btn-danger text-light"
              >
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
