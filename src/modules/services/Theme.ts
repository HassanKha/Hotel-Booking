import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', 
    },
    secondary: {
    main: '#3252DF',
    },
  },
   components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: "thin",
          scrollbarColor: "#B0BEC5 #F5F5F5",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#F5F5F5",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#B0BEC5",
            borderRadius: "4px",
          },
        },
      },
    },
  },
})
