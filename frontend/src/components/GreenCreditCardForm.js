import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function GreenCreditCardForm({studentId, setStudentId}) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/v3/studentcard/student-credit', formData, { withCredentials: true });
      console.log('Form submitted:', response.data);
      const stuId = response.data.data?._id;
      setStudentId(stuId);

      // Store studentId in localStorage
      localStorage.setItem(`studentId`, stuId);
    } catch (error) {
      console.error('Error submitting form:', error?.response?.data || error.message);
    }
  };

  const route = useNavigate();

  const handleNavigate = () => {
    const storedStudentId = localStorage.getItem(`studentId`) || studentId ;
    console.log(storedStudentId);
    if (storedStudentId) {
      route(`/student/${storedStudentId}`);
    } else {
      console.error('Student Id not found in localStorage');
    }
  };

  return (
    <div className="green-credit-form-container" style={{ transform: "translateY(50px)" }}>
      <h2>Apply for Green Credit Card</h2>
      <form onSubmit={handleSubmit} className="green-credit-form">
        <div className="green-credit-form-group">
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div className="green-credit-form-group">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>
        <div className="green-credit-form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="green-credit-form-group">
          <label htmlFor="phone">Phone</label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="green-credit-form-group">
          <label htmlFor="address">Address</label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div className="green-credit-form-group">
          <label htmlFor="city">City</label>
          <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
        </div>
        <div className="green-credit-form-group">
          <label htmlFor="state">State</label>
          <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} required />
        </div>
        <div className="green-credit-form-group">
          <label htmlFor="zip">ZIP Code</label>
          <input type="text" id="zip" name="zip" value={formData.zip} onChange={handleChange} required />
        </div>
        <button type="submit" className="green-credit-submit-btn">Submit</button>
      </form>
      <button className="btn btn-success" onClick={handleNavigate}>show credit card</button>
    </div>
  );
}

export default GreenCreditCardForm;
