import React, { useEffect, useRef } from 'react';
import greeCreditCard from '../images/realistic-credit-card-mockup-natural-background_71042-532.jpg';

function Home() {
  const typewriterRef = useRef(null);

  useEffect(() => {
    const typewriterText = "Welcome to Green Project India";
    const speed = 100; // typing speed in milliseconds
    const delay = 2000; // delay before restarting the typing

    let charIndex = 0;
    let interval;

    const startTyping = () => {
      charIndex = 0;
      interval = setInterval(() => {
        if (charIndex <= typewriterText.length) {
          typewriterRef.current.textContent = typewriterText.substring(0, charIndex);
          charIndex++;
        } else {
          clearInterval(interval);
          setTimeout(startTyping, delay); // restart after delay
        }
      }, speed);
    };

    startTyping();

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className='welcome' style={{ transform: "translateY(50px)", height: "100vh" }}>
        <h1 ref={typewriterRef} className="typewriter-text" style={{height:"60px"}}>.</h1>
        <p style={{ marginTop: '20px', fontSize: '1.5rem', maxWidth: '600px' , fontFamily:"Ubuntu"}}>
            At Green Project India, we are dedicated to promoting environmental sustainability. Our mission is to encourage individuals and organizations to take proactive steps in reducing their carbon footprint through our innovative green credit system. Join us in making a positive impact on the environment and earning rewards for your eco-friendly actions.
        </p>
      </div>
      <div className="landing-page" style={{ transform: "translateY(60px)" ,padding:"50px"}}>
        <div className="container">
          <main className="main-content">
            <div className="content">
              <h1>Green Credit</h1>
              <p>At Green Project India, we believe that promoting environmental sustainability is everyone's responsibility. That's why we've developed an innovative green credit management system that incentivizes individuals and organizations to contribute towards the betterment of the environment and promote sustainable practices. Our green credit system rewards you with credits when you take steps to reduce your carbon footprint, such as using public transportation, planting trees, and reducing energy consumption. These credits can be used to avail discounts, bonuses, and other benefits at partner outlets, making it a win-win for both individuals and the environment.</p>
              <button className="read-more-button" style={{width:"25%", fontSize:"20.5px"}}>Read More</button>
            </div>
            <div className="image">
              <img src={greeCreditCard} alt="Green Credit Card" style={{ height: "100%", width: "100%" }} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Home;
