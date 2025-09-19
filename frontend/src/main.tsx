import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PlayerProvider } from './PlayerContext.tsx'
import Home from './Home.tsx'


createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <PlayerProvider>
          <App/>
    </PlayerProvider>
  // </StrictMode>,
)
