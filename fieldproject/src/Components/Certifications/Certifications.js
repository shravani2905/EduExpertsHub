import React, { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import axios from 'axios';
import './Certifications.css';

import { useSelector } from 'react-redux';

const Certifications = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const { fields: ccaFields, append: appendCca } = useFieldArray({ control, name: "ccaCertifications" });
  const { fields: ecaFields, append: appendEca } = useFieldArray({ control, name: "ecaCertifications" });

  const [ccaFileNames, setCcaFileNames] = useState({});
  const [ecaFileNames, setEcaFileNames] = useState({});
  const [serverMessage, setServerMessage] = useState("");
  const { currentUser } = useSelector(
    (state) => state.userAdminLoginReducer
  );
  const token = localStorage.getItem('token');
  const axiosWithToken = axios.create({
    headers: { Authorization: `Bearer ${token}` }
  });

  const onSubmit = async (data) => {
    const formData = new FormData();

    if (data.ccaCertifications) {
      data.ccaCertifications.forEach((item, index) => {
        if (item.file && item.file[0]) {
          formData.append(`ccaCertifications[${index}][text]`, item.text);
          formData.append(`ccaCertifications[${index}][file]`, item.file[0]);
        }
      });
    }

    if (data.ecaCertifications) {
      data.ecaCertifications.forEach((item, index) => {
        if (item.file && item.file[0]) {
          formData.append(`ecaCertifications[${index}][text]`, item.text);
          formData.append(`ecaCertifications[${index}][file]`, item.file[0]);
        }
      });
    }
    
    formData.append('facultyId', currentUser.facultyId);
    formData.append('dateOfModification', new Date());

    try {
      const res = await axiosWithToken.put('http://localhost:4000/user-api/data', formData);
      setServerMessage(res.data.message || "Form submitted successfully!");
    } catch (error) {
      setServerMessage("An error occurred while submitting the form");
      console.error("Error submitting form:", error);
    }
  };

  const handleFileChange = (event, setFileNames, index) => {
    const file = event.target.files[0];
    if (file) {
      setFileNames(prev => ({ ...prev, [index]: file.name }));
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
                    onChange={(e) => {
                      field.onChange(e.target.files);
                      handleFileChange(e, setCcaFileNames, index);
                    }}
                  />
                )}
              />
              {ccaFileNames[index] && (
                <span className="file-name-custom">{ccaFileNames[index]}</span>
              )}
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
                    onChange={(e) => {
                      field.onChange(e.target.files);
                      handleFileChange(e, setEcaFileNames, index);
                    }}
                  />
                )}
              />
              {ecaFileNames[index] && (
                <span className="file-name-custom">{ecaFileNames[index]}</span>
              )}
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
