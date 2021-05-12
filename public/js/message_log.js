
var messagesLog=[];

function addMessage(room,username,message,time){
    const messageData={room,username,message,time};
    console.log(messageData);
    messagesLog=messagesLog||[];
    messagesLog.push(messageData);

    //storing message log in local storage
    localStorage.setItem('messagesLog',JSON.stringify(messagesLog));
}

function getLocalStorage(){
    messagesLog=JSON.parse(localStorage.getItem('messagesLog'));
}

//reload event
window.onload=function(){
    getLocalStorage();
    
    //filter message log with current room
    var filteredMessageLog=[];
    if(messagesLog!=null){
        filteredMessageLog =messagesLog.filter(messageData=>messageData.room===urlParams.room);
    }
    updataChatBox(filteredMessageLog);
}

//update chat box
function updataChatBox(filteredMessageLog){
    for(var i=0;i<filteredMessageLog.length;i++){
        if(filteredMessageLog[i].username=='you'){
            createSentMessage(filteredMessageLog[i].message,filteredMessageLog[i].time);
        }
        else{
            const username=filteredMessageLog[i].username;
            const message=filteredMessageLog[i].message;
            const time=filteredMessageLog[i].time;
            createReceiveMessage({username,message,time});
        }
    }
}
