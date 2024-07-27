const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Novo usuário conectado');

    socket.on('join', (username) => {
        socket.username = username;
        io.emit('message', { user: 'admin', text: `${username} entrou no Orkut` });
    });

    socket.on('sendMessage', (message) => {
        io.emit('message', { user: socket.username, text: message });
    });

    socket.on('disconnect', () => {
        if (socket.username) {
            io.emit('message', { user: 'admin', text: `${socket.username} saiu do Orkut` });
        }
    });
});

server.listen(3000, () => {
    console.log('Servidor ouvindo na porta 3000');
});

