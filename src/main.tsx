import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import "./index.css";
import profile from "./content/profile";

document.title = profile.siteTitle;

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('The portfolio root element is missing.');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
