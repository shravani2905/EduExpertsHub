import React from 'react';
import { Link } from 'react-router-dom';
import './Userdashboard.css';

function Userdashboard() {
  return (
    <div className="main">
      <header className="App-header">
        Faculty Information System
      </header>
      <div className="App-body">
        <div className="main-content">
          <div className="grid-container">
            <div className="grid-item">
              <Link to="/basic">Basic</Link>
            </div>
            <div className="grid-item">
              <Link to="/qualification">Qualification</Link>
            </div>
            <div className="grid-item">
              <Link to="/designation">Designation</Link>
            </div>
            <div className="grid-item">
              <Link to="/promotions">Promotions</Link>
            </div>
            <div className="grid-item">
              <Link to="/certifications">Certifications</Link> 
            </div>
            <div className="grid-item">
              <Link to="/achievements">Achievements</Link>
            </div>
            <div className="grid-item">
              <Link to="/publications">Publications</Link>
            </div>
            <div className="grid-item">
              <Link to="/patents">Patents</Link>
            </div>
            <div className="grid-item">
              <Link to="/funded-projects">Funded Projects</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Userdashboard;
