import React from 'react';
import { Link } from 'react-router-dom'; // Assuming BrowserRouter is handled elsewhere if needed
import FacultyData from '../FacultyData/FacultyData';
import FacultyStatistics from "../FacultyStatistics/FacultyStatistics";
import './AdminDashboard.css';

const App = () => {
  return (
    <div className="admin-dashboard">
      <div className="admin-card">
        <h2 className="admin-card-title">View Faculty Information</h2>
        <p className="admin-card-description">Here you can view detailed information about faculty members.</p>
        <Link to="/faculty-data" className="admin-card-link">Go to Faculty Data</Link>
      </div>
      <div className="admin-card">
        <h2 className="admin-card-title">View Faculty Statistics</h2>
        <p className="admin-card-description">Here you can view statistics about faculty members.</p>
        <Link to="/faculty-statistics" className="admin-card-link">Go to Faculty Statistics</Link>
      </div>
    </div>
  );
};

export default App;
