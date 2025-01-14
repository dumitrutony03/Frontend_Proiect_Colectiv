import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const RegisterPage = () => {
    const [pacientData, setPacientData] = useState({
        userName: '',
        password: ''
    });

    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPacientData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/pacient/', pacientData);
            setMessage("Pacient registered successfully: " + response.data.userName);
            // Navigate to the login page after successful registration
            navigate('/LoginPage');
        } catch (error) {
            setMessage('Error registering pacient: ' + error.response?.data?.message || error.message);
        }
    };

    return (
        <div>
            <h2>Register page</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="userName"
                        value={pacientData.userName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={pacientData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
            <p>Already have an account? <button onClick={() => navigate('/LoginPage')}>Login</button></p> {/* Button for navigation */}
        </div>
    );
};

export default RegisterPage;
