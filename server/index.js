import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 4000;
const httpServer = http.createServer(app);
const io = new Server(httpServer);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/', (req, res) => {
    // res.json({ data: 'hello world' })
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', (socket) => {
    console.log('socket connection is ready')
})

httpServer.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`)
})