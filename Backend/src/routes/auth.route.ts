import express from 'express';
import { Register } from '../controller/auth.controller.ts';

const authRouter = express.Router();

authRouter.post('/register',Register)

export default authRouter;