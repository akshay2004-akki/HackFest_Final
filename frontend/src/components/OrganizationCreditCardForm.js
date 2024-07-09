import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function OrganizationCreditCardForm({organizationId, setOrganizationId}) {
  const [formData, setFormData] = useState({
    organizationName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    taxId: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    try {
      const response = await axios.post("http://localhost:8000/api/v3/card/add", formData, { withCredentials: true });
      console.log(response);
      const orgId = response.data.data._id;
      setOrganizationId(orgId);

      // Store organization details in local storage with unique key
      localStorage.setItem(`organizationDetails_${orgId}`, JSON.stringify(response.data.data));
      localStorage.setItem(`${organizationId}_organizationId`, orgId);

      // Navigate to show card details
      // navigate(`/show-card-details/${orgId}`);
    } catch (error) {
      console.error(error?.message);
    }
  };

  const handleNavigate = ()=>{
    const storedOrganizationId = localStorage.getItem(`${organizationId}_organizationId`) || organizationId;
    if (storedOrganizationId) {
      navigate(`/show-card-details/${storedOrganizationId}`);
    } else {
      alert("No organization ID found. Please submit the form first.");
    }
  }

  return (
    <div className="green-credit-form-container" style={{ transform: "translateY(50px)" }}>
      <h2>Apply for Organization Credit Card</h2>
      <form onSubmit={handleSubmit} className="green-credit-form">
        <div className="green-credit-form-group">
          <label htmlFor="organizationName">Organization Name</label>
          <input type="text" id="organizationName" name="organizationName" value={formData.organizationName} onChange={handleChange} required />
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
        <div className="green-credit-form-group">
          <label htmlFor="taxId">Tax ID</label>
          <input type="text" id="taxId" name="taxId" value={formData.taxId} onChange={handleChange} required />
        </div>
        <button type="submit" className="green-credit-submit-btn">Submit</button>
      </form>

      <button className="btn btn-success" onClick={handleNavigate}>Show card details</button>
    </div>
  );
}

export default OrganizationCreditCardForm;
