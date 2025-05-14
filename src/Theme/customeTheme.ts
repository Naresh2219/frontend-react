import { createTheme } from "@mui/material";

const customeTheme = createTheme({
  palette: {
    mode: "light", // This sets the theme to dark mode
    primary: {
      main: "#1DB954",

    },
    secondary: {
      main: "#000080", 
    },
   
   
  },
});

export default customeTheme;