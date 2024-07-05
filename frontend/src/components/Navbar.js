import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar({ isLoggedIn, user }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/" style={{ display: "flex", alignItems: "center" }}>
          <img src="https://img.icons8.com/fluency/344/green-earth.png" alt="Green Project India" style={{ height: '30px', marginRight: '10px' }} />
          <span style={{ fontFamily: "Poppins" }}>Green Project India</span>
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/service">Service</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">Contact</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={`nav-link ${!isLoggedIn ? "d-none":""}`} to="/tasks">Task</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={`nav-link ${isLoggedIn ? "d-none" : ""}`} to="/login">Login</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={`nav-link ${isLoggedIn ? "d-none" : ""}`} to="/signup">Signup</NavLink>
            </li>
            <li className="nav-item" style={{ borderRadius: "50%" }}>
              <NavLink className={`nav-link bg-light ${!isLoggedIn ? "d-none" : ""}`} to="/profile" style={{ borderRadius: "50%", color: "black" }}>{user?.username?.slice(0, 2)}</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
