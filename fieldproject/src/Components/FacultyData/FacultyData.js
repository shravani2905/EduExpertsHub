import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './FacultyData.css';

function UserInfo() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedRows, setExpandedRows] = useState({});
  const { currentUser } = useSelector((state) => state.userAdminLoginReducer);
  const token = localStorage.getItem('token');

  const [departmentFilter, setDepartmentFilter] = useState('');
  const [designationFilter, setDesignationFilter] = useState('');
  const [joiningDateFromFilter, setJoiningDateFromFilter] = useState('');
  const [joiningDateToFilter, setJoiningDateToFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/admin-api/userinfo', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserData(response.data.data);
      } catch (err) {
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [token]);

  const handleExpandRow = (id) => {
    setExpandedRows((prevExpandedRows) => ({
      ...prevExpandedRows,
      [id]: !prevExpandedRows[id]
    }));
  };

  const handleDepartmentFilterChange = (e) => {
    setDepartmentFilter(e.target.value);
  };

  const handleDesignationFilterChange = (e) => {
    setDesignationFilter(e.target.value);
  };

  const handleJoiningDateFromFilterChange = (e) => {
    setJoiningDateFromFilter(e.target.value);
  };

  const handleJoiningDateToFilterChange = (e) => {
    setJoiningDateToFilter(e.target.value);
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUserData = userData.filter(user => {
    const userJoiningDate = new Date(user.dateOfJoining).toLocaleDateString();
    return (
      (departmentFilter === '' || user.department.toLowerCase() === departmentFilter.toLowerCase()) &&
      (designationFilter === '' || user.position.toLowerCase() === designationFilter.toLowerCase()) &&
      (joiningDateFromFilter === '' || new Date(userJoiningDate) >= new Date(joiningDateFromFilter)) &&
      (joiningDateToFilter === '' || new Date(userJoiningDate) <= new Date(joiningDateToFilter)) &&
      (searchQuery === '' || 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.facultyId.toString().toLowerCase().includes(searchQuery.toLowerCase()) // Include search by Faculty ID
      )
    );
  });
  
  // Unique department and designation options for dropdowns
  const uniqueDepartments = Array.from(new Set(userData.map(user => user.department)));
  const uniqueDesignations = Array.from(new Set(userData.map(user => user.position)));

  return (
    <div className="user-info-container">
      <div className="filter-controls-horizontal">
        <div className="filter-dropdown">
          <label htmlFor="departmentFilter">Department:</label>
          <select
            id="departmentFilter"
            value={departmentFilter}
            onChange={handleDepartmentFilterChange}
          >
            <option value="">All</option>
            {uniqueDepartments.map((department, index) => (
              <option key={index} value={department}>{department}</option>
            ))}
          </select>
        </div>
        <div className="filter-dropdown">
          <label htmlFor="designationFilter">Designation:</label>
          <select
            id="designationFilter"
            value={designationFilter}
            onChange={handleDesignationFilterChange}
          >
            <option value="">All</option>
            {uniqueDesignations.map((designation, index) => (
              <option key={index} value={designation}>{designation}</option>
            ))}
          </select>
        </div>
        <div className="filter-date-range">
          <label htmlFor="joiningDateFromFilter">Joining Date From:</label>
          <input
            type="date"
            id="joiningDateFromFilter"
            className='daterange'
            value={joiningDateFromFilter}
            onChange={handleJoiningDateFromFilterChange}
          />
          <label htmlFor="joiningDateToFilter">Joining Date To:</label>
          <input
            type="date"
            id="joiningDateToFilter"
            className='daterange'
            value={joiningDateToFilter}
            onChange={handleJoiningDateToFilterChange}
          />
        </div>
      </div>

      <div className="filter-search mx-auto">
        <input
          className='inputfield'
          type="text"
          id="searchQuery"
          placeholder='Search'
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
      </div>

      {/* Loading and Error Handling */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <table className="user-info-table">
          <thead>
            <tr>
              <th></th> {/* Empty cell for image */}
              <th>Faculty ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Date of Joining</th>
              <th>CV</th>
              <th>More Details</th>
              <th>Send Message</th>
            </tr>
          </thead>
          <tbody>
            {filteredUserData.map((user) => (
              <React.Fragment key={user._id}>
                <tr>
                  <td>
                    <img src={user.imgUrl} alt="User" style={{ width: '50px', height: 'auto' }} />
                  </td>
                  <td>{user.facultyId}</td>
                  <td>{user.name}</td>
                  <td>{user.department}</td>
                  <td>{user.position}</td>
                  <td>{new Date(user.dateOfJoining).toLocaleDateString()}</td>
                  <td><a href={user.cvUrl} target="_blank" rel="noopener noreferrer">View CV</a></td>
                  <td>
                    <button onClick={() => handleExpandRow(user._id)}>
                      {expandedRows[user._id] ? 'Hide Details' : 'Show Details'}
                    </button>
                  </td>
                  <td>
                    <Link to={`/message/${user._id}`} state={{ user }}>
                      <button className='btn'>Message</button>
                    </Link>
                  </td>
                </tr>
                {expandedRows[user._id] && (
                  <tr>
                    <td colSpan="9">
                      <div className="expanded-row">
                      <p><strong>Aadhar:</strong> {user.aadhar}</p>
                        <p><strong>Aadhar Proof:</strong> <a href={user.aadharProofUrl} target="_blank" rel="noopener noreferrer">View Aadhar Proof</a></p>
                        <p><strong>PAN :</strong> {user.pan}</p>
                        <p><strong>PAN Proof:</strong> <a href={user.panProofUrl} target="_blank" rel="noopener noreferrer">View PAN Proof</a></p>
                        <p><strong>Joining Order:</strong> <a href={user.joiningOrderUrl} target="_blank" rel="noopener noreferrer">View Joining Order</a></p>
                        <p><strong>Office Order:</strong> <a href={user.officeOrderUrl} target="_blank" rel="noopener noreferrer">View Office Order</a></p>
                        <p><strong>10th Certificate:</strong> <a href={user.certificate10Url} target="_blank" rel="noopener noreferrer">View 10th Certificate</a></p>
                        <p><strong>Inter Certificate:</strong> <a href={user.certificateInterUrl} target="_blank" rel="noopener noreferrer">View Inter Certificate</a></p>
                        <p><strong>UG Certificate:</strong> <a href={user.certificateUGUrl} target="_blank" rel="noopener noreferrer">View UG Certificate</a></p>
                        <p><strong>PG Certificate:</strong> <a href={user.certificatePGUrl} target="_blank" rel="noopener noreferrer">View PG Certificate</a></p>
                        {user.phdStatus === 'Completed' && (
                          <p><strong>PhD Certificate:</strong> <a href={user.certificatePhDUrl} target="_blank" rel="noopener noreferrer">View PhD Certificate</a></p>
                        )}
                        <p><strong>Education:</strong> {user.education}</p>
                        <p><strong>Inter Percentage:</strong> {user.interPercentage}</p>
                        <p><strong>UG Percentage:</strong> {user.ugPercentage}</p>
                        <p><strong>PG Branch:</strong> {user.pgBranch}</p>
                        <p><strong>PG Percentage:</strong> {user.pgPercentage}</p>
                        <p><strong>PhD Specialization:</strong> {user.phdSpecialization}</p>
                        <p><strong>PhD Status:</strong> {user.phdStatus}</p>
                        <p><strong>UG Branch:</strong> {user.ugBranch}</p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserInfo;
