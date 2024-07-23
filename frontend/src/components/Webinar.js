import React, { useEffect, useState } from 'react';
import axios from 'axios';
import wbinarImage1 from '../images/hackfest image.png'
import webinarImage2 from '../images/hackfest image2.jpg'
import webinarImage3 from '../images/hackfest image3.jpg'

// Helper function to generate the next 7 days' worth of date slots
const generateDateSlots = (days = 7) => {
  const dateSlots = [];
  const today = new Date();
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dateSlots.push(date.toISOString().split('T')[0]); // Get the date in YYYY-MM-DD format
  }
  return dateSlots;
};

function Webinar() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    message: ''
  });

  const [error, setError] = useState('');
  const [sentEmail, setSentEmail] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    const imageSlider = document.querySelector('.slider');
    let currentIndex = 0;

    const slideImages = () => {
      const totalImages = imageSlider.children.length / 2;
      currentIndex = (currentIndex + 1) % totalImages;

      if (currentIndex === 0) {
        imageSlider.style.transitionDuration = '0.5s';
        imageSlider.style.transform = `translateX(0%)`;
      } else {
        imageSlider.style.transitionDuration = '0.4s';
        imageSlider.style.transform = `translateX(-${currentIndex * 170 / totalImages}%)`;
      }
    };

    const interval = setInterval(slideImages, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_PORT}/api/v3/webinar-register`, formData, { withCredentials: true });
      setSentEmail("An E-mail will be sent to your entered email");
      setTimeout(() => {
        setSentEmail("");
      }, 4000);
    } catch (error) {
      setError("Error: You have already registered for this date");
      setTimeout(() => {
        setError("");
      }, 4000);
    }
    setFormData({
      name: '',
      email: '',
      date: '',
      message: ''
    });
  };

  const dateSlots = generateDateSlots();

  return (
    <div className="webinar-container" style={{ transform: 'translateY(50px)' }}>
      <div className="webinar-images">
        <div className="slider" style={{ display: 'flex', transition: 'transform 0.5s',gap: "120px"}}>
          <img src={wbinarImage1} alt="Surrounding 1"  />
          <img src={webinarImage2} alt="Surrounding 2"  />
          <img src={webinarImage3} alt="Surrounding 3"  />
        </div>
      </div>
      <div className="webinar-form-container my-5">
        <h2 style={{ fontFamily: 'Ubuntu' }}>Register for the Webinar</h2>
        <form onSubmit={handleSubmit} className="webinar-form">
          <div className="form-group3">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group3">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group3">
            <label htmlFor="date">Date:</label>
            <select
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            >
              <option value="">Select a date</option>
              {dateSlots.map((date) => (
                <option key={date} value={date}>
                  {new Date(date).toLocaleDateString()}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="submit-button3">Submit</button>
        </form>
        <div className="error my-3" style={{ color: "red", fontFamily: "Ubuntu" }}>{error || sentEmail}</div>
      </div>
    </div>
  );
}

export default Webinar;
