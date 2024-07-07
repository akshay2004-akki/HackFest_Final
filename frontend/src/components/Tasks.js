import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
  const [checkedTasks, setCheckedTasks] = useState(new Array(tasksList.length).fill(false));
  const [uploadedImages, setUploadedImages] = useState(new Array(tasksList.length).fill(null));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasksAndCredit = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v3/users/user-details', {
          withCredentials: true,
        });
        const userData = response.data.data;
        setCheckedTasks(userData.tasksCompleted || new Array(tasksList.length).fill(false));
        setCredit(userData.creditScore || 0);
        setUploadedImages(userData.uploadedImages || new Array(tasksList.length).fill(null));
      } catch (error) {
        console.error('Error fetching tasks and credit:', error);
      }
    };

    fetchTasksAndCredit();
  }, [setCredit]);

  const handleCheckboxChange = async (index) => {
    if (uploadedImages[index]) {
      const newCheckedTasks = [...checkedTasks];
      newCheckedTasks[index] = !newCheckedTasks[index];
      setCheckedTasks(newCheckedTasks);

      try {
        const updatedCredit = newCheckedTasks[index] ? credit + 10 : credit - 10;
        setCredit(updatedCredit);

        const formData = new FormData();
        formData.append('tasksCompleted', JSON.stringify(newCheckedTasks));
        formData.append('creditScore', updatedCredit);
        formData.append('uploadedImage', uploadedImages[index]);

        await axios.put('http://localhost:8000/api/v3/users/update-tasks', formData, {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } catch (error) {
        console.error('Error updating tasks and credit:', error);
      }
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
                    disabled={checkedTasks[index]}  // Disable checkbox if task is checked
                  />
                  {task}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => handleImageUpload(index, event)}
                  disabled={checkedTasks[index]}  // Disable file upload if task is checked
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
