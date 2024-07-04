import React, { useEffect, useState } from "react";

function Login() {
  const users = JSON.parse(localStorage.getItem("users"));
  console.log(users);

  const [loggedIn, setIsLoggedin] = useState(false)
  const [loginDetails,setLoginDetails] = useState({
    email : "",
    password : "",
  })

  const handleChange = (e)=>{
    setLoginDetails({
      ...loggedIn,
      [e.target.name] : e.target.value
    })
  }

  const handleLogin = (e) => {
    e.preventDefault()
    const user = users.find((u)=>u.email===loginDetails.email && u.password===loginDetails.password);
    if(!user){
      alert("Invalid credentials")
    }
    setIsLoggedin(true)
    localStorage.setItem('loggedInUser', JSON.stringify(user));    
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
