const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Run when client connects
io.on('connection', (socket) => {
    socket.emit('message', 'Welcome to Chat Mate');
    // When user Connects
    socket.broadcast.emit('message', 'A user has joined the chat');
    // when user disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat');
    });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
