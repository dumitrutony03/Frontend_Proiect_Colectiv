import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const LoginPage = () => {
    const [loginData, setLoginData] = useState({
        userName: '',
        password: '',
        role: 'PACIENT' // Default role
    });

    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/user/login', loginData, {
                params: { role: loginData.role }
            });
            setMessage("Login successful: " + response.data.userName);
            if (loginData.role === 'PACIENT') {
                navigate('/'); // Redirect to HomePage for patients
            } else if (loginData.role === 'DOCTOR') {
                navigate('/AppointmentPage'); // Redirect to AppointmentPage for doctors
            }
        } catch (error) {
            setMessage('Error logging in: ' + error.response?.data?.message || error.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="userName"
                        value={loginData.userName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={loginData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Role:</label>
                    <select
                        name="role"
                        value={loginData.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="DOCTOR">Doctor</option>
                        <option value="PACIENT">Pacient</option>
                    </select>
                </div>
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default LoginPage;
