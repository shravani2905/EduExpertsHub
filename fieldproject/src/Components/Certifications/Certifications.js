import React, { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './Certifications.css';

const Certifications = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const { fields: ccaFields, append: appendCca } = useFieldArray({ control, name: "ccaCertifications" });
  const { fields: ecaFields, append: appendEca } = useFieldArray({ control, name: "ecaCertifications" });
  
  const [serverMessage, setServerMessage] = useState("");
  const { currentUser } = useSelector((state) => state.userAdminLoginReducer);
  const token = localStorage.getItem('token');
  
  const axiosWithToken = axios.create({
    headers: { Authorization: `Bearer ${token}` }
  });

  const onSubmit = async (data) => {
    data.facultyId = currentUser.facultyId;
    data.dateOfModification = new Date();

    try {
      const res = await axiosWithToken.put('http://localhost:4000/user-api/data', data);
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
    <div className="certifications-form-container-custom">
      <form className="certificationsform" onSubmit={handleSubmit(onSubmit)}>
        <h4 className="hd text-center">Faculty Certifications Form</h4>
        {serverMessage && <p className="server-message">{serverMessage}</p>}

        <div className="form-group-custom">
          <label className="label-custom">Upload CCA Certifications:</label>
          <button
            type="button"
            className="certificationsform-button-custom"
            onClick={() => appendCca({ text: "", file: "" })}
          >
            {ccaFields.length === 0 ? 'Upload file' : 'Add new file'}
          </button>
          {ccaFields.map((field, index) => (
            <div key={field.id} className="file-input-group-custom">
              <input
                type="text"
                className="certificationsform-input-custom"
                placeholder="Enter text"
                {...register(`ccaCertifications.${index}.text`, { required: "Text is required" })}
              />
              <Controller
                control={control}
                name={`ccaCertifications.${index}.file`}
                render={({ field }) => (
                  <input
                    type="file"
                    className="certificationsform-input-custom"
                    {...field}
                  />
                )}
              />
              {errors.ccaCertifications && errors.ccaCertifications[index] && (
                <span className="error-custom">{errors.ccaCertifications[index].text?.message || errors.ccaCertifications[index].file?.message}</span>
              )}
            </div>
          ))}
        </div>

        <div className="form-group-custom">
          <label className="label-custom">Upload ECA Certifications:</label>
          <button
            type="button"
            className="certificationsform-button-custom"
            onClick={() => appendEca({ text: "", file: "" })}
          >
            {ecaFields.length === 0 ? 'Upload file' : 'Add new file'}
          </button>
          {ecaFields.map((field, index) => (
            <div key={field.id} className="file-input-group-custom">
              <input
                type="text"
                className="certificationsform-input-custom"
                placeholder="Enter text"
                {...register(`ecaCertifications.${index}.text`, { required: "Text is required" })}
              />
              <Controller
                control={control}
                name={`ecaCertifications.${index}.file`}
                render={({ field }) => (
                  <input
                    type="file"
                    className="certificationsform-input-custom"
                    {...field}
                  />
                )}
              />
              {errors.ecaCertifications && errors.ecaCertifications[index] && (
                <span className="error-custom">{errors.ecaCertifications[index].text?.message || errors.ecaCertifications[index].file?.message}</span>
              )}
            </div>
          ))}
        </div>

        <button type="submit" className="certificationsform-button-submit-custom">Submit</button>
      </form>
    </div>
  );
};

export default Certifications;
