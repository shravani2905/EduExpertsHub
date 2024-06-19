import React, { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ThreeDots } from 'react-loader-spinner';
import './Certifications.css';

const Certifications = () => {
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState('');
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const { currentUser } = useSelector(state => state.userAdminLoginReducer);
  const token = localStorage.getItem('token');

  const axiosWithToken = axios.create({
    headers: { Authorization: `Bearer ${token}` }
  });

  // Function to upload a file to Cloudinary
  const uploadFile = async file => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'fpimages'); // Replace 'fpimages' with your upload preset
    try {
      const cloudName = 'drzr9z0ai'; // Replace with your Cloudinary cloud name
      const api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      return secure_url;
    } catch (error) {
      console.error('Error uploading image:', error.response ? error.response.data : error.message);
      throw new Error('Failed to upload image');
    }
  };

  // Form submission handler
  const onSubmit = async data => {
    try {
      setLoading(true);

      // Upload CCA Certifications
      const ccaUrls = await Promise.all(data.ccaCertifications.map(async (item, index) => {
        if (item.file && item.file[0]) {
          const url = await uploadFile(item.file[0]);
          return { text: item.text, url };
        }
        return null;
      }));

      // Upload ECA Certifications
      const ecaUrls = await Promise.all(data.ecaCertifications.map(async (item, index) => {
        if (item.file && item.file[0]) {
          const url = await uploadFile(item.file[0]);
          return { text: item.text, url };
        }
        return null;
      }));

      // Prepare data to submit to backend
      const dataToSubmit = {
        facultyId: currentUser.facultyId,
        dateOfModification: new Date(),
        ccaCertifications: ccaUrls.filter(item => item !== null),
        ecaCertifications: ecaUrls.filter(item => item !== null),
      };

      // Send data to backend API
      const res = await axiosWithToken.put('http://localhost:4000/user-api/data', dataToSubmit);

      // Handle response from backend
      if (res.data.message === 'Data added' || res.data.message === 'Data modified') {
        setServerMessage('Successfully submitted the form');
      } else {
        setServerMessage(res.data.message);
      }
    } catch (error) {
      setServerMessage('An error occurred while submitting the form');
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  // React Hook Form useFieldArray to manage dynamic array fields
  const { fields: ccaFields, append: appendCca } = useFieldArray({ control, name: 'ccaCertifications' });
  const { fields: ecaFields, append: appendEca } = useFieldArray({ control, name: 'ecaCertifications' });

  return (
    <div className="certifications-form-container">
      <form className="certifications-form" onSubmit={handleSubmit(onSubmit)}>
        <h4 className="certifications-form-heading">Faculty Certifications Form</h4>
        {serverMessage && <p className="server-message">{serverMessage}</p>}

        {/* CCA Certifications */}
        <div className="certifications-group">
          <label className="certifications-label">Upload CCA Certifications:</label>
          <button
            type="button"
            className="certifications-button"
            onClick={() => appendCca({ text: '', file: '' })}
          >
            {ccaFields.length === 0 ? 'Upload file' : 'Add new file'}
          </button>
          {ccaFields.map((field, index) => (
            <div key={field.id} className="certifications-file-group">
              <input
                type="text"
                className="certifications-input"
                placeholder="Enter text"
                {...register(`ccaCertifications.${index}.text`, { required: 'Text is required' })}
              />
              <Controller
                control={control}
                name={`ccaCertifications.${index}.file`}
                render={({ field }) => (
                  <input
                    type="file"
                    className="certifications-input"
                    
                    {...field}
                  />
                )}
              />
              {errors.ccaCertifications && errors.ccaCertifications[index] && (
                <span className="certifications-error">{errors.ccaCertifications[index].text?.message || errors.ccaCertifications[index].file?.message}</span>
              )}
            </div>
          ))}
        </div>

        {/* ECA Certifications */}
        <div className="certifications-group">
          <label className="certifications-label">Upload ECA Certifications:</label>
          <button
            type="button"
            className="certifications-button"
            onClick={() => appendEca({ text: '', file: '' })}
          >
            {ecaFields.length === 0 ? 'Upload file' : 'Add new file'}
          </button>
          {ecaFields.map((field, index) => (
            <div key={field.id} className="certifications-file-group">
              <input
                type="text"
                className="certifications-input"
                placeholder="Enter text"
                {...register(`ecaCertifications.${index}.text`, { required: 'Text is required' })}
              />
              <Controller
                control={control}
                name={`ecaCertifications.${index}.file`}
                render={({ field }) => (
                  <input
                    type="file"
                    className="certifications-input"
                    {...field}
                  />
                )}
              />
              {errors.ecaCertifications && errors.ecaCertifications[index] && (
                <span className="certifications-error">{errors.ecaCertifications[index].text?.message || errors.ecaCertifications[index].file?.message}</span>
              )}
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button type="submit" className="certifications-submit-button">Submit</button>
      </form>

      {/* Loading Spinner */}
      {loading && (
        <ThreeDots
          height={80}
          width={80}
          radius={9}
          color="#4fa94d"
          ariaLabel="three-dots-loading"
        />
      )}
    </div>
  );
};

export default Certifications;
