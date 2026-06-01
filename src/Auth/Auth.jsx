import React, { useState } from "react";

import "./Auth.css";

import axios from "axios";

import { useNavigate } from "react-router-dom";

function Auth() {

  const navigate = useNavigate();

  /* TOGGLE */

  const [isLogin, setIsLogin] = useState(true);

  /* FORM STATES */

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  /* SUBMIT */

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      /* LOGIN */

      if (isLogin) {

        const res = await axios.post(

          "http://localhost:5000/api/auth/login",

          {
            email,
            password,
          }

        );

        /* SAVE TOKEN */

        localStorage.setItem(
          "token",
          res.data.token
        );

        /* SAVE USER */

        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );

        alert("Login Successful 🚀");

        navigate("/");

      }

      /* SIGNUP */

      else {

        const res = await axios.post(

          "http://localhost:5000/api/auth/signup",

          {
            name,
            email,
            password,
          }

        );

        alert(res.data.message);

        /* CLEAR INPUTS */

        setName("");

        setEmail("");

        setPassword("");

        /* SWITCH LOGIN */

        setIsLogin(true);

      }

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }

  };

  return (

    <div className="auth-page">

      <div className="auth-box">

        {/* TOP */}

        <div className="auth-top">

          <h1>
            {isLogin ? "Login" : "Sign Up"}
          </h1>

          <p>
            Welcome to Mobile Shop
          </p>

        </div>

        {/* FORM */}

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          {/* SIGNUP NAME */}

          {!isLogin && (

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
            />

          )}

          {/* EMAIL */}

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          {/* PASSWORD */}

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          {/* BUTTON */}

          <button type="submit">

            {isLogin
              ? "Login"
              : "Create Account"}

          </button>

        </form>

        {/* TOGGLE */}

        <div className="switch-text">

          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}

          <span
            onClick={() =>
              setIsLogin(!isLogin)
            }
          >

            {isLogin
              ? " Sign Up"
              : " Login"}

          </span>

        </div>

      </div>

    </div>

  );

}

export default Auth;