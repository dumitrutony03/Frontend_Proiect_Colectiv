import React, { useState, useEffect } from "react";
import FullWidthHeader from "./Header";
import { Box, Typography, Grid, Paper, Button } from "@mui/material";
import { Calendar } from "react-calendar"; // Calendarul utilizat pentru selecția zilelor
import "react-calendar/dist/Calendar.css"; // Importăm stilurile pentru calendar
import DateDialog from "./DoctorDashboardDialog"; // Dialog pentru programarea zilnică
import WeekDialog from "./DoctorDashboardDialogWeek"; // Dialog pentru programarea săptămânală
import axios from "axios"; // Ensure axios is imported

function DoctorDashboard() {
  const doctorUsername = localStorage.getItem("doctorUsername"); // Retrieve the username

  // Inițializare state pentru doctorInfo
  const [doctorInfo, setDoctorInfo] = useState(null); // Doctor's information state
  const [appointments, setAppointments] = useState([]); // Appointments state

  // Fetch doctor details and hospital information on component mount
  useEffect(() => {
    if (doctorUsername) {
      // Fetch doctor info including hospital name
      axios
        .get(`http://localhost:8080/doctor/${doctorUsername}`)
        .then((response) => {
          setDoctorInfo(response.data); // Store doctor information
        })
        .catch((error) => {
          console.error("Error fetching doctor data", error);
        });
    }
  }, [doctorUsername]);

  // State-uri pentru gestionarea datelor de selecție a zilei și deschiderea dialogurilor
  const [selectedDate, setSelectedDate] = useState(null); // Data selectată de doctor
  const [openDialog, setOpenDialog] = useState(false); // Starea de deschidere a dialogului pentru o zi
  const [openWeekDialog, setOpenWeekDialog] = useState(false); // Starea de deschidere a dialogului săptămânal

  // Funcție de derulare către o secțiune specifică
  const handleScrollToHome = (section) => {
    navigate("/"); // Navigăm la pagina principală
  };

  // Funcție pentru gestionarea click-ului pe o zi din calendar
  const handleDateClick = (date) => {
    setSelectedDate(date); // Setăm data selectată
    // Get local date parts (year, month, day)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add 1 because months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0"); // Ensure day has two digits

    // Format date as YYYY-MM-DD
    const formattedDate = `${year}-${month}-${day}`;
    // Fetch appointments for the selected date
    axios
      .get(
        `http://localhost:8080/appointment/filter?doctor=${doctorUsername}&startDate=${formattedDate}&endDate=${formattedDate}`
      )
      .then((response) => {
        setAppointments(response.data); // Store appointments for the selected date
        setOpenDialog(true); // Deschidem dialogul pentru ziua selectată
      })
      .catch((error) => {
        console.error("Error fetching appointments data", error);
      });
  };

  // Funcție pentru închiderea dialogului de zi
  const handleCloseDialog = () => {
    setOpenDialog(false); // Închidem dialogul de programare pe zi
  };

  // Funcție pentru deschiderea dialogului săptămânal
  const handleOpenWeekDialog = () => {
    setOpenWeekDialog(true); // Deschidem dialogul cu programarea săptămânală
  };

  // Funcție pentru închiderea dialogului săptămânal
  const handleCloseWeekDialog = () => {
    setOpenWeekDialog(false); // Închidem dialogul săptămânal
  };

  return (
    <div style={{ alignItems: "center", justifyContent: "center" }}>
      {/* Header-ul complet pentru aplicație */}
      <FullWidthHeader
        handleScrollToHome={handleScrollToHome} // Funcția de derulare pentru Home
        handleScrollToAbout={handleScrollToHome} // Funcția de derulare pentru About
        handleScrollToServices={handleScrollToHome} // Funcția de derulare pentru Services
      />

      <Box sx={{ marginTop: "65px" }}>
        {/* Secțiunea cu informațiile despre doctor */}
        <Paper
          elevation={3}
          sx={{
            padding: "12px",
            borderRadius: "10px",
            backgroundColor: "#E3F2FD", // Culoare de fundal pentru card
            marginBottom: "10px", // Spațiu între carduri
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#1F2B6C" }} // Stilul titlului doctorului
          >
            {doctorUsername} {/* Afișăm numele complet al doctorului */}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {/* Mapează spitalele din doctorInfo */}
            {doctorInfo &&
            doctorInfo.hospitals &&
            doctorInfo.hospitals.length > 0 ? (
              doctorInfo.hospitals.map((hospital, index) => (
                <Typography
                  key={index}
                  variant="subtitle1"
                  color="textSecondary"
                  sx={{ fontSize: "0.8rem" }} // Adjust the font size to your preference
                >
                  {`Hospital: ${hospital}`}{" "}
                  {/* Afișăm numele fiecărui spital */}
                </Typography>
              ))
            ) : (
              <Typography variant="subtitle1" color="textSecondary">
                No hospital information available
              </Typography>
            )}
            {/* Afișăm numele spitalului */}
          </Typography>
        </Paper>

        {/* Secțiunea cu calendarul */}
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} md={10} lg={12}>
            <Paper
              elevation={3}
              sx={{
                //paddingLeft: "45px", // Apply padding only on the left side
                borderRadius: "10px",
                backgroundColor: "#FFFFFF", // Fundal alb pentru calendar
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Umbră pentru card
                paddingBottom: "5px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  color: "#1F2B6C",
                  textAlign: "center",
                }}
              >
                Schedule {/* Titlul pentru secțiunea de programare */}
              </Typography>
              <Calendar
                onClickDay={handleDateClick} // Apelăm funcția atunci când o zi este selectată
                style={{
                  width: "100%", // Setăm lățimea calendarului
                  height: "500px", // Înălțimea calendarului
                  borderRadius: "10px",
                  overflow: "hidden", // Evităm overflow-ul
                }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: "10px" }} // Butonul pentru a vizualiza programarea săptămânală
                onClick={handleOpenWeekDialog}
              >
                Show Week{" "}
                {/* Eticheta butonului pentru vizualizarea săptămânii */}
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Dialog pentru detalii zilei selectate */}
      <DateDialog
        open={openDialog} // Deschide dialogul pentru ziua selectată
        selectedDate={appointments} // Transmite data selectată în dialog
        handleClose={handleCloseDialog} // Funcție pentru a închide dialogul
      />

      {/* Dialog pentru vizualizarea programului săptămânal */}
      <WeekDialog
        open={openWeekDialog} // Deschide dialogul pentru programul săptămânal
        handleClose={handleCloseWeekDialog} // Funcție pentru a închide dialogul săptămânal
        selectedDate={appointments} // Transmite data selectată pentru a vizualiza programul
        rawDate={selectedDate}
      />
    </div>
  );
}

export default DoctorDashboard;
