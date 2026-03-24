import express from 'express';
import { protectRoutes } from '../middleware/auth.middleware.ts';
import { getAllUsers } from '../controller/user.controller.ts';

const userRouter = express.Router();

userRouter.get("/",protectRoutes,getAllUsers)

export default userRouter;