import React, { useState, useEffect } from 'react';
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
// function Tasks({ credit, setCredit }) {
//   const [checkedTasks, setCheckedTasks] = useState(new Array(tasksList.length).fill(false));
//   const [uploadedImages, setUploadedImages] = useState(new Array(tasksList.length).fill(null));
//   const navigate = useNavigate();
function Tasks({ setCredit }) {
  const [tasksList, setTasksList] = useState([]);
  const [checkedTasks, setCheckedTasks] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [role, setRole] = useState("student")
  const navigate = useNavigate();
  
  // useEffect(()=>{
  //   const fetchRole = async ()=>{
  //     const response = await axios.get()
  //   }
  // })

  useEffect(() => {
    const tasks = role === 'student' ? studentTasks : organizationTasks;
    setTasksList(tasks);
    setCheckedTasks(new Array(tasks.length).fill(false));
    setUploadedImages(new Array(tasks.length).fill(null));
  }, [role]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v3/users/user-details", {
          withCredentials: true,
        });
        const user = response.data;

        setRole(user?.data?.role)

        const fetchedTasks = user.data.tasksCompleted || new Array(tasksList.length).fill(false);
        const fetchedImages = user.uploadedImages || new Array(tasksList.length).fill(null);
        const fetchedCredit = user.data.creditScore || 0;

        setCheckedTasks(fetchedTasks);
        setUploadedImages(fetchedImages);
        setCredit(fetchedCredit);
      } catch (error) {
        console.error('Error fetching user data:', error);
        alert('Failed to fetch user data. Please try again later.');
      }
    };
    fetchUserData();
  }, []);

  const handleCheckboxChange = async (index) => {
    if (uploadedImages[index]) {
      const newCheckedTasks = [...checkedTasks];
      newCheckedTasks[index] = !newCheckedTasks[index];
      setCheckedTasks(newCheckedTasks);

      const updatedCredit = newCheckedTasks.filter(task => task).length * 10;
      setCredit(updatedCredit);
      try {
        const formData = new FormData();
        formData.append('tasksCompleted', JSON.stringify(newCheckedTasks));
        formData.append('creditScore', updatedCredit);
        uploadedImages.forEach((image, i) => {
          if (image) {
            formData.append('uploadedImages', image, image.name);
          }
        });

        await axios.put("http://localhost:8000/api/v3/users/update-tasks", formData, {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        alert('Tasks updated successfully.');
      } catch (error) {
        console.error('Error updating tasks:', error);
        alert('Failed to update tasks. Please try again later.');
      }
    } else {
      alert('Please upload an image to complete the task.');
    }
  };

  const handleImageUpload = (index, event) => {
    const file = event.target.files[0];
    if (file && file.size < 5000000 && file.type.startsWith('image/')) { // 5MB limit
      const newUploadedImages = [...uploadedImages];
      newUploadedImages[index] = file;
      setUploadedImages(newUploadedImages);
    } else {
      alert('Please upload a valid image file (max size: 5MB).');
    }
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
