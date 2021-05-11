const express =require('express');
const app=express();
const http=require('http').Server(app);
const io=require('socket.io')(http);


app.use(express.static('public'));

//serving home page
app.get('/',(req,res)=>{
    res.sendfile('index');
});

//socket connection on to clients
io.on('connection',(socket)=>{

    //event for new joining client
    socket.on('on join',({})=>{

    });

    //event on client disconnection
    socket.on('disconnect',()=>{

    });

    //event for sending message
    socket.on('chat message',()=>{

    });
});



//server listening

http.listen(3000,()=>{console.log('server running on port 3000');});