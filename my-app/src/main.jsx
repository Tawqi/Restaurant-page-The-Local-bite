import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // imports BrowserRouter component
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Wraps the whole app with the BrowserRouter compnent  */}
    <BrowserRouter> 
    <App />
    </BrowserRouter>
  </StrictMode>,
)
