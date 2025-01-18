import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import DetailsDialog from "./DetailsDialog"; // Import the DetailsDialog component
import useGeoJsonLoader from "./LoadJSON"; // Import the custom hook
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";

// Custom Control Component with Dropdowns and Slider
const MapControls = () => {
  const map = useMap();
  useEffect(() => {
    const customControl = L.control({ position: "topleft" });

    customControl.onAdd = () => {
      const container = L.DomUtil.create(
        "div",
        "leaflet-bar leaflet-control leaflet-control-custom"
      );

      container.style.backgroundColor = "#fff";
      container.style.padding = "10px";
      container.style.cursor = "pointer";
      container.style.display = "flex";
      container.style.flexDirection = "row";
      container.style.gap = "10px";
      container.style.alignItems = "stretch";

      // Dropdown for Judet
      const judetDropdown = L.DomUtil.create("select", "", container);
      judetDropdown.style.padding = "5px";
      judetDropdown.style.border = "1px solid #ccc";
      judetDropdown.style.borderRadius = "4px";
      judetDropdown.style.cursor = "pointer";
      ["Alege Județ", "Bihor", "Cluj", "Timiș", "Iași"].forEach(
        (optionText) => {
          const option = document.createElement("option");
          option.value = optionText;
          option.text = optionText;
          judetDropdown.add(option);
        }
      );

      // Dropdown for Oras
      const orasDropdown = L.DomUtil.create("select", "", container);
      orasDropdown.style.padding = "5px";
      orasDropdown.style.border = "1px solid #ccc";
      orasDropdown.style.borderRadius = "4px";
      orasDropdown.style.cursor = "pointer";
      ["Alege Oraș", "Oradea", "Cluj-Napoca", "Timișoara", "Iași"].forEach(
        (optionText) => {
          const option = document.createElement("option");
          option.value = optionText;
          option.text = optionText;
          orasDropdown.add(option);
        }
      );

      // Dropdown for Specialitati
      const specialitatiDropdown = L.DomUtil.create("select", "", container);
      specialitatiDropdown.style.padding = "5px";
      specialitatiDropdown.style.border = "1px solid #ccc";
      specialitatiDropdown.style.borderRadius = "4px";
      specialitatiDropdown.style.cursor = "pointer";
      [
        "Alege Specialitate",
        "Cardiologie",
        "Dermatologie",
        "Pediatrie",
        "Ortopedie",
      ].forEach((optionText) => {
        const option = document.createElement("option");
        option.value = optionText;
        option.text = optionText;
        specialitatiDropdown.add(option);
      });

      // Slider for Distanță
      const sliderContainer = L.DomUtil.create("div", "", container);
      sliderContainer.style.display = "flex";
      sliderContainer.style.flexDirection = "column";

      const sliderLabel = L.DomUtil.create("label", "", sliderContainer);
      sliderLabel.innerText = "Distanță (km): 50";
      sliderLabel.style.marginBottom = "5px";

      const slider = L.DomUtil.create("input", "", sliderContainer);
      slider.type = "range";
      slider.min = "0";
      slider.max = "100";
      slider.value = "50";
      slider.style.cursor = "pointer";
      slider.oninput = () => {
        sliderLabel.innerText = `Distanță (km): ${slider.value}`;
      };

      container.appendChild(judetDropdown);
      container.appendChild(orasDropdown);
      container.appendChild(specialitatiDropdown);
      container.appendChild(sliderContainer);

      return container;
    };

    customControl.addTo(map);

    // Clean up when component is unmounted
    return () => {
      customControl.remove();
    };
  }, [map]);

  return null;
};

const MapZoomHandler = ({ userLocation }) => {
  const map = useMap();

  useEffect(() => {
    if (userLocation) {
      map.setView([userLocation.latitude, userLocation.longitude], 15); // Zoom level 15
    }
  }, [userLocation, map]);

  return null;
};

const DisableZoomControl = () => {
  const map = useMap();

  useEffect(() => {
    // Verifică și elimină controlul de zoom dacă există
    if (map.zoomControl) {
      map.removeControl(map.zoomControl);
    }
  }, [map]);

  return null;
};

// Map Component
const Map = () => {
  const [geojsonData, setGeojsonData] = useState(null);
  const [clinicData, setClinicData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);

  // Load GeoJSON and Clinic Data
  useGeoJsonLoader(setGeojsonData, setClinicData, setFilteredData);

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
          if (error.code === error.PERMISSION_DENIED) {
            console.error("User denied geolocation permission.");
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            console.error("Location information is unavailable.");
          } else if (error.code === error.TIMEOUT) {
            console.error("The request to get user location timed out.");
          } else {
            console.error("An unknown error occurred while getting location.");
          }
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const onEachFeature = (feature, layer) => {
    if (feature.properties) {
      layer.on("click", () => {
        setSelectedFeature(feature.properties);
        setPopupOpen(true);
      });
    }
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
    setSelectedFeature(null);
  };

  // Custom Hospital Marker Icon
  const hospitalIcon = new L.Icon({
    iconUrl: "/src/photos/hospital.png", // Replace with the actual URL to the hospital icon image
    iconSize: [40, 40], // Icon size (adjust accordingly)
    iconAnchor: [20, 40], // Anchor point of the icon
    popupAnchor: [0, -40], // Position of the popup
  });

  return (
    <>
      <MapContainer
        center={[46.7712, 23.6236]} // Center of Cluj Napoca
        zoom={13}
        style={{ height: "100vh", width: "100%" }}
        zoomControl={false} // Disable default zoom control
      >
        <DisableZoomControl /> {/* Remove zoom control */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {geojsonData && (
          <GeoJSON data={geojsonData} onEachFeature={onEachFeature} />
        )}
        {clinicData &&
          clinicData.map((clinic, index) => (
            <Marker
              key={index}
              position={[clinic.latitude, clinic.longitude]}
              icon={hospitalIcon} // Use custom hospital icon
              eventHandlers={{
                click: () => {
                  setSelectedFeature(clinic); // Set clinic on click
                  setPopupOpen(true); // Open popup
                },
              }}
            />
          ))}
        {userLocation && (
          <Marker position={[userLocation.latitude, userLocation.longitude]} />
        )}
        <MapZoomHandler userLocation={userLocation} />
        <MapControls /> {/* Add dropdowns and slider */}
      </MapContainer>

      {/* DIALOG POPUP */}
      <DetailsDialog
        open={popupOpen}
        onClose={handlePopupClose}
        title="Hospital Details"
        details={selectedFeature}
      />
    </>
  );
};

export default Map;
