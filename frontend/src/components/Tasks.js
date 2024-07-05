import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import './Tasks.css'; // Assuming you have some CSS for the task list

const tasksList = [
  'Use public transportation instead of driving',
  'Walk or bike for short trips',
  'Carpool or ride-share when possible',
  'Install energy-efficient light bulbs',
  'Use a programmable thermostat',
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

function Tasks({ credit, setCredit }) {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const email = user.email;

  const [checkedTasks, setCheckedTasks] = useState(() => {
    const storedCheckedTasks = JSON.parse(localStorage.getItem(`${email}_checkedTasks`));
    return storedCheckedTasks || new Array(tasksList.length).fill(false);
  });

  const [uploadedImages, setUploadedImages] = useState(() => {
    const storedUploadedImages = JSON.parse(localStorage.getItem(`${email}_uploadedImages`));
    return storedUploadedImages || new Array(tasksList.length).fill(null);
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem(`${email}_numberOfTasks`, tasksList.length);
  }, [email]);

  useEffect(() => {
    const storedCredit = JSON.parse(localStorage.getItem(`${email}_credit`));
    if (storedCredit !== null) {
      setCredit(storedCredit);
    }
  }, [setCredit, email]);

  useEffect(() => {
    localStorage.setItem(`${email}_checkedTasks`, JSON.stringify(checkedTasks));
  }, [checkedTasks, email]);

  useEffect(() => {
    localStorage.setItem(`${email}_uploadedImages`, JSON.stringify(uploadedImages));
  }, [uploadedImages, email]);

  useEffect(() => {
    const updatedUser = { ...user, credit, tasks: checkedTasks };
    localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
    const users = JSON.parse(localStorage.getItem('users')).map(user =>
      user.email === email ? updatedUser : user
    );
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem(`${email}_credit`, JSON.stringify(credit));
  }, [credit, checkedTasks, user, email]);

  const handleCheckboxChange = (index) => {
    if (uploadedImages[index]) {
      const newCheckedTasks = [...checkedTasks];
      newCheckedTasks[index] = !newCheckedTasks[index];
      setCheckedTasks(newCheckedTasks);

      setTimeout(() => {
        if (newCheckedTasks[index]) {
          setCredit(prevCred => prevCred + 10);
        } else {
          setCredit(prevCred => prevCred - 10);
        }
      }, 1000);
    } else {
      alert('Please upload an image to complete the task.');
    }
  };

  const handleImageUpload = (index, event) => {
    const newUploadedImages = [...uploadedImages];
    newUploadedImages[index] = event.target.files[0];
    setUploadedImages(newUploadedImages);
  };

  const handleCreditNavigate = () => {
    navigate("/check-credit-score");
  };

  useEffect(() => {
    const completedTasks = tasksList.filter((task, index) => checkedTasks[index]);
    localStorage.setItem(`${email}_tasksCompleted`, JSON.stringify(completedTasks));
  }, [checkedTasks, email]);

  return (
    <>
      <div style={{ transform: 'translateY(90px)' }}>
        <div className="tasks-container">
          <h2>Tasks to Reduce Your Carbon Footprint</h2>
          <ul className="tasks-list">
            {tasksList.map((task, index) => (
              <li key={index} className={`task-item ${checkedTasks[index] ? 'completed' : ''}`}>
                <label>
                  <input
                    type="checkbox"
                    checked={checkedTasks[index]}
                    onChange={() => handleCheckboxChange(index)}
                    disabled={checkedTasks[index]}
                  />
                  {task}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => handleImageUpload(index, event)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button className='btn btn-success credit-score' onClick={handleCreditNavigate}>Check credit score</button>
    </>
  );
}

export default Tasks;
