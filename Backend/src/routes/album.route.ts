import express from 'express';
import { getAlbumbyId, getAllAlbums } from '../controller/album.controller.ts';

const albumRouter = express.Router();

albumRouter.get('/',getAllAlbums);
albumRouter.get('/:albumId',getAlbumbyId);

export default albumRouter;