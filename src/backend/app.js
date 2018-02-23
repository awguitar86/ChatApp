var express = require('express');
var app = express();
var socket = require('socket.io');

const port = 8080;

server = app.listen( port, () => {
    console.log(`server is running on port ${port}`)
});

io = socket(server);

io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('SEND_MESSAGE', (data) => {
        io.emit('RECEIVE_MESSAGE', data);
    })
});