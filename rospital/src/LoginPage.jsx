import React, { useRef,useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  TextField,
  IconButton,
  Checkbox,
  FormControlLabel,
  Paper,
  Link,
  Container,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Sign Up
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  // Refs for scrolling
  const aboutUsRef = useRef(null);
  const servicesRef = useRef(null);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  React.useEffect(() => {
    document.body.style.overflow = "hidden"; // Prevent scrolling
    document.body.style.margin = "0"; // Reset margin for full-page background
    document.body.style.padding = "0"; // Remove padding
    document.body.style.background = "#d0ebf9"; // Softer, calming light blue
    document.body.style.height = "100%"; // Ensure full coverage!!!!!!!!!!!!!!!!

    return () => {
      document.body.style.overflow = "auto"; // Reset when component unmounts
      document.body.style.background = ""; // Remove background on unmount
    };
  }, []);

// Scroll to specific section
const handleScrollToSection = (section) => {
  navigate("/", { state: { scrollTo: section } });
};

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Full-Width Header */}
      <AppBar
        position="static"
        sx={{
          position: "fixed", // Ensure it stays at the top
          top: 0,
          left: 0,
          width: "100vw", // Use full viewport width
          margin: 0,
          padding: 0,
          backgroundColor: "#1F2B6C",
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "1200px", // Center and constrain content width
            padding: "0 20px", // Add horizontal padding for inner content
            width: "100%",
            margin: "0 auto", // Center the content horizontally
          }}
        >
          {/* Logo */}
                    <Button
                      sx={{
                      fontWeight: "bold",
                      color: "#fff",
                      fontSize: "1.25rem",
                      textTransform: "none",
                      "&:hover": {
                      backgroundColor: "transparent",
                      },
                    }}
                      onClick={() => navigate("/")}
                    >
                      RO<span style={{ color: "#03A9F4" }}>SPITAL</span>
                    </Button>

          {/* Navigation */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button color="inherit" sx={{ textTransform: "capitalize" }} onClick={() => navigate("/")}>
              Home
            </Button>
            <Button color="inherit" sx={{ textTransform: "capitalize" }} onClick={() => handleScrollToSection(aboutUsRef)}>
              About us
            </Button>
            <Button color="inherit" sx={{ textTransform: "capitalize" }} onClick={() => handleScrollToSection(servicesRef)}>
              Services
            </Button>
          </Box>

          {/* Login Button */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#03A9F4",
              color: "#fff",
              textTransform: "capitalize",
              borderRadius: "20px",
              padding: "5px 20px",
              "&:hover": {
                backgroundColor: "#0288D1",
              },
            }}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
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
          {/* Left Section */}
              <Box
                sx={{
                  position: "absolute",
                  width: "30%",
                  height: "70%",
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
                    padding: 4,
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h4" gutterBottom align="center">
                    Login
                  </Typography>
                  <TextField
                    label="Full name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                  <Box sx={{ position: "relative", width: "100%" }}>
                    <TextField
                      label="Password"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      type={showPassword ? "text" : "password"}
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
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Remember me"
                  />
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      marginTop: 2,
                      backgroundColor: "#3751FE",
                      "&:hover": { backgroundColor: "#1F2B6C", transform: "scale(1.05)" }, // Added upscaling effect
                      transition: "transform 0.2s", // Smooth scaling animation
                    }}
                  >
                    Login
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
                    Don't have an account? Create one
                  </Link>
                </Paper>

                {/* Sign Up Form */}
                <Paper
                  elevation={3}
                  sx={{
                    position: "absolute",
                    width: "122%",
                    height: "100%",
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 4,
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h4" gutterBottom align="center">
                    Create Account
                  </Typography>
                  <TextField
                    label="Full name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                  <Box sx={{ position: "relative", width: "100%" }}>
                    <TextField
                      label="Password"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      type={showPassword ? "text" : "password"}
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
                      marginTop: 2,
                      backgroundColor: "#3751FE",
                      "&:hover": { backgroundColor: "#1F2B6C", transform: "scale(1.05)" }, // Added upscaling effect
                      transition: "transform 0.2s", // Smooth scaling animation
                    }}
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
  );
}

export default LoginPage;