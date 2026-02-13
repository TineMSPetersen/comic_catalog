import express from "express"
import { addComic } from "../controllers/comicController.ts"

const comicRouter = express.Router();

comicRouter.post('/addcomic', addComic);

export default comicRouter