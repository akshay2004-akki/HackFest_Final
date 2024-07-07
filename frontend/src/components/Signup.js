import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/v3/users/register", user, { withCredentials: true });
      console.log(response);
      setSuccess(true);
      setUser({
        username: "",
        email: "",
        password: "",
        role: "",
      });
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div style={{ transform: "translateY(50px)" }}>
      <div className="form-container2">
        <div className="form-box2">
          <h2>Signup</h2>
          <form onSubmit={handleSubmit}>
            <input
              onChange={handleChange}
              name="username"
              value={user.username}
              type="text"
              placeholder="Username"
              className="input-field"
              required
            />
            <input
              onChange={handleChange}
              name="email"
              value={user.email}
              type="email"
              placeholder="Email"
              className="input-field"
              required
            />
            <input
              onChange={handleChange}
              name="password"
              value={user.password}
              type="password"
              placeholder="Password"
              className="input-field"
              required
            />
            <select
              name="role"
              id="role"
              className="input-field"
              required
              onChange={handleChange}
              value={user.role}
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="organization">Organization</option>
            </select>
            <button
              type="submit"
              className="submit-button"
            >
              Signup
            </button>
          </form>
          {error && <div className="error" style={{color:"red"}}>{error}</div>}
          {success && <div className="success"style={{color:"white"}}>Registration successful!</div>}
        </div>
      </div>
    </div>
  );
}

export default Signup;
