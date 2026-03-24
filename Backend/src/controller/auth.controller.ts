import { clerkClient } from "@clerk/express"
import AsyncHandler from "express-async-handler"
import User from "../models/user.model.ts";

export const Register = AsyncHandler(async (req, res) => {
    // Implementation for user registration
    const user = await clerkClient.users.getUser(req.auth.userId);

    //check if user already exists in the database
    const existingUser = await User.findOne({ clerkId: user.id });

    if(!existingUser){
        await User.create({
            clerkId: user.id,
            fullname: `${user.fullName} ${user.lastName}`,
            imageUrl:user.imageUrl,
            email:user.emailAddresses[0]?.emailAddress,
        })
    }

    res.status(200
        ).json({
            message:"User registered successfully",
            success:true,
        })

})
