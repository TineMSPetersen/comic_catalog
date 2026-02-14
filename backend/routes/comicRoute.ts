import express from "express"
import { addComic, chapterCount, listComics, setFavorite } from "../controllers/comicController.ts"

const comicRouter = express.Router();

comicRouter.post('/addcomic', addComic);
comicRouter.get('/listcomics', listComics);
comicRouter.post('/chaptercount', chapterCount);
comicRouter.post('/setfavorite', setFavorite)

export default comicRouter