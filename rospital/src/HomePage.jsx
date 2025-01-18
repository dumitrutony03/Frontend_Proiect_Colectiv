import React, { useRef, useState } from "react";
import { Typography, Button, Container, Grid, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import FullWidthHeader from "./Header";

import homeImage from "/src/photos/appointment-top-picture.png";
import wlcpageimg3 from "/src/photos/wlcpagephoto.png";
import wlcpageimg5 from "/src/photos/wlcpageimg5.jpeg";

// Definim stiluri personalizate pentru diferite componente
const useStyles = makeStyles({
  headerOverlay: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-90%, -50%)",
    color: "#fff",
    textAlign: "center",
    padding: "20px",
    borderRadius: "10px",
  },
  bannerContainer: {
    position: "relative",
    width: "100%",
    height: "auto",
    marginBottom: "20px",
  },
  bannerImage: {
    width: "100%",
    height: "auto",
  },
  card: {
    margin: "20px",
    textAlign: "center",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
  },
  media: {
    height: 200,
    borderRadius: "10px 10px 0 0",
  },
  footer: {
    marginTop: "40px",
    backgroundColor: "#1F2B6C",
    color: "#fff",
    padding: "20px 0",
    textAlign: "center",
  },
  featureText: {
    color: "#6A1B9A",
    fontWeight: "bold",
  },
});

// Componenta principală a paginii Home
function HomePage() {
  const classes = useStyles(); // Aplicăm stilurile definite
  const navigate = useNavigate(); // Hook pentru navigare între pagini
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Starea de autentificare (simulată)

  // Referințe pentru a derula către secțiuni specifice
  const aboutUsRef = useRef(null);
  const servicesRef = useRef(null);

  // Funcția pentru a derula la începutul paginii
  const handleScrollToHome = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Funcție pentru a derula către secțiunea "About Us" cu un offset
  const handleScrollToAbout = () => {
    if (aboutUsRef.current) {
      const offset = -120; // Ajustăm valoarea offset-ului pentru a derula mai sus
      const elementPosition = aboutUsRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset + offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Funcție pentru a derula către secțiunea "Services"
  const handleScrollToServices = () => {
    if (servicesRef.current) {
      const offset = -180; // Ajustăm valoarea offset-ului pentru a derula mai sus
      const elementPosition = servicesRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset + offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Funcția pentru a rezerva o programare
  const handleBookAppointment = () => {
    if (isLoggedIn) {
      // Dacă utilizatorul este autentificat, navigăm la pagina de programare
      navigate("/appointment");
    } else {
      // Dacă utilizatorul nu este autentificat, navigăm la pagina de login cu un mesaj
      navigate("/login", {
        state: { message: "Please login to book an appointment." },
      });
    }
  };

  return (
    <div>
      {/* Header-ul complet */}
      <FullWidthHeader
        handleScrollToHome={handleScrollToHome} // Funcția pentru derulare la Home
        handleScrollToAbout={handleScrollToAbout} // Funcția pentru derulare la About Us
        handleScrollToServices={handleScrollToServices} // Funcția pentru derulare la Services
      />

      {/* Banner-ul complet cu text suprapus */}
      <Box className={classes.bannerContainer} sx={{ marginTop: "61px" }}>
        <img src={homeImage} alt="Banner" className={classes.bannerImage} />
        <Box className={classes.headerOverlay}>
          <Typography
            variant="h3"
            style={{
              fontWeight: "bold",
              marginBottom: "10px",
              color: "#1F2B6C",
            }}
          >
            Finding the right medic has never been easier{" "}
            {/* Textul din banner */}
          </Typography>
        </Box>
      </Box>

      {/* Buton pentru a rezerva o programare */}
      <Box
        sx={{ textAlign: "center", marginTop: "-50px", marginBottom: "20px" }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#03A9F4",
            color: "#fff",
            textTransform: "capitalize",
            padding: "10px 20px",
            borderRadius: "20px",
            fontSize: "1rem",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
            "&:hover": {
              backgroundColor: "#0288D1",
            },
          }}
          onClick={handleBookAppointment} // Apelăm funcția pentru programare
        >
          Book an appointment
        </Button>
      </Box>

      <Container>
        {/* Secțiunea Features (carte de prezentare) */}
        <Grid container spacing={4}>
          {/* Carduri pentru caracteristici */}
        </Grid>

        {/* Secțiunea "About Us" */}
        <Box
          ref={aboutUsRef}
          sx={{
            marginTop: "40px",
            padding: "40px 200px",
            background: "linear-gradient(135deg, #E3F2FD, #F9F9F9)",
            borderRadius: "15px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#03A9F4",
              marginBottom: "20px",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Welcome to RoSpital
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#1F2B6C",
              marginBottom: "20px",
              fontStyle: "italic",
            }}
          >
            Experience healthcare like never before.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#455A64",
              lineHeight: "1.8",
              fontSize: "1rem",
              marginBottom: "20px",
            }}
          >
            RoSpital is a student-driven initiative dedicated to making
            healthcare more accessible and convenient for everyone. Our platform
            simplifies the process of finding nearby hospitals and booking
            appointments, helping you connect with the care you need, when you
            need it most.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#455A64",
              lineHeight: "1.8",
              fontSize: "1rem",
              marginTop: "10px",
            }}
          >
            Created by a team of passionate students, RoSpital was born out of a
            desire to bridge the gap between patients and healthcare providers.
            We understand that navigating the healthcare system can be
            overwhelming, so we’ve designed an easy-to-use tool that puts all
            the information at your fingertips.
          </Typography>
        </Box>
      </Container>

      {/* Alte imagini/banner */}
      <Box
        className={classes.bannerContainer}
        sx={{ marginTop: "61px", width: "100%" }}
      >
        <img src={wlcpageimg3} alt="Banner" className={classes.bannerImage} />
      </Box>

      {/* Secțiunea "Services" */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "40px",
          padding: "40px",
          background: "linear-gradient(135deg, #E3F2FD, #F9F9F9)",
          borderRadius: "15px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <Box sx={{ flex: 1, paddingRight: "20px" }}>
          <Typography
            ref={servicesRef}
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#03A9F4",
              marginBottom: "20px",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Care you believe in!
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#1F2B6C",
              marginBottom: "20px",
              fontStyle: "italic",
            }}
          >
            Our services
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#455A64",
              lineHeight: "1.8",
              fontSize: "1rem",
              marginBottom: "20px",
            }}
          >
            Using RoSpital is quick and simple! Start by searching for nearby
            hospitals and hotels based on your location. Explore trusted reviews
            and key details like services, specialties, and contact information
            to make an informed choice. Once you’ve found the right option, book
            your appointment in just a few clicks—no hassle, no waiting, we’ve
            got everything you need to make your journey easier.
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={wlcpageimg5}
            alt="Banner"
            style={{
              maxWidth: "100%",
              maxHeight: "400px",
              borderRadius: "10px",
            }}
          />
        </Box>
      </Box>

      {/* Carduri pentru caracteristici */}
      <Container sx={{ marginTop: "40px", marginBottom: "40px" }}>
        <Grid container spacing={4} justifyContent="center">
          {/* Card 1 */}
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                padding: "20px",
                textAlign: "center",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #E3F2FD, #F9F9F9)",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#1F2B6C" }}
              >
                Locate Nearby Hospitals
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#455A64", marginTop: "10px", lineHeight: "1.6" }}
              >
                Easily find hospitals near your location.
              </Typography>
            </Box>
          </Grid>

          {/* Card 2 */}
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                padding: "20px",
                textAlign: "center",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #E3F2FD, #F9F9F9)",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#1F2B6C" }}
              >
                Trusted Reviews
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#455A64", marginTop: "10px", lineHeight: "1.6" }}
              >
                Read reviews from real patients to make informed decisions.
              </Typography>
            </Box>
          </Grid>

          {/* Card 3 */}
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                padding: "20px",
                textAlign: "center",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #E3F2FD, #F9F9F9)",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#1F2B6C" }}
              >
                Always Caring
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#455A64", marginTop: "10px", lineHeight: "1.6" }}
              >
                Compassionate care for all your needs.
              </Typography>
            </Box>
          </Grid>

          {/* Card 4 */}
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                padding: "20px",
                textAlign: "center",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #E3F2FD, #F9F9F9)",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#1F2B6C" }}
              >
                Book Appointments
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#455A64", marginTop: "10px", lineHeight: "1.6" }}
              >
                Schedule your appointments with ease.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box className={classes.footer}>
        <Typography variant="body2">
          &copy; 2025 RoSpital. All Rights Reserved.
        </Typography>
      </Box>
    </div>
  );
}

export default HomePage;
