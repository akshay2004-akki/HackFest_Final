import React from 'react';
import CircularProgress from './CircularProgress';

function CreditScore() {
  const credit = JSON.parse(localStorage.getItem('credit')) || 0;
  const noOfTasks = JSON.parse(localStorage.getItem('numberOfTasks'))
  console.log(noOfTasks);
    const creditInPercentage = Math.floor((credit/(noOfTasks*10))*100)
  return (
    <div style={{ transform: "translateY(60px)", textAlign: 'center' }}>
      <h2>Credit Score</h2>
      <CircularProgress percentage={creditInPercentage} />
    </div>
  );
}

export default CreditScore;
