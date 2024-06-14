import React, { useState } from 'react';
import { useForm, Controller, watch } from 'react-hook-form';
import axios from 'axios';
import './Promotions.css';
import { useSelector } from 'react-redux';

const PromotionsForm = () => {
  const { register, handleSubmit, control, formState: { errors }, watch } = useForm();
  const [serverMessage, setServerMessage] = useState("");
  const { currentUser } = useSelector(
    (state) => state.userAdminLoginReducer
  );
  const token = localStorage.getItem('token');
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


  const selectedPosition = watch("position");

  return (
    <div className="promotions-form-wrapper">
      <form className="promotions-form-container" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="promotions-form-heading">Promotions</h3>
        {serverMessage && <p className="error-message">{serverMessage}</p>}

        <div className="promotions-form-row">
          <label htmlFor="position" className="promotions-form-label">Promoted To:</label>
          <select
            id="position"
            {...register("position", { required: "Current Position is required" })}
            className={`promotions-form-select ${errors.position ? 'error-border' : ''}`}
          >
            <option value="" disabled>Select your position</option>
            <option value="assistant professor">Assistant Professor</option>
            <option value="senior assistant professor">Senior Assistant Professor</option>
            <option value="associate professor">Associate Professor</option>
            <option value="professor">Professor</option>
            <option value="H.O.D">H.O.D</option>
            <option value="sectional head">Sectional Head</option>
          </select>
          {errors.position && <span className="error-message">{errors.position.message}</span>}
        </div>

        {selectedPosition === 'sectional head' && (
          <div className="promotions-form-row">
            <label htmlFor="sectionalHead" className="promotions-form-label">Section:</label>
            <select
              id="sectionalHead"
              {...register("sectionalHead", { required: "Section is required" })}
              className={`promotions-form-select ${errors.sectionalHead ? 'error-border' : ''}`}
            >
              <option value="" disabled>Select section</option>
              <option value="PAAC">PAAC</option>
              <option value="IQAC">IQAC</option>
              <option value="MTP">MTP</option>
              <option value="R&D">R&D</option>
            </select>
            {errors.sectionalHead && <span className="error-message">{errors.sectionalHead.message}</span>}
          </div>
        )}

        <div className="promotions-form-row">
          <label htmlFor="promotionDate" className="promotions-form-label">Date of promotion:</label>
          <input
            type="date"
            id="promotionDate"
            {...register("promotionDate", { required: "Date of promotion is required" })}
            className={`promotions-form-input ${errors.promotionDate ? 'error-border' : ''}`}
          />
          {errors.promotionDate && <span className="error-message">{errors.promotionDate.message}</span>}
        </div>

        <div className="promotions-form-row">
          <label htmlFor="officeOrder" className="promotions-form-label">Upload Office Order:</label>
          <Controller
            control={control}
            name="officeOrder"
            rules={{ required: "Office Order is required" }}
            render={({ field }) => (
              <input
                type="file"
                id="officeOrder"
                onChange={(e) => field.onChange(e.target.files)}
                className={`promotions-form-input ${errors.officeOrder ? 'error-border' : ''}`}
              />
            )}
          />
          {errors.officeOrder && <span className="error-message">{errors.officeOrder.message}</span>}
        </div>

        <div className="promotions-form-row">
          <label htmlFor="joiningReport" className="promotions-form-label">Upload Joining Report:</label>
          <Controller
            control={control}
            name="joiningReport"
            rules={{ required: "Joining Report is required" }}
            render={({ field }) => (
              <input
                type="file"
                id="joiningReport"
                onChange={(e) => field.onChange(e.target.files)}
                className={`promotions-form-input ${errors.joiningReport ? 'error-border' : ''}`}
              />
            )}
          />
          {errors.joiningReport && <span className="error-message">{errors.joiningReport.message}</span>}
        </div>

        <button type="submit" className="promotions-form-button">Submit</button>
      </form>
    </div>
  );
};

export default PromotionsForm;
