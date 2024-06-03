import React from 'react';
import { useForm } from 'react-hook-form';
import './Basic.css';
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Basic = () => {
  const { register, handleSubmit } = useForm();
  const [err, setErr] = useState("");
  const { currentUser } = useSelector(
    (state) => state.userAdminLoginReducer
  );
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Create axios instance with token
  const axiosWithToken = axios.create({
    headers: { Authorization: `Bearer ${token}` }
  });

  const onSubmit = async (data) => {
    data.facultyId = currentUser.facultyId;
    data.dateOfModification = new Date();

    try {
      // Make HTTP PUT request
      const res = await axiosWithToken.put('http://localhost:4000/user-api/data', data);

      if (res.data.message === "Data added" || res.data.message === "Data modified") {
        setErr("Successfully submitted the form");
      
      } else {
        setErr(res.data.message);
      }
    } catch (error) {
      setErr("An error occurred while submitting the form");
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="main-container">
      <div className="basic-form-container">
        <h5 className="basic-form-heading">Basic Information</h5>
        {err && <div className="basic-form-error-message">{err}</div>}
        <form className="basic-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="basic-form-columns">
            <div className="basic-form-column">
              <div className="basic-form-group">
                <label htmlFor="name">
                  Faculty Name: <span className="basic-form-required">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Enter Name"
                  {...register('name')}
                  className="basic-form-input"
                />
              </div>
              <div className="basic-form-group">
                <label htmlFor="aadhar">
                  Aadhar Card Number: <span className="basic-form-required">*</span>
                </label>
                <input
                  type="text"
                  id="aadhar"
                  name="aadhar"
                  required
                  placeholder="Enter Aadhar Card Number"
                  {...register('aadhar')}
                  className="basic-form-input"
                />
              </div>
              <div className="basic-form-group">
                <label htmlFor="pan">
                  PAN Card Number: <span className="basic-form-required">*</span>
                </label>
                <input
                  type="text"
                  id="pan"
                  name="pan"
                  required
                  placeholder="Enter PAN Card Number"
                  {...register('pan')}
                  className="basic-form-input"
                />
              </div>
              <div className="basic-form-group">
                <label htmlFor="dateOfJoining">
                  Date of Joining: <span className="basic-form-required">*</span>
                </label>
                <input
                  type="date"
                  id="dateOfJoining"
                  name="dateOfJoining"
                  required
                  {...register('dateOfJoining')}
                  className="basic-form-input"
                />
              </div>
            </div>
            <div className="basic-form-column">
              <div className="basic-form-group">
                <label htmlFor="Image">
                  Upload Photo: <span className="basic-form-required">*</span>
                </label>
                <input
                  type="file"
                  id="uploadImage"
                  name="uploadImage"
                  accept="image/*"
                  required
                  {...register('uploadImage')}
                  className="basic-form-input-file"
                />
              </div>
              <div className="basic-form-group">
                <label htmlFor="aadharProof">
                  Aadhar Card Proof: <span className="basic-form-required">*</span>
                </label>
                <input
                  type="file"
                  id="aadharProof"
                  name="aadharProof"
                  accept="image/*"
                  required
                  {...register('aadharProof')}
                  className="basic-form-input-file"
                />
              </div>
              <div className="basic-form-group">
                <label htmlFor="panProof">
                  PAN Card Proof: <span className="basic-form-required">*</span>
                </label>
                <input
                  type="file"
                  id="panProof"
                  name="panProof"
                  accept="image/*"
                  required
                  {...register('panProof')}
                  className="basic-form-input-file"
                />
              </div>
              
              <div className="basic-form-group">
                <label htmlFor="joiningOrder">
                  Joining Order: <span className="basic-form-required">*</span>
                </label>
                <input
                  type="file"
                  id="joiningOrder"
                  name="joiningOrder"
                  accept="application/pdf"
                  required
                  {...register('joiningOrder')}
                  className="basic-form-input-file"
                />
              </div>
              <div className="basic-form-group">
                <label htmlFor="officeOrder">
                  Office Order: <span className="basic-form-required">*</span>
                </label>
                <input
                  type="file"
                  id="officeOrder"
                  name="officeOrder"
                  accept="application/pdf"
                  required
                  {...register('officeOrder')}
                  className="basic-form-input-file"
                />
              </div>
            </div>
          </div>
          <button className="basic-form-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Basic;
