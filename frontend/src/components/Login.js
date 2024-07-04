import React from 'react'

function Login() {

  const users=JSON.parse(localStorage.getItem("users"));
  console.log(users);

  return (
    <div style={{transform:"translateY(50px)"}}>
      <div className="form-container">
      <div className="form-box">
        <h2>Login</h2>
        <form>
          <input type="email" placeholder="Email" className="input-field" required />
          <input type="password" placeholder="Password" className="input-field" required />
          <button type="submit" className="submit-button">Login</button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Login