import React from 'react'

function Signup() {
  return (
    <div style={{transform:"translateY(50px)"}}>
      <div className="form-container2">
      <div className="form-box2">
        <h2>Signup</h2>
        <form>
          <input type="text" placeholder="Username" className="input-field" required />
          <input type="email" placeholder="Email" className="input-field" required />
          <input type="password" placeholder="Password" className="input-field" required />
          <button type="submit" className="submit-button">Signup</button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Signup