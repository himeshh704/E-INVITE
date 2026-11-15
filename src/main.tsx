import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SideProvider } from './context/SideContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SideProvider>
      <App />
    </SideProvider>
  </StrictMode>,
)

