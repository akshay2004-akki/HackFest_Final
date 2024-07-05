import React from 'react';
import { useNavigate } from 'react-router-dom';
import CircularProgress from './CircularProgress';
// import './Profile.css';

function Profile({ setIsLoggedIn }) {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const credit = user ? user.credit : 0;
  const noOfTasks = JSON.parse(localStorage.getItem('numberOfTasks')) || 1; // Avoid division by zero
  let creditInPercentage = Math.floor((credit / (noOfTasks * 10)) * 100);
  if (isNaN(creditInPercentage)) {
    creditInPercentage = 0;
  }

  const completedTask = JSON.parse(localStorage.getItem("users"))?.find((u) => u.email === user.email)?.tasks || [];

  const route = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    route("/login");
  };

  return (
    <div className="profile-container" style={{transform:"translateY(90px)"}}>
      <div className="username">{user?.username}</div>
      <button className="btn btn-danger logout-btn" onClick={handleLogout}>Logout</button>
      <div className="progress-container">
        <CircularProgress percentage={creditInPercentage} />
      </div>
      <div className="tasks-container">
        <h2>Tasks completed:</h2>
        {completedTask && completedTask.map((item, index) => (
          <p key={index}> {index + 1}. {item}</p>
        ))}
      </div>
    </div>
  );
}

export default Profile;
