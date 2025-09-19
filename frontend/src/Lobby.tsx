import React, { useEffect } from 'react'
import { usePlayerProvider } from './PlayerContext'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import socket from './socket.ts';
// import {Box, Typography, Paper, List, ListItem, ListItemText, Button } from "@mui/material";
// import PersonIcon from '@mui/icons-material/Person'; // A default icon for players
import {
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Paper,
  Box,
  Divider
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person'; // A default icon for players
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'


const Lobby = () => {

     const { code } = useParams()
    const {players, setPlayers} = usePlayerProvider();
    const navigate = useNavigate();

    // const socket = io("http://localhost:5000")

    function startGame(){
        socket.emit("join-game")
    }

    

    

    useEffect(() => {
        socket.emit("join-lobby",{code}); 

        socket.on("joining-game",() => {
        console.log("joing")
        navigate(`/${code}/game`);
        
        setTimeout(()=> {
          socket.emit("start-game")
        },1000)

        })


        socket.on("reload",({players}) => {
         setPlayers(players)
    })

    return () => {
      socket.off("joining-game")
      socket.off("reload")
    }

    },  
    [code])
    


  return (

     

    <Box
       flexDirection="column"       // stack children vertically

      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh', // Takes up the full screen height
        backgroundColor: '#f0f2f5', // A light grey background for contrast
      }}
    >

<Paper
        elevation={3} // Controls the shadow depth (0-24)
        sx={{
          padding: '2rem', // Adds space inside the paper
          borderRadius: '16px', // Rounds the corners
          width: '100%',
          maxWidth: '400px', // Prevents it from getting too wide on large screens
          textAlign: 'center', // Centers the text inside
        }}
      >
    <>
 <Typography variant="h2"  gutterBottom>
          Game Lobby
        </Typography>
     <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {players.map((player, index) => (
            <React.Fragment key={index}>
              <ListItem>
                {/* ListItemAvatar adds a spot for an icon or image */}
                <ListItemAvatar>
                  {/* Avatar is a circular container for an icon or picture */}
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                 {/* */} 
                {/* 4. 'ListItemText' to organize player info */}
                {/* This component neatly styles a primary and secondary line of text. */}
                <ListItemText
                  primary={player.name} // The main text
                  secondary={`Points: ${player.points}`} // The smaller, secondary text
                />
              </ListItem>
              {/* Add a Divider between items, but not after the last one */}
            </React.Fragment>
          ))}
        </List>
        
       <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={startGame}
            sx={{ marginTop: '1.5rem', width: '400px' }} // Add some space above the button
          >
            Start Game
          </Button>

    </>
    </Paper>
</Box>

  )
}

export default Lobby