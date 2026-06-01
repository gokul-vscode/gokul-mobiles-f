import React, { useEffect, useState } from "react";

import "./ViewProduct.css";

import { useParams } from "react-router-dom";

import {
  FaStar,
  FaShoppingCart,
  FaTimes,
} from "react-icons/fa";

import axios from "axios";

import { useDispatch } from "react-redux";

import { addToCart } from "../../CartSlice/CartSlice";

function ViewProduct() {

  const { id } = useParams();

  const dispatch = useDispatch();

  /* STATES */

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [showImagePreview, setShowImagePreview] =
    useState(false);

  /* FETCH PRODUCT */

  useEffect(() => {

    const fetchSingleProduct = async () => {

      try {

        const res = await axios.get(

          `http://localhost:5000/api/products/${id}`

        );

        setProduct(res.data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    fetchSingleProduct();

  }, [id]);

  /* LOADING */

  if (loading) {

    return <h1>Loading...</h1>;

  }

  /* PRODUCT NOT FOUND */

  if (!product) {

    return <h1>Product Not Found</h1>;

  }

  return (

    <div className="view-product-page">

      {/* IMAGE POPUP */}

      {
        showImagePreview && (

          <div
            className="image-preview-overlay"
            onClick={() =>
              setShowImagePreview(false)
            }
          >

            <button className="close-preview-btn">

              <FaTimes />

            </button>

            <img
              src={product.image}
              alt={product.name}
              className="preview-image"
            />

          </div>

        )
      }

      <div className="view-product-container">

        {/* LEFT IMAGE */}

        <div className="view-left">

          <img
            src={product.image}
            alt={product.name}
            onClick={() =>
              setShowImagePreview(true)
            }
          />

        </div>

        {/* RIGHT CONTENT */}

        <div className="view-right">

          <h1>{product.name}</h1>

          <h2>{product.brand}</h2>

          {/* RATING */}

          <div className="view-rating">

            {[...Array(product.rating)].map(
              (_, i) => (

                <FaStar key={i} />

              )
            )}

          </div>

          {/* PRICE */}

          <h3>
            ₹{product.price}
          </h3>

          {/* DESCRIPTION */}

          <p>{product.description}</p>

          {/* BUTTON */}

          <button
            className="view-cart-btn"
            onClick={() =>

              dispatch(
                addToCart({

                  id: product._id,

                  name: product.name,

                  price: product.price,

                  image: product.image,

                })
              )

            }
          >

            <FaShoppingCart />

            Add To Cart

          </button>

        </div>

      </div>

    </div>

  );

}

export default ViewProduct;