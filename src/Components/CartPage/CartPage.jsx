import React from "react";
import "./CartPage.css";

import { useSelector, useDispatch } from "react-redux";
import {
  incrementQty,
  decrementQty,
  removeFromCart,
} from "../../CartSlice/CartSlice";

import { FaTrashAlt } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";


function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const cartItems = useSelector((state) => state.cart.cartItems);

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="cartpage-container">

      <h1 className="cartpage-title">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart-box">
          <h2>Your Cart is Empty</h2>
        </div>
      ) : (
        <>
          <div className="cartpage-products">

            {cartItems.map((item) => (
              <div className="cartpage-card" key={item.id}>

                <div className="cartpage-image-box">
                  <img src={item.image} alt={item.name} />
                </div>

                <div className="cartpage-info">

                  <h2>{item.name}</h2>

                  <p className="brand">
                    Premium Smartphone
                  </p>

                  <h3>₹{item.price}</h3>

                  <p className="total-price">
                    Total : ₹{item.price * item.quantity}
                  </p>

                  <div className="qty-controls">

                    <button
                      onClick={() => dispatch(decrementQty(item.id))}
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => dispatch(incrementQty(item.id))}
                    >
                      +
                    </button>

                  </div>

                </div>

                <button
                  className="delete-btn"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  <FaTrashAlt />
                </button>

              </div>
            ))}

          </div>

          <div className="cart-summary">

            <h2>Cart Summary</h2>

            <div className="summary-row">
              <span>Total Amount</span>
              <strong>₹{totalAmount}</strong>
            </div>

            <button className="checkout-btn" onClick={() =>
              navigate("/checkout")
            }>
              Proceed To Checkout
            </button>

          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;