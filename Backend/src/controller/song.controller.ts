import AsyncHandler from "express-async-handler";
import Song from "../models/song.model.ts";

export const getAllSongs = AsyncHandler(async(req,res)=>{
    const songs = await Song.find({}).sort({createdAt:-1});
    res.status(200).json({
        success:true,
        songs
    })
})

export const getFeaturedSongs = AsyncHandler(async(req,res)=>{

    const size = req.query.size ? Number(req.query.size) : 6;

    const songs = await Song.aggregate([
       { $sample:{size:size}},
        {
            $project:{
                _id:1,
                title:1,
                artist:1,
                imageUrl:1,
                audioUrl:1,
                albumId:1,
                duration:1
            }
        }
    ])

    res.status(200).json({
        success:true,
        songs,
        message:"songs fetch successfully"
    })

})

