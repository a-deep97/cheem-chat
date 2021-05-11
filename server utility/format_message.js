

function formatMessage(username,message){
    var date=new Date();
    var time = date.getHours()+":"+date.getMinutes();
    
    return {username,message,time};
}   

module.exports=formatMessage;