import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', 
    },
    secondary: {
    main: '#3252DF',
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <ThemeProvider theme={theme}>

      <App />
    </ThemeProvider>
  </StrictMode>,
)
