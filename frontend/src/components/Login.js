import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn, setUser }) {
  const users = JSON.parse(localStorage.getItem("users"));

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find((u) => u.email === loginDetails.email && u.password === loginDetails.password);
    if (!user) {
      alert("Invalid credentials");
    } else {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      localStorage.setItem('isLoggedIn', true);
      setIsLoggedIn(true);
      setUser(user);
      alert("Login Successful");
      navigate("/");
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
        </div>
      </div>
    </div>
  );
}

export default Login;
