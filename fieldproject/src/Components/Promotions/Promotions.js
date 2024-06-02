import React, { useState } from 'react';
import './Promotions.css';

const PromotionsForm = () => {
  const [position, setPosition] = useState('');
  const [sectionalHead, setSectionalHead] = useState('');
  const [promotionDate, setPromotionDate] = useState('');
  const [officeOrder, setOfficeOrder] = useState(null);
  const [joiningReport, setJoiningReport] = useState(null);

  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  };

  const handleSectionalHeadChange = (event) => {
    setSectionalHead(event.target.value);
  };

  const handleDateChange = (event) => {
    setPromotionDate(event.target.value);
  };

  const handleOfficeOrderChange = (event) => {
    setOfficeOrder(event.target.files[0]);
  };

  const handleJoiningReportChange = (event) => {
    setJoiningReport(event.target.files[0]);
  };

  return (
    <div className="promotions-form-container">
      <h1 className="promotions-form-heading">Promotions</h1>
      <div className="promotions-form-row">
        <label htmlFor="promotedTo" className="promotions-form-label">Promoted To:</label>
        <select 
          id="promotedTo" 
          value={position} 
          onChange={handlePositionChange} 
          className="promotions-form-select"
        >
          <option value="" disabled>Select your position</option>
          <option value="assistant professor">Assistant Professor</option>
          <option value="senior assistant professor">Senior Assistant Professor</option>
          <option value="associate professor">Associate Professor</option>
          <option value="professor">Professor</option>
          <option value="H.O.D">H.O.D</option>
          <option value="sectional head">Sectional Head</option>
        </select>
        
        {position === 'sectional head' && (
          <select 
            id="sectionalHead" 
            value={sectionalHead} 
            onChange={handleSectionalHeadChange} 
            className="promotions-form-select"
          >
            <option value="" disabled>Select section</option>
            <option value="PAAC">PAAC</option>
            <option value="IQAC">IQAC</option>
            <option value="MTP">MTP</option>
            <option value="R&D">R&D</option>
          </select>
        )}
      </div>

      <div className="promotions-form-row">
        <label htmlFor="promotionDate" className="promotions-form-label">Date of promotion:</label>
        <input 
          type="date" 
          id="promotionDate" 
          value={promotionDate} 
          onChange={handleDateChange}
          className="promotions-form-input"
        />
      </div>

      <div className="promotions-form-row">
        <label htmlFor="officeOrder" className="promotions-form-label">Upload Office Order:</label>
        <input 
          type="file" 
          id="officeOrder" 
          onChange={handleOfficeOrderChange}
          className="promotions-form-input"
        />
      </div>

      <div className="promotions-form-row">
        <label htmlFor="joiningReport" className="promotions-form-label">Upload Joining Report:</label>
        <input 
          type="file" 
          id="joiningReport" 
          onChange={handleJoiningReportChange}
          className="promotions-form-input"
        />
      </div>
    </div>
  );
};

export default PromotionsForm;