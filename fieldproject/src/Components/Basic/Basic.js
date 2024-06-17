import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios";
import { useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import './Basic.css';

const Basic = () => {
  const [image, setImage] = useState(null);
  const [aadharProof, setAadharProof] = useState(null);
  const [panProof, setPanProof] = useState(null);
  const [joiningOrder, setJoiningOrder] = useState(null);
  const [officeOrder, setOfficeOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [err, setErr] = useState("");
  const { currentUser } = useSelector((state) => state.userAdminLoginReducer);
  const token = localStorage.getItem('token');

  const axiosWithToken = axios.create({
    headers: { Authorization: `Bearer ${token}` }
  });

  const uploadFile = async (file, type) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", type === 'image' ? 'fpimages' : 'fppdfs');
    try {
      const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
      const resourceType = type === 'image' ? 'image' : 'raw';
      const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;
      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      return secure_url;
    } catch (error) {
      console.error(`Error uploading ${type}:`, error.response ? error.response.data : error.message);
      throw new Error(`Failed to upload ${type}`);
    }
  };

  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      const imgUrl = image ? await uploadFile(image, 'image') : null;
      const aadharProofUrl = aadharProof ? await uploadFile(aadharProof, 'pdf') : null;
      const panProofUrl = panProof ? await uploadFile(panProof, 'pdf') : null;
      const joiningOrderUrl = joiningOrder ? await uploadFile(joiningOrder, 'pdf') : null;
      const officeOrderUrl = officeOrder ? await uploadFile(officeOrder, 'pdf') : null;

      if (!imgUrl || !aadharProofUrl || !panProofUrl || !joiningOrderUrl || !officeOrderUrl) {
        setErr("File upload failed");
        setLoading(false);
        return;
      }

      const dataToSubmit = {
        ...formData,
        imgUrl,
        aadharProofUrl,
        panProofUrl,
        joiningOrderUrl,
        officeOrderUrl,
        facultyId: currentUser.facultyId,
        dateOfModification: new Date()
      };

      const res = await axiosWithToken.put(`http://localhost:4000/user-api/data`, dataToSubmit);

      if (res.data.message === "Data added" || res.data.message === "Data modified") {
        setErr("Successfully submitted the form");
      } else {
        setErr(res.data.message);
      }
      setLoading(false);
      reset();
    } catch (error) {
      setErr("An error occurred while submitting the form");
      console.error("Error submitting form:", error);
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
      <div className="basic-form-container">
        <h5 className="basic-form-heading">Basic Information</h5>
        {err && <div className="basic-form-error-message">{err}</div>}
        <form className="basic-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="basic-form-columns">
            <div className="basic-form-column">
              <div className="basic-form-group">
                <label htmlFor="name">
                  Faculty Name: <span className="basic-form-required">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Enter Name"
                  {...register('name')}
                  className="basic-form-input"
                />
              </div>
              <div className="basic-form-group">
                <label htmlFor="aadhar">
                  Aadhar Card Number: <span className="basic-form-required">*</span>
                </label>
                <input
                  type="text"
                  id="aadhar"
                  name="aadhar"
                  required
                  placeholder="Enter Aadhar Card Number"
                  {...register('aadhar')}
                  className="basic-form-input"
                />
              </div>
              <div className="basic-form-group">
                <label htmlFor="pan">
                  PAN Card Number: <span className="basic-form-required">*</span>
                </label>
                <input
                  type="text"
                  id="pan"
                  name="pan"
                  required
                  placeholder="Enter PAN Card Number"
                  {...register('pan')}
                  className="basic-form-input"
                />
              </div>
              <div className="basic-form-group">
                <label htmlFor="dateOfJoining">
                  Date of Joining: <span className="basic-form-required">*</span>
                </label>
                <input
                  type="date"
                  id="dateOfJoining"
                  name="dateOfJoining"
                  required
                  {...register('dateOfJoining')}
                  className="basic-form-input"
                />
              </div>
            </div>
            <div className="basic-form-column">
              <div className="basic-form-group">
                <label htmlFor="uploadImage">
                  Upload Photo: <span className="basic-form-required">*</span>
                </label>
                <input
                  type="file"
                  id="uploadImage"
                  name="uploadImage"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  required
                  className="basic-form-input-file"
                />
              </div>
              <div className="basic-form-group">
                <label htmlFor="aadharProof">
                  Aadhar Card Proof: <span className="basic-form-required">*</span>
                </label>
                <input
                  type="file"
                  id="aadharProof"
                  name="aadharProof"
                  accept="application/pdf"
                  onChange={(e) => setAadharProof(e.target.files[0])}
                  required
                  className="basic-form-input-file"
                />
              </div>
              <div className="basic-form-group">
                <label htmlFor="panProof">
                  PAN Card Proof: <span className="basic-form-required">*</span>
                </label>
                <input
                  type="file"
                  id="panProof"
                  name="panProof"
                  accept="application/pdf"
                  onChange={(e) => setPanProof(e.target.files[0])}
                  required
                  className="basic-form-input-file"
                />
              </div>
              <div className="basic-form-group">
                <label htmlFor="joiningOrder">
                  Joining Order: <span className="basic-form-required">*</span>
                </label>
                <input
                  type="file"
                  id="joiningOrder"
                  name="joiningOrder"
                  accept="application/pdf"
                  onChange={(e) => setJoiningOrder(e.target.files[0])}
                  required
                  className="basic-form-input-file"
                />
              </div>
              <div className="basic-form-group">
                <label htmlFor="officeOrder">
                  Office Order: <span className="basic-form-required">*</span>
                </label>
                <input
                  type="file"
                  id="officeOrder"
                  name="officeOrder"
                  accept="application/pdf"
                  onChange={(e) => setOfficeOrder(e.target.files[0])}
                  required
                  className="basic-form-input-file"
                />
              </div>
            </div>
          </div>
          <button className="basic-form-button" type="submit">
            Submit
          </button>
        </form>
        {loading && (
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#4fa94d"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        )}
      </div>
    </div>
  );
};

export default Basic;
