import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './components/msauth/authConfig.js';
import { PublicClientApplication } from "@azure/msal-browser";

const msalInstance = new PublicClientApplication(msalConfig);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MsalProvider instance={msalInstance}>
    <App />
    </MsalProvider>
  </StrictMode>
);
