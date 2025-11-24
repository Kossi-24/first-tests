import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UserContextProvider } from './context/AuthContext.jsx'
import { ThemeProvider } from "@/components/theme-provider"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContextProvider>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </UserContextProvider>
  </StrictMode>,
)
