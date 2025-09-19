import { use, useEffect, useState } from "react";

import "./App.css";
import Home from "./Home";
import { usePlayerProvider } from "./PlayerContext";
import type { Player } from "./PlayerContext";
import { useNavigate, useParams } from "react-router-dom";
import socket from "./socket.ts";
import { QuestionClass } from "./QuestionClass";
import React from 'react';
import {
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Paper,
  Box,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';


function Game({ player }) {
  // const [ques , setDisplayQuse] = useState<QuestionClass>();
  console.log(socket.id)
  const navigate = useNavigate();
  const [questionn, setDisplayQuestion] = useState([""]);
  const [answer, setAnswer] = useState("");
  const { code } = useParams();
  const [flagg,setFlagg] = useState(true);
  const [flag2,setFlag2] = useState(false)
  const { players, setPlayers } = usePlayerProvider();
  console.log(players);
  console.log(player?.id);
  const [tempans,setTempAns] = useState('');
  const [prevAns,setPrevAns] = useState('')
  // async function displayQuestion(){

  //   // console.log("sex");
  //   //   let response;
  //   //   try {
  //   //     response = await fetch(`http://localhost:5000/${code}/questions`, {
  //   //       method : "GET"
  //   //     })
  //   //   }catch(e){
  //   //     console.log(e);
  //   //   }

  //   //   const data = await response?.json();
  //   //   console.log(response);
  //   //   setDisplayQuestion(data.question);
  //   // socket.emit("start-game");

  // }

  console.log("hey");

  function handleChange(event) {
    setAnswer(event.target.value);
  }

  async function checkAnswer(event) {
    if (event.key === "Enter") {
      try {
        const response = await fetch(`http://localhost:5000/${code}/answer`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            answer: answer,
            id: player.id,
          }),
        });
        const data = await response?.json();
        console.log(data);
        if (data.flag){
          setFlagg(false)
        }

        setPlayers(data.players);
      } catch (e) {
        console.log(e);
      }
    }
  }

  

  useEffect(() => {
    console.log("mounted");

    socket.on("connect", () => {
      console.log("connected with id:", socket.id);
    });

    // socket.on("done", () => {
    //   socket.emit("start-game");
    // });

    // socket.on("joining-game", () => {
    //   console.log("heyHERE");
    //   socket.emit("start-game");
    // });
    // socket.emit("start-game")


    socket.on("question", ({ question }) => {
      if (question.type === "append"){
          setPrevAns(tempans)
          setDisplayQuestion((prev) => [
            ...prev,question.data
          ]);
      }
      if (question.type === "replace"){
        
         if (prevAns != "") { // Check if there was a previous answer to display
                 // 1. Capture the correct answer from the round that just ended.
          setFlag2(true);      // 2. Trigger the banner to show.
          setTimeout(() => {
             setFlag2(false);
          }, 5000);
        }
        setTempAns(question.ans)
        setAnswer("")
        
        setFlagg(true)
        setDisplayQuestion([])
        setDisplayQuestion([question.data])
      }
    });

    socket.on("game-over", ({ players }) => {
      navigate(`/${code}`);
      setPlayers(players);
    });
    return () => {
      socket.off("done");
      socket.off("question");
      socket.off("game-over");
      socket.off("joining-game");
    };
  }, [code]);
  return (

    <>
    <Box
  sx={{
    display: 'flex',       // two-column layout
    width: '100%',
    height: '100%',
    padding: 2,
  }}
>
  {/* Left column: Questions */}
  <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

{flag2 && (
  <div
    style={{
      backgroundColor: "#ff009dff", // light amber
      color: "#000000ff",          // dark amber text
      padding: "12px 20px",
      borderRadius: "12px",
      fontWeight: "bold",
      fontSize: "18px",
      textAlign: "center",
      marginTop: "16px",
      boxShadow: "0px 4px 6px rgba(0,0,0,0.1)"
    }}
  >
    The Answer was <span style={{ color: "#08ff66ff" }}>{tempans}</span>
  </div>
)}

    <Typography variant="h5" component="h2" gutterBottom>
      Questions
    </Typography>

    <Box sx={{ width: '100%', maxWidth: '500px' }}>
      {questionn.map((question, index) => (
        <Paper
          key={index}
          elevation={2}
          sx={{
            padding: '1rem 1.5rem',
            marginBottom: '1rem',
            backgroundColor: '#e8eaf6',
            borderRadius: '12px',
          }}
        >
          <Typography variant="body1">{question}</Typography>
        </Paper>
      ))}
    </Box>

    {flagg && (
      <TextField
        label="Your Answer"
        variant="outlined"
        fullWidth
        value={answer}
        onChange={handleChange}
        onKeyDown={checkAnswer}
        autoComplete="off"
        sx={{ maxWidth: '600px' }}
      />
    )}
  </Box>

  {/* Right column: Players */}
  <Box sx={{ width: '250px', marginLeft: 2 }}>
    <Paper
      elevation={3}
      sx={{
        padding: '1rem',
        borderRadius: '12px',
        width: '100%',
      }}
    >
      <Typography variant="h6" component="h2" align="center" gutterBottom>
        Players
      </Typography>

      <List dense>
        {players.map((player) => (
          <ListItem key={player.name} disableGutters>
            <ListItemAvatar sx={{ minWidth: 'auto', marginRight: 1.5 }}>
              <Avatar sx={{ width: 28, height: 28 }}>
                <PersonIcon sx={{ fontSize: '1.1rem' }} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={player.name}
              secondary={`Pts: ${player.points}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  </Box>
</Box>

    </>

  );
}

export default Game;
