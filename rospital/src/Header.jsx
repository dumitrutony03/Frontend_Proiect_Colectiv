import React from "react";
import { AppBar, Toolbar, Button, Box, IconButton } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const FullWidthHeader = ({
  handleScrollToHome,
  handleScrollToAbout,
  handleScrollToServices,
}) => {
  // Hook-uri pentru navigare și locația curentă a paginii
  const navigate = useNavigate(); // Permite navigarea între pagini
  const location = useLocation(); // Obține locația curentă a paginii
  const isLoggedIn =
    localStorage.getItem("doctorUsername") ||
    localStorage.getItem("patientUsername");
  // Funcție pentru a naviga sau a derula în funcție de locația curentă
  const navigateOrScroll = (target) => {
    if (location.pathname === "/") {
      target(); // Dacă suntem pe pagina principală, apelăm funcția de derulare
    } else {
      navigate("/"); // Dacă nu suntem pe pagina principală, navigăm la homepage
    }
  };

  return (
    <AppBar
      position="sticky" // Fixăm bara de navigare
      sx={{
        margin: "auto",
        position: "fixed", // Bara de navigare rămâne fixă
        top: 0,
        left: 0,
        width: "100vw", // Lățimea întreagă a paginii
        zIndex: 1100, // Prioritate mare pentru a se asigura că este deasupra altor elemente
        backgroundColor: "#1F2B6C", // Culoarea de fundal a barei
        boxShadow: "none", // Fără umbră pentru bara de navigare
      }}
    >
      <Toolbar
        sx={{
          display: "flex", // Folosim flexbox pentru aranjarea elementelor
          justifyContent: "space-between", // Împărțim spațiul în mod egal
          alignItems: "center", // Aliniem elementele pe axa verticală
          maxWidth: "1200px", // Lățime maximă pentru a restricționa dimensiunea barei
          padding: "0 20px", // Adăugăm padding pe orizontală
          width: "100%", // Bara ocupă toată lățimea
          margin: "0 auto", // Aliniem bara în centru
        }}
      >
        {/* Logo-ul */}
        <Button
          sx={{
            fontWeight: "bold", // Font îngroșat pentru logo
            color: "#fff", // Culoare albă pentru text
            fontSize: "1.25rem", // Mărimea fontului
            textTransform: "none", // Fără transformare a textului în majuscule
            "&:hover": {
              backgroundColor: "transparent", // Fără schimbare a fundalului la hover
            },
          }}
          onClick={() => navigateOrScroll(handleScrollToHome)} // Apelăm funcția de derulare sau navigare către homepage
        >
          RO<span style={{ color: "#03A9F4" }}>SPITAL</span>{" "}
          {/* Numele site-ului cu un span colorat */}
        </Button>

        {/* Secțiunea de navigare */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            color="inherit"
            sx={{ textTransform: "capitalize" }}
            onClick={() => navigateOrScroll(handleScrollToHome)}
          >
            Home {/* Butonul pentru pagina principală */}
          </Button>
          <Button
            color="inherit"
            sx={{ textTransform: "capitalize" }}
            onClick={() => navigateOrScroll(handleScrollToAbout)}
          >
            About us {/* Butonul pentru secțiunea Despre noi */}
          </Button>
          <Button
            color="inherit"
            sx={{ textTransform: "capitalize" }}
            onClick={() => navigateOrScroll(handleScrollToServices)}
          >
            Services {/* Butonul pentru secțiunea Servicii */}
          </Button>
        </Box>

        {/* Secțiunea de autentificare */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#03A9F4", // Culoare de fundal albastru pentru buton
              color: "#fff", // Culoare albă pentru text
              textTransform: "capitalize", // Capitalizarea textului butonului
              borderRadius: "20px", // Colțuri rotunjite pentru buton
              padding: "5px 20px", // Padding pe verticală și orizontală
              "&:hover": {
                backgroundColor: "#0288D1", // Schimbă culoarea de fundal la hover
              },
            }}
            onClick={() => navigate("/login")} // Navigăm la pagina de login când butonul este apăsat
          >
            Login {/* Eticheta butonului */}
          </Button>
          <IconButton
            sx={{
              color: "#fff", // Culoare albă pentru iconița din buton
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" }, // Schimbă culoarea la hover
            }}
          >
            <AccountCircle sx={{ fontSize: "2rem" }} /> {/* Iconița contului */}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default FullWidthHeader;
