import React, { useEffect, useState } from 'react';
import axios from 'axios'

function Webinar() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    message: ''
  }); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const [error, setError] = useState("")
  const[sentEmail, setSentEmail] = useState("")

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
        imageSlider.style.transform = `translateX(-${currentIndex * 150 / totalImages}%)`;
      }
    };

    const interval = setInterval(slideImages, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    try {
      await axios.post("http://localhost:8000/api/v3/webinar-register", formData, {withCredentials:true});
      setSentEmail("An E-mail will be sent to your entered email")
      setTimeout(()=>{
        setSentEmail("")
      },4000)
      // console.log(response);
    } catch (error) {
      // console.log(error?.message);
      setError("Error : You have already registered for this date")
      setTimeout(()=>{
        setError("")
      },4000)
    }
    setFormData({
      name: '',
      email: '',
      date: '',
      message: ''
    });
  };

  return (
    <div className="webinar-container" style={{ transform: 'translateY(50px)' }}>
      <div className="webinar-images">
        <div className="slider" style={{ display: 'flex', transition: 'transform 0.5s', gap:"150px" }}>
          <img src="https://via.placeholder.com/150" alt="Surrounding 1" style={{ width: '12.5%' }} />
          <img src="https://via.placeholder.com/150" alt="Surrounding 2" style={{ width: '12.5%' }} />
          <img src="https://via.placeholder.com/150" alt="Surrounding 3" style={{ width: '12.5%' }} />
          <img src="https://via.placeholder.com/150" alt="Surrounding 4" style={{ width: '12.5%' }} />
          <img src="https://via.placeholder.com/150" alt="Surrounding 1" style={{ width: '12.5%' }} />
          <img src="https://via.placeholder.com/150" alt="Surrounding 2" style={{ width: '12.5%' }} />
          <img src="https://via.placeholder.com/150" alt="Surrounding 3" style={{ width: '12.5%' }} />
          <img src="https://via.placeholder.com/150" alt="Surrounding 4" style={{ width: '12.5%' }} />
          {/* Cloned set of images for seamless transition */}
          <img src="https://via.placeholder.com/150" alt="Surrounding 1" style={{ width: '12.5%' }} />
          <img src="https://via.placeholder.com/150" alt="Surrounding 2" style={{ width: '12.5%' }} />
          <img src="https://via.placeholder.com/150" alt="Surrounding 3" style={{ width: '12.5%' }} />
          <img src="https://via.placeholder.com/150" alt="Surrounding 4" style={{ width: '12.5%' }} />
          <img src="https://via.placeholder.com/150" alt="Surrounding 1" style={{ width: '12.5%' }} />
          <img src="https://via.placeholder.com/150" alt="Surrounding 2" style={{ width: '12.5%' }} />
          <img src="https://via.placeholder.com/150" alt="Surrounding 3" style={{ width: '12.5%' }} />
          <img src="https://via.placeholder.com/150" alt="Surrounding 4" style={{ width: '12.5%' }} />
          <img src="https://via.placeholder.com/150" alt="Surrounding 1" style={{ width: '12.5%' }} />
          <img src="https://via.placeholder.com/150" alt="Surrounding 2" style={{ width: '12.5%' }} />
          <img src="https://via.placeholder.com/150" alt="Surrounding 3" style={{ width: '12.5%' }} />
          <img src="https://via.placeholder.com/150" alt="Surrounding 4" style={{ width: '12.5%' }} />
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
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-button3">Submit</button>
        </form>
        <div className="error my-3" style={{color:"red", fontFamily:"Ubuntu"}}>{error || sentEmail}</div>
      </div>
    </div>
  );
}

export default Webinar;
