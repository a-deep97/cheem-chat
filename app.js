const express =require('express');
const app=express();
const http=require('http').Server(app);
const io=require('socket.io')(http);

const USERS =require('./server utility/users');

app.use(express.static('public'));

//serving home page
app.get('/',(req,res)=>{
    res.sendfile('index');
});

//socket connection on to clients
io.on('connection',(socket)=>{

    //event for new joining client
    socket.on('on join',({id,username,ip,room})=>{
        const userID=socket.id;
        const userIP=socket.request.connection.remoteAddress;
        USERS.addUser(userID,username,userIP,room);

        //broadcat new user
        socket.broadcast.to(room).emit('new user',{username});
    });

    //event on user disconnection
    socket.on('user disconnection',()=>{

    });

    //event for sending message
    socket.on('chat message',()=>{

    });
});



//server listening

http.listen(3000,()=>{console.log('server running on port 3000');});