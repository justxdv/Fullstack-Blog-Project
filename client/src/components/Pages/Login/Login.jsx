import React, { useContext, useRef } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Context } from "../../../context/Context";

const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
  
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
  
  
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login">
      <div className="loginF">
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="ref"
            ref={userRef}
            className="loginInput"
            placeholder="Enter your username..."
          />
          <label>Password</label>
          <input
            type="password"
            ref={passwordRef}
            className="loginInput"
            placeholder="Enter password..."
          />
          <button className="loginButton" type="submit" disabled={isFetching}>
            Login
          </button>
        </form>
        <button className="loginRegistration">
          <Link to="/register" style={{ textDecoration: "none" }}>
            Register
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Login;
