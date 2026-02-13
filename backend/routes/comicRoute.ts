import express from "express"
import { addComic, chapterCount, listComics } from "../controllers/comicController.ts"

const comicRouter = express.Router();

comicRouter.post('/addcomic', addComic);
comicRouter.get('/listcomics', listComics);
comicRouter.post('/chaptercount', chapterCount);

export default comicRouter