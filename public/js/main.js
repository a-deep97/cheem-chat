
//socket instance defined
const socket=io();
const urlParams=Qs.parse(location.search,{ignoreQueryPrefix:true});

const username=urlParams.username;
const room= urlParams.room;

//store user info into local storage
addUser(username,room);

//emit event to server on join
socket.emit('on join',{username,room});
//signal recieved from server when user joined
socket.on('user joined',(roomUsers)=>{
    //update online user panel as userjoins
    const onlinePanel=document.getElementById('online-users');
    onlinePanel.innerHTML='';
    for(var i=0;i<roomUsers.length;i++){
        addOnlineUsers(roomUsers[i].username);
    }
})

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

//event to get online users
socket.on('online users',(roomUsers)=>{
    //updates online user panel
    const onlinePanel=document.getElementById('online-users');
    onlinePanel.innerHTML='';
    for(var i=0;i<roomUsers.length;i++){
        addOnlineUsers(roomUsers[i].username);
    }
})