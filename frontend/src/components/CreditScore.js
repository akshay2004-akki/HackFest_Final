import React from 'react';
import CircularProgress from './CircularProgress';
import { useNavigate } from 'react-router-dom';

function CreditScore() {
    // const credit = JSON.parse(localStorage.getItem('credit')) || 0;
    const noOfTasks = JSON.parse(localStorage.getItem('numberOfTasks'))
    const completedTask = JSON.parse(localStorage.getItem('tasksCompleted'))
    // console.log((completedTask));

    const user = JSON.parse(localStorage.getItem("loggedInUser"))

    const credit = user? user.credit : 0 
    

  console.log("logged in user credit",credit);
  let creditInPercentage = Math.floor((credit/(noOfTasks*10))*100)
  if(isNaN(creditInPercentage)){
      creditInPercentage = 0
  }

    const route=useNavigate()
    const handleReward = ()=>{
      route("/rewards")
    }
  return (
    <div style={{ transform: "translateY(60px)", textAlign: 'center', height:"100vh" }}>
      <h2>Credit Score</h2>
      <CircularProgress percentage={creditInPercentage} />
      <button className='btn btn-success' onClick={handleReward}>Avail Rewards</button>
      <div style={{display:"flex", flexDirection:"column", justifyContent:"flex-start", width:"70%", transform:"translateX(100px)"}}>
        <h2 style={{fontFamily:"Ubuntu", textAlign:"left"}}>Tasks completed : </h2>
            {
              completedTask &&  completedTask.map((item, index)=><p style={{textAlign:"left", fontFamily:"Poppins", fontSize:"20px"}} key={index}> {index+1}. {""} {item}</p>)
            }
      </div>
    </div>
  );
}

export default CreditScore;
