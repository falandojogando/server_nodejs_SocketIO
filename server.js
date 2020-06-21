const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

//io.sockets.adapter.rooms['my_room']; Quantas pessoas tem na sala

io.on('connection', (socket)=>{

    socket.emit('SENDME_ID', {message : "Manda ID"})
    console.log(io.engine.clientsCount);
    socket.on('ID_CURRENT', (data)=>{
        socket.id = data.id;
        console.log('recebeu id')
        console.log(socket.id)
    })
 

    socket.on('disconnect', (data)=>{
        console.log('disconnect');
    })
})

http.listen(3000 || process.env.PORT ,()=> console.log('Servidor Online'))
