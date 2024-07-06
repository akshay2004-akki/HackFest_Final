import React, { useState } from 'react';

function OrganizationCreditCardForm() {
  const [formData, setFormData] = useState({
    organizationName: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    taxId: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="green-credit-form-container" style={{transform:"translateY(50px)"}}>
      <h2>Apply for Organization Credit Card</h2>
      <form onSubmit={handleSubmit} className="green-credit-form">
        <div className="green-credit-form-group">
          <label htmlFor="organizationName">Organization Name</label>
          <input type="text" id="organizationName" name="organizationName" value={formData.organizationName} onChange={handleChange} required />
        </div>
        <div className="green-credit-form-group">
          <label htmlFor="contactPerson">Contact Person</label>
          <input type="text" id="contactPerson" name="contactPerson" value={formData.contactPerson} onChange={handleChange} required />
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
    </div>
  );
}

export default OrganizationCreditCardForm;
