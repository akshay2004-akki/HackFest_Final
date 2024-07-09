import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function OrganizationDetails({ orgId }) {
  const { organizationId } = useParams();
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [org, setOrg] = useState(null);

  useEffect(() => {
    const storedOrganizationId = orgId || organizationId;

    const fetchOrganizationDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v3/card/${storedOrganizationId}`, { withCredentials: true });
        console.log(response);
        setOrganization(response.data.data);
        setOrg(response.data.data);
        setLoading(false);
        localStorage.setItem(`${storedOrganizationId}_organizationDetails`, JSON.stringify(response.data.data)); // Store the organization details in local storage
      } catch (error) {
        setError(error?.message || 'An error occurred');
        setLoading(false);
      }
    };

    const savedOrganizationDetails = localStorage.getItem(`${storedOrganizationId}_organizationDetails`);
    if (savedOrganizationDetails) {
      const parsedDetails = JSON.parse(savedOrganizationDetails);
      setOrganization(parsedDetails);
      setOrg(parsedDetails);
      setLoading(false);
    } else {
      fetchOrganizationDetails();
    }
  }, [orgId, organizationId]);

  const formatCardNumber = (number) => {
    const numberStr = number?.toString();
    return numberStr?.match(/.{1,4}/g) || [];
  };

  const formattedCardNumber = formatCardNumber(org?.cardNumber);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container3">
      <div className="card">
        <div className="card-inner">
          <div className="front">
            <img src="https://i.ibb.co/PYss3yv/map.png" className="map-img" alt="map background" />
            <div className="row5">
              <img src="https://i.ibb.co/G9pDnYJ/chip.png" width="60px" alt="chip" />
              <img src="https://i.ibb.co/WHZ3nRJ/visa.png" width="60px" alt="visa logo" />
            </div>
            <div className="row5 card-no">
              {formattedCardNumber.map((part, index) => (
                <p key={index}>{part}</p>
              ))}
            </div>
            <div className="row5 card-holder">
              <p>CARD HOLDER</p>
              <p>VALID TILL</p>
            </div>
            <div className="row5 name">
              <p>{org?.organizationName}</p>
              <p>10 / 25</p>
            </div>
          </div>
          <div className="back">
            <img src="https://i.ibb.co/PYss3yv/map.png" className="map-img" alt="map background" />
            <div className="bar"></div>
            <div className="row5 card-cvv">
              <div>
                <img src="https://i.ibb.co/S6JG8px/pattern.png" alt="pattern" />
              </div>
              <p>824</p>
            </div>
            <div className="row5 card-text">
              <p>this is a virtual card design using HTML and CSS. You can also design something like this.</p>
            </div>
            <div className="row5 signature">
              <p>CUSTOMER SIGNATURE</p>
              <img src="https://i.ibb.co/WHZ3nRJ/visa.png" width="80px" alt="visa logo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrganizationDetails;
