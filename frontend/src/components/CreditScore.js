import React, { useEffect, useState } from 'react';
import CircularProgress from './CircularProgress';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

function CreditScore() {
  const [creditScore, setCreditScore] = useState(0);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [role, setRole] = useState("student")
  const [tasksList, setTasksList] = useState([])
  const navigate = useNavigate();
  // useEffect(() => {
    
  // }, [role]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v3/users/user-details", {
          withCredentials: true,
        });
        const user = response.data;
        setRole(user.data?.role)
        const tasks = role === 'student' ? studentTasks : organizationTasks;
        setTasksList(tasks)
        setCreditScore(user.data.creditScore || 0);
        const tasksCompleted = user.data.tasksCompleted || [];
        const completedTasksList = tasksCompleted.map((completed, index) => {
          return completed ? tasksList[index] : null;
        }).filter(task => task !== null);

        setCompletedTasks(completedTasksList);
      } catch (error) {
        console.error('Error fetching user data:', error);
        alert('Failed to fetch user data. Please try again later.');
      }
    };
    fetchUserData();
  }, [role, tasksList]);

  const handleReward = () => {
    navigate("/rewards");
  };

  const noOfTasks = tasksList.length;
  let creditInPercentage = Math.floor((creditScore / (noOfTasks * 10)) * 100);
  if (isNaN(creditInPercentage)) {
    creditInPercentage = 0;
  }

  return (
    <div style={{ transform: "translateY(60px)", textAlign: 'center', height: "100vh" }}>
      <h2>Credit Score</h2>
      <CircularProgress percentage={creditInPercentage} />
      <button className='btn btn-success' onClick={handleReward}>Avail Rewards</button>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", width: "70%", transform: "translateX(100px)" }}>
        <h2 style={{ fontFamily: "Ubuntu", textAlign: "left" }}>Tasks completed : </h2>
        {
          completedTasks.map((task, index) => (
            <p style={{ textAlign: "left", fontFamily: "Poppins", fontSize: "20px" }} key={index}>
              {index + 1}. {task}
            </p>
          ))
        }
      </div>
    </div>
  );
}

export default CreditScore;
