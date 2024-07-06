import React,{useState} from 'react'

function GreenCard() {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleCardClick = () => {
      setIsFlipped(!isFlipped);
    };
  
    return (
      <div style={{transform:"translateY(50px)"}}>
        <div className={`credit-card ${isFlipped ? 'flipped' : ''}`} onClick={handleCardClick}>
        <div className="credit-card-front">
          <div className="credit-card-logo">Green Credit</div>
          <div className="credit-card-number"> {String(Math.ceil(Math.random() * 10000000000000000)).padStart(16, '0').replace(/(\d{4})(?=\d)/g, '$1 ')} </div>
          <div className="credit-card-name">John Doe</div>
          <div className="credit-card-expiry">12/34</div>
        </div>
        <div className="credit-card-back">
          <div className="credit-card-stripe"></div>
          <div className="credit-card-signature">John Doe</div>
          <div className="credit-card-cvv">123</div>
        </div>
      </div>
      </div>
    );
}

export default GreenCard