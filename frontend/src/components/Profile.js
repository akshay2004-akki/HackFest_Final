import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CircularProgress from './CircularProgress';
import axios from 'axios';
// import './Profile.css'; // Assuming you are using CSS file for styling

const studentTasks = [
  'Use public transportation instead of driving',
  'Walk or bike for short trips',
  'Use reusable water bottles',
  'Participate in campus recycling programs',
  'Use digital textbooks when possible',
'Reduce, reuse, and recycle',
  'Avoid single-use plastics',
  'Use reusable shopping bags',
  'Compost food waste',
  'Purchase energy-efficient appliances',
  'Reduce water usage',
  'Turn off lights when not in use',
  'Unplug electronics when not in use',
  'Wash clothes in cold water',
  'Air-dry clothes instead of using a dryer',
  'Install low-flow showerheads and faucets',
  'Take shorter showers',
  'Use a rain barrel to collect rainwater',
  'Plant trees and native plants',
  'Eat less meat',
  'Buy local and seasonal produce',
  'Reduce paper usage',
  'Opt for digital receipts',
  'Support renewable energy sources',
  'Avoid fast fashion',
  'Use a reusable water bottle',
  'Support green businesses',
  'Upgrade insulation in your home',
  'Use a laptop instead of a desktop computer',
  'Advocate for environmental policies'
];

const organizationTasks = [
  'Implement a company-wide recycling program',
  'Encourage remote work to reduce commuting',
  'Use energy-efficient lighting in the office',
  'Organize green initiatives for employees',
  'Switch to eco-friendly office supplies',
  "Upgrade to energy-efficient equipment and machinery.",
  "Implement energy management systems.",
  "Conduct regular energy audits to identify areas for improvement.",
  "Use LED lighting and smart lighting systems.",
  "Encourage carpooling, public transportation, biking, and walking among employees.",
  "Transition to electric or hybrid company vehicles.",
  "Implement telecommuting policies to reduce travel emissions.",
  "Implement recycling and composting programs.",
  "Reduce, reuse, and recycle materials used in operations.",
  "Minimize packaging waste.",
  "Regularly measure and report carbon emissions.",
  "Set targets for reduction and track progress.",
  "Use frameworks like the Carbon Disclosure Project (CDP) or Science-Based Targets initiative (SBTi).",
  "Design and construct buildings to meet green building standards such as LEED or BREEAM.",
  "Retrofit existing buildings with energy-efficient systems.",
  "Invest in research and development for new technologies that reduce emissions.",
  "Foster a culture of innovation focused on sustainability."

];

function Profile({ setIsLoggedIn }) {
  const [user, setUser] = useState(null);
  const [creditInPercentage, setCreditInPercentage] = useState(0);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [role, setRole] = useState("student")
  const [tasksList, setTasksList] = useState([])
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchrole = async()=>{
      const res = await axios.get(`${process.env.REACT_APP_SERVER_PORT}/api/v3/users/user-details`, {withCredentials:true});
      setRole(res.data?.data?.role) 
    }
    fetchrole()
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_PORT}/api/v3/users/user-details`, {
          withCredentials: true,
        });
        const userData = response.data.data;
        setUser(userData);
        const tasks = role === 'student' ? studentTasks : organizationTasks;
        setTasksList(tasks)
        const credit = userData.creditScore || 0;
        const noOfTasks = tasksList.length;
        setCreditInPercentage(Math.floor((credit / (noOfTasks * 10)) * 100));

        const tasksCompleted = userData.tasksCompleted || [];
        const completedTasksList = tasksCompleted.map((completed, index) => {
          return completed ? tasksList[index] : null;
        }).filter(task => task !== null);

        setCompletedTasks(completedTasksList);
      } catch (error) {
        console.error(error);
        // Handle error, possibly set user to null or show an error message
      }
    }
    fetchData();
  }, [role, tasksList]);

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_PORT}/api/v3/users/logout`, {}, {
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
    <div className="profile-container" style={{ transform: "translateY(50px)" }}>
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
          {completedTasks.map((task, index) => (
            <p key={index}>{index + 1}. {task}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
