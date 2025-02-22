import React, { useState } from "react";
import axios from "axios";
import './signup.css'; // Make sure your CSS file is correctly linked
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function SignUp({ onSignup }) {
  const [error, setError] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8001/api/auth/signup";
      const { data: res } = await axios.post(url, data);
      console.log(res.message);

      // Assuming the server returns a token
      const token = res.token;
      onSignup(token); // Pass the token to the parent component
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <div className="input-box">
          <FaUser className="icon" />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={data.name}
            onChange={handleChange}
            // required
          />
        </div>
        <div className="input-box">
          <FaEnvelope className="icon" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
            // required
          />
        </div>
        <div className="input-box">
          <FaLock className="icon" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
            // required
          />
        </div>
        {error && <div className="error_msg">{error}</div>}
        <button type="submit">Sign Up</button>
        <div className="login-link">
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>
      </form>
    </div>
  );
}

export default SignUp;