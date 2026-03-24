import AsyncHandler from "express-async-handler";
import Album from "../models/album.model.ts";
import AppError from "../utils/appClass.ts";

export const getAllAlbums = AsyncHandler(async(req,res)=>{

    const albums = await Album.find({}).sort({createdAt:-1});

    res.status(200).json({
        success:true,
        albums
    })
})

export const getAlbumbyId = AsyncHandler(async(req,res)=>{

    const {albumId} = req.params as {albumId:string};

    const album = await Album.findById(albumId).populate("songs");

    if(!album){
        throw new AppError(400,"Album not found");
    }

    res.status(200).json({
        success:true,
        album
    })

})