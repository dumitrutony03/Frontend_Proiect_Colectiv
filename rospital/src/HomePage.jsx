// Import necessary libraries 
import React, { useRef,useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Grid, Card, CardContent, CardMedia, Box, autocompleteClasses,IconButton} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import { AccountCircle } from "@mui/icons-material"; // Import the user icon
import homeImage from '/src/photos/appointment-top-picture.png';
import wlcpageimg2 from '/src/photos/wlcpageimg2.png';
import wlcpageimg3 from '/src/photos/wlcpagephoto.png';
import wlcpageimg5 from '/src/photos/wlcpageimg5.jpeg';

const useStyles = makeStyles({
  headerOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-90%, -50%)',
    color: '#fff',
    textAlign: 'center',
    //backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: '20px',
    borderRadius: '10px',
  },
  bannerContainer: {
    position: 'relative',
    width: '100%',
    height: 'auto',
    marginBottom: '20px',
  },
  bannerImage: {
    width: '100%',
    height: 'auto',
  },
  card: {
    margin: '20px',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
  },
  media: {
    height: 200,
    borderRadius: '10px 10px 0 0',
  },
  footer: {
    marginTop: '40px',
    backgroundColor: '#1F2B6C',
    color: '#fff',
    padding: '20px 0',
    textAlign: 'center',
  },
  featureText: {
    color: '#6A1B9A',
    fontWeight: 'bold',
  },
});


