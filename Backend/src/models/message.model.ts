import {Schema,model} from "mongoose";

const messgaeSchema = new Schema({
    senderId:{
        type:String,
        required:true
    },
    receiverId:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }
},{timestamps:true})

const Message = model("Message",messgaeSchema);

export default Message;