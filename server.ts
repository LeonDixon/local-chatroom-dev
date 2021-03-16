import express from 'express';
import {createServer} from "http";
import {Server, Socket} from "socket.io";

const app = express();
const httpServer = createServer();
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
  console.log("a user connected");
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', (msg) => {
    console.log(msg)
    io.emit('chat message', msg.user);
  });
});


httpServer.listen(3000, () => {
  console.log('listening on *:3000');
});





