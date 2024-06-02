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
    <div className="container">
      <h5 className="basicheading">Basic Information</h5>
      {err && <div className="error-message">{err}</div>}
      <form className="basicform" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-columns">
          <div className="form-column">
            <div className="form-group">
              <label htmlFor="name">
                Faculty Name: <span className="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Enter Name"
                {...register('name')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="aadhar">
                Aadhar Card Number: <span className="required">*</span>
              </label>
              <input
                type="text"
                id="aadhar"
                name="aadhar"
                required
                placeholder="Enter Aadhar Card Number"
                {...register('aadhar')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="pan">
                PAN Card Number: <span className="required">*</span>
              </label>
              <input
                type="text"
                id="pan"
                name="pan"
                required
                placeholder="Enter PAN Card Number"
                {...register('pan')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="aadharProof">
                Aadhar Card Proof: <span className="required">*</span>
              </label>
              <input
                type="file"
                id="aadharProof"
                name="aadharProof"
                accept="image/*"
                required
                {...register('aadharProof')}
              />
            </div>
          </div>
          <div className="form-column">
            <div className="form-group">
              <label htmlFor="Image">
                Upload Photo: <span className="required">*</span>
              </label>
              <input
                type="file"
                id="uploadImage"
                name="uploadImage"
                accept="image/*"
                required
                {...register('uploadImage')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="panProof">
                PAN Card Proof: <span className="required">*</span>
              </label>
              <input
                type="file"
                id="panProof"
                name="panProof"
                accept="image/*"
                required
                {...register('panProof')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateOfJoining">
                Date of Joining: <span className="required">*</span>
              </label>
              <input
                type="date"
                id="dateOfJoining"
                name="dateOfJoining"
                required
                {...register('dateOfJoining')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="joiningOrder">
                Joining Order: <span className="required">*</span>
              </label>
              <input
                type="file"
                id="joiningOrder"
                name="joiningOrder"
                accept="application/pdf"
                required
                {...register('joiningOrder')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="officeOrder">
                Office Order: <span className="required">*</span>
              </label>
              <input
                type="file"
                id="officeOrder"
                name="officeOrder"
                accept="application/pdf"
                required
                {...register('officeOrder')}
              />
            </div>
          </div>
        </div>
        <button className="btn basicbutton" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Basic;
