
//chat box element
const chatBox=document.getElementById('chat-box');

function createSentMessage(message){

    const rightMessageBoxContainer=document.createElement('div');
    rightMessageBoxContainer.className='right-message-box-container';

    const rightMessageContainer=document.createElement('div');
    rightMessageContainer.className='right-message-container';
    rightMessageBoxContainer.appendChild(rightMessageContainer);

    const messageInfo=document.createElement('div');
    messageInfo.className='message-info';
    rightMessageContainer.appendChild(messageInfo);

    const messageUsername=document.createElement('div');
    messageUsername.className='message-username';
    const messagetime=document.createElement('div');
    messagetime.className='message-time';
    messageInfo.appendChild(messageUsername);
    messageInfo.appendChild(messagetime);
    
    const messageBox=document.createElement('div');
    messageBox.className='message-box';
    rightMessageContainer.appendChild(messageBox);

    //put username value in the username field
    messageUsername.innerHTML='You';
    //put time in the time field
    var date=new Date();
    var time = date.getHours()+":"+date.getMinutes();
    messagetime.innerHTML=time;
    //put message value in the message field
    messageBox.innerHTML=message;

    //append message container to chatbox
    chatBox.appendChild(rightMessageBoxContainer); 
}   

function createReceiveMessage(messageData){
    const leftMessageBoxContainer=document.createElement('div');
    leftMessageBoxContainer.className='left-message-box-container';

    const leftMessageContainer=document.createElement('div');
    leftMessageContainer.className='left-message-container';
    leftMessageBoxContainer.appendChild(leftMessageContainer);

    const messageInfo=document.createElement('div');
    messageInfo.className='message-info';
    leftMessageContainer.appendChild(messageInfo);

    const messageUsername=document.createElement('div');
    messageUsername.className='message-username';
    const messagetime=document.createElement('div');
    messagetime.className='message-time';
    messageInfo.appendChild(messageUsername);
    messageInfo.appendChild(messagetime);
    
    const messageBox=document.createElement('div');
    messageBox.className='message-box';
    leftMessageContainer.appendChild(messageBox);

    //put username value in the username field
    messageUsername.innerHTML=messageData.username;
    //put time in the time field
    messagetime.innerHTML=messageData.time;
    //put message value in the message field
    messageBox.innerHTML=messageData.message;

    //append message container to chatbox
    chatBox.appendChild(leftMessageBoxContainer);
}

//add online user to the online panel
function addOnlineUsers(username){
    
    const onlineUsers=document.getElementById('online-users');
    const onlineUser=document.createElement('div');
    onlineUser.className='online-user';
    onlineUser.innerHTML=username;

    onlineUsers.appendChild(onlineUser);
}