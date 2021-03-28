import express from 'express';
import {createServer} from "http";
import {Server, Socket} from "socket.io";

const app = express();
const httpServer = createServer();
const users: Array<string> = []
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"]
  }
});
app.get('/', (req, res) => {
  res.send({'some': 'json'});
});

io.on("connection", (socket: Socket) => {
  let username = "";
  socket.on("check user", (uniqid: string, user: string) => {
    let res = false;
    if (!users.includes(user)) {
      res = true;
      io.emit(uniqid, res);
      users.push(user);
      username = user;

      io.emit("user connected", username);
    }
    else
      io.emit(uniqid, res);
  })
  socket.on('disconnect', () => {
    if (username != "") {
      const index = users.indexOf(username);
      if (index > -1) users.splice(index, 1)
      io.emit('user disconnected', username)
      console.log('user disconnected');
    }
  });
  socket.on('chat message', (msg) => {
    console.log(msg)
    io.emit('new message', msg);
  });
});


httpServer.listen(3000, () => {
  console.log('listening on *:3000');
});





