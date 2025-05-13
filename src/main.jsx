import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import {AuthProvider} from "./context/AuthContext.jsx";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <Toaster
          position="bottom-left"
          toastOptions={{
              style: {
                  fontFamily: 'PixelifySans',
              },
              success: {
                  style: {
                      background: '#4caf50',
                      color: '#ffffff',
                  },
              },
              error: {
                  style: {
                      background: '#f44336',
                      color: '#ffffff',
                  },
              },
          }}
      />
      <AuthProvider>
          <App />
      </AuthProvider>
  </BrowserRouter>,
)
