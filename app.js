const express = require('express')
const app = express()

const server = app.listen(3001, () => {
    console.log('server running on port 3001')
})

const io = require('socket.io')(server)

io.on('connect', (socket) => {
    socket.on('ADD_USER', (user) => {
        socket.emit('USER_CREATED', socket.id);
        socket.broadcast.emit('NEW_USER', user)
    });
    socket.on('SEND_MESSAGE', (data) => {
        socket.emit('GET_MESSAGE', data)
        socket.broadcast.emit('GET_MESSAGE', data)
    });
});
