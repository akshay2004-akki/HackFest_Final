import React from 'react';
import CircularProgress from './CircularProgress';

function CreditScore() {
    const credit = JSON.parse(localStorage.getItem('credit')) || 0;
    const noOfTasks = JSON.parse(localStorage.getItem('numberOfTasks'))
    const completedTask = JSON.parse(localStorage.getItem('tasksCompleted'))
    console.log((completedTask));
    

  console.log(noOfTasks);
    const creditInPercentage = Math.floor((credit/(noOfTasks*10))*100)
  return (
    <div style={{ transform: "translateY(60px)", textAlign: 'center', height:"100vh" }}>
      <h2>Credit Score</h2>
      <CircularProgress percentage={creditInPercentage} />
      <div style={{display:"flex", flexDirection:"column", justifyContent:"flex-start", width:"70%", transform:"translateX(100px)"}}>
        <h2 style={{fontFamily:"Ubuntu", textAlign:"left"}}>Tasks completed : </h2>
            {
                completedTask.map((item, index)=><p style={{textAlign:"left", fontFamily:"Poppins", fontSize:"20px"}} key={index}> {index+1}. {""} {item}</p>)
            }
      </div>
    </div>
  );
}

export default CreditScore;
