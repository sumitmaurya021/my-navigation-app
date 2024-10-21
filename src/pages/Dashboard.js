import React, { useState } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { motion, AnimatePresence } from "framer-motion";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import './Dashboard.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Data for the Line chart (Sales Over Time)
const lineChartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Sales',
      data: [120, 190, 300, 500, 200, 300],
      borderColor: '#4bc0c0',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderWidth: 2,
    },
  ],
};

// Data for the Bar chart (Tasks Completed Weekly)
const barChartData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      label: 'Tasks Completed',
      data: [5, 7, 4, 8],
      backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)'],
      borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
      borderWidth: 1,
    },
  ],
};

// Data for Doughnut chart (Task Completion Percentage)
const doughnutChartData = {
  labels: ['Completed', 'In Progress', 'Pending'],
  datasets: [
    {
      data: [60, 25, 15],
      backgroundColor: ['#36a2eb', '#ffce56', '#ff6384'],
      hoverBackgroundColor: ['#36a2eb', '#ffce56', '#ff6384'],
    },
  ],
};

// Sample table data with photo
const fakeTableData = [
  { name: 'John Doe', role: 'Developer', tasksCompleted: 8, hoursWorked: 40, photo: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { name: 'Jane Smith', role: 'Intern', tasksCompleted: 5, hoursWorked: 30, photo: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { name: 'Alex Johnson', role: 'Developer', tasksCompleted: 10, hoursWorked: 45, photo: 'https://randomuser.me/api/portraits/men/2.jpg' },
  { name: 'Emily Davis', role: 'Developer', tasksCompleted: 12, hoursWorked: 50, photo: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { name: 'Michael Brown', role: 'Developer', tasksCompleted: 9, hoursWorked: 42, photo: 'https://randomuser.me/api/portraits/men/3.jpg' },
  { name: 'Olivia Wilson', role: 'Intern', tasksCompleted: 6, hoursWorked: 28, photo: 'https://randomuser.me/api/portraits/women/3.jpg' },
  { name: 'David Clark', role: 'Developer', tasksCompleted: 15, hoursWorked: 55, photo: 'https://randomuser.me/api/portraits/men/4.jpg' },
  { name: 'Sophia White', role: 'Intern', tasksCompleted: 4, hoursWorked: 20, photo: 'https://randomuser.me/api/portraits/women/4.jpg' },
  { name: 'Daniel Harris', role: 'Developer', tasksCompleted: 11, hoursWorked: 48, photo: 'https://randomuser.me/api/portraits/men/5.jpg' },
  { name: 'Emma Lewis', role: 'Developer', tasksCompleted: 10, hoursWorked: 45, photo: 'https://randomuser.me/api/portraits/women/5.jpg' },
  { name: 'Lucas Young', role: 'Intern', tasksCompleted: 7, hoursWorked: 32, photo: 'https://randomuser.me/api/portraits/men/6.jpg' },
  { name: 'Ava Hall', role: 'Developer', tasksCompleted: 13, hoursWorked: 50, photo: 'https://randomuser.me/api/portraits/women/6.jpg' },
  { name: 'Noah Adams', role: 'Intern', tasksCompleted: 5, hoursWorked: 29, photo: 'https://randomuser.me/api/portraits/men/7.jpg' },
  { name: 'Mia King', role: 'Developer', tasksCompleted: 9, hoursWorked: 42, photo: 'https://randomuser.me/api/portraits/women/7.jpg' },
  { name: 'Liam Scott', role: 'Developer', tasksCompleted: 14, hoursWorked: 52, photo: 'https://randomuser.me/api/portraits/men/8.jpg' },
  { name: 'Isabella Green', role: 'Intern', tasksCompleted: 6, hoursWorked: 31, photo: 'https://randomuser.me/api/portraits/women/8.jpg' },
  { name: 'Ethan Martinez', role: 'Developer', tasksCompleted: 16, hoursWorked: 58, photo: 'https://randomuser.me/api/portraits/men/9.jpg' },
  { name: 'Charlotte Anderson', role: 'Developer', tasksCompleted: 10, hoursWorked: 46, photo: 'https://randomuser.me/api/portraits/women/9.jpg' },
  { name: 'James Garcia', role: 'Intern', tasksCompleted: 4, hoursWorked: 24, photo: 'https://randomuser.me/api/portraits/men/10.jpg' },
  { name: 'Amelia Thomas', role: 'Developer', tasksCompleted: 12, hoursWorked: 49, photo: 'https://randomuser.me/api/portraits/women/10.jpg' },
  { name: 'Benjamin Moore', role: 'Developer', tasksCompleted: 8, hoursWorked: 41, photo: 'https://randomuser.me/api/portraits/men/11.jpg' },
  { name: 'Harper Taylor', role: 'Intern', tasksCompleted: 5, hoursWorked: 27, photo: 'https://randomuser.me/api/portraits/women/11.jpg' },
  { name: 'Alexander Gonzalez', role: 'Developer', tasksCompleted: 11, hoursWorked: 47, photo: 'https://randomuser.me/api/portraits/men/12.jpg' },
  { name: 'Evelyn Martinez', role: 'Developer', tasksCompleted: 9, hoursWorked: 43, photo: 'https://randomuser.me/api/portraits/women/12.jpg' },
  { name: 'Logan Perez', role: 'Intern', tasksCompleted: 6, hoursWorked: 30, photo: 'https://randomuser.me/api/portraits/men/13.jpg' },
  { name: 'Abigail Turner', role: 'Developer', tasksCompleted: 15, hoursWorked: 54, photo: 'https://randomuser.me/api/portraits/women/13.jpg' },
  { name: 'Henry Brooks', role: 'Developer', tasksCompleted: 7, hoursWorked: 40, photo: 'https://randomuser.me/api/portraits/men/14.jpg' },
  { name: 'Ella Campbell', role: 'Intern', tasksCompleted: 4, hoursWorked: 22, photo: 'https://randomuser.me/api/portraits/women/14.jpg' },
  { name: 'Samuel Rogers', role: 'Developer', tasksCompleted: 11, hoursWorked: 48, photo: 'https://randomuser.me/api/portraits/men/15.jpg' },
  { name: 'Avery Hill', role: 'Developer', tasksCompleted: 10, hoursWorked: 45, photo: 'https://randomuser.me/api/portraits/women/15.jpg' },
  { name: 'Sebastian Murphy', role: 'Intern', tasksCompleted: 7, hoursWorked: 33, photo: 'https://randomuser.me/api/portraits/men/16.jpg' },
  { name: 'Lily Collins', role: 'Developer', tasksCompleted: 13, hoursWorked: 51, photo: 'https://randomuser.me/api/portraits/women/16.jpg' },
  { name: 'Jackson Hughes', role: 'Developer', tasksCompleted: 9, hoursWorked: 44, photo: 'https://randomuser.me/api/portraits/men/17.jpg' },
  { name: 'Sofia Edwards', role: 'Intern', tasksCompleted: 5, hoursWorked: 28, photo: 'https://randomuser.me/api/portraits/women/17.jpg' },
  { name: 'Matthew Ward', role: 'Developer', tasksCompleted: 14, hoursWorked: 53, photo: 'https://randomuser.me/api/portraits/men/18.jpg' },
  { name: 'Zoe Russell', role: 'Developer', tasksCompleted: 12, hoursWorked: 50, photo: 'https://randomuser.me/api/portraits/women/18.jpg' },
  { name: 'Daniel Martinez', role: 'Intern', tasksCompleted: 6, hoursWorked: 29, photo: 'https://randomuser.me/api/portraits/men/19.jpg' },
  { name: 'Grace Griffin', role: 'Developer', tasksCompleted: 15, hoursWorked: 56, photo: 'https://randomuser.me/api/portraits/women/19.jpg' },
  { name: 'Lucas James', role: 'Developer', tasksCompleted: 8, hoursWorked: 41, photo: 'https://randomuser.me/api/portraits/men/20.jpg' },
  { name: 'Chloe Mitchell', role: 'Intern', tasksCompleted: 4, hoursWorked: 25, photo: 'https://randomuser.me/api/portraits/women/20.jpg' },
  { name: 'Ethan Bailey', role: 'Developer', tasksCompleted: 13, hoursWorked: 51, photo: 'https://randomuser.me/api/portraits/men/21.jpg' },
  { name: 'Layla Clark', role: 'Developer', tasksCompleted: 11, hoursWorked: 48, photo: 'https://randomuser.me/api/portraits/women/21.jpg' },
  { name: 'Isaac Lewis', role: 'Intern', tasksCompleted: 5, hoursWorked: 27, photo: 'https://randomuser.me/api/portraits/men/22.jpg' },
  { name: 'Scarlett Walker', role: 'Developer', tasksCompleted: 12, hoursWorked: 49, photo: 'https://randomuser.me/api/portraits/women/22.jpg' },
  { name: 'Mason Roberts', role: 'Developer', tasksCompleted: 10, hoursWorked: 45, photo: 'https://randomuser.me/api/portraits/men/23.jpg' },
  { name: 'Victoria Carter', role: 'Intern', tasksCompleted: 7, hoursWorked: 31, photo: 'https://randomuser.me/api/portraits/women/23.jpg' },
  { name: 'Oliver White', role: 'Developer', tasksCompleted: 16, hoursWorked: 59, photo: 'https://randomuser.me/api/portraits/men/24.jpg' },
  { name: 'Lillian Foster', role: 'Developer', tasksCompleted: 14, hoursWorked: 54, photo: 'https://randomuser.me/api/portraits/women/24.jpg' }
];


// Notifications
const notifications = [
  'New user signed up!',
  'Server backup completed.',
  'Task "Database Migration" is now overdue!',
  'New sale completed: ₹250',
];

function Dashboard() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };
  
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>

      {/* Notification Button */}
      <div className="notification-btn-container">
        <button className="notification-btn" onClick={toggleNotifications}>
          {showNotifications ? 'Hide Notifications' : 'Show Notifications'}
        </button>
      </div>
      {showNotifications && (
        <div className="notifications">
          {notifications.map((note, idx) => (
            <div key={idx} className="notification-item">
              {note}
            </div>
          ))}
        </div>
      )}

      {/* Cards Section with Percentage */}
      <div className="cards-section">
        <div className="card">
          <h5>Total Users</h5>
          <p className="percentage">
            1,024 <span className="percent-change positive">(+5%)</span>
          </p>
        </div>
        <div className="card">
          <h5>Monthly Sales</h5>
          <p className="percentage">
            ₹12,450 <span className="percent-change positive">(+12%)</span>
          </p>
        </div>
        <div className="card">
          <h5>New Signups</h5>
          <p className="percentage">
            58 <span className="percent-change negative">(-2%)</span>
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="charts-scrollable">
          <div className="chart-card">
            <h5>Sales Over Time</h5>
            <Line data={lineChartData} />
          </div>
          <div className="chart-card">
            <h5>Tasks Completed Weekly</h5>
            <Bar data={barChartData} />
          </div>
          <div className="chart-card">
            <h5>Task Completion</h5>
            <Doughnut data={doughnutChartData} />
          </div>
        </div>
      </div>

      {/* Team Performance Table */}
      <div className="table-section">
      <h5>Team Performance</h5>
      <table className="performance-table">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Role</th>
            <th>Tasks Completed</th>
            <th>Hours Worked</th>
          </tr>
        </thead>
        <tbody>
          {fakeTableData.map((row, index) => (
            <tr key={index}>
              <td>
                <img
                  src={row.photo}
                  alt={row.name}
                  className="team-photo"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleImageClick(row.photo)}
                />
              </td>
              <td>{row.name}</td>
              <td>{row.role}</td>
              <td>{row.tasksCompleted}</td>
              <td>{row.hoursWorked}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Image Modal for Enlarging Photo */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="image-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              className="modal-content modal-content1"
              style={{ position: "relative" }}
            >
              <motion.img
                src={selectedImage}
                alt="Enlarged"
                style={{
                  maxHeight: "80vh",
                  width: "400px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
              />

              {/* Close Button */}
              <button
                onClick={handleClose}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                  cursor: "pointer",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                &times;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </div>
  );
}

export default Dashboard;
