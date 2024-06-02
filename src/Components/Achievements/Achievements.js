import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import './Achievements.css';

const AchievementsForm = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const { fields: profFields, append: appendProf } = useFieldArray({ control, name: "professionalAchievements" });
  const { fields: persFields, append: appendPers } = useFieldArray({ control, name: "personalAchievements" });

  const [profFileNames, setProfFileNames] = useState({});
  const [persFileNames, setPersFileNames] = useState({});

  const onSubmit = (data) => {
    const formData = new FormData();

    console.log('Professional Achievements:');
    data.professionalAchievements.forEach((item, index) => {
      if (item.file && item.file[0]) {
        console.log(`Achievement: ${item.text}`);
        formData.append('professionalAchievements', item.file[0]);
        console.log(`Uploaded File: ${item.file[0].name}`);
      }
    });

    console.log('Personal Achievements:');
    data.personalAchievements.forEach((item, index) => {
      if (item.file && item.file[0]) {
        console.log(`Achievement: ${item.text}`);
        formData.append('personalAchievements', item.file[0]);
        console.log(`Uploaded File: ${item.file[0].name}`);
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
    <div className="achievements-form-container-custom">

      <form className="achievementsform" onSubmit={handleSubmit(onSubmit)}>
      <h4 className="h2-custom">Achievements</h4>
        <div className="form-group-custom">
          <div className="file-input-group-custom">
            <div className="label-container">
              <label className="label-custom">Upload Professional Achievements:</label>
              <button
                type="button"
                className="achievementsform-button-custom"
                onClick={() => appendProf({ text: "", file: "" })}
              >
                {profFields.length === 0 ? 'Upload file' : 'Add new file'}
              </button>
            </div>
          </div>

          {profFields.map((field, index) => (
            <div key={field.id} className="file-input-group-custom">
              <input
                type="text"
                className="achievementsform-input-custom"
                placeholder="Enter achievement"
                {...register(`professionalAchievements.${index}.text`, { required: true })}
              />
              <input
                type="file"
                className="achievementsform-input-custom"
                {...register(`professionalAchievements.${index}.file`, { required: true })}
                onChange={(e) => handleFileChange(e, setProfFileNames, index)}
              />
              {profFileNames[index] && (
                <span className="file-name-custom">{profFileNames[index]}</span>
              )}
              {errors.professionalAchievements && errors.professionalAchievements[index] && (
                <span className="error-custom">This field is required</span>
              )}
            </div>
          ))}
        </div>

        <div className="form-group-custom">
          <div className="file-input-group-custom">
            <div className="label-container">
              <label className="label-custom">Upload Personal Achievements:</label>
              <button
                type="button"
                className="achievementsform-button-custom"
                onClick={() => appendPers({ text: "", file: "" })}
              >
                {persFields.length === 0 ? 'Upload file' : 'Add new file'}
              </button>
            </div>
          </div>

          {persFields.map((field, index) => (
            <div key={field.id} className="file-input-group-custom">
              <input
                type="text"
                className="achievementsform-input-custom"
                placeholder="Enter achievement"
                {...register(`personalAchievements.${index}.text`, { required: true })}
              />
              <input
                type="file"
                className="achievementsform-input-custom"
                {...register(`personalAchievements.${index}.file`, { required: true })}
                onChange={(e) => handleFileChange(e, setPersFileNames, index)}
              />
              {persFileNames[index] && (
                <span className="file-name-custom">{persFileNames[index]}</span>
              )}
              {errors.personalAchievements && errors.personalAchievements[index] && (
                <span className="error-custom">This field is required</span>
              )}
            </div>
          ))}
        </div>
        <button type="submit" className="achievementsform-button-submit-custom">Submit</button>
      </form>
    </div>
  );
};

export default AchievementsForm;
