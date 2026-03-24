import express from 'express';
import { protectRoutes, requireAdmin } from '../middleware/auth.middleware.ts';
import { getAllSongs, getFeaturedSongs } from '../controller/song.controller.ts';

const songRouter = express.Router();

songRouter.get('/',requireAdmin,getAllSongs);
songRouter.get('/featured',getFeaturedSongs);
songRouter.get('/made-for-you',getFeaturedSongs);
songRouter.get('/trending',getFeaturedSongs);

export default songRouter;