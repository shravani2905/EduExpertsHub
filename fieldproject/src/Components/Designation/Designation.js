import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ThreeDots } from 'react-loader-spinner';
import './Designation.css';

const DesignationForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [serverMessage, setServerMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [fileError, setFileError] = useState('');
  const { currentUser } = useSelector((state) => state.userAdminLoginReducer);
  const token = localStorage.getItem('token');

  const axiosWithToken = axios.create({
    headers: { Authorization: `Bearer ${token}` }
  });

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const cloudName = 'drzr9z0ai'; // Replace with your Cloudinary cloud name
      const uploadPreset = 'fpimages'; // Replace with your Cloudinary upload preset
      const api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`; // Adjust for different file types or APIs
      const res = await axios.post(api, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params: {
          upload_preset: uploadPreset,
        },
      });

      return res.data.secure_url;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Failed to upload file');
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const cvUrl = data.cvFile ? await uploadFile(data.cvFile[0]) : null;
      const certificateUrl = data.certificateFile ? await uploadFile(data.certificateFile[0]) : null;

      if (!cvUrl || !certificateUrl) {
        setFileError('File upload failed');
        setLoading(false);
        return;
      }

      const dataToSubmit = {
        ...data,
        cvUrl,
        certificateUrl,
        facultyId: currentUser.facultyId,
        dateOfModification: new Date(),
      };

      const res = await axiosWithToken.put('http://localhost:4000/user-api/data', dataToSubmit);

      if (res.data.message === 'Data added' || res.data.message === 'Data modified') {
        setServerMessage('Successfully submitted the form');
      } else {
        setServerMessage(res.data.message);
      }
      setLoading(false);
      reset();
    } catch (error) {
      setFileError('An error occurred while submitting the form');
      console.error('Error submitting form:', error);
      setLoading(false);
    }
  };

  return (
    <div className="designation-form-container">
      <div className="designation-form">
        <h1 className="designation-form-heading">Designation</h1>
        {serverMessage && <p className="error-message">{serverMessage}</p>}
        {fileError && <p className="error-message">{fileError}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="designation-form-row">
            <label htmlFor="position" className="designation-form-label">Current Position: *</label>
            <select
              id="position"
              {...register('position', { required: 'Current Position is required' })}
              className={`designation-form-select ${errors.position ? 'error-border' : ''}`}
            >
              <option value="" disabled>Select your position</option>
              <option value="Lecturer">Lecturer</option>
              <option value="Assistant professor">Assistant Professor</option>
              <option value="Senior assistant professor">Senior Assistant Professor</option>
              <option value="Associate professor">Associate Professor</option>
              <option value="Professor">Professor</option>
            </select>
            {errors.position && <span className="error-message">{errors.position.message}</span>}
          </div>
          <div className="designation-form-row">
            <label htmlFor="department" className="designation-form-label">Department: *</label>
            <select
              id="department"
              {...register('department', { required: 'Department is required' })}
              className={`designation-form-select ${errors.department ? 'error-border' : ''}`}
            >
              <option value="" disabled>Select your department</option>
              <option value="CSE&CSBS">CSE&CSBS</option>
              <option value="ECE">ECE</option>
              <option value="IT">IT</option>
            </select>
            {errors.department && <span className="error-message">{errors.department.message}</span>}
          </div>
          <div className="designation-form-row">
            <label htmlFor="joiningDate" className="designation-form-label">Joining Date: *</label>
            <input
              type="date"
              id="joiningDate"
              {...register('joiningDate', { required: 'Joining Date is required' })}
              className={`designation-form-input mx-1 ${errors.joiningDate ? 'error-border' : ''}`}
            />
            {errors.joiningDate && <span className="error-message">{errors.joiningDate.message}</span>}
          </div>
          <div className="designation-form-row">
            <label htmlFor="cvFile" className="designation-form-label">Upload CV: *</label>
            <input
              type="file"
              id="cvFile"
              {...register('cvFile', { required: 'CV file is required' })}
              className='designation-form-input-file'
            />
            {errors.cvFile && <span className="error-message">{errors.cvFile.message}</span>}
          </div>
          <div className="designation-form-row">
            <label htmlFor="certificateFile" className="designation-form-label">Upload Certificate: *</label>
            <input
              type="file"
              id="certificateFile"
              {...register('certificateFile', { required: 'Certificate file is required' })}
              className='designation-form-input-file'
            />
            {errors.certificateFile && <span className="error-message">{errors.certificateFile.message}</span>}
          </div>
          <button type="submit" className="designation-form-button">Submit</button>
        </form>
        {loading && (
          <ThreeDots
            height={80}
            width={80}
            color="#4fa94d"
            radius={9}
            visible={true}
          />
        )}
      </div>
    </div>
  );
};

export default DesignationForm;
