import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "../styles/CategoriesProduct.module.css";
import { useCart } from "../context/cart";

const CategoryProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [cart, setCart] = useCart();

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

  useEffect(() => {
    getProductByCat();
  }, [params.slug]);

  return (
    <Layout title={"All Products - Best Offers"}>
      <div className={styles.categoryContainer}>
        <h1 className={styles.categoryTitle}>Category - {category.name}</h1>
        <h3 className={styles.productCount}>{products.length} Products Found</h3>
        <div className={styles.productGrid}>
          {products?.map((p) => (
            <div key={p._id} className={styles.productCard}>
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className={styles.productImage}
                alt={p.name}
              />
              <div className={styles.cardBody}>
                <Link to={`/dashboard/admin/products/${p.slug}`} className={styles.productLink}>
                  <h5 className={styles.productTitle}>{p.name}</h5>
                  <h5 className={styles.productPrice}>${p.price}</h5>
                  <p className={styles.productDescription}>
                    {p.description.substring(0, 10)}...
                  </p>
                </Link>
                <div className={styles.butMC}>
                  <button
                    className={styles.detailsButton}
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    className={styles.cartButton}
                    onClick={() => addToCart(p)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
