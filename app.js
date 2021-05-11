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

    //event for new joining client
    socket.on('on join',({username,room})=>{
        const userID=socket.id;
        const userIP=socket.request.connection.remoteAddress;
        USERS.addUser(userID,username,userIP,room);
        //join user to the room
        socket.join(room);
        //broadcast new user
        socket.broadcast.to(room).emit('new user',{username});
    });

    //event on user disconnection
    socket.on('disconnect',()=>{
        const user= USERS.removeUser(socket.id);
        if(user){
            const username=user.username;
            socket.broadcast.to(user.room).emit('user left',{username});
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