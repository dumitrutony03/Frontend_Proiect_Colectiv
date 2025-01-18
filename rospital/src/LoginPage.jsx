import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FullWidthHeader from "./Header";
import {
  Box,
  TextField,
  IconButton,
  FormControlLabel,
  Checkbox,
  Paper,
  Button,
  Link,
  Switch,
  Typography,
  Container,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Person,
  MedicalServices,
} from "@mui/icons-material";
import axios from "axios"; // Ensure axios is imported

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Sign Up
  const [isDoctor, setIsDoctor] = useState(false); // Toggle between Patient and Doctor
  const [showPassword, setShowPassword] = useState(false); // Password visibility toggle
  const [userName, setUserName] = useState(""); // Store username
  const [password, setPassword] = useState(""); // Store password
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message || ""; // Error message from route state

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setUserName("");
    setPassword("");
  };

  const handleRoleSwitch = () => {
    setIsDoctor((prev) => !prev);
  };

  const handleScrollToHome = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Scroll to the "About Us" section with offset
  const handleScrollToAbout = () => {
    if (aboutUsRef.current) {
      const offset = -120; // Adjust the offset value to scroll further upwards
      const elementPosition = aboutUsRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset + offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Scroll to the "Services" section with offset
  const handleScrollToServices = () => {
    if (servicesRef.current) {
      const offset = -180; // Adjust the offset value to scroll further upwards
      const elementPosition = servicesRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset + offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };
  // LOGIN BUTTON
  const handleLogin = async () => {
    // Simulate login request
    try {
      const response = await axios.post(
        "http://localhost:8080/user/login",
        {
          userName,
          password,
        },
        {
          params: { role: isDoctor ? "DOCTOR" : "PACIENT" }, // Use isDoctor for role
        }
      );

      if (response.status === 200) {
        // Store patient username in localStorage or state

        // If the login is successful, navigate to the respective page
        if (isDoctor) {
          localStorage.setItem("doctorUsername", userName);
          navigate("/doctor-dashboard"); // Redirect doctors to their dashboard
        } else {
          localStorage.setItem("patientUsername", userName);
          navigate("/appointment"); // Redirect patients to their dashboard
        }
      }
    } catch (error) {
      // Handle errors here (e.g., invalid login)
      console.error(
        "Login failed: ",
        error.response?.data?.message || error.message
      );
    }
  };

  // SIGNUP BUTTON
  const handleSignUp = async () => {
    try {
      // Sending POST request to the signup endpoint
      const response = await axios.post("http://localhost:8080/pacient/", {
        userName, // User's name
        password, // User's password
      });

      if (response.status === 201 || response.status === 200) {
        // Successful registration, toggle the form to login
        toggleForm();

        // Display success message
        alert("Registration successful! You can now log in.");
      }
    } catch (error) {
      // Handle errors
      console.error(
        "Sign-up failed: ",
        error.response?.data?.message || error.message
      );
      alert(
        error.response?.data?.message || "Sign-up failed. Please try again."
      );
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden"; // Prevent scrolling
    document.body.style.margin = "0"; // Reset margin for full-page background
    document.body.style.padding = "0"; // Remove padding
    document.body.style.background = "#d0ebf9"; // Softer, calming light blue
    document.body.style.height = "100%"; // Ensure full coverage

    return () => {
      document.body.style.overflow = "auto"; // Reset when component unmounts
      document.body.style.background = ""; // Remove background on unmount
    };
  }, []);

  return (
    <div>
      {/* Full-Width Header */}
      <FullWidthHeader
        handleScrollToHome={handleScrollToHome}
        handleScrollToAbout={handleScrollToAbout}
        handleScrollToServices={handleScrollToServices}
      />
      <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        <Container
          maxWidth="md"
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "64px", // Adjust for AppBar height
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: "25%",
              height: "80%",
              transformStyle: "preserve-3d",
              transition: "transform 0.8s",
              transform: isLogin ? "rotateY(0deg)" : "rotateY(180deg)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Login Form */}
            <Paper
              elevation={3}
              sx={{
                position: "absolute",
                width: "122%",
                height: "100%",
                backfaceVisibility: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 3,
                borderRadius: 3,
              }}
            >
              <Typography
                gutterBottom
                align="center"
                sx={{
                  fontSize: "1.8rem", // Slightly larger text
                  fontWeight: "bold",
                  color: "transparent",
                  backgroundImage: "linear-gradient(90deg, #1F2B6C, #03A9F4)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  textFillColor: "transparent",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  letterSpacing: "0.1rem",
                }}
              >
                Login
              </Typography>

              <Typography
                variant="body1"
                align="center"
                sx={{
                  color: message ? "red" : "#1F2B6C", // Red for message, blue for default
                  fontSize: "1.0rem", // Slightly larger text
                  fontWeight: 500, // Medium weight for emphasis
                  fontStyle: "italic", // Italic for a softer tone
                  textShadow: "0.5px 0.5px 2px rgba(0, 0, 0, 0.1)",
                  letterSpacing: "0.02rem", // Slight spacing for modern look
                }}
              >
                {message || "Please sign in to continue"}
              </Typography>

              <TextField
                label="Full name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={userName}
                onChange={(e) => setUserName(e.target.value)} // Update userName state
              />
              <Box sx={{ position: "relative", width: "100%" }}>
                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update password state
                />
                <IconButton
                  onClick={togglePasswordVisibility}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    right: 8,
                    transform: "translateY(-40%)",
                  }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </Box>
              <FormControlLabel control={<Checkbox />} label="Remember me" />

              {/* Role Toggle */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                <Person
                  sx={{
                    fontSize: "2rem",
                    color: isDoctor ? "#bbb" : "#1F2B6C",
                  }}
                />
                <Switch
                  checked={isDoctor}
                  onChange={handleRoleSwitch}
                  sx={{
                    "& .MuiSwitch-thumb": {
                      backgroundColor: isDoctor ? "#03A9F4" : "#1F2B6C",
                    },
                  }}
                />
                <MedicalServices
                  sx={{
                    fontSize: "2rem",
                    color: isDoctor ? "#1F2B6C" : "#bbb",
                  }}
                />
              </Box>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  marginTop: 1,
                  backgroundColor: "#3751FE",
                  "&:hover": {
                    backgroundColor: "#1F2B6C",
                    transform: "scale(1.05)",
                  },
                  transition: "transform 0.2s",
                }}
                onClick={handleLogin} // Call handleLogin on button click
              >
                Login
              </Button>
              <Link
                component="button"
                variant="body2"
                sx={{
                  marginTop: 2,
                  "&:hover": {
                    transform: "scale(1.05)",
                    textDecoration: "underline",
                  },
                  transition: "transform 0.2s",
                }}
                onClick={toggleForm}
              >
                Do not have an account? Create one
              </Link>
            </Paper>
            {/* Sign Up Form */}
            <Paper
              elevation={3}
              sx={{
                position: "absolute",
                width: "122%",
                height: "95%",
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 3,
                borderRadius: 2,
              }}
            >
              <Typography
                gutterBottom
                align="center"
                sx={{
                  fontSize: "1.8rem", // Slightly larger text
                  fontWeight: "bold",
                  color: "transparent",
                  backgroundImage: "linear-gradient(90deg, #1F2B6C, #03A9F4)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  textFillColor: "transparent",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  letterSpacing: "0.1rem",
                }}
              >
                Create your Account
              </Typography>
              <Typography
                variant="body1"
                align="center"
                sx={{
                  color: "#444", // Slightly darker for better readability
                  fontSize: "1.0rem", // Slightly larger text
                  fontWeight: 500, // Medium weight for emphasis
                  fontStyle: "italic", // Italic for a softer tone
                  textShadow: "0.5px 0.5px 2px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
                  letterSpacing: "0.02rem", // Slight spacing for modern look
                }}
              >
                Sign up to access our services and exclusive features
              </Typography>
              <TextField
                label="Full name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={userName}
                onChange={(e) => setUserName(e.target.value)} // Update userName state
              />
              <Box sx={{ position: "relative", width: "100%" }}>
                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update password state
                />
                <IconButton
                  onClick={togglePasswordVisibility}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    right: 8,
                    transform: "translateY(-40%)",
                  }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </Box>

              <Button
                variant="contained"
                fullWidth
                sx={{
                  marginTop: 1,
                  backgroundColor: "#3751FE",
                  "&:hover": {
                    backgroundColor: "#1F2B6C",
                    transform: "scale(1.05)",
                  }, // Added upscaling effect
                  transition: "transform 0.2s", // Smooth scaling animation
                }}
                onClick={handleSignUp} // Call handleSingup on button click
              >
                Create Account
              </Button>
              <Link
                component="button"
                variant="body2"
                sx={{
                  marginTop: 2,
                  "&:hover": {
                    transform: "scale(1.05)", // Added upscaling effect
                    textDecoration: "underline", // Optional for emphasis
                  },
                  transition: "transform 0.2s", // Smooth scaling animation
                }}
                onClick={toggleForm}
              >
                Already have an account? Login
              </Link>
            </Paper>
          </Box>
        </Container>
      </Box>
    </div>
  );
}

export default LoginPage;
