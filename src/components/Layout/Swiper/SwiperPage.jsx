import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import axios from "axios";

export default function SwiperPage() {
  const [products, setProducts] = useState([]);
  const port = process.env.REACT_APP_API || "http://localhost:8080";
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${port}/api/v1/product/get-product`);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <>
      <Swiper
        spaceBetween={20}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {products?.map((p) => (
          <SwiperSlide key={p._id} className={`card m-1`}>
            <Link to={`/product/${p.slug}`}>
              <img
                src={`${port}/api/v1/product/product-photo/${p._id}`}
                alt={p.name}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
