import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.static('../app'));

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
});

io.on('connection', socket => {
    console.log(`User ${socket.id} connected`);
    socket.emit('user-id', socket.id);
    io.emit('system-message', { text: `User ${socket.id.substring(0, 5)} connected` });

    socket.on('message', data => {
        io.emit('message', { id: socket.id, text: data.text });
    });

    socket.on('disconnect', () => {
        io.emit('system-message', { text: `User ${socket.id.substring(0, 5)} disconnected` });
    });
});

httpServer.listen(4200, () => console.log('started server at port 4200'));