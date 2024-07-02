import React, { useEffect, useRef, useState } from "react";
import greeCreditCard from "../images/realistic-credit-card-mockup-natural-background_71042-532.jpg";
import solar from '../images/soloar greenry.jpg';
import { useNavigate } from "react-router-dom";

function Home() {
  const typewriterRef = useRef(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const route = useNavigate()
  const handleApply = ()=>{
    if(!isLoggedIn){
      route("/login")
    }
    route("/apply-green-credit")
  }

  useEffect(() => {
    const typewriterText = "Welcome to Green Project India";
    const speed = 100; // typing speed in milliseconds
    const delay = 2000; // delay before restarting the typing

    let charIndex = 0;
    let interval;

    const startTyping = () => {
      charIndex = 0;
      interval = setInterval(() => {
        if (typewriterRef.current) {
          if (charIndex <= typewriterText.length) {
            typewriterRef.current.textContent = typewriterText.substring(
              0,
              charIndex
            );
            charIndex++;
          } else {
            clearInterval(interval);
            setTimeout(startTyping, delay); // restart after delay
          }
        } else {
          clearInterval(interval);
        }
      }, speed);
    };

    startTyping();

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="welcome" style={{transform:"translateY(50px)"}}>
        <h1 ref={typewriterRef} className="typewriter-text">.</h1>
        <p style={{fontSize:"21px", fontFamily:"Poppins"}}>
          At Green Project India, we are dedicated to promoting environmental
          sustainability. Our mission is to encourage individuals and
          organizations to take proactive steps in reducing their carbon
          footprint through our innovative green credit system. Join us in
          making a positive impact on the environment and earning rewards for
          your eco-friendly actions.
        </p>
      </div>
      <div className="landing-page">
        <div className="container">
          <main className="main-content">
            <div className="content">
              <h1 style={{fontFamily:"Ubuntu"}}>Green Credit</h1>
              <p style={{fontFamily:"Poppins"}}>
                At Green Project India, we believe that promoting environmental
                sustainability is everyone's responsibility. That's why we've
                developed an innovative green credit management system that
                incentivizes individuals and organizations to contribute towards
                the betterment of the environment and promote sustainable
                practices. Our green credit system rewards you with credits when
                you take steps to reduce your carbon footprint, such as using
                public transportation, planting trees, and reducing energy
                consumption. These credits can be used to avail discounts,
                bonuses, and other benefits at partner outlets, making it a
                win-win for both individuals and the environment.
              </p>
              <span style={{display:"flex", gap:"40px"}}><button className="read-more-button">Read More</button> <button className="read-more-button" onClick={handleApply}>Apply</button></span>
            </div>
            <div className="image">
              <img src={greeCreditCard} alt="Green Credit Card" />
            </div>
          </main>
        </div>
      </div>
      <div className="sustainable">
        <div className="container">
          <main className="main-content2">
            <div className="content2">
              <h1>
                Sustainable Banking: <br />
                Our Green Credit System Helps Banks Go Green
              </h1>
              <p>
                Learn how our green credit system is helping banks across India
                embrace sustainability, reduce carbon footprint, and drive cost
                savings.
              </p>
              <ul>
                <li>Green credit system implementation</li>
                <li>Carbon footprint reduction</li>
              </ul>
              <button className="read-more-button">Read More</button>
            </div>
            <div className="image2">
              <img src={solar} alt="Solar Greenery" />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Home;
