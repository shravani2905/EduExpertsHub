import React from 'react';
import { useForm } from 'react-hook-form';
import './Basic.css';

const Basic = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="container">
      <h5 className="basicheading">Basic Information</h5>
      <form className="basicform" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-columns">
          <div className="form-column">
            <div className="form-group">
              <label htmlFor="facultyId">Faculty ID:</label>
              <input
                type="text"
                id="facultyId"
                name="facultyId"
                required
                placeholder="Enter Faculty ID"
                {...register('facultyId')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Faculty Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Enter Name"
                {...register('name')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="aadhar">Aadhar Card Number:</label>
              <input
                type="text"
                id="aadhar"
                name="aadhar"
                required
                placeholder="Enter Aadhar Card Number"
                {...register('aadhar')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="pan">PAN Card Number:</label>
              <input
                type="text"
                id="pan"
                name="pan"
                required
                placeholder="Enter PAN Card Number"
                {...register('pan')}
              />
            </div>
          
          
            <div className="form-group">
              <label htmlFor="aadharProof">Aadhar Card Proof:</label>
              <input
                type="file"
                id="aadharProof"
                name="aadharProof"
                accept="image/*"
                required
                {...register('aadharProof')}
              />
            </div>
            </div>
            <div className="form-column">
            <div className="form-group">
              <label htmlFor="panProof">PAN Card Proof:</label>
              <input
                type="file"
                id="panProof"
                name="panProof"
                accept="image/*"
                required
                {...register('panProof')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateOfJoining">Date of Joining:</label>
              <input
                type="date"
                id="dateOfJoining"
                name="dateOfJoining"
                required
                {...register('dateOfJoining')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="joiningOrder">Joining Order:</label>
              <input
                type="file"
                id="joiningOrder"
                name="joiningOrder"
                accept="application/pdf"
                required
                {...register('joiningOrder')}
              />
            </div>
            <div className="form-group office-order">
  <label htmlFor="officeOrder">Office Order:</label>
  <input
    type="file"
    id="officeOrder"
    name="officeOrder"
    accept="application/pdf"
    required
    {...register('officeOrder')}
  />
</div>
          </div>
        </div>
        <button className="btn basicbutton" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Basic;
