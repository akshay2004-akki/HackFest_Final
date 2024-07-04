import React, { useState, useEffect } from "react";

function Signup() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });
  const [error, setError] = useState("");
  useEffect(() => {
    console.log(users);
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  //const [role, setRole] = useState("")
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    setError("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const duplicateUser = users.find(
      (u) => u.username === user.username || u.email === user.email
    );
    if (duplicateUser) {
      setError("Username or email already exists.");
      alert(error)
    } 
    else{
      setUsers((prevUsers) => [...prevUsers, user]);
    }
  };

  return (
    <div style={{ transform: "translateY(50px)" }}>
      <div className="form-container2">
        <div className="form-box2">
          <h2>Signup</h2>
          <form>
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
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="organization">Organization</option>
            </select>
            <button
              type="submit"
              className="submit-button"
              onClick={handleSubmit}
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
