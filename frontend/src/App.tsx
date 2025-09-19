import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Game from './Game';
import type { Player } from './PlayerContext';
import Lobby from './Lobby';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";



const App = () => {
  console.log("APP");
  const [player,setPlayer ] = useState<Player| null>(null);


  return (

    <Router>
        <Routes>
            <Route path = "/:code" element={<Lobby/>} />
             <Route path="/" element={<Home setPlayer={setPlayer} />} />
             <Route path="/:code/game" element={<Game player={player} />} />
        </Routes>

    </Router>

  )
}

export default App