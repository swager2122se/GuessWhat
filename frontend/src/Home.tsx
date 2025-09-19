import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { usePlayerProvider } from './PlayerContext';
import type { Player } from './PlayerContext';
import { v4 as uuidv4 } from 'uuid';
import { Box, Typography, TextField, Button } from "@mui/material";


function Home({setPlayer}){
  const navigate = useNavigate();
  // const socket = io("http://localhost:5000");

  const [name,setName] = useState('');
  
  const [lobbycod, setLobbycod] = useState('');

  const {players, setPlayers} = usePlayerProvider()

  const [flag, setFlag] = useState(false);
  function handleChange(event){
    setName(event.target.value);

  }

  function handlelobbycod(event){
    setLobbycod(event.target.value);
  }



  async function createLobby() {
    if (name === ""){
      alert("Please write a Name")
      return
    }

    try {
      const response  = await fetch("http://localhost:5000/lobby",{
         method:  "POST",
        body: JSON.stringify({name : name}),
        headers : {
          "Content-type" : "application/json"
        }
      })
      const data = await response?.json();
        setPlayers(data.players);
        setPlayer(data.player);
        let code = data.code;

        navigate(`/${code}`);
      

    }catch{

    }
  }

  async function joinLobby(){
    if (name === ""){
      alert("Please write a Name")
      return
    }


      try{
        
      const response  = await fetch("http://localhost:5000/lobbyjoin",{
         method:  "POST",
        body: JSON.stringify({
          name : name,
          lobbycode : lobbycod
        }),
        headers : {
          "Content-type" : "application/json"
        }
      })
      const data = await response?.json();
        setPlayers(data.players);
        setPlayer(data.player);
        let code = data.code;

        navigate(`/${code}`);
           


      }catch{


      }


  }

  // async function playScreen(){
  //   try{
  //     const response = await fetch("http://localhost:5000/player",{
  //       method:  "POST",
  //       body: JSON.stringify({name : name}),
  //       headers : {
  //         "Content-type" : "application/json"
  //       }
  //     })
  //       const data = await response?.json();
  //       setPlayers(data.players);
  //       console.log(data.players);
  //       setPlayer(data.player);
        
  //       navigate('/game');
      
  //   }catch{

  //   }
  // }

  function showCode(){
    setFlag(true);
  }

return (

   <Box
    display="flex"                 // use flexbox
    flexDirection="column"         // stack children vertically
    justifyContent="center"        // center vertically
    alignItems="center"            // center horizontally
    minHeight="100vh"              // take full screen height
    gap={2}                        // space between items
  >

<>
 <Typography variant="h1" gutterBottom>
  Guess What!?
</Typography>
  
    <TextField 
      label="Name" 
      value={name} 
      onChange={handleChange} 
      sx={{ width: "300px" }} 
      margin="normal"
    />
<Button variant="contained" onClick={createLobby}>
      Create Lobby
    </Button>

<Button variant='contained' onClick={showCode}>
  join Lobby
</Button>

{flag && 
  <>
  <TextField
          label="Lobby Code"
          value={lobbycod}
          onChange={handlelobbycod}
          sx={{width: "200px"}}
          margin="normal"
        />
   <Button variant="contained" color="secondary" onClick={joinLobby}>
          Join
        </Button>
  </>
}

</>
</Box>
)
}
export default Home