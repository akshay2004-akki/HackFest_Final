import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function StudentCardDetails({stuId}) {
  const { studentId } = useParams();
  const studentId2 = localStorage.getItem(`studentId`)
  const [studentDetails, setStudentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v3/studentcard/${studentId || studentId2}`, { withCredentials: true });
        setStudentDetails(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error?.message || 'An error occurred');
        setLoading(false);
      }
    };

    fetchStudentDetails();
  }, [studentId, studentId2]);

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
              {studentDetails?.cardNumber?.match(/.{1,4}/g).map((part, index) => (
                <p key={index}>{part}</p>
              ))}
            </div>
            <div className="row5 card-holder">
              <p>CARD HOLDER</p>
              <p>VALID TILL</p>
            </div>
            <div className="row5 name">
              <p>{`${studentDetails?.firstName} ${studentDetails?.lastName}`}</p>
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
              <p>{studentDetails?.cvv}</p>
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

export default StudentCardDetails;
