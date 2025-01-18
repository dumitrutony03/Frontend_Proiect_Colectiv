import React, { useState, useEffect } from "react";
import axios from "axios";
import medic from "/src/photos/medic1.jpg"; // Imagine fallback pentru doctori
import DoctorScheduleDialog from "./DoctorDialog"; // Importăm dialogul pentru programare
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";

const DetailsDialog = ({ open, onClose, title, details = {} }) => {
  // State-uri pentru gestionarea datelor și a vizibilității dialogului
  const [selectedDoctor, setSelectedDoctor] = useState(null); // Stocăm doctorul selectat
  const [scheduleOpen, setScheduleOpen] = useState(false); // Stocăm dacă dialogul pentru programare este deschis
  const [doctors, setDoctors] = useState([]); // Stocăm datele despre doctori
  const [loading, setLoading] = useState(true); // Stocăm starea de încărcare a datelor

  // Hook useEffect pentru a încărca lista de doctori din API la montarea componentei
  useEffect(() => {
    if (details && details.name) {
      axios
        .get(`http://localhost:8080/doctor/hospital/${details.name}`) // Cerem datele despre doctori
        .then((response) => {
          setDoctors(response.data); // Actualizăm state-ul cu lista de doctori
          setLoading(false); // Setăm starea de încărcare la false când datele sunt încărcate
        })
        .catch((error) => {
          console.error("Eroare la încărcarea datelor despre doctori:", error);
          setLoading(false); // Gestionăm eroarea și oprim încărcarea
        });
    } else {
      setLoading(false); // Dacă details este null, oprim încărcarea
    }
  }, [details]); // Rulăm acest useEffect când `details` se schimbă

  // Funcție pentru a deschide dialogul de programare atunci când se face click pe un doctor
  const handleCardClick = (doctor) => {
    setSelectedDoctor(doctor); // Setăm doctorul selectat
    setScheduleOpen(true); // Deschidem dialogul de programare
  };

  // Funcție pentru a închide dialogul de programare
  const handleScheduleClose = () => {
    setScheduleOpen(false); // Închidem dialogul de programare
    setSelectedDoctor(null); // Resetează doctorul selectat
  };

  return (
    <>
      {/* Dialogul principal */}
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "primary.main" }}
          >
            {title} {/* Afișăm titlul dialogului */}
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          {details ? (
            <Box sx={{ padding: "8px 0" }}>
              {Object.entries(details) // Iterăm prin detaliile clinicii
                .filter(([key]) => key !== "latitude" && key !== "longitude") // Excludem cheia "@geometry"
                .map(([key, value]) => (
                  <Box
                    key={key}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between", // Așezăm titlul și valoarea pe margini opuse
                      marginBottom: "8px", // Margine între elementele din listă
                      padding: "8px",
                      backgroundColor: "background.default",
                      borderRadius: "8px",
                      boxShadow: 1,
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: "bold", color: "text.secondary" }}
                    >
                      {key} {/* Afișăm cheia */}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "text.primary" }}>
                      {value || "Not available"}{" "}
                      {/* Afișăm valoarea sau "Not available" dacă nu există */}
                    </Typography>
                  </Box>
                ))}
            </Box>
          ) : (
            <Typography
              variant="body2"
              sx={{ textAlign: "center", color: "text.secondary" }}
            >
              Loading details...{" "}
              {/* Mesajul afișat în timpul încărcării detaliilor */}
            </Typography>
          )}
          <Divider sx={{ margin: "16px 0" }} /> {/* Separator între secțiuni */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "primary.main",
              marginBottom: "16px",
            }}
          >
            Doctors Available {/* Titlul secțiunii pentru doctori */}
          </Typography>
          {loading ? (
            <Typography
              variant="h2"
              sx={{ textAlign: "center", color: "text.secondary" }}
            >
              Loading doctors...{" "}
              {/* Mesajul afișat în timpul încărcării doctorilor */}
            </Typography>
          ) : doctors.length > 0 ? (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
              {doctors.map((doctor, index) => (
                <Card
                  key={index}
                  sx={{
                    width: "250px",
                    boxShadow: 3,
                    borderRadius: "12px",
                    backgroundColor: "background.paper",
                    cursor: "pointer", // Cursorul devine pointer la hover
                    "&:hover": {
                      boxShadow: 6, // Îmbunătățim efectul la hover
                      transform: "scale(1.05)", // Ușor zoom pe card
                      transition: "all 0.3s ease-in-out", // Efecte de tranziție
                    },
                  }}
                  onClick={() => handleCardClick(doctor)} // Apelăm funcția când facem click pe card
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column", // Aliniem conținutul în coloană
                      alignItems: "center", // Aliniere la centru
                    }}
                  >
                    <Avatar
                      alt={doctor.fullname}
                      src={doctor.image || medic} // Folosim imaginea doctorului sau imaginea fallback
                      sx={{
                        width: 70,
                        height: 70,
                        marginBottom: 2,
                        border: "2px solid #fff",
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", textAlign: "center" }}
                    >
                      {doctor.userName || "Unknown Doctor"}{" "}
                      {/* Afișăm numele doctorului */}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          ) : (
            <Typography
              variant="body2"
              sx={{ textAlign: "center", color: "text.secondary" }}
            >
              No doctors available.{" "}
              {/* Mesajul afișat dacă nu sunt doctori disponibili */}
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", padding: "16px" }}>
          <Button onClick={onClose} variant="contained" color="primary">
            Close {/* Butonul de închidere */}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog pentru programarea doctorului */}
      <DoctorScheduleDialog
        open={scheduleOpen} // Starea pentru deschiderea dialogului de programare
        onClose={handleScheduleClose} // Funcția pentru închiderea dialogului de programare
        doctor={selectedDoctor} // Transmitem doctorul selectat
      />
    </>
  );
};

export default DetailsDialog;
