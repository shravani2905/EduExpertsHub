import React, { useState } from 'react';
import './Designation.css';

const DesignationForm = () => {
  const [position, setPosition] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [department, setDepartment] = useState('');
  const [errors, setErrors] = useState({});

  const handlePositionChange = (event) => {
    setPosition(event.target.value);
    if (event.target.value) {
      setErrors((prevErrors) => ({ ...prevErrors, position: '' }));
    }
  };

  const handleDateChange = (event) => {
    setJoiningDate(event.target.value);
    if (event.target.value) {
      setErrors((prevErrors) => ({ ...prevErrors, joiningDate: '' }));
    }
  };

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
    if (event.target.value) {
      setErrors((prevErrors) => ({ ...prevErrors, department: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!position) newErrors.position = 'Current Position is required';
    if (!joiningDate) newErrors.joiningDate = 'Joining Date is required';
    if (!department) newErrors.department = 'Department is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      alert('Form submitted successfully!');
    }
  };

  return (
    <div className="designation-form-container">
      <div className="designation-form">
        <h1 className="designation-form-heading">Designation</h1>
        <form onSubmit={handleSubmit}>
          <div className="designation-form-row">
            <label htmlFor="position" className="designation-form-label">Current Position: *</label>
            <select 
              id="position" 
              value={position} 
              onChange={handlePositionChange} 
              className={`designation-form-select ${errors.position ? 'error-border' : ''}`}
            >
              <option value="" disabled>Select your position</option>
              <option value="Lecturer">Lecturer</option>
              <option value="Assistant professor">Assistant Professor</option>
              <option value="Senior assistant professor">Senior Assistant Professor</option>
              <option value="Associate professor">Associate Professor</option>
              <option value="Professor">Professor</option>
            </select>
            {errors.position && <span className="error-message">{errors.position}</span>}
          </div>
          <div className="designation-form-row">
            <label htmlFor="department" className="designation-form-label">Department: *</label>
            <select 
              id="department" 
              value={department} 
              onChange={handleDepartmentChange}
              className={`designation-form-select ${errors.department ? 'error-border' : ''}`}
            >
              <option value="" disabled>Select your department</option>
              <option value="CSE&CSBS">CSE&CSBS</option>
              <option value="ECE">ECE</option>
              <option value="IT">IT</option>
            </select>
            {errors.department && <span className="error-message">{errors.department}</span>}
          </div>
          <div className="designation-form-row">
            <label htmlFor="joiningDate" className="designation-form-label">Joining Date: *</label>
            <input 
              type="date" 
              id="joiningDate" 
              value={joiningDate} 
              onChange={handleDateChange}
              className={`designation-form-input mx-1 ${errors.joiningDate ? 'error-border' : ''}`}
            />
            {errors.joiningDate && <span className="error-message">{errors.joiningDate}</span>}
          </div>
          <button type="submit" className="designation-form-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default DesignationForm;
