import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import "./index.css";
import { contentByLanguage } from "./content";
import LanguageProvider from "./content/LanguageProvider";

document.title = contentByLanguage.en.profile.siteTitle;

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('The portfolio root element is missing.');
}

createRoot(rootElement).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
)
