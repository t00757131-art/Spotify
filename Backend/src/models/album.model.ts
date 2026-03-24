import {Schema,model} from "mongoose";

const albumSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    artist:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
        required:true,
    },
    imageId:{
        type:String,
    },
    releaseYear:{
        type:String,
        required:true
    },
    songs:[
        {
            type:Schema.Types.ObjectId,
            ref:"Song"
        }
    ]
},{timestamps:true})

const Album = model("Album",albumSchema);

export default Album;