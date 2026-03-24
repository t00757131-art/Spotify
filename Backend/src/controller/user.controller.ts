import AsyncHandler from "express-async-handler";
import User from "../models/user.model.ts";
import { clerkClient, getAuth } from "@clerk/express";

export const getAllUsers = AsyncHandler(async(req,res)=>{

    const {userId} = getAuth(req);

    const currentUser = await clerkClient.users.getUser(userId!);

    const users = await User.find({clerkId:{$ne:userId},email:{$ne:currentUser.emailAddresses[0]?.emailAddress}});
    res.status(200).json({
        success:true,
        users
    })
})