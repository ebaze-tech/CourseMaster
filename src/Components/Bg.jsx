import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import background images
import Background1 from "../assets/UI_BG1_1.jpeg";
import Background2 from "../assets/UI_BG2_2.jpeg";
import Background3 from "../assets/UI_BG3_1.jpeg";
import Background4 from "../assets/UI_BG4_1.jpeg";
import KDL from "../assets/KDL_2.jpeg";

// Import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function Bg({ className }) {
  return (
    <div className={`w-full h-screen ${className} blur-sm`}>
      <Swiper
        spaceBetween={10}
        centeredSlides={true}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-full"
      >
        <SwiperSlide>
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${Background1})` }}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${Background2})` }}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${Background3})` }}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${Background4})` }}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${KDL})` }}
          ></div>
        </SwiperSlide>
      </Swiper>
    </div>

  );
}
