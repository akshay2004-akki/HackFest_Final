import React, {useState} from 'react'

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


function Tasks() {
  const [checkedTasks, setCheckedTasks] = useState(new Array(tasksList.length).fill(false));

  const handleCheckboxChange = (index) => {
    const newCheckedTasks = [...checkedTasks];
    newCheckedTasks[index] = !newCheckedTasks[index];
    setCheckedTasks(newCheckedTasks);
  };
  return (
    <div style={{transform:"translateY(90px)"}}>
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
              />
              {task}
            </label>
          </li>
        ))}
      </ul>
    </div>
    </div>
  )
}

export default Tasks