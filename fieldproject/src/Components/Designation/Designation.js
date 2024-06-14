import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './Designation.css';

const DesignationForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [serverMessage, setServerMessage] = useState("");
  const { currentUser } = useSelector(
    (state) => state.userAdminLoginReducer
  );
  const token = localStorage.getItem('token');

  // Create axios instance with token
  const axiosWithToken = axios.create({
    headers: { Authorization: `Bearer ${token}` }
  });

  const onSubmit = async (data) => {
    data.facultyId = currentUser.facultyId;
    data.dateOfModification = new Date();
    console.log('Payload:', data);  // Log the payload

    try {
      // Make HTTP PUT request
      const res = await axiosWithToken.put('http://localhost:4000/user-api/data', data);
      console.log('Response:', res.data);  // Log the response

      if (res.data.message === "Data added" || res.data.message === "Data modified") {
        setServerMessage("Successfully submitted the form");
      } else {
        setServerMessage(res.data.message);
      }
    } catch (error) {
      setServerMessage("An error occurred while submitting the form");
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="designation-form-container">
      <div className="designation-form">
        <h1 className="designation-form-heading">Designation</h1>
        {serverMessage && <p className="error-message">{serverMessage}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="designation-form-row">
            <label htmlFor="position" className="designation-form-label">Current Position: *</label>
            <select
              id="position"
              {...register("position", { required: "Current Position is required" })}
              className={`designation-form-select ${errors.position ? 'error-border' : ''}`}
            >
              <option value="" disabled>Select your position</option>
              <option value="Lecturer">Lecturer</option>
              <option value="Assistant professor">Assistant Professor</option>
              <option value="Senior assistant professor">Senior Assistant Professor</option>
              <option value="Associate professor">Associate Professor</option>
              <option value="Professor">Professor</option>
            </select>
            {errors.position && <span className="error-message">{errors.position.message}</span>}
          </div>
          <div className="designation-form-row">
            <label htmlFor="department" className="designation-form-label">Department: *</label>
            <select
              id="department"
              {...register("department", { required: "Department is required" })}
              className={`designation-form-select ${errors.department ? 'error-border' : ''}`}
            >
              <option value="" disabled>Select your department</option>
              <option value="CSE&CSBS">CSE&CSBS</option>
              <option value="ECE">ECE</option>
              <option value="IT">IT</option>
            </select>
            {errors.department && <span className="error-message">{errors.department.message}</span>}
          </div>
          <div className="designation-form-row">
            <label htmlFor="joiningDate" className="designation-form-label">Joining Date: *</label>
            <input
              type="date"
              id="joiningDate"
              {...register("joiningDate", { required: "Joining Date is required" })}
              className={`designation-form-input mx-1 ${errors.joiningDate ? 'error-border' : ''}`}
            />
            {errors.joiningDate && <span className="error-message">{errors.joiningDate.message}</span>}
          </div>
          <button type="submit" className="designation-form-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default DesignationForm;
