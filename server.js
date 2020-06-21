const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', (socket) =>{

    socket.on("PING", (pack)=>{
        console.log(pack.message + "socket id: " + socket.id);

        var json_pack = {message : "PONG"};
        socket.emit('PONG', json_pack );
    })  



});

http.listen(3000, ()=>{
    console.log('## server ONN ##');
})