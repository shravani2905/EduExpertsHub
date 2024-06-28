import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import './Qualification.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThreeDots } from 'react-loader-spinner';

function Qualification() {
  const { control, handleSubmit, watch, formState: { errors }, register } = useForm();
  const watchEducation = watch('education');
  const [err, setErr] = useState("");
  const [certificate10, setCertificate10] = useState(null);
  const [certificateInter, setCertificateInter] = useState(null);
  const [certificateUG, setCertificateUG] = useState(null);
  const [certificatePG, setCertificatePG] = useState(null);
  const [certificatePhD, setCertificatePhD] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.userAdminLoginReducer);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Create axios instance with token
  const axiosWithToken = axios.create({
    headers: { Authorization: `Bearer ${token}` }
  });

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
    setLoading(true);
    try {
      const certificate10Url = await uploadFile(certificate10);
      const certificateInterUrl = await uploadFile(certificateInter);
      const certificateUGUrl = await uploadFile(certificateUG);
      const certificatePGUrl = await uploadFile(certificatePG);
      const certificatePhDUrl = certificatePhD ? await uploadFile(certificatePhD) : null;

      if (!certificate10Url || !certificateInterUrl || !certificateUGUrl || !certificatePGUrl || (certificatePhD && !certificatePhDUrl)) {
        setErr("File upload failed");
        setLoading(false);
        return;
      }

      const dataToSubmit = {
        ...data,
        certificate10Url,
        certificateInterUrl,
        certificateUGUrl,
        certificatePGUrl,
        certificatePhDUrl,
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
    } catch (error) {
      setErr("An error occurred while submitting the form");
      console.error("Error submitting form:", error);
      setLoading(false);
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
                  {...register('gpa', {
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
                  {...register('percentage', {
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
              <input
                type="file"
                id="certificate10"
                onChange={(e) => setCertificate10(e.target.files[0])}
                className="qualification-form-file"
              />
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
                {...register('interPercentage', {
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
              <input
                type="file"
                id="certificateInter"
                onChange={(e) => setCertificateInter(e.target.files[0])}
                className="qualification-form-file"
              />
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
                {...register('ugPercentage', {
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
                    <option value="Civil">Civil</option>
                    <option value="EEE">EEE</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Chemical">Chemical</option>
                    <option value="Others">Others</option>
                  </select>
                )}
              />
              {errors.ugBranch && <span className="qualification-error-message">{errors.ugBranch.message}</span>}
            </div>
            <div className="qualification-form-group">
              <label>
                Certificate <span className="qualification-mandatory">*</span>
              </label>
              <input
                type="file"
                id="certificateUG"
                onChange={(e) => setCertificateUG(e.target.files[0])}
                className="qualification-form-file"
              />
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
                    <option value="Civil">Civil</option>
                    <option value="EEE">EEE</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Chemical">Chemical</option>
                    <option value="Others">Others</option>
                  </select>
                )}
              />
              {errors.pgBranch && <span className="qualification-error-message">{errors.pgBranch.message}</span>}
            </div>
            <div className="qualification-form-group">
              <label>
                Certificate <span className="qualification-mandatory">*</span>
              </label>
              <input
                type="file"
                id="certificatePG"
                onChange={(e) => setCertificatePG(e.target.files[0])}
                className="qualification-form-file"
              />
              {errors.certificatePG && <span className="qualification-error-message">{errors.certificatePG.message}</span>}
            </div>
          </div>

          {/* PhD Details */}
          <div className="qualification-form-row">
            <div className="qualification-form-group">
              <label>
                PhD Specialization
              </label>
              <input
                type="text"
                placeholder="Enter PhD Specialization"
                {...control.register('phdSpecialization')}
                className="qualification-form-input"
              />
              {errors.phdSpecialization && <span className="qualification-error-message">{errors.phdSpecialization.message}</span>}
            </div>
            <div className="qualification-form-group">
              <label>
                PhD Status <span className="qualification-mandatory">*</span>
              </label>
              <Controller
                name="phdStatus"
                control={control}
                defaultValue=""
                rules={{ required: "PhD Status is required" }}
                render={({ field }) => (
                  <select {...field} className="qualification-form-select">
                    <option value="">Select PhD Status</option>
                    <option value="Completed">Completed</option>
                    <option value="Pursuing">Pursuing</option>
                    <option value="Not Pursuing">Not Pursuing</option>
                  </select>
                )}
              />
              {errors.phdStatus && <span className="qualification-error-message">{errors.phdStatus.message}</span>}
            </div>
            {watch('phdStatus') === 'Completed' && (
              <div className="qualification-form-group">
                <label>
                  Certificate
                </label>
                <input
                  type="file"
                  id="certificatePhD"
                  onChange={(e) => setCertificatePhD(e.target.files[0])}
                  className="qualification-form-file"
                />
                {errors.certificatePhD && <span className="qualification-error-message">{errors.certificatePhD.message}</span>}
              </div>
            )}
          </div>

          <button type="submit" className="qualification-form-submit" disabled={loading}>
            {loading ? <ThreeDots color="#FFF" height={10} /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Qualification;
