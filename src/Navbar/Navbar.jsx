// Navbar.jsx

import React, { useState, useEffect } from "react";

import "./Navbar.css";

import { useNavigate, Link } from "react-router-dom";

import {
  removeFromCart,
  incrementQty,
  decrementQty,
} from "../CartSlice/CartSlice";

import { useSelector, useDispatch } from "react-redux";

import { FaTrashAlt } from "react-icons/fa";

import {
  FaUser,
  FaShoppingCart,
  FaSearch,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { GiPolarStar } from "react-icons/gi";
import axios from "axios";

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);

  const [cartOpen, setCartOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [products, setProducts] = useState([]);

  const [filteredProducts, setFilteredProducts] =
    useState([]);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  /* FETCH PRODUCTS */

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const res = await axios.get(
          "http://gokul-mobiles-b.onrender.com/api/products"
        );

        setProducts(res.data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchProducts();

  }, []);

  /* SEARCH FILTER */

  useEffect(() => {

    if (searchTerm.trim() === "") {

      setFilteredProducts([]);

    } else {

      const filtered = products.filter((product) =>

        product.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())

      );

      setFilteredProducts(filtered);

    }

  }, [searchTerm, products]);

  /* TOTAL AMOUNT */

  const totalAmount = cartItems.reduce(

    (acc, item) =>

      acc + item.price * item.quantity,

    0

  );

  /* TOGGLE CART */

  const toggleCart = () => {

    setCartOpen(!cartOpen);

  };


const user = JSON.parse(localStorage.getItem("user"));



  return (

    <>

      <nav className="navbar">

        {/* LOGO */}

        <div className="logo">

          <h1>MobileX</h1>

        </div>

        {/* DESKTOP MENU */}

        <ul
          className={
            menuOpen
              ? "nav-links active"
              : "nav-links"
          }
        >

          <li onClick={()=> document.getElementById("banner")?.scrollIntoView({behavior:"smooth"})}>Home</li>

          <li onClick={()=> document.getElementById("products")?.scrollIntoView({behavior:"smooth"})}>Shop</li>

          <li onClick={()=> document.getElementById("footer")?.scrollIntoView({behavior:"smooth"})}>About Us</li>

        </ul>

        {/* DESKTOP SEARCH */}

        <div className="search-wrapper">

          <div className="search-box desktop-search">

            <input
              type="text"
              placeholder="Search smartphones..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />

            <FaSearch className="search-icon" />

          </div>

          {/* SEARCH RESULTS */}

          {
            searchTerm &&
            filteredProducts.length > 0 && (

              <div className="search-results">

                {

                  filteredProducts.map((product) => (

                    <div
                      key={product._id}
                      className="search-item"
                      onClick={() => {

                        navigate(
                          `/viewproduct/${product._id}`
                        );

                        setSearchTerm("");

                      }}
                    >

                      <img
                        src={product.image}
                        alt={product.name}
                      />

                      <div>

                        <h4>{product.name}</h4>

                        <p>₹{product.price}</p>

                      </div>

                    </div>

                  ))

                }

              </div>

            )
          }

        </div>

        {/* RIGHT SIDE */}

        <div className="nav-right">

          {/* MOBILE SEARCH ICON */}

          <div
            className="icon-box mobile-search-btn"
            onClick={() =>
              setSearchOpen(!searchOpen)
            }
          >

            {
              searchOpen
                ? <FaTimes />
                : <FaSearch />
            }

          </div>

          {/* USER */}

          <div
            className="icon-box"
            onClick={() =>
              navigate("/auth")
            }
          >

            <FaUser />
            
          </div>

          {/* CART */}

          <div
            className="icon-box cart-box"
            onClick={toggleCart}
          >

            <FaShoppingCart />

            <span className="cart-count">

              {cartItems.length}

            </span>

          </div>

          {/* MENU BUTTON */}

          <div
            className="menu-toggle"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
          >

            {
              menuOpen
                ? <FaTimes />
                : <FaBars />
            }

          </div>

        </div>

      </nav>

      {/* MOBILE SEARCH */}

      <div
        className={
          searchOpen
            ? "mobile-search active"
            : "mobile-search"
        }
      >

        <input
          type="text"
          placeholder="Search mobiles..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />

        <button>

          <FaSearch />

        </button>

      </div>

      {/* MOBILE SEARCH RESULTS */}

      {
        searchTerm &&
        filteredProducts.length > 0 && (

          <div className="mobile-search-results">

            {

              filteredProducts.map((product) => (

                <div
                  key={product._id}
                  className="search-item"
                  onClick={() => {

                    navigate(
                      `/viewproduct/${product._id}`
                    );

                    setSearchTerm("");

                    setSearchOpen(false);

                  }}
                >

                  <img
                    src={product.image}
                    alt={product.name}
                  />

                  <div>

                    <h4>{product.name}</h4>

                    <p>₹{product.price}</p>

                  </div>

                </div>

              ))

            }

          </div>

        )
      }

      {/* CART DRAWER */}

      {
        cartOpen && (

          <>

            {/* OVERLAY */}

            <div
              className="cart-overlay"
              onClick={() =>
                setCartOpen(false)
              }
            />

            {/* DRAWER */}

            <div className="cart-drawer">

              <div className="cart-header">

                <h3>Your Cart</h3>

                <button
                  onClick={() =>
                    setCartOpen(false)
                  }
                  className="cart-close-btn"
                >

                  <FaTimes />

                </button>

              </div>

              <div className="cart-items-box">

                {

                  cartItems.length === 0 ? (

                    <p className="empty-cart">

                      Cart is empty

                    </p>

                  ) : (

                    cartItems.map((item) => (

                      <div
                        className="cart-item"
                        key={item.id}
                      >

                        <img
                          src={item.image}
                          alt={item.name}
                        />

                        <div className="item-info">

                          <h4>{item.name}</h4>

                          <p className="price">

                            ₹{item.price}

                          </p>

                          <p className="item-price">

                            Total ₹
                            {item.price *
                              item.quantity}

                          </p>

                          <div className="qty-controls">

                            <button
                              onClick={() =>
                                dispatch(
                                  decrementQty(
                                    item.id
                                  )
                                )
                              }
                            >
                              -
                            </button>

                            <span>
                              {item.quantity}
                            </span>

                            <button
                              onClick={() =>
                                dispatch(
                                  incrementQty(
                                    item.id
                                  )
                                )
                              }
                            >
                              +
                            </button>

                          </div>

                        </div>

                        <button
                          className="remove-btn"
                          onClick={() =>
                            dispatch(
                              removeFromCart(
                                item.id
                              )
                            )
                          }
                        >

                          <FaTrashAlt />

                        </button>

                      </div>

                    ))

                  )
                }

              </div>

              <div className="cart-footer">

                <div className="subtotal">

                  <span>Total</span>

                  <strong>
                    ₹{totalAmount}
                  </strong>

                </div>

                <div className="cart-actions">

                  <Link
                    to="/checkout"
                    className="checkout-btn"
                  >
                    Checkout
                  </Link>

                  <Link
                    to="/cart"
                    className="viewcart-btn"
                    onClick={() =>
                      setCartOpen(false)
                    }
                  >
                    View Cart
                  </Link>

                </div>

              </div>

            </div>

          </>

        )
      }
      <p className="user-name">Welcome <GiPolarStar /> <span className="username-color">"{user.name}"</span></p>

    </>

  );

}

export default Navbar;