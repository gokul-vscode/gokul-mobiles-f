import React, { useState } from "react";

import "./CheckoutPage.css";

import { useSelector } from "react-redux";

import axios from "axios";

function CheckoutPage() {

  // const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  const totalAmount = cartItems.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  );

  const [formData, setFormData] = useState({

    fullname: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",

  });

  /* HANDLE INPUT */

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  /* PLACE ORDER */

  const placeOrder = async () => {

    /* VALIDATION */

    if (

      !formData.fullname ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.pincode

    ) {

      return alert(
        "Please fill all delivery details"
      );

    }

    if (cartItems.length === 0) {

      return alert("Cart is empty");

    }

    try {

      const res = await axios.post(

        "https://gokul-mobiles-b.onrender.com/api/orders/create",

        {

          ...formData,

          products: cartItems,

          totalAmount,

        }

      );

      alert(res.data.message);

      console.log(res.data);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Order Failed"
      );

    }

  };

  return (

    <div className="checkout-container">

      {/* LEFT SIDE */}

      <div className="checkout-left">

        <h1>Secure Checkout</h1>

        <div className="checkout-form">

          <div className="input-group">

            <label>Full Name</label>

            <input
              type="text"
              name="fullname"
              placeholder="Enter your full name"
              value={formData.fullname}
              onChange={handleChange}
            />

          </div>

          <div className="input-group">

            <label>Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />

          </div>

          <div className="input-group">

            <label>Phone Number</label>

            <input
              type="text"
              name="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
            />

          </div>

          <div className="input-group">

            <label>Delivery Address</label>

            <textarea
              name="address"
              placeholder="Enter full address"
              rows="4"
              value={formData.address}
              onChange={handleChange}
            />

          </div>

          <div className="double-inputs">

            <div className="input-group">

              <label>City</label>

              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />

            </div>

            <div className="input-group">

              <label>Pincode</label>

              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleChange}
              />

            </div>

          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="checkout-right">

        <h2>Order Summary</h2>

        <div className="summary-products">

          {cartItems.map((item) => (

            <div
              className="summary-card"
              key={item.id}
            >

              <img
                src={item.image}
                alt={item.name}
              />

              <div className="summary-info">

                <h4>{item.name}</h4>

                <p>
                  Qty : {item.quantity}
                </p>

                <span>
                  ₹
                  {item.price * item.quantity}
                </span>

              </div>

            </div>

          ))}

        </div>

        <div className="price-details">

          <div className="price-row">

            <span>Subtotal</span>

            <span>
              ₹{totalAmount}
            </span>

          </div>

          <div className="price-row">

            <span>Shipping</span>

            <span>FREE</span>

          </div>

          <div className="price-row total">

            <span>Total</span>

            <span>
              ₹{totalAmount}
            </span>

          </div>

        </div>

        <button
          className="place-order-btn"
          onClick={placeOrder}
        >

          Place Order

        </button>

      </div>

    </div>

  );

}

export default CheckoutPage;