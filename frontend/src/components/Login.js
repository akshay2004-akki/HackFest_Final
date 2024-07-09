import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ setIsLoggedIn, setUser, setRole }) {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/v3/users/login", loginDetails, {
        withCredentials: true,
      });

      const { data } = response;

      setIsLoggedIn(true);
      setUser(data.data);
      setRole(data.data.role);
      alert("Login Successful");
      navigate("/");
    } catch (error) {
      console.error(error);
      setError("Invalid credentials");
      alert("Invalid credentials");
    }
  };

  return (
    <div style={{ transform: "translateY(50px)" }}>
      <div className="form-container">
        <div className="form-box">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input-field"
              required
              value={loginDetails.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input-field"
              required
              value={loginDetails.password}
              onChange={handleChange}
            />
            <button type="submit" className="submit-button">
              Login
            </button>
          </form>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