function HomePage() {
  const classes = useStyles();
  const navigate = useNavigate();
  // Create a ref for the "About Us" section
  const aboutUsRef = useRef(null);
  const servicesRef = useRef(null);
  // Simulated login state (replace with real authentication logic)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Scroll to the top of the page
  const handleScrollToHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll to the "About Us" section with offset
  const handleScrollToAbout = () => {
    if (aboutUsRef.current) {
      const offset = -120; // Adjust the offset value to scroll further upwards
      const elementPosition = aboutUsRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset + offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Scroll to the "Services" section with offset
  const handleScrollToServices = () => {
    if (servicesRef.current) {
      const offset = -180; // Adjust the offset value to scroll further upwards
      const elementPosition = servicesRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset + offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

const handleBookAppointment = () => {
  if (isLoggedIn) {
    // Navigate to the appointment page if logged in
    navigate("/appointment");
  } else {
    // Navigate to the login page with a message if not logged in
    navigate("/LoginPage", { state: { message: "Please login to book an appointment." } });
  }
};

  return (
    <div>
      {/* Full-Width Header */}
      <AppBar
        position="sticky"
        sx={{
          margin: "auto",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          zIndex: 1100,
          //margin: 0,
          padding: 0,
          backgroundColor: "#1F2B6C",
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "1200px",
            padding: "0 20px",
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
            onClick={handleScrollToHome}
          >
            RO<span style={{ color: "#03A9F4" }}>SPITAL</span>
          </Button>


          {/* Navigation */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button color="inherit" sx={{ textTransform: "capitalize" }} onClick={handleScrollToHome}>
              Home
            </Button>
            <Button color="inherit" sx={{ textTransform: "capitalize" }} onClick={handleScrollToAbout}>
              About us
            </Button>
            <Button color="inherit" sx={{ textTransform: "capitalize" }} onClick={handleScrollToServices}>
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
            onClick={() => navigate('/LoginPage')} // Navigate to login page
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

      {/* Full-Width Banner with Text Overlay */}
      <Box className={classes.bannerContainer} sx={{ marginTop: "61px" }}>
        <img src={homeImage} alt="Banner" className={classes.bannerImage} />
        <Box className={classes.headerOverlay}>
          <Typography variant="h3" style={{ fontWeight: 'bold', marginBottom: '10px', color: '#1F2B6C' }}>Finding the right medic has never been easier</Typography>
        </Box>
      </Box>

    <Box sx={{ textAlign: 'center', marginTop: '-50px', marginBottom: '20px' }}>
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#03A9F4',
          color: '#fff',
          textTransform: 'capitalize',
          padding: '10px 20px',
          borderRadius: '20px',
          fontSize: '1rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
          '&:hover': {
            backgroundColor: '#0288D1',
          },
        }}
        onClick={handleBookAppointment}
      >
      Book an appointment
      </Button>
    </Box>

<Container>
        {/* Features Section */}
        <Grid container spacing={4}>
          {/* Cards */}
        </Grid>

{/* About Us Section */}
<Box
  ref={aboutUsRef}
  sx={{
    marginTop: '40px',
    padding: '40px 200px',
    background: 'linear-gradient(135deg, #E3F2FD, #F9F9F9)',
    borderRadius: '15px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  }}
>
  <Typography
    variant="h4"
    sx={{
      fontWeight: 'bold',
      color: '#03A9F4',
      marginBottom: '20px',
      textTransform: 'uppercase',
      letterSpacing: '1px',
    }}
  >
    Welcome to RoSpital
  </Typography>
  <Typography
    variant="h6"
    sx={{
      fontWeight: 'bold',
      color: '#1F2B6C',
      marginBottom: '20px',
      fontStyle: 'italic',
    }}
  >
    Experience healthcare like never before.
  </Typography>
  <Typography
    variant="body1"
    sx={{
      color: '#455A64',
      lineHeight: '1.8',
      fontSize: '1rem',
      marginBottom: '20px',
    }}
  >
    RoSpital is a student-driven initiative dedicated to making healthcare more accessible and convenient for everyone. Our platform simplifies the process of finding nearby hospitals and booking appointments, helping you connect with the care you need, when you need it most.
  </Typography>
  <Typography
    variant="body1"
    sx={{
      color: '#455A64',
      lineHeight: '1.8',
      fontSize: '1rem',
      marginTop: '10px',
    }}
  >
    Created by a team of passionate students, RoSpital was born out of a desire to bridge the gap between patients and healthcare providers. We understand that navigating the healthcare system can be overwhelming, so we’ve designed an easy-to-use tool that puts all the information at your fingertips.
  </Typography>
</Box>

</Container>

<Box 
  className={classes.bannerContainer} 
  sx={{ 
    marginTop: "61px", 
    width: "100%", // Ensure the box spans the full width
  }}
>
  <img 
    src={wlcpageimg3} 
    alt="Banner" 
    className={classes.bannerImage} 
    style={{ 
      width: "100%", // Ensure the image spans the full width
      height: "auto", // Maintain aspect ratio
    }} 
  />
</Box>

  <Box
  sx={{
    display: 'flex', // Setează un container flexibil
    alignItems: 'center', // Aliniază vertical conținutul
    justifyContent: 'center', // Centrează conținutul pe orizontală
    marginTop: '40px',
    padding: '40px',
    background: 'linear-gradient(135deg, #E3F2FD, #F9F9F9)',
    borderRadius: '15px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  }}
>
  {/* Secțiunea Services */}
  <Box
    sx={{
      flex: 1, // Ocupă 50% din spațiu
      paddingRight: '20px', // Spațiere între text și imagine
    }}
  >
    <Typography
      ref={servicesRef}
      variant="h4"
      sx={{
        fontWeight: 'bold',
        color: '#03A9F4',
        marginBottom: '20px',
        textTransform: 'uppercase',
        letterSpacing: '1px',
      }}
    >
      Care you believe in!
    </Typography>
    <Typography
      variant="h6"
      sx={{
        fontWeight: 'bold',
        color: '#1F2B6C',
        marginBottom: '20px',
        fontStyle: 'italic',
      }}
    >
      Our services
    </Typography>
    <Typography
      variant="body1"
      sx={{
        color: '#455A64',
        lineHeight: '1.8',
        fontSize: '1rem',
        marginBottom: '20px',
      }}
    >
      Using RoSpital is quick and simple! Start by searching for nearby hospitals and hotels based on your location. Explore trusted reviews and key details like services, specialties, and contact information to make an informed choice. Once you’ve found the right option, book your appointment in just a few clicks—no hassle, no waiting, we’ve got everything you need to make your journey easier.
    </Typography>
  </Box>

  {/* Imaginea în dreapta */}
  <Box
    sx={{
      flex: 1, // Ocupă 50% din spațiu
      display: 'flex',
      justifyContent: 'center', // Centrează imaginea pe orizontală
      alignItems: 'center', // Centrează imaginea pe verticală
    }}
  >
    <img
      src={wlcpageimg5}
      alt="Banner"
      style={{
        maxWidth: '100%', // Ajustează dimensiunea imaginii să se încadreze
        maxHeight: '400px', // Setează o înălțime maximă
        borderRadius: '10px', // Opțional: colțuri rotunjite
      }}
    />
  </Box>
</Box>

<Container sx={{ marginTop: '40px', marginBottom: '40px' }}>
  <Grid container spacing={4} justifyContent="center">
    {/* Card 1 */}
    <Grid item xs={12} sm={6} md={3}>
      <Box
        sx={{
          //height: '130px', // Fixed height for all cards
          padding: '20px',
          textAlign: 'center',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #E3F2FD, #F9F9F9)',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1F2B6C' }}>
          Locate Nearby Hospitals
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: '#455A64',
            marginTop: '10px',
            lineHeight: '1.6',
          }}
        >
          Easily find hospitals near your location.
        </Typography>
      </Box>
    </Grid>

    {/* Card 2 */}
    <Grid item xs={12} sm={6} md={3}>
      <Box
        sx={{
          padding: '20px',
          textAlign: 'center',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #E3F2FD, #F9F9F9)',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1F2B6C' }}>
          Trusted Reviews
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: '#455A64',
            marginTop: '10px',
            lineHeight: '1.6',
          }}
        >
          Read reviews from real patients to make informed decisions.
        </Typography>
      </Box>
    </Grid>

    {/* Card 3 */}
    <Grid item xs={12} sm={6} md={3}>
      <Box
        sx={{
          padding: '20px',
          textAlign: 'center',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #E3F2FD, #F9F9F9)',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1F2B6C' }}>
          Always Caring
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: '#455A64',
            marginTop: '10px',
            lineHeight: '1.6',
          }}
        >
          Compassionate care for all your needs.
        </Typography>
      </Box>
    </Grid>

    {/* Card 4 */}
    <Grid item xs={12} sm={6} md={3}>
      <Box
        sx={{
          padding: '20px',
          textAlign: 'center',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #E3F2FD, #F9F9F9)',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1F2B6C' }}>
          Book Appointments
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: '#455A64',
            marginTop: '10px',
            lineHeight: '1.6',
          }}
        >
          Schedule your appointments with ease.
        </Typography>
      </Box>
    </Grid>
  </Grid>
</Container>


      {/* Footer */}
      <Box className={classes.footer}>
        <Typography variant="body2">&copy; 2025 RoSpital. All Rights Reserved.</Typography>
      </Box>
    </div>
  );
}

export default HomePage;
