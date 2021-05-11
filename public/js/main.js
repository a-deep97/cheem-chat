
//socket instance defined
const socket=io();
const urlParams=Qs.parse(location.search,{ignoreQueryPrefix:true});

const username=urlParams.name;
const room= urlParams.room;

//emit event to server on join
socket.emit('on join',{username,room});

//event on new user connection
socket.on('new user',()=>{

});

//event on client disconnection
socket.on('disconnect',()=>{

});