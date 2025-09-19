import express, { response } from "express";
import { connectDB } from "./config/db.js";
import Game from "./controller/nikaloQuestion.js";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import Player from "./controller/player.js";
import lobbyManager from "./controller/Lobby.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
app.use(cors());
app.use(express.json());

io.on("connection", (socket) => {
  console.log("connected");
 console.log("server sees socket:", socket.id);

  
  let yecode;
  let game;

  socket.on("join-lobby", ({ code }) => {
    console.log("joined");
    socket.join(code);
    socket.yecode = code;
    socket.game = lobbyManager.getGame(code);
    // console.log("room members:", io.sockets.adapter.rooms.get(code));

    console.log("game joined");
    const players = socket.game.getPlayers();
    io.to(socket.yecode).emit("reload", { players });
   
  });

  socket.on("join-game", () => {
    console.log("joining send");
    console.log(socket.yecode);
    io.to(socket.yecode).emit("joining-game");
    
    
  });

  let interval;
  socket.on("start-game", async () => {
    console.log("resacjed");
    if (!socket.game) return;
    interval = setInterval(async () => {
      if (socket.game.gameEnd()) {
        console.log("ended");
        clearInterval(interval);
        let players = socket.game.getPlayers();
        io.to(socket.yecode).emit("game-over", { players });
        return;
      }

      const question = await socket.game.showRandomQuestionandRemoveinOrder();
      console.log("yahan pr");
      console.log(question);
      io.to(socket.yecode).emit("question", { question });
    }, 5000);
  });
});

app.post("/lobbyjoin", (req, res) => {
  // let lobbycode = lobbyManager.createLobby();
  const lobbycode = req.body.lobbycode;
  const player = new Player(req.body.name);
  if (!lobbyManager.exists(lobbycode)) {
    console.log("does not exist");
    return res.status(400).send("Lobby code does not exist.");
  }

  // lobbyManager.getGame(lobbycode).addPlayer(player);
  const game = lobbyManager.getGame(lobbycode);
  game.addPlayer(player);

  res.json({
    code: lobbycode,
    players: game.getPlayers(),
    player: player,
  });
});

app.post("/lobby", (req, res) => {
  let lobbycode = lobbyManager.createLobby();

  const player = new Player(req.body.name);

  // lobbyManager.getGame(lobbycode).addPlayer(player);
  const game = lobbyManager.getGame(lobbycode);
  game.addPlayer(player);

  res.json({
    code: lobbycode,
    players: game.getPlayers(),
    player: player,
  });
});

app.post("/:lobbycode/answer", (req, res) => {
  const { lobbycode } = req.params;
  const game = lobbyManager.getGame(lobbycode);
  const { answer, id } = req.body;
  if (game.isCorrectAnswer(answer)) {
    if (game.gameEnd()){
      //TODO

    }

    game.findPlayerbyIDandUpdatePoint(id);
    res.json({players : game.getPlayers(),
      flag : "true"

  });    
  }else {
  res.json({players : game.getPlayers()
  });
}
});

// app.post("/:lobbycode/player", (req,res) => {
//     console.log(req.body.name);
//     const player = new Player(req.body.name);
//     console.log(player.name);
//     console.log("1");
//     game.addPlayer(player);
//     console.log("2");
//     res.json({
//     players : game.getPlayers(),
//     player :player});
//     console.log("3");
// })

app.get("/:lobbycode/questions", async (req, response) => {
  const { lobbycode } = req.params;

  console.log("Random Question:", question);
  // response.json({
  //     question : question
  // })
});

server.listen(5000, () => {
  connectDB();
  console.log("Server running at local host 5000");
});

