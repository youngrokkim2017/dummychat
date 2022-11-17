import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 4000;
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: ['http://localhost:3000']
    }
});
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/', (req, res) => {
    // res.json({ data: 'hello world' })
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', (socket) => {
    // console.log('socket connection is ready')
    socket.on('send-message', ({ message, roomId }) => {
        let skt = socket.broadcast
        skt = roomId ? skt.to(roomid) : skt
        skt.emit('message-from-server', { message })
        // console.log('message received', data)
    })

    socket.on('typing-started', ({ roomId }) => {
        let skt = socket.broadcast
        skt = roomId ? skt.to(roomid) : skt
        skt.emit('typing-started-from-server')
    })

    socket.on('typing-stopped', ({ roomId }) => {
        let skt = socket.broadcast
        skt = roomId ? skt.to(roomid) : skt
        skt.emit('typing-stopped-from-server')
    })

    socket.on('join-room', ({ roomId }) => {
        socket.join(roomId)
        // console.log('joining room')
    })

    socket.on('disconnect', (socket) => {
        console.log('socket disconnected')
    })
})


httpServer.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`)
})