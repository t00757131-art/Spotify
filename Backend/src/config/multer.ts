import multer from 'multer';
import path from 'path';
import rateLimit from "express-rate-limit"
import fs from 'fs';

const __dirname = path.resolve();

const uploadPath = path.join(__dirname,"uploads");

if(!fs.existsSync(uploadPath)){
  fs.mkdirSync(uploadPath);
}

export const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 20, // max 20 uploads
  message: "Too many uploads, try later",
})

const storage =  multer.diskStorage({
    destination(req, file, callback) {
        callback(null,uploadPath);
    },
    filename(req, file, callback) {
        const uniqueName = Date.now()+"-"+file.originalname;
        callback(null,uniqueName);
    },
})

const fileFilter = (req:Express.Request,file:Express.Multer.File,cb:multer.FileFilterCallback)=>{
    if(file.mimetype.startsWith("image/") || file.mimetype.startsWith("audio/")){
        cb(null,true);
    }else{
        cb(null,false);
    }
}

export const uploads = multer({
    storage,
    fileFilter,
    limits:{
        fileSize: 10 * 1024 * 1024, //10MB
    },

})