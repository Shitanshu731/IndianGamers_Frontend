import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function SwiperPage() {
  return (
    <>
      <Swiper
        spaceBetween={20}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="/images/skin1.jpeg" alt="asdasd" />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://media.wired.com/photos/5ea0840cb0490300086261e3/master/pass/Cul-Reveal_ReactorA_VALORANT.jpg"
            alt="asdasd"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://media.wired.com/photos/5ea0840cb0490300086261e3/master/pass/Cul-Reveal_ReactorA_VALORANT.jpg"
            alt="asdasd"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
