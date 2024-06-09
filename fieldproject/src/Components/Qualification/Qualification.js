import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import './Qualification.css';
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Qualification() {
  const { control, handleSubmit, watch, formState: { errors } } = useForm();
  const watchEducation = watch('education');
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
    data.facultyId= currentUser.facultyId;
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
    <div className="qualification">
      <div className="qualification-form-wrapper">
       
         {err && <div className="basic-form-error-message">{err}</div>}
        <form onSubmit={handleSubmit(onSubmit)} className="qualification-form-container">
         
        <h4 className='qualification-quaheading'>Educational Qualifications</h4>
         
          {/* 10th Details */}
          <div className="qualification-form-row">
            <div className="qualification-form-group">
              <label>
                Education Board <span className="qualification-mandatory">*</span>
              </label>
              <Controller
                name="education"
                control={control}
                defaultValue=""
                rules={{ required: "Education Board is required" }}
                render={({ field }) => (
                  <select {...field} className="qualification-form-select ml-2">
                    <option value="">Select Education Board</option>
                    <option value="ssc">SSC</option>
                    <option value="cbse">CBSE</option>
                    <option value="icse">ICSE</option>
                  </select>
                )}
              />
              {errors.education && <span className="qualification-error-message">{errors.education.message}</span>}
            </div>
            {watchEducation === 'ssc' && (
              <div className="qualification-form-group">
                <label>
                  GPA <span className="qualification-mandatory">*</span>
                </label>
                <input
                  type="number"
                  placeholder="Enter GPA"
                  {...control.register('gpa', {
                    required: "GPA is required",
                    min: { value: 0, message: "GPA must be between 0 and 10" },
                    max: { value: 10, message: "GPA must be between 0 and 10" },
                  })}
                  className="qualification-form-input"
                />
                {errors.gpa && <span className="qualification-error-message">{errors.gpa.message}</span>}
              </div>
            )}
            {(watchEducation === 'cbse' || watchEducation === 'icse') && (
              <div className="qualification-form-group">
                <label>
                  Percentage <span className="qualification-mandatory">*</span>
                </label>
                <input
                  type="number"
                  placeholder="Enter Percentage"
                  {...control.register('percentage', {
                    required: "Percentage is required",
                    min: { value: 0, message: "Percentage must be between 0 and 100" },
                    max: { value: 100, message: "Percentage must be between 0 and 100" },
                  })}
                  className="qualification-form-input"
                />
                {errors.percentage && <span className="qualification-error-message">{errors.percentage.message}</span>}
              </div>
            )}
            <div className="qualification-form-group">
              <label>
                Certificate <span className="qualification-mandatory">*</span>
              </label>
              <input type="file" {...control.register('certificate10', { required: "Certificate is required" })} className="qualification-form-file" />
              {errors.certificate10 && <span className="qualification-error-message">{errors.certificate10.message}</span>}
            </div>
          </div>

          {/* Inter Details */}
          <div className="qualification-form-row">
            <div className="qualification-form-group">
              <label>
                Inter Percentage <span className="qualification-mandatory">*</span>
              </label>
              <input
                type="number"
                placeholder="Enter Inter Percentage"
                {...control.register('interPercentage', {
                  required: "Inter Percentage is required",
                  min: { value: 0, message: "Percentage must be between 0 and 100" },
                  max: { value: 100, message: "Percentage must be between 0 and 100" },
                })}
                className="qualification-form-input"
              />
              {errors.interPercentage && <span className="qualification-error-message">{errors.interPercentage.message}</span>}
            </div>
            <div className="qualification-form-group">
              <label>
                Certificate <span className="qualification-mandatory">*</span>
              </label>
              <input type="file" {...control.register('certificateInter', { required: "Certificate is required" })} className="qualification-form-file" />
              {errors.certificateInter && <span className="qualification-error-message">{errors.certificateInter.message}</span>}
            </div>
          </div>

          {/* UG Details */}
          <div className="qualification-form-row">
            <div className="qualification-form-group">
              <label>
                UG Percentage <span className="qualification-mandatory">*</span>
              </label>
              <input
                type="number"
                placeholder="Enter UG Percentage"
                {...control.register('ugPercentage', {
                  required: "UG Percentage is required",
                  min: { value: 0, message: "Percentage must be between 0 and 100" },
                  max: { value: 100, message: "Percentage must be between 0 and 100" },
                })}
                className="qualification-form-input"
              />
              {errors.ugPercentage && <span className="qualification-error-message">{errors.ugPercentage.message}</span>}
            </div>
            <div className="qualification-form-group">
              <label>
                UG Specialization <span className="qualification-mandatory">*</span>
              </label>
              <Controller
                name="ugBranch"
                control={control}
                defaultValue=""
                rules={{ required: "UG Branch is required" }}
                render={({ field }) => (
                  <select {...field} className="qualification-form-select">
                    <option value="">Select UG Specialization</option>
                    <option value="CSE">CSE</option>
                    <option value="ECE">ECE</option>
                    <option value="IT">IT</option>
                  </select>
                )}
              />
              {errors.ugBranch && <span className="qualification-error-message">{errors.ugBranch.message}</span>}
            </div>
            <div className="qualification-form-group">
              <label>
                Certificate <span className="qualification-mandatory">*</span>
              </label>
              <input type="file" {...control.register('certificateUG', { required: "Certificate is required" })} className="qualification-form-file" />
              {errors.certificateUG && <span className="qualification-error-message">{errors.certificateUG.message}</span>}
            </div>
          </div>

          {/* PG Details */}
          <div className="qualification-form-row">
            <div className="qualification-form-group">
              <label>
                PG Percentage <span className="qualification-mandatory">*</span>
              </label>
              <input
                type="number"
                placeholder="Enter PG Percentage"
                {...control.register('pgPercentage', {
                  required: "PG Percentage is required",
                  min: { value: 0, message: "Percentage must be between 0 and 100" },
                  max: { value: 100, message: "Percentage must be between 0 and 100" },
                })}
                className="qualification-form-input"
              />
              {errors.pgPercentage && <span className="qualification-error-message">{errors.pgPercentage.message}</span>}
            </div>
            <div className="qualification-form-group">
              <label>
                PG Specialization <span className="qualification-mandatory">*</span>
              </label>
              <Controller
                name="pgBranch"
                control={control}
                defaultValue=""
                rules={{ required: "PG Branch is required" }}
                render={({ field }) => (
                  <select {...field} className="qualification-form-select">
                    <option value="">Select PG Specialization</option>
                    <option value="CSE">CSE</option>
                    <option value="ECE">ECE</option>
                    <option value="IT">IT</option>
                  </select>
                )}
              />
              {errors.pgBranch && <span className="qualification-error-message">{errors.pgBranch.message}</span>}
            </div>
            <div className="qualification-form-group">
              <label>
                Certificate <span className="qualification-mandatory">*</span>
              </label>
              <input type="file" {...control.register('certificatePG', { required: "Certificate is required" })} className="qualification-form-file" />
              {errors.certificatePG && <span className="qualification-error-message">{errors.certificatePG.message}</span>}
            </div>
          </div>

          {/* PhD Details */}
          <div className="qualification-form-row">
            <div className="qualification-form-group">
              <label>PhD Percentage</label>
              <input
                type="number"
                placeholder="Enter PhD Percentage"
                {...control.register('phdPercentage', {
                  min: { value: 0, message: "Percentage must be between 0 and 100" },
                  max: { value: 100, message: "Percentage must be between 0 and 100" },
                })}
                className="qualification-form-input"
              />
              {errors.phdPercentage && <span className="qualification-error-message">{errors.phdPercentage.message}</span>}
            </div>
            <div className="qualification-form-group">
              <label>PhD Specialization</label>
              <Controller
                name="phdBranch"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <select {...field} className="qualification-form-select">
                    <option value="">Select PhD Specialization</option>
                    <option value="CSE">CSE</option>
                    <option value="ECE">ECE</option>
                    <option value="IT">IT</option>
                  </select>
                )}
              />
            </div>
            <div className="qualification-form-group">
              <label>Certificate</label>
              <input type="file" {...control.register('certificatePhD')} className="qualification-form-file" />
            </div>
          </div>

          <button type="submit" className="qualification-form-submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Qualification;
