import React from 'react';
import CircularProgress from './CircularProgress';
import { useNavigate } from 'react-router-dom';

function CreditScore({ user }) {
  const noOfTasks = JSON.parse(localStorage.getItem(`${user?.email}_numberOfTasks`)) || 0;
  const completedTask = JSON.parse(localStorage.getItem(`${user?.email}_tasksCompleted`)) || [];
  const credit = JSON.parse(localStorage.getItem(`${user?.email}_credit`)) || 0;

  let creditInPercentage = Math.floor((credit / (noOfTasks * 10)) * 100);
  if (isNaN(creditInPercentage)) {
    creditInPercentage = 0;
  }

  const navigate = useNavigate();
  const handleReward = () => {
    navigate("/rewards");
  };

  return (
    <div style={{ transform: "translateY(60px)", textAlign: 'center', height: "100vh" }}>
      <h2>Credit Score</h2>
      <CircularProgress percentage={creditInPercentage} />
      <button className='btn btn-success' onClick={handleReward}>Avail Rewards</button>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", width: "70%", transform: "translateX(100px)" }}>
        <h2 style={{ fontFamily: "Ubuntu", textAlign: "left" }}>Tasks completed :</h2>
        {completedTask.map((item, index) => (
          <p style={{ textAlign: "left", fontFamily: "Poppins", fontSize: "20px" }} key={index}> {index + 1}. {item}</p>
        ))}
      </div>
    </div>
  );
}

export default CreditScore;
