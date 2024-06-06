import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Userdashboard.css';

function Userdashboard() {
  return (
    <div className="main">
      <div className="App-body">
        <div className="sidebar">
          <div className="sidebar-item">
            <Link to="basic">Basic</Link>
          </div>
          <div className="sidebar-item">
            <Link to="qualification">Qualification</Link>
          </div>
          <div className="sidebar-item">
            <Link to="designation">Designation</Link>
          </div>
          <div className="sidebar-item">
            <Link to="promotions">Promotions</Link>
          </div>
          <div className="sidebar-item">
            <Link to="certifications">Certifications</Link>
          </div>
          <div className="sidebar-item">
            <Link to="achievements">Achievements</Link>
          </div>
          <div className="sidebar-item">
            <Link to="publications">Publications</Link>
          </div>
          <div className="sidebar-item">
            <Link to="patents">Patents</Link>
          </div>
          <div className="sidebar-item">
            <Link to="funded-projects">Funded Projects</Link>
          </div>
        </div>
        <div className="main-content">
          <Outlet/>
        </div>
      </div>
    </div>
  );
}

export default Userdashboard;
