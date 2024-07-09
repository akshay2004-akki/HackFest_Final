import React from 'react';
// import './Card.css'; // Import the CSS file for styling

function Card() {
  return (
    <div className="container">
      <div className="card">
        <div className="card-inner">
          <div className="front">
            <img src="https://i.ibb.co/PYss3yv/map.png" className="map-img" alt="map background" />
            <div className="row">
              <img src="https://i.ibb.co/G9pDnYJ/chip.png" width="60px" alt="chip" />
              <img src="https://i.ibb.co/WHZ3nRJ/visa.png" width="60px" alt="visa logo" />
            </div>
            <div className="row card-no">
              <p>5244</p>
              <p>2150</p>
              <p>8252</p>
              <p>6420</p>
            </div>
            <div className="row card-holder">
              <p>CARD HOLDER</p>
              <p>VALID TILL</p>
            </div>
            <div className="row name">
              <p>JOE ALISON</p>
              <p>10 / 25</p>
            </div>
          </div>
          <div className="back">
            <img src="https://i.ibb.co/PYss3yv/map.png" className="map-img" alt="map background" />
            <div className="bar"></div>
            <div className="row card-cvv">
              <div>
                <img src="https://i.ibb.co/S6JG8px/pattern.png" alt="pattern" />
              </div>
              <p>824</p>
            </div>
            <div className="row card-text">
              <p>this is a virtual card design using HTML and CSS. You can also design something like this.</p>
            </div>
            <div className="row signature">
              <p>CUSTOMER SIGNATURE</p>
              <img src="https://i.ibb.co/WHZ3nRJ/visa.png" width="80px" alt="visa logo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
