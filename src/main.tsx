import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeProvider.tsx'
import { InvoicesProvider } from './context/InvoicesProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <InvoicesProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </InvoicesProvider>
  </StrictMode>,
)
