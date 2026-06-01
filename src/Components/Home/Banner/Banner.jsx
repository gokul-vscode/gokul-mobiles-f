// Banner.jsx

import React from "react";
import "./Banner.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Banner() {
  return (
    <div className="banner-container" id="banner">

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500 }}
        loop={true}
        className="mySwiper"
      >

        {/* BANNER 1 */}

        <SwiperSlide>

          <div className="banner slide1">

            <div className="banner-content">

              <h1>
                iPhone 17 Pro <br />
                Max Collection
              </h1>

              <p>
                Experience futuristic speed, AI camera technology,
                and premium flagship performance.
              </p>

              <button>Shop Now</button>

            </div>

            <div className="banner-image">
              <img
                src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1200&auto=format&fit=crop"
                alt=""
              />
            </div>

          </div>

        </SwiperSlide>

        {/* BANNER 2 */}

        <SwiperSlide>

          <div className="banner slide2">

            <div className="banner-content">

              <h1>
                Samsung Galaxy <br />
                Ultra Series
              </h1>

              <p>
                Powerful gaming performance with cinematic AMOLED
                display and ultra zoom camera.
              </p>

              <button>Explore</button>

            </div>

            <div className="banner-image">
              <img
                src="https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1200&auto=format&fit=crop"
                alt=""
              />
            </div>

          </div>

        </SwiperSlide>

        {/* BANNER 3 */}

        <SwiperSlide>

          <div className="banner slide3">

            <div className="banner-content">

              <h1>
                OnePlus Flagship <br />
                Smart Phones
              </h1>

              <p>
                Fast charging, smooth performance and futuristic
                design for next generation users.
              </p>

              <button>Buy Now</button>

            </div>

            <div className="banner-image">
              <img
                src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop"
                alt=""
              />
            </div>

          </div>

        </SwiperSlide>

      </Swiper>

    </div>
  );
}

export default Banner;