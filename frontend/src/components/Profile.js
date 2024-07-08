import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CircularProgress from './CircularProgress';
import axios from 'axios';
// import './Profile.css'; // Assuming you are using CSS file for styling

function Profile({ setIsLoggedIn }) {
  const [user, setUser] = useState(null);
  const [creditInPercentage, setCreditInPercentage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:8000/api/v3/users/user-details", {
          withCredentials: true,
        });
        setUser(response.data.data);
        const credit = response.data.data.creditScore || 0;
        const noOfTasks = 30;
        setCreditInPercentage(Math.floor((credit / (noOfTasks * 10)) * 100));
      } catch (error) {
        console.error(error);
        // Handle error, possibly set user to null or show an error message
      }
    }
    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/api/v3/users/logout", {}, {
        withCredentials: true,
      });
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Logout failed");
    }
  };

  const handleShowCreditCard = () => {
    navigate("/credit-card");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container" style={{transform:"translateY(50px)"}}>
      <div className="profile-header">
        <div className="username">{user.username.toUpperCase()}</div>
        <button className="btn btn-success" onClick={handleShowCreditCard}>View credit card</button>
        <button className="btn btn-danger logout-btn" onClick={handleLogout}>Logout</button>
      </div>
      <div className="profile-body">
        <div className="progress-section">
          <CircularProgress percentage={creditInPercentage} />
        </div>
        <div className="tasks-section">
          <h2>Tasks completed:</h2>
          {user?.tasks?.map((item, index) => (
            <p key={index}>{index + 1}. {item}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
