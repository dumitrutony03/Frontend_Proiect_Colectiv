import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import Map from "./Map"; // Assuming you have a Map component implemented

function AppointmentPageTest() {
  // State to hold the GeoJSON data and filters
  const [clinicData, setClinicData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchName, setSearchName] = useState("");

  React.useEffect(() => {
    document.body.style.overflow = "hidden"; // Prevent scrolling

  }, []);

  // Load GeoJSON data
  useEffect(() => {
    fetch("/exportSPITALE.geojson") // Replace with the actual path to the GeoJSON file
      .then((response) => response.json())
      .then((data) => {
        const clinics = data.features.map((feature) => ({
          name: feature.properties.name || "Unknown Clinic",
          street: feature.properties["addr:street"] || "Street not available",
          //status: feature.properties.status || "Unknown",
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

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", width: "100vw" }}>
      {/* Full-Width Header */}
      <AppBar
        position="static"
        sx={{
          position: "fixed", // Sticks at the top of the page
          top: 0,
          left: 0,
          width: "100vw", // Ensure it spans full width
          backgroundColor: "#1F2B6C",
          boxShadow: "none",
          zIndex: 1201, // Keep it above other content
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 20px", // Consistent padding
            maxWidth: "1200px", // Center the header content
            width: "100%",
            margin: "0 auto", // Horizontally center the header content
          }}
        >
          {/* Logo */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            RO<span style={{ color: "#03A9F4" }}>SPITAL</span>
          </Typography>

          {/* Navigation */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button color="inherit" sx={{ textTransform: "capitalize" }}>
              Home
            </Button>
            <Button color="inherit" sx={{ textTransform: "capitalize" }}>
              About us
            </Button>
            <Button color="inherit" sx={{ textTransform: "capitalize" }}>
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
              marginLeft: "20px", // Space between nav and button
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
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          marginTop: "60px", // Offset for fixed header
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
                  }}
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
                  <Chip
                    label={clinic.status}
                    color={clinic.status === "Deschis" ? "success" : "default"}
                    size="small"
                  />
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
    </Box>
  );
}

export default AppointmentPageTest;
