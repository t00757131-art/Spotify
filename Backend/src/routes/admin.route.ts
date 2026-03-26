import express from 'express';
import { protectRoutes, requireAdmin } from '../middleware/auth.middleware.ts';
import { uploadLimiter, uploads } from '../config/multer.ts';
import { checkAdmin, CreateAlbum, CreateSong, deleteAlbum, deleteSong, updateAlbum, updateSong } from '../controller/admin.controller.ts';

const adminRouter = express.Router();

adminRouter.get('/check-admin',checkAdmin);



adminRouter.post('/songs',uploadLimiter,
    uploads.fields([
        {name:"audio",maxCount:1},
        {name:"image",maxCount:1}
    ])
,protectRoutes,requireAdmin,CreateSong)

adminRouter.delete('/songs/:songId',protectRoutes,requireAdmin,deleteSong)

adminRouter.post('/albums',uploadLimiter,uploads.single("image"),protectRoutes,requireAdmin,CreateAlbum);
adminRouter.delete('/albums/:albumId',protectRoutes,requireAdmin,deleteAlbum);
adminRouter.patch('/albums/:albumId',uploadLimiter,uploads.single("image"),protectRoutes,requireAdmin,updateAlbum);
adminRouter.put('/songs/:songId',uploadLimiter,
    uploads.fields([
        {name:"audio",maxCount:1},
        {name:"image",maxCount:1}
    ])
,protectRoutes,requireAdmin,updateSong)




export default adminRouter;