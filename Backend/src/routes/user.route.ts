import express from 'express';
import { protectRoutes } from '../middleware/auth.middleware.ts';
import { getAllUsers, getUserMessages } from '../controller/user.controller.ts';

const userRouter = express.Router();

userRouter.get("/",protectRoutes,getAllUsers);

userRouter.get("/messages/:userId",protectRoutes,getUserMessages)

export default userRouter;