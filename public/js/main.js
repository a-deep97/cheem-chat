
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
    //auto scroll
    scrollChatBox();
    //set emoji in container
    setEmojis();
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
    //finding current time
    var date=new Date();
    var time = date.getHours()+":"+date.getMinutes();
    //adding message to message log
    addMessage(getUser().room,'you',message,time);
    //creating messsage for self
    createSentMessage(message,time);
    
    //auto scroll
    scrollChatBox();

    //send message to server
    socket.emit('send message',(message));

    // Clear message input
    e.target.elements.message.value = '';
});

//event on recivinf message from server
socket.on('receive message',(messageData)=>{
    
    //adding message to message log
    var date=new Date();
    var time = date.getHours()+":"+date.getMinutes();
    addMessage(getUser().room,messageData.username,messageData.message,time);
    //create received message box
    const username=messageData.username;
    const message=messageData.message;
    createReceiveMessage({username,message,time});
    //auto scroll
    scrollChatBox();
});

//event to get online users
socket.on('online users',(roomUsers)=>{
    //updates online user
    const onlinePanel=document.getElementById('online-users');
    onlinePanel.innerHTML='';
    for(var i=0;i<roomUsers.length;i++){
        addOnlineUsers(roomUsers[i].username);
    }
});