import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';
import './Achievements.css';

const AchievementsForm = () => {
  const { register, handleSubmit, control, watch, formState: { errors } } = useForm();
  const { fields: profFields, append: appendProf } = useFieldArray({ control, name: "professionalAchievements" });

  const [profFileNames, setProfFileNames] = useState({});
  const [profErrors, setProfErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const watchProfAchievements = watch("professionalAchievements", []);

  const uploadFile = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", 'fpimages'); // Use 'fpimages' for image uploads
    try {
      const cloudName = 'drzr9z0ai';
      const api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`; // Use '/image/upload' for image uploads
      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      return secure_url;
    } catch (error) {
      console.error("Error uploading image:", error.response ? error.response.data : error.message);
      throw new Error("Failed to upload image");
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const profUrls = await Promise.all(data.professionalAchievements.map(async (item, index) => {
        if (item.file && item.file[0]) {
          const url = await uploadFile(item.file[0]);
          return { text: item.text, url };
        }
        return null;
      }));

      const dataToSubmit = {
        professionalAchievements: profUrls.filter(item => item !== null),
      };

      await axios.post('http://localhost:4000/user-api/data', dataToSubmit);

      console.log("Form submitted successfully:", dataToSubmit);
      setLoading(false);
      setErr('');
    } catch (error) {
      setErr("An error occurred while submitting the form");
      console.error("Error submitting form:", error);
      setLoading(false);
    }
  };

  const handleFileChange = (event, setFileNames, index) => {
    const file = event.target.files[0];
    if (file) {
      setFileNames(prev => ({ ...prev, [index]: file.name }));
    }
  };

  const handleAddField = (appendFunc, watchAchievements, setErrors, errors) => {
    const lastIndex = watchAchievements.length - 1;
    if (lastIndex >= 0 && !watchAchievements[lastIndex]?.text) {
      setErrors(prev => ({ ...prev, [lastIndex]: true }));
    } else {
      appendFunc({ text: "", file: null });
      setErrors({});
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
                onClick={() => handleAddField(appendProf, watchProfAchievements, setProfErrors, profErrors)}
                disabled={profFields.length > 0 && !watchProfAchievements[profFields.length - 1]?.text}
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
              {profErrors[index] && (
                <span className="error-custom">This field should be filled before adding a new file</span>
              )}
            </div>
          ))}
        </div>

        {loading && <p>Uploading...</p>}
        {err && <p className="error-custom">{err}</p>}

        <button type="submit" className="achievementsform-button-submit-custom">Submit</button>
      </form>
    </div>
  );
};

export default AchievementsForm;
