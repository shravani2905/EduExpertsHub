import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import './Qualification.css';

function Qualification() {
  const { control, handleSubmit, watch, formState: { errors } } = useForm();
  const watchEducation = watch('education');

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="qualification">
      <div className="form-wrapper">
         <h4 className='quaheading'>Educational Qualifications</h4>
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
         
          {/* 10th Details */}
          <div className="form-row">
            <div className="form-group">
              <label>
                Education Board <span className="mandatory">*</span>
              </label>
              <Controller
                name="education"
                control={control}
                defaultValue=""
                rules={{ required: "Education Board is required" }}
                render={({ field }) => (
                  <select {...field} className="form-select">
                    <option value="">Select Education Board</option>
                    <option value="ssc">SSC</option>
                    <option value="cbse">CBSE</option>
                    <option value="icse">ICSE</option>
                  </select>
                )}
              />
              {errors.education && <span className="error-message">{errors.education.message}</span>}
            </div>
            {watchEducation === 'ssc' && (
              <div className="form-group">
                <label>
                  GPA <span className="mandatory">*</span>
                </label>
                <input
                  type="number"
                  placeholder="Enter GPA"
                  {...control.register('gpa', {
                    required: "GPA is required",
                    min: { value: 0, message: "GPA must be between 0 and 10" },
                    max: { value: 10, message: "GPA must be between 0 and 10" },
                  })}
                  className="form-input"
                />
                {errors.gpa && <span className="error-message">{errors.gpa.message}</span>}
              </div>
            )}
            {(watchEducation === 'cbse' || watchEducation === 'icse') && (
              <div className="form-group">
                <label>
                  Percentage <span className="mandatory">*</span>
                </label>
                <input
                  type="number"
                  placeholder="Enter Percentage"
                  {...control.register('percentage', {
                    required: "Percentage is required",
                    min: { value: 0, message: "Percentage must be between 0 and 100" },
                    max: { value: 100, message: "Percentage must be between 0 and 100" },
                  })}
                  className="form-input"
                />
                {errors.percentage && <span className="error-message">{errors.percentage.message}</span>}
              </div>
            )}
            <div className="form-group">
              <label>
                Certificate <span className="mandatory">*</span>
              </label>
              <input type="file" {...control.register('certificate10', { required: "Certificate is required" })} className="form-file" />
              {errors.certificate10 && <span className="error-message">{errors.certificate10.message}</span>}
            </div>
          </div>

          {/* Inter Details */}
          <div className="form-row">
            <div className="form-group">
              <label>
                Inter Percentage <span className="mandatory">*</span>
              </label>
              <input
                type="number"
                placeholder="Enter Inter Percentage"
                {...control.register('interPercentage', {
                  required: "Inter Percentage is required",
                  min: { value: 0, message: "Percentage must be between 0 and 100" },
                  max: { value: 100, message: "Percentage must be between 0 and 100" },
                })}
                className="form-input"
              />
              {errors.interPercentage && <span className="error-message">{errors.interPercentage.message}</span>}
            </div>
            <div className="form-group">
              <label>
                Certificate <span className="mandatory">*</span>
              </label>
              <input type="file" {...control.register('certificateInter', { required: "Certificate is required" })} className="form-file" />
              {errors.certificateInter && <span className="error-message">{errors.certificateInter.message}</span>}
            </div>
          </div>

          {/* UG Details */}
          <div className="form-row">
            <div className="form-group">
              <label>
                UG Specialization <span className="mandatory">*</span>
              </label>
              <input
                type="number"
                placeholder="Enter UG Percentage"
                {...control.register('ugPercentage', {
                  required: "UG Percentage is required",
                  min: { value: 0, message: "Percentage must be between 0 and 100" },
                  max: { value: 100, message: "Percentage must be between 0 and 100" },
                })}
                className="form-input"
              />
              {errors.ugPercentage && <span className="error-message">{errors.ugPercentage.message}</span>}
            </div>
            <div className="form-group">
              <label>
                UG Specialization <span className="mandatory">*</span>
              </label>
              <Controller
                name="ugBranch"
                control={control}
                defaultValue=""
                rules={{ required: "UG Branch is required" }}
                render={({ field }) => (
                  <select {...field} className="form-select">
                    <option value="">Select UG Specialization</option>
                    <option value="CSE">CSE</option>
                    <option value="ECE">ECE</option>
                    <option value="IT">IT</option>
                  </select>
                )}
              />
              {errors.ugBranch && <span className="error-message">{errors.ugBranch.message}</span>}
            </div>
            <div className="form-group">
              <label>
                Certificate <span className="mandatory">*</span>
              </label>
              <input type="file" {...control.register('certificateUG', { required: "Certificate is required" })} className="form-file" />
              {errors.certificateUG && <span className="error-message">{errors.certificateUG.message}</span>}
            </div>
          </div>

          {/* PG Details */}
          <div className="form-row">
            <div className="form-group">
              <label>
                PG Percentage <span className="mandatory">*</span>
              </label>
              <input
                type="number"
                placeholder="Enter PG Percentage"
                {...control.register('pgPercentage', {
                  required: "PG Percentage is required",
                  min: { value: 0, message: "Percentage must be between 0 and 100" },
                  max: { value: 100, message: "Percentage must be between 0 and 100" },
                })}
                className="form-input"
              />
              {errors.pgPercentage && <span className="error-message">{errors.pgPercentage.message}</span>}
            </div>
            <div className="form-group">
              <label>
                PG Specialization <span className="mandatory">*</span>
              </label>
              <Controller
                name="pgBranch"
                control={control}
                defaultValue=""
                rules={{ required: "PG Branch is required" }}
                render={({ field }) => (
                  <select {...field} className="form-select">
                    <option value="">Select PG Specialization</option>
                    <option value="CSE">CSE</option>
                    <option value="ECE">ECE</option>
                    <option value="IT">IT</option>
                  </select>
                )}
              />
              {errors.pgBranch && <span className="error-message">{errors.pgBranch.message}</span>}
            </div>
            <div className="form-group">
              <label>
                Certificate <span className="mandatory">*</span>
              </label>
              <input type="file" {...control.register('certificatePG', { required: "Certificate is required" })} className="form-file" />
              {errors.certificatePG && <span className="error-message">{errors.certificatePG.message}</span>}
            </div>
          </div>

          {/* PhD Details */}
          <div className="form-row">
            <div className="form-group">
              <label>PhD Percentage</label>
              <input
                type="number"
                placeholder="Enter PhD Percentage"
                {...control.register('phdPercentage', {
                  min: { value: 0, message: "Percentage must be between 0 and 100" },
                  max: { value: 100, message: "Percentage must be between 0 and 100" },
                })}
                className="form-input"
              />
              {errors.phdPercentage && <span className="error-message">{errors.phdPercentage.message}</span>}
            </div>
            <div className="form-group">
              <label>PhD Specialization</label>
              <Controller
                name="phdBranch"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <select {...field} className="form-select">
                    <option value="">Select PhD Specialization</option>
                    <option value="CSE">CSE</option>
                    <option value="ECE">ECE</option>
                    <option value="IT">IT</option>
                  </select>
                )}
              />
            </div>
            <div className="form-group">
              <label>Certificate</label>
              <input type="file" {...control.register('certificatePhD')} className="form-file" />
            </div>
          </div>

          <button type="submit" className="form-submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Qualification;