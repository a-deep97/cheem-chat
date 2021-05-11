
const users=[];

function addUser(id,username,ip,room){
    const user={id,username,ip,room};
    users.push(user);
}

function getUser(id){
    return users.find(user=>user.id===id);
}

function removeUser(id){
    const index =users.findIndex(user=>user.id===id);
    if(index!==-1){
        return users.splice(index,1);//note
    }
}

//users in room
function roomUsers(room){
    return users.filter(user=>user.room===room);
}


//export functions
module.exports={addUser,getUser,removeUser,roomUsers};