
//chat box element
const chatBox=document.getElementById('chat-box');

function createSentMessage(message,time){

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

//auto scroll chatbox
function scrollChatBox(){
    chatBox.scrollTop=chatBox.scrollHeight;
}
// emoji button
const emojiButton=document.getElementById('emoji-button');
emojiButton.addEventListener('click',()=>{
    const emojiContainer=document.getElementById('emoji-container');
    if(emojiContainer.style.height=='50%'){
        emojiContainer.style.height='0%';
        console.log(emojiContainer.style.height);
    }
    else{
        emojiContainer.style.height='50%';
        console.log(emojiContainer.style.height);
    }
});
//set emojis in emoji container
function setEmojis(){
    const emojiContainer=document.getElementById('emoji-container');
    for(var i=0;i<8;i++){
        const emojiCategory=document.createElement('div');
        emojiCategory.className='emoji-category';
        for(var j=0;j<EMOJIS[i].length;j++){
            const emojiElement=document.createElement('div');
            emojiElement.className='emoji-element';
            emojiElement.innerHTML=EMOJIS[i][j];
            emojiCategory.appendChild(emojiElement);
        }
        emojiContainer.appendChild(emojiCategory);
    }
}
//check for emoji click
const messageInput= document.getElementById('message-input');

document.addEventListener('click',(e)=>{
    if(e.target.className=='emoji-element'){
        messageInput.value+=e.target.innerHTML;
        console.log(messageInput.value);
    }
});