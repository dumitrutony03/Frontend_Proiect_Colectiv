import React, { useRef,useState } from "react";
import { useNavigate,useLocation } from 'react-router-dom';
import NavBar from "./NavBar.jsx";
import { Visibility, VisibilityOff, Person, MedicalServices,AccountCircle} from "@mui/icons-material";

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Sign Up
  const [isDoctor, setIsDoctor] = useState(false); // Toggle between Patient and Doctor
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  // Refs for scrolling
  const aboutUsRef = useRef(null);
  const servicesRef = useRef(null);
  const location = useLocation();
  const message = location.state?.message || "";

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleRoleSwitch = () => {
    setIsDoctor((prev) => !prev);
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
      {/* Navigation Bar */}
      <NavBar />

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
                      textShadow: "0.5px 0.5px 2px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
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