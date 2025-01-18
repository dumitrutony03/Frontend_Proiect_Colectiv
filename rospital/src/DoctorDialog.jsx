import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Avatar,
  Box,
} from "@mui/material";
import DatePicker from "react-datepicker"; // Importăm componenta DatePicker pentru selectarea datei
import "react-datepicker/dist/react-datepicker.css"; // Importăm stilurile pentru DatePicker
import styled from "styled-components"; // Folosim styled-components pentru a crea componente cu stiluri personalizate
import medic from "/src/photos/medic1.jpg"; // Imaginea fallback pentru doctor
import axios from "axios"; // Asigurăm importul axios pentru a face cereri HTTP

// Definim stiluri personalizate pentru DatePicker folosind styled-components
const StyledDatePicker = styled(DatePicker)`
  width: 100%; // Setăm lățimea completă
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc; // Bordură gri
  border-radius: 8px; // Colțuri rotunjite
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // Umbra ușoară pentru DatePicker
  margin-top: 10px;
`;

// Definim un stil personalizat pentru Dialog
const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    border-radius: 16px; // Colțuri rotunjite pentru Dialog
    background-color: #f9f9f9; // Fundal gri deschis
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); // Umbra pentru Dialog
  }
`;

// Definim un stil personalizat pentru butoane
const StyledButton = styled(Button)`
  && {
    font-weight: bold;
    padding: 10px 20px;
    border-radius: 8px; // Colțuri rotunjite pentru butoane
    text-transform: none; // Eliminăm transformarea în majuscule
    transition: background-color 0.3s ease; // Adăugăm tranziție pentru culoarea de fundal

    &:hover {
      background-color: #004aad; // Culoare la hover
      color: white;
    }
  }
`;

const DoctorScheduleDialog = ({ open, onClose, doctor }) => {
  const patientUsername = localStorage.getItem("patientUsername"); // Retrieve the username
  // State pentru gestionarea datei și orei selectate
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  // Funcția pentru programarea întâlnirii
  const handleSchedule = async () => {
    if (selectedDateTime) {
      try {
        // Extragem data (yyyy-MM-dd) din ora locală
        const year = selectedDateTime.getFullYear();
        const month = (selectedDateTime.getMonth() + 1)
          .toString()
          .padStart(2, "0"); // Adăugăm 0 înainte de lunile mai mici de 10
        const day = selectedDateTime.getDate().toString().padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;

        // Extragem ora (HH:mm) din ora locală
        const hours = selectedDateTime.getHours().toString().padStart(2, "0");
        const minutes = selectedDateTime
          .getMinutes()
          .toString()
          .padStart(2, "0");
        const formattedTime = `${hours}:${minutes}`;

        // Creăm un endTime care este cu 30 de minute înaintea orei selectate
        const endTimeDate = new Date(selectedDateTime);
        endTimeDate.setMinutes(endTimeDate.getMinutes() + 30); // Adăugăm 30 de minute

        // Extragem ora de final (HH:mm)
        const endHours = endTimeDate.getHours().toString().padStart(2, "0");
        const endMinutes = endTimeDate.getMinutes().toString().padStart(2, "0");
        const formattedEndTime = `${endHours}:${endMinutes}`;

        // Trimitem cererea de programare către backend
        const response = await axios.post(
          "http://localhost:8080/appointment/",
          {
            doctorUsername: doctor.userName, // Numele doctorului
            pacientUsername: patientUsername, // Numele pacientului
            date: formattedDate, // Data în formatul yyyy-MM-dd
            begin: formattedTime, // Ora de început (HH:mm)
            end: formattedEndTime, // Ora de final (HH:mm)
          }
        );

        // Dacă răspunsul este cu status 200, programarea a fost realizată cu succes
        if (response.status === 200) {
          alert(
            `Appointment scheduled for ${doctor.userName} on ${formattedDate} at ${formattedTime}`
          );
          setSelectedDateTime(null); // Resetăm data selectată
          onClose(); // Închidem dialogul
        } else {
          alert("Failed to schedule the appointment. Please try again.");
        }
      } catch (error) {
        console.error(
          "Appointment scheduling failed: ",
          error.response?.data?.message || error.message
        );
        alert(
          "There was an error scheduling the appointment. Please try again."
        );
      }
    } else {
      alert("Please select a date and time.");
    }
  };

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      {/* Titlul dialogului */}
      <DialogTitle>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#004aad",
            textAlign: "center",
            marginBottom: "8px",
          }}
        >
          Schedule an Appointment {/* Titlul dialogului */}
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        {doctor ? (
          <>
            {/* Secțiunea cu informațiile despre doctor */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 2,
              }}
            >
              <Avatar
                alt={doctor.userName}
                src={medic} // Imaginea de fallback pentru doctor
                sx={{
                  width: 120,
                  height: 120,
                  border: "4px solid #fff",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              />
            </Box>
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: 2,
                color: "#333",
              }}
            >
              {doctor.userName} {/* Numele doctorului */}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontWeight: "bold",
                marginBottom: 1,
                color: "#004aad",
                textAlign: "center",
              }}
            >
              Select a Date and Time:{" "}
              {/* Instrucțiune pentru a selecta data și ora */}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginBottom: 2,
              }}
            >
              <StyledDatePicker
                selected={selectedDateTime} // Data și ora selectată
                onChange={(date) => setSelectedDateTime(date)} // Actualizează data selectată
                showTimeSelect // Permite selectarea orei
                dateFormat="yyyy-MM-dd HH:mm" // Formatul pentru dată și ora
                placeholderText="Schedule here!" // Textul din placeholder
                popperPlacement="bottom" // Poziția popper-ului pentru selecție
                showPopperArrow // Afișează săgeata popper-ului
                onKeyDown={(e) => e.preventDefault()} // Previne interacțiunile prin tastatură
                style={{
                  padding: "10px",
                  fontSize: "16px",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  width: "100%",
                  maxWidth: "300px", // Lățimea maximă a datei
                  textAlign: "center",
                }}
              />
            </Box>
          </>
        ) : (
          <Typography
            variant="body2"
            sx={{ textAlign: "center", color: "text.secondary" }}
          >
            No doctor information available.{" "}
            {/* Mesaj de eroare dacă nu există informații despre doctor */}
          </Typography>
        )}
      </DialogContent>
      {/* Acțiunile dialogului */}
      <DialogActions sx={{ justifyContent: "center", padding: "16px" }}>
        <StyledButton
          onClick={handleSchedule} // Programarea întâlnirii
          variant="contained"
          color="primary"
          sx={{ backgroundColor: "#004aad" }}
        >
          Schedule {/* Eticheta butonului de programare */}
        </StyledButton>

        <StyledButton onClick={onClose} variant="outlined" color="secondary">
          Cancel {/* Eticheta butonului de anulare */}
        </StyledButton>
      </DialogActions>
    </StyledDialog>
  );
};

export default DoctorScheduleDialog;
