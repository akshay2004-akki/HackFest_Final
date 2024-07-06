import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CircularProgress from './CircularProgress';
import axios from 'axios';

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
        const credit = response.data.data.credit || 0;
        console.log(response.data.data.tasks);
        const noOfTasks = response.data.data.tasks?.length || 1;
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
    <div className="profile-container" style={{ transform: "translateY(90px)" }}>
      <div className="username">{user.username}</div>
      <button className="btn btn-success" onClick={handleShowCreditCard}>View credit card</button>
      <button className="btn btn-danger logout-btn" onClick={handleLogout}>Logout</button>
      <div className="progress-container">
        <CircularProgress percentage={creditInPercentage} />
      </div>
      <div className="tasks-container">
        <h2>Tasks completed:</h2>
        {user?.tasks?.map((item, index) => (
          <p key={index}>{index + 1}. {item}</p>
        ))}
      </div>
    </div>
  );
}

export default Profile;
