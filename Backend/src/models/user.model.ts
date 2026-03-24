import {Schema,model} from "mongoose";

const userSchema = new Schema({
    fullname:{
        type:String,
        required:[true,"Fullaname is required"]
    },
    imageUrl:{
        type:String,
        default:"",
        unique:true
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true
    },
    clerkId:{
        type:String,
        required:true,
        unique:true
    }
},{timestamps:true})

const User =  model("User",userSchema);

export default User;

