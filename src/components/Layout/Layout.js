import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import styles from "../../../src/styles/Layout.module.css";
const Layout = ({ children, author, title, descriptions, keywords }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={descriptions} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main className={styles.main}>
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "ValoCart - Shop now",
  description: "Mern Stacj project",
  keywords: "Mern, React, MongoDb, Express",
  author: "Shitanshu",
};

export default Layout;
