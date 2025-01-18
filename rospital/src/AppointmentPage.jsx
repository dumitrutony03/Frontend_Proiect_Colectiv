import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FullWidthHeader from "./Header";
import DetailsDialog from "./DetailsDialog"; // Importăm componenta DetailsDialog pentru a arăta detaliile clinicii
import useGeoJsonLoader from "./LoadJSON"; // Importăm hook-ul customizat pentru încărcarea fișierului GeoJSON
import { Typography, Box, List, ListItem, TextField } from "@mui/material";
import Map from "./Map";

function AppointmentPage() {
  // State pentru stocarea datelor GeoJSON și filtre
  const [clinicData, setClinicData] = useState([]); // Stocăm datele clinicilor
  const [filteredData, setFilteredData] = useState([]); // Stocăm clinicile filtrate în funcție de căutare
  const [searchName, setSearchName] = useState(""); // Stocăm termenul de căutare
  const navigate = useNavigate(); // Hook pentru a naviga între pagini
  const [selectedClinic, setSelectedClinic] = useState(null); // Stocăm clinica selectată pentru detalii
  const [popupOpen, setPopupOpen] = useState(false); // State pentru a controla vizibilitatea popup-ului de detalii

  // Funcție pentru închiderea popup-ului de detalii
  const handlePopupClose = () => {
    setPopupOpen(false); // Închide popup-ul
    setSelectedClinic(null); // Resetează clinica selectată
  };

  // Funcție pentru deschiderea popup-ului atunci când se face click pe un card de clinică
  const handleCardClick = (clinic) => {
    setSelectedClinic(clinic); // Setăm clinica selectată
    setPopupOpen(true); // Deschidem popup-ul cu detalii
  };

  // Dezactivăm scroll-ul atunci când AppointmentPage este montată și îl restaurăm când se demontează
  useEffect(() => {
    document.body.style.overflow = "hidden"; // Dezactivăm scroll-ul

    return () => {
      document.body.style.overflow = "auto"; // Restaurăm scroll-ul când componenta se demontează
    };
  }, []);

  // Încărcăm datele GeoJSON și le stocăm în state-ul clinicData și filteredData folosind hook-ul personalizat
  useGeoJsonLoader(null, setClinicData, setFilteredData);

  // Obținem locația utilizatorului folosind API-ul geolocation al browser-ului
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
          console.error("Eroare la obținerea locației utilizatorului:", error);
        }
      );
    } else {
      console.error("Geolocation nu este susținut de acest browser.");
    }
  }, []);

  // Funcție pentru a manipula schimbările din câmpul de căutare
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchName(value); // Actualizăm termenul de căutare
    const filtered = clinicData.filter(
      (clinic) => clinic.name.toLowerCase().includes(value.toLowerCase()) // Filtrăm clinicile după nume
    );
    setFilteredData(filtered); // Actualizăm lista clinicilor filtrate
  };

  // Funcție pentru a naviga la o secțiune specifică (Home, About Us, Services)
  const handleScrollToHome = (section) => {
    navigate("/"); // Navigăm la pagina principală (poți modifica pentru a derula la secțiuni specifice, dacă este necesar)
  };

  return (
    <Box
      sx={{
        height: "100vh", // Setăm înălțimea întregii pagini
        display: "flex", // Folosim flexbox pentru a organiza elementele
        flexDirection: "column", // Aliniem coloanele vertical
        width: "100vw", // Setăm lățimea întregii pagini
      }}
    >
      {/* Header-ul complet, cu funcții de derulare */}
      <FullWidthHeader
        handleScrollToHome={handleScrollToHome}
        handleScrollToAbout={handleScrollToHome}
        handleScrollToServices={handleScrollToHome}
      />

      {/* Secțiunea principală a conținutului */}
      <Box
        sx={{
          display: "flex", // Folosim flexbox pentru a împărți zona de clinică și hartă
          flexGrow: 1, // Permitem creșterea secțiunii de clinică și harta
          marginTop: "60px", // Ajustăm pentru înălțimea header-ului
          height: "100vh", // Setăm înălțimea secțiunii
        }}
      >
        {/* Secțiunea de listă a clinicilor (stânga) */}
        <Box
          sx={{
            width: "20%", // Setăm lățimea secțiunii de clinică
            overflowY: "auto", // Permitem derularea dacă conținutul depășește containerul
            borderRight: "1px solid #ddd", // Adăugăm bordură între secțiuni
            padding: "10px", // Padding pentru listă
          }}
        >
          {/* Căutarea clinicilor după nume */}
          <TextField
            label="Search Hospitals"
            variant="outlined"
            fullWidth
            value={searchName} // Legătura cu state-ul searchName
            onChange={handleSearchChange} // Apelăm funcția de filtrare când schimbăm căutarea
            sx={{ marginBottom: "20px" }} // Adăugăm margine între căutare și lista de clinici
          />

          {/* Listă cu clinicile, afișăm doar clinicile filtrate */}
          <List>
            {filteredData.map((clinic, index) => (
              <React.Fragment key={index}>
                <ListItem
                  sx={{
                    display: "flex",
                    justifyContent: "space-between", // Așezăm elementele la colțuri opuse
                    alignItems: "center", // Aliniem elementele pe axa verticală
                    padding: "10px 15px",
                    backgroundColor: "#f9f9f9",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    margin: "10px 0", // Adăugăm margine între elementele din listă
                    cursor: "pointer", // Facem elementele listabile
                  }}
                  onClick={() => handleCardClick(clinic)} // Deschidem popup-ul cu detalii când facem click
                >
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      {clinic.name} {/* Afișăm numele clinicii */}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#757575" }}>
                      {clinic.street} {/* Afișăm adresa clinicii */}
                    </Typography>
                  </Box>
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </Box>

        {/* Secțiunea cu harta pe dreapta */}
        <Box sx={{ flexGrow: 1 }}>
          <Map /> {/* Afișăm componenta Map */}
        </Box>
      </Box>

      {/* Dialog pentru afișarea detaliilor clinicii selectate */}
      <DetailsDialog
        open={popupOpen} // Controlează vizibilitatea dialogului
        onClose={handlePopupClose} // Închide dialogul când este apelat
        title="Hospital Details" // Titlul dialogului
        details={selectedClinic} // Transmitem detaliile clinicii selectate
      />
    </Box>
  );
}

export default AppointmentPage;
