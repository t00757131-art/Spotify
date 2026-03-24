import express from 'express';
import { protectRoutes, requireAdmin } from '../middleware/auth.middleware.ts';
import { getAllStats } from '../controller/admin.controller.ts';

const statsRouter = express.Router();

statsRouter.get("/",protectRoutes,requireAdmin,getAllStats)

export default statsRouter;