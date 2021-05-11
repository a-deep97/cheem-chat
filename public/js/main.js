
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

//send message with button event
const messageForm=document.getElementById('message-form');
messageForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=e.target.message.value.trim();
    createSentMessage(message);

    //send message to server
    socket.emit('send message',message);
});

//event on recivinf message from server
socket.on('receive message',(messageData)=>{
    
    createReceiveMessage(messageData);
});
