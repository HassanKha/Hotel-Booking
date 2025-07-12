
import {

  Typography,

  Box,
  Container,
  useTheme,
  useMediaQuery,

} from "@mui/material"
import LandingBG from "../../../../assets/landing.png"
import {BookingForm} from "./components/BookingForm";
export default function Landing() {
    const theme = useTheme();
  const downMd = useMediaQuery(theme.breakpoints.down("md")); 
  
  
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
     <main>
          {/* Hero Section */}
          <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
           <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },   // stack on mobile
              alignItems: "center",
              gap: 4,
            }}
          >
            {/*  Text block  */}
            <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } , fontWeight: "900" , }}>
              <Typography
                variant="h1"
                sx={{
                  mb: 2,
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  color: "#152C5B",
                  display:'flex',
                  flexDirection:'column',
fontWeight: "900"
                }}
              >
                Forget Busy Work,{" "}
                <Box component="span" sx={{ color: "#152C5B",fontWeight: "900" }}>
                  Start Next Vacation
                </Box>
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                  color: "text.secondary",
                  fontSize: "1.1rem",
                  lineHeight: 1.6,
                }}
              >
                We provide what you need to enjoy your holiday with family. Time to make another memorable moments.
              </Typography>
              <BookingForm />
            </Box>

            {/*  Image block  */}
            <Box
              sx={{
                 flex: downMd ? "0 0 auto" : 1,
                display: "flex",
                justifyContent: "center",
                marginLeft: '10%',

              }}
            >
            <Box
  sx={{
    position: "relative",
    width: { xs: "100%", sm: 380 },
    borderRadius: 3,
    overflow: "visible",
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      borderRadius: "inherit",
      backgroundColor: "#fff",
      border: "2px solid",
      borderColor: "#E5E5E5",
      transform: "translate(24px, 24px)",
      zIndex: 0,               
    },
  }}
>
  <Box
    component="img"
    src={LandingBG}
    alt="Modern glass cottage on a hill"
    loading="lazy"
    sx={{
      display: "block",
      width: "100%",
      height: "auto",
      borderRadius: "inherit",
      objectFit: "cover",
      position: "relative",
      zIndex: 1,                 
    }}
  />
</Box>
            </Box>
          </Box>
          </Container>
         </main>
    </Box>
  );
}
