import {Schema,model} from "mongoose";

const  songSchema = new Schema({
    title:{
        type:String,
        required:[true,'Song title are required'],
        unique:true,
    },
    artist:{
        type:String,
        required:[true,"artist name is required"]
    },
    imageUrl:{
        type:String,
        required:true
    },
    imageId:{
        type:String,
    },
    audioUrl:{
        type:String,
        required:true
    },
    audioId:{
        type:String,
    },
    duration:{
        type:Number,
        required:true
    },
    albumId:{
        type:Schema.Types.ObjectId,
        ref:"Album",
        default:null
    }

},{timestamps:true})

const Song = model("Song",songSchema);

export default Song;