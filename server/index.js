import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import cors from 'cors';

import sockets from './socket/sockets.js';
import router from './api/routes.js';
// const db = require('./config/keys.js').mongoURI
import mongoURI from './config/keys.js';

await mongoose
    // .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    .connect(mongoURI, { useNewUrlParser: true })

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

app.use(cors())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.use('/', router);

io.on('connection', sockets)

httpServer.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`)
})