import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { AccountCircle } from "@mui/icons-material"; // Import the user icon
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  Chip,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from "@mui/material";
import Map from "./Map";

function AppointmentPage() {
  // State to hold the GeoJSON data and filters
  const [clinicData, setClinicData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchName, setSearchName] = useState("");
  const navigate = useNavigate();
  // Refs for scrolling
  const aboutUsRef = useRef(null);
  const servicesRef = useRef(null);
  //Popup
  const [selectedClinic, setSelectedClinic] = useState(null); // State for selected clinic
  const [popupOpen, setPopupOpen] = useState(false); // State to manage popup visibility
  //PopupClose
  const handlePopupClose = () => {
    setPopupOpen(false);
    setSelectedClinic(null);
  };
  //PopupOpen/CardClick
  const handleCardClick = (clinic) => {
    setSelectedClinic(clinic);
    setPopupOpen(true);
  };
  
  useEffect(() => {
    // Disable scrolling when AppointmentPage is mounted
    document.body.style.overflow = "hidden";
  
    // Cleanup function to restore scrolling when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  
  // Load GeoJSON data
  useEffect(() => {
    fetch("/spitale.geojson")
      .then((response) => response.json())
      .then((data) => {
        // Map all feature properties into clinics array
        const clinics = data.features.map((feature) => ({
        ...feature.properties, // Spread all properties into the clinic object
      }));
        setClinicData(clinics);
        setFilteredData(clinics);
      })
      .catch((error) => console.error("Error loading GeoJSON data:", error));
  }, []);

// Get user location
useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}, []);

  // Handle search input
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchName(value);
    const filtered = clinicData.filter((clinic) =>
      clinic.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  // Scroll to specific section
  const handleScrollToSection = (section) => {
    navigate("/", { state: { scrollTo: section } });
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", width: "100vw" }}>
      {/* Full-Width Header */}
      <AppBar
        position="static"
        sx={{
          position: "fixed", // Sticks at the top of the page
          top: 0,
          left: 0,
          width: "100vw",
          backgroundColor: "#1F2B6C",
          boxShadow: "none",
          zIndex: 1201,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 20px",
            maxWidth: "1200px", 
            width: "100%",
            margin: "0 auto", 
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
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
                onClick={() => navigate('/login')} // Navigate to login page
              >
              Login
            </Button>
            <IconButton
              sx={{
                color: "#fff",
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
              }}
              //onClick={() => navigate("/profile")} // Navigate to user profile
            >
            <AccountCircle sx={{ fontSize: "2rem" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          marginTop: "60px",
          height: "100vh",
        }}
      >
        {/* Clinic List Section */}
        <Box
          sx={{
            width: "20%",
            overflowY: "auto",
            borderRight: "1px solid #ddd",
            padding: "10px",
          }}
        >
          {/* Search Input */}
          <TextField
            label="Search Hospitals"
            variant="outlined"
            fullWidth
            value={searchName}
            onChange={handleSearchChange}
            sx={{ marginBottom: "20px" }}
          />

          {/* Clinic List */}
          <List>
            {filteredData.map((clinic, index) => (
              <React.Fragment key={index}>
                <ListItem
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 15px",
                    backgroundColor: "#f9f9f9",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    margin: "10px 0",
                    cursor: "pointer", // Add cursor pointer
                  }}
                    onClick={() => handleCardClick(clinic)} // Add click handler
                >
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold" }}
                    >
                      {clinic.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#757575" }}
                    >
                      {clinic.street}
                    </Typography>
                  </Box>
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </Box>

        {/* Map Section */}
        <Box sx={{ flexGrow: 1 }}>
          <Map />
        </Box>

      </Box>

        {/* Popup Dialog */}
        <Dialog open={popupOpen} onClose={handlePopupClose}>
          <DialogTitle>Hospital Details</DialogTitle>
          <DialogContent>
            {selectedClinic ? (
              <Box>
              {Object.entries(selectedClinic)
                .filter(([key]) => key !== "@geometry") // Exclude the @geometry key
                .map(([key, value]) => (
                <Box key={key} sx={{ marginBottom: "8px" }}>
                  <Typography variant="body1" sx={{ fontWeight: "bold", display: "inline" }}>
                    {key}:{" "}
                  </Typography>
                  <Typography variant="body1" sx={{ display: "inline" }}>
                    {value || "Not available"}
                  </Typography>
                </Box>
              ))}
            </Box>
          ) : (
            <Typography variant="body2">Loading...</Typography>
          )}
        </DialogContent>
          <DialogActions>
            <Button onClick={handlePopupClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
    </Box>
  );
}

export default AppointmentPage;
