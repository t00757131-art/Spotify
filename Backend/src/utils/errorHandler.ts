import type { Request,Response,NextFunction } from "express"
import type AppError from "./appClass"

export const errorHandler = (err:AppError,req:Request,res:Response,next:NextFunction)=>{
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal server error";

    console.log("Error : ",err.message);

    res.status(statusCode).json({
        message,
        success:false,
        stack:err.stack
    })
}