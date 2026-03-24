import type { Request,Response,NextFunction } from 'express';
import AppError from '../utils/appClass.ts';
import { clerkClient, getAuth } from '@clerk/express';
import "dotenv/config";

export const protectRoutes = async(req:Request,res:Response,next:NextFunction)=>{
    try{

        if(req.path.startsWith("/api/inngest")){
            return next();
        }

        const {userId} = getAuth(req);

        if(!userId){
            throw new AppError(401,"Unauthorized access - Please login first")
        }

        next();

    }catch(err){
        next(err);
    }
}

export const requireAdmin = async(req:Request,res:Response,next:NextFunction)=>{
    try{

            const {isAuthenticated,userId} = getAuth(req);

            if(!isAuthenticated || !userId){
                throw new AppError(401,"Unauthorized access - Please login first")
            }

            const currentUser = await clerkClient.users.getUser(userId!);

            const adminEmail = process.env.ADMIN_EMAIL;

            if(currentUser.emailAddresses[0]?.emailAddress !== adminEmail){
                throw new Error("Forbidden - Admin access required");
            }

            next();

    }catch(err){
        next(err);
    }
}