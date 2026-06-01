import React, { useState, useEffect } from "react";
import "./Products.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";

import { GiClick } from "react-icons/gi";
import { RxDropdownMenu } from "react-icons/rx";

import { useDispatch } from "react-redux";

import { addToCart } from "../../../CartSlice/CartSlice";

function Products() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  /* PRODUCTS STATE */

  const [productsData, setProductsData] = useState([]);

  /* FILTER STATE */

  const [activeFilter, setActiveFilter] = useState("All");

  const [showFilters, setShowFilters] = useState(false);

  /* FETCH PRODUCTS */

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const res = await axios.get(
          "http://gokul-mobiles-b.onrender.com/api/products"
        );

        setProductsData(res.data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchProducts();

  }, []);

  /* FILTERS */

  const filters = [
    "All",
    "Apple",
    "Samsung",
    "OnePlus",
    "Xiaomi",
    "Vivo",
    "Realme",
    "Iqoo",
    "Oppo",
    "Poco",
    "Motorola",
    "Nothing Phone",
    "Infinix",
    "Google Pixel",
    "Honor",
    "Tecno",
    "Itel",
    "Lava",
    "Sony",
  ];

  /* FILTER LOGIC */

  const filteredProducts =
    activeFilter === "All"
      ? productsData
      : productsData.filter(
          (item) => item.brand === activeFilter
        );

  return (

    <div className="products-page" id="products">

      {/* HEADER */}

      <div className="products-header">

        <h1>Latest Smartphones</h1>

        <p>
          Explore premium flagship smartphones with futuristic
          performance and stunning design.
        </p>

      </div>

      {/* FILTER TOP */}

      <div className="filter-top">

        <button
          className="main-filter-btn"
          onClick={() => setShowFilters(!showFilters)}
        >

          <RxDropdownMenu />

          Explore Brands Categories

          <GiClick />

        </button>

      </div>

      {/* FILTER BUTTONS */}

      <div
        className={
          showFilters
            ? "filter-container active"
            : "filter-container"
        }
      >

        {filters.map((filter, index) => (

          <button
            key={index}
            className={
              activeFilter === filter
                ? "filter-btn active-btn"
                : "filter-btn"
            }
            onClick={() => setActiveFilter(filter)}
          >

            {filter}

          </button>

        ))}

      </div>

      {/* PRODUCTS GRID */}

      <div className="products-grid">

        {filteredProducts.map((product) => (

          <div
            className="product-card"
            key={product._id}
            onClick={() =>
              navigate(`/viewproduct/${product._id}`)
            }
          >

            {/* IMAGE */}

            <div className="product-image">

              <img
                src={product.image}
                alt={product.name}
              />

            </div>

            {/* CONTENT */}

            <div className="product-content">

              <h2>{product.name}</h2>

              {/* RATING */}

              <div className="rating">

                {[...Array(product.rating)].map((_, i) => (

                  <FaStar key={i} />

                ))}

              </div>

              {/* PRICE */}

              <h3>₹{product.price}</h3>

              {/* BUTTON */}

              <button
                onClick={(e) => {

                  e.stopPropagation();

                  dispatch(
                    addToCart({
                      id: product._id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                    })
                  );

                }}
              >

                <FaShoppingCart />

                <span>Add To Cart</span>

              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Products;