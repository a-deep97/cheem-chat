const express =require('express');
const app=express();
const http=require('http').Server(app);
const io=require('socket.io')(http);

const USERS =require('./server utility/users');
const formatMessage=require('./server utility/format_message');

app.use(express.static('public'));

//serving home page
app.get('/',(req,res)=>{
    res.sendfile('index');
});

//socket connection on to clients
io.on('connection',(socket)=>{

    //event when a user joins
    socket.on('on join',({username,room})=>{
        const userID=socket.id;
        const userIP=socket.request.connection.remoteAddress;
        USERS.addUser(userID,username,userIP,room);
        //join user to the room
        socket.join(room);

        //get the user from local database
        const user=USERS.getUser(socket.id);

        // current room users
        var roomUsers=USERS.roomUsers(user.room);

        // emit info to new joiny
        var roomUsers=USERS.roomUsers(user.room);
        socket.emit('user joined',roomUsers);
        
        //broadcast new user info to others
        socket.broadcast.to(room).emit('new user',{username});

        //broadcast current room info to others
        socket.broadcast.to(user.room).emit('online users',roomUsers);
    });

    //event on user disconnection
    socket.on('disconnect',()=>{
        const user= USERS.removeUser(socket.id);
        if(user){
            const username=user.username;
            //broadcast the user left info
            socket.broadcast.to(user.room).emit('user left',{username});
            //broadcast to current room info
            var roomUsers=USERS.roomUsers(user.room);
            socket.broadcast.to(user.room).emit('online users',roomUsers);
        }
    });

    //event for sending message by client
    socket.on('send message',(message)=>{
        
        //get the user from local database
        const user=USERS.getUser(socket.id);

        //broadcast message to the desired room if user exists
        if(user){
            const username=user.username;
            socket.broadcast.to(user.room).emit('receive message',formatMessage(username,message));
        }
        
    }); 
});



//server listening

http.listen(3000,()=>{console.log('server running on port 3000');});