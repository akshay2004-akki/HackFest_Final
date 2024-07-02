import React from 'react';
// import { Link } from 'react-router-dom';
// import './Footer.css';

function Footer() {
  return (
    <footer className="footer" style={{transform:"translateY(70px)", display:"flex", alignItems:"center"}}>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section about">
            <h3>Green Project India</h3>
            <p>
              Green Project India is dedicated to promoting environmental sustainability by encouraging individuals and organizations to reduce their carbon footprint through innovative green credit systems.
            </p>
          </div>
          <div className="footer-section contact">
            <h3>Contact Us</h3>
            <p>Email: info@greenprojectindia.com</p>
            <p>Phone: +91 1234567890</p>
            <p>Address: 123 Green Street, New Delhi, India</p>
          </div>
        </div>
        <div className="footer-bottom"style={{display:"flex",justifyContent:"center", width:"100%"}}>
          &copy; 2024 Green Project India | Designed by Green Project India Team
        </div>
      </div>
    </footer>
  );
}

export default Footer;
