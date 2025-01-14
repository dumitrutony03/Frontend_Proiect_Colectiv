import { AppBar, Toolbar, Typography, Button, Container, Grid, Card, CardContent, CardMedia, Box, autocompleteClasses,IconButton} from '@mui/material';

function NavBar() {
{/* Full-Width Header */}
return (
<>
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
    onClick={() => navigate('/login')} // Navigate to login page
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
</>);
}

export default Navbar;