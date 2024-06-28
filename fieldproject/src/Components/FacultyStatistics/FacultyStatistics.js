import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FacultyStatistics.css'; // Import your CSS file for styling

const FacultyCalculator = () => {
    const [studentCount, setStudentCount] = useState('');
    const [facultyRequirements, setFacultyRequirements] = useState([]);
    const [availableFaculty, setAvailableFaculty] = useState({ total: 0, professors: 0, associateProfessors: 0, assistantProfessors: 0 }); // Initialize with default values
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cadrePercentage, setCadrePercentage] = useState(0);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchAvailableFaculty = async () => {
            setLoading(true);
            
            try {
                const response = await axios.get('http://localhost:4000/admin-api/userinfo', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const { data } = response.data;
                const professors = countFacultyByPosition(data, 'Professor');
                const associateProfessors = countFacultyByPosition(data, 'Associate professor');
                const assistantProfessors = countFacultyByPosition(data, 'Assistant professor');

                // Calculate total available faculty only for selected positions
                const totalAvailable = professors.available + associateProfessors.available + assistantProfessors.available;

                setAvailableFaculty({
                    total: totalAvailable,
                    professors: professors,
                    associateProfessors: associateProfessors,
                    assistantProfessors: assistantProfessors
                });
            } catch (err) {
                setError('Failed to fetch available faculty data');
            } finally {
                setLoading(false);
            }
        };

        fetchAvailableFaculty();
    }, [token]);

    const handleStudentCountChange = (event) => {
        setStudentCount(event.target.value);
    };

    const calculateFacultyRequirements = () => {
        if (!studentCount || isNaN(studentCount)) {
            alert('Please enter a valid number for student count.');
            return;
        }

        // Assuming B.Tech norms as per your provided calculations
        const RT = Math.floor(studentCount / 20); // Total faculty required based on 20:1 ratio

        // Calculate required faculty based on the provided ratios
        let RP = (1 / 9) * RT;
        let RA = (2 / 9) * RT;
        let Ra = (6 / 9) * RT;

        // Determine whether to ceil or floor based on mantissa
        RP = (RP - Math.floor(RP) > 0.5) ? Math.ceil(RP) : Math.floor(RP);
        RA = (RA - Math.floor(RA) > 0.5) ? Math.ceil(RA) : Math.floor(RA);
        Ra = (Ra - Math.floor(Ra) > 0.5) ? Math.ceil(Ra) : Math.floor(Ra);

        // Prepare the faculty requirements for display
        const newFacultyRequirements = [
            { type: 'Total Faculty', required: RT, available: availableFaculty.total },
            { type: 'Professors', required: RP, available: availableFaculty.professors.available },
            { type: 'Associate Professors', required: RA, available: availableFaculty.associateProfessors.available },
            { type: 'Assistant Professors', required: Ra, available: availableFaculty.assistantProfessors.available }
        ];

        setFacultyRequirements(newFacultyRequirements);

        // Calculate Cadre percentage
        const A_P = availableFaculty.professors.required;
        const R_P = Math.max(RP, 1); // Ensure R_P is at least 1 to avoid division by zero
        const A_A = availableFaculty.associateProfessors.required;
        const R_A = Math.max(RA, 1); // Ensure R_A is at least 1
        const A_a = availableFaculty.assistantProfessors.required;
        const R_a = Math.max(Ra, 1); // Ensure R_a is at least 1

        const cadrePercentage = ((A_P / R_P) * 100 * 0.5) + ((A_A / R_A) * 100 * 0.3) + ((A_a / R_a) * 100 * 0.2);
        setCadrePercentage(cadrePercentage);
    };

    const countFacultyByPosition = (facultyData, position) => {
        const filteredFaculty = facultyData.filter(faculty => faculty.position === position);
        const requiredCount = filteredFaculty.length;
        const availableCount = filteredFaculty.reduce((total, faculty) => total + 1, 0); // Count available based on filtered results

        return { required: requiredCount, available: availableCount };
    };

    return (
        <div className="faculty-calculator">
            <h3 className="calculator-title text-success">Faculty Cadre Percentage</h3>

            <form onSubmit={(e) => { e.preventDefault(); calculateFacultyRequirements(); }} className="calculator-form">
                <label htmlFor="studentCount" className="form-label">Enter Student Count:</label>
                <input
                    type="number"
                    id="studentCount"
                    name="studentCount"
                    value={studentCount}
                    onChange={handleStudentCountChange}
                    className="form-input"
                    required
                />
                <button type="submit" className="form-button">Calculate</button>
            </form>

            {loading && <p className="loading-message">Loading available faculty data...</p>}
            {error && <p className="error-message">{error}</p>}

            {facultyRequirements.length > 0 && (
                <>
                    <h3 className="requirements-title">Faculty Requirements</h3>
                    <table className="requirements-table">
                        <thead>
                            <tr>
                                <th className="table-header">Type</th>
                                <th className="table-header">Required</th>
                                <th className="table-header">Available</th>
                            </tr>
                        </thead>
                        <tbody>
                            {facultyRequirements.map((faculty, index) => (
                                <tr key={index} className="requirements-row">
                                    <td className="table-data">{faculty.type}</td>
                                    <td className="table-data">{faculty.required}</td>
                                    <td className="table-data">{faculty.available}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="cadre-calculation">
                        <h2 className="cadre-title">Cadre Calculation</h2>
                        <div className="cadre-result">
                            <p className="cadre-label">Faculty Cadre (%)</p>
                            <p className="cadre-percentage">{cadrePercentage.toFixed(2)}%</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default FacultyCalculator;
