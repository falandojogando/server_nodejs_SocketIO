const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

//io.sockets.adapter.rooms['my_room']; Quantas pessoas tem na sala // .sockets
//io.engine.clientsCount // Quantos pessoas estão connectadas ao servidor
//Object.keys(io.sockets.adapter.rooms['main'].sockets // CONVERTE EM OBJETO
io.on('connection', (socket)=>{

    var currentroom = "";

    console.log("sala "+ currentroom)

    socket.emit('SENDME_ID', {message : "Manda ID"})
    console.log();
    socket.on('ID_CURRENT', (data)=>{
        socket.id = data.id;
        console.log('recebeu id')
        console.log(socket.id)
    })

    socket.on("Join_Room", (data)=>{
        currentroom = data.idroom
        socket.join(currentroom, (errr)=> {if (errr) console.log ( errr) } )
        
    })

    socket.on('Joined_Room_Sucess', (data)=>{
        let pack = {id: socket.id}
        socket.emit("Spawn_Player_Room", pack)
        socket.in(currentroom).emit("Spawn_Player_Room", pack)
    })
    
    socket.on('A', (data)=>{
        let pack = {id: socket.id}
        socket.broadcast.to(currentroom).emit("B", pack);
        console.log("recebeu A " + " " + currentroom)

    })

    socket.on('disconnect', (data)=>{
        console.log('disconnect');
        socket.leave(currentroom)
    })
})

http.listen(3000 || process.env.PORT ,()=> console.log('Servidor Online'))
