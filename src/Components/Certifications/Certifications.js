import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import './Certifications.css';

const Certifications = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const { fields: ccaFields, append: appendCca } = useFieldArray({ control, name: "ccaCertifications" });
  const { fields: ecaFields, append: appendEca } = useFieldArray({ control, name: "ecaCertifications" });

  const [ccaFileNames, setCcaFileNames] = useState({});
  const [ecaFileNames, setEcaFileNames] = useState({});

  const onSubmit = (data) => {
    const formData = new FormData();

    console.log('CCA Certifications:');
    data.ccaCertifications.forEach((item, index) => {
      if (item.file && item.file[0]) {
        console.log(`File Name: ${item.text}`);
        formData.append('ccaCertifications', item.file[0]);
        console.log('Uploaded File:', item.file[0]);
      }
    });

    console.log('ECA Certifications:');
    data.ecaCertifications.forEach((item, index) => {
      if (item.file && item.file[0]) {
        console.log(`File Name: ${item.text}`);
        formData.append('ecaCertifications', item.file[0]);
        console.log('Uploaded File:', item.file[0]);
      }
    });

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
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
      <h4 className="h2-custom text-warning text-center">Faculty Certifications Form</h4>
        <div className="form-group-custom">
          <div className="file-input-group-custom">
            <div className="label-container">
              <label className="label-custom">Upload CCA Certifications:</label>
              <button
                type="button"
                className="certificationsform-button-custom"
                onClick={() => appendCca({ text: "", file: "" })}
              >
                {ccaFields.length === 0 ? 'Upload file' : 'Add new file'}
              </button>
            </div>
          </div>

          {ccaFields.map((field, index) => (
            <div key={field.id} className="file-input-group-custom">
              <input
                type="text"
                className="certificationsform-input-custom"
                placeholder="Enter text"
                {...register(`ccaCertifications.${index}.text`, { required: true })}
              />
              <input
                type="file"
                className="certificationsform-input-custom"
                {...register(`ccaCertifications.${index}.file`, { required: true })}
                onChange={(e) => handleFileChange(e, setCcaFileNames, index)}
              />
              {ccaFileNames[index] && (
                <span className="file-name-custom">{ccaFileNames[index]}</span>
              )}
              {errors.ccaCertifications && errors.ccaCertifications[index] && (
                <span className="error-custom">This field is required</span>
              )}
            </div>
          ))}
        </div>

        <div className="form-group-custom">
          <div className="file-input-group-custom">
            <div className="label-container">
              <label className="label-custom">Upload ECA Certifications:</label>
              <button
                type="button"
                className="certificationsform-button-custom"
                onClick={() => appendEca({ text: "", file: "" })}
              >
                {ecaFields.length === 0 ? 'Upload file' : 'Add new file'}
              </button>
            </div>
          </div>

          {ecaFields.map((field, index) => (
            <div key={field.id} className="file-input-group-custom">
              <input
                type="text"
                className="certificationsform-input-custom"
                placeholder="Enter text"
                {...register(`ecaCertifications.${index}.text`, { required: true })}
              />
              <input
                type="file"
                className="certificationsform-input-custom"
                {...register(`ecaCertifications.${index}.file`, { required: true })}
                onChange={(e) => handleFileChange(e, setEcaFileNames, index)}
              />
              {ecaFileNames[index] && (
                <span className="file-name-custom">{ecaFileNames[index]}</span>
              )}
              {errors.ecaCertifications && errors.ecaCertifications[index] && (
                <span className="error-custom">This field is required</span>
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
