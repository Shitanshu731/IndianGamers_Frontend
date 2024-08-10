import React, { useEffect, useState } from "react";
import Layout from "./../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { prices } from "../components/Prices";
import { useCart } from "../context/cart";
import styles from "../styles/Home.module.css";
import SwiperPage from "../components/Layout/Swiper/SwiperPage";
import Footer from "../components/Layout/Footer";
const HomePage = () => {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const port = process.env.REACT_APP_API || "http://localhost:8080";
  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${port}/api/v1/product/product-count`);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
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
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${port}/api/v1/product/get-product`);
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    if (!checked.length && !radio.length) getAllProducts();
  }, [checked.length, radio.length]);
  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`${port}/api/v1/product/product-filters`, {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {}
  };

  // const handleFilter = async (value, id) => {
  //   let all = [...checked];
  //   if (value) {
  //     all.push(id);
  //   } else {
  //     all = all.filter((c) => c !== id);
  //   }
  //   setChecked(all);
  // };

  const addToCart = (product) => {
    let myCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = myCart.findIndex(item => item._id === product._id);

    if (existingProductIndex !== -1) {
      myCart[existingProductIndex].quantity += 1;
    } else {
      myCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(myCart));
    setCart(myCart);
  };

  const laodMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${port}/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (page === 1) return;
    laodMore();
  }, [page]);
  return (
    <Layout title={"Indian Gamers"}>
      <div className={styles.home}>
        <div className={styles.rightPortion}>
          <SwiperPage />
          <h1>All Products</h1>
          <div className={styles.allProductContainer}>
            {products?.map((p) => (
              <div key={p._id} className={`card m-1 ${styles.eachCard}`}>
                <img
                  src={`${port}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  height={"150px"}
                  alt={p.name}
                />
                <div className={styles.cardBody}>
                  <Link to={`/dashboard/admin/products/${p.slug}`}>
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-title">&#8377;{p.price}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 20)}...
                    </p>
                  </Link>
                  <button
                    className={`${styles.button} ms-1`}
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    className="btn btn-secondary ms-1"
                    onClick={() => {addToCart(p)}}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
