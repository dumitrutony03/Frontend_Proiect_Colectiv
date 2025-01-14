import React, { useState, useEffect } from "react";
import Map from "./Map"; // Assuming you have a Map component implemented
import NavBar from "./NavBar.jsx"; // Assuming you have a NavBar component implemented

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
      <NavBar />

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
