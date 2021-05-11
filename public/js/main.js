
//socket instance defined
const socket=io();
const urlParams=Qs.parse(location.search,{ignoreQueryPrefix:true});

const username=urlParams.username;
const room= urlParams.room;

//store user info into local storage
addUser(username,room);

//emit event to server on join
socket.emit('on join',{username,room});

//event on new user connection
socket.on('new user',({username})=>{
    console.log(username+' joined the chat');
});

//event on client disconnection
socket.on('disconnect',()=>{

});

socket.on('user left',({username})=>{
    console.log(username+'  has left the chat');
});
const message='hello';
socket.emit('send message',{message});

socket.on('recieve message',({username,message,time})=>{
    console.log(username+': '+message+' at '+ time );
});
