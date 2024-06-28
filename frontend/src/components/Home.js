import React from 'react'
import greeCreditCard from '../images/realistic-credit-card-mockup-natural-background_71042-532.jpg'

function Home() {
  return (
    <div className="landing-page" style={{transform: "translateY(60px)"}}>
      <div className="container">
        <main className="main-content">
          <div className="content">
            <h1>Green Credit</h1>
            <p>At Green Project India, we believe that promoting environmental sustainability is everyone's responsibility. That's why we've developed an innovative green credit management system that incentivizes individuals and organizations to contribute towards the betterment of the environment and promote sustainable practices. Our green credit system rewards you with credits when you take steps to reduce your carbon footprint, such as using public transportation, planting trees, and reducing energy consumption. These credits can be used to avail discounts, bonuses, and other benefits at partner outlets, making it a win-win for both individuals and the environment.</p>
            <button className="read-more-button">Read More</button>
          </div>
          <div className="image">
            <img src={greeCreditCard} alt="Green Credit Card" style={{height:"100%", width:"100%"}}/>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Home